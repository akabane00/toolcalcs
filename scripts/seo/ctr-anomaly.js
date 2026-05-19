#!/usr/bin/env node
/**
 * CTR anomaly detector — find pages where title/meta is leaving clicks on the table.
 *
 * For each page that appeared on Google in the last N days:
 *   - Compare its actual CTR against the expected CTR at its average position
 *     (using widely-cited industry curves)
 *   - Flag pages where actual CTR is < 50% of expected AND impressions >= 50
 *   - Rank by "missed clicks" = impressions × (expected_CTR − actual_CTR)
 *
 * Output: stdout table + logs/seo/ctr-anomaly-{YYYY-MM-DD}.json
 *
 * Usage:
 *   node scripts/seo/ctr-anomaly.js                 # 28-day window, imp ≥ 50 (default)
 *   node scripts/seo/ctr-anomaly.js 90              # 90-day window
 *   node scripts/seo/ctr-anomaly.js 90 --min-imp=10 # lower threshold for low-traffic sites
 *   node scripts/seo/ctr-anomaly.js --min-imp=10    # 28d window, lower threshold
 *
 * No new content is needed to act on results — rewriting the existing
 * title and meta description usually closes the gap.
 */

import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = process.env.TOOLCALCS_ROOT
  ? path.resolve(process.env.TOOLCALCS_ROOT)
  : path.resolve(__dirname, '..', '..');

const KEY_PATH    = 'x:\\www\\storage\\credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN = 'sc-domain:toolcalcs.com';
const LOG_DIR     = path.join(ROOT, 'logs', 'seo');

// CLI: positional days, --min-imp=N, --min-missed=N
const args = process.argv.slice(2);
const positional = args.find(a => !a.startsWith('--'));
const arg = (n, d) => {
  const a = args.find(x => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const DAYS       = parseInt(positional || '28', 10);
const MIN_IMP    = parseInt(arg('min-imp', '50'), 10);
const MIN_MISSED = parseInt(arg('min-missed', '3'), 10);

// Expected CTR by SERP position. Conservative figures averaged from public
// studies (Advanced Web Ranking, Sistrix, Backlinko 2024-2025). Treat these
// as a screen, not an absolute baseline.
const EXPECTED_CTR = {
  1: 0.28, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.06,
  6: 0.04, 7: 0.03, 8: 0.025, 9: 0.02, 10: 0.018,
};
function expectedCtrAt(pos) {
  if (pos <= 0) return 0;
  const floor = Math.floor(pos);
  if (floor >= 11) return Math.max(0.005, 0.018 - (floor - 10) * 0.001); // gentle taper to ~0.5% on page 2+
  return EXPECTED_CTR[floor] ?? 0.005;
}

function fmt(d) { return d.toISOString().slice(0, 10); }
const today = new Date();
const end   = new Date(today.getTime() - 2 * 864e5); // GSC has 2-day lag
const start = new Date(end.getTime() - (DAYS - 1) * 864e5);

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  console.log(`\n=== CTR anomaly detection ${fmt(start)} ~ ${fmt(end)} (${DAYS}d) ===\n`);

  // Pull page-level aggregates first (one row per page)
  const pageRes = await sc.searchanalytics.query({
    siteUrl: SITE_DOMAIN,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['page'],
      rowLimit: 5000,
    },
  });
  const pageRows = pageRes.data.rows || [];
  console.log(`  ${pageRows.length} pages had impressions in window\n`);

  // Score each page
  const scored = pageRows
    .filter(r => r.impressions >= MIN_IMP)
    .map(r => {
      const url       = r.keys[0];
      const expected  = expectedCtrAt(r.position);
      const gap       = Math.max(0, expected - r.ctr);
      const missed    = Math.round(r.impressions * gap);
      const ratio     = expected > 0 ? r.ctr / expected : 0;
      return {
        url,
        impressions: r.impressions,
        clicks: r.clicks,
        ctr: r.ctr,
        position: r.position,
        expectedCtr: expected,
        ctrRatio: ratio,             // 1.0 = on par, <1 = under-performing
        missedClicks: missed,
      };
    })
    .filter(p => p.ctrRatio < 0.5 && p.missedClicks >= MIN_MISSED) // big enough to bother rewriting
    .sort((a, b) => b.missedClicks - a.missedClicks);

  console.log(`=== TOP 20 PAGES BY MISSED CLICKS (impressions >= ${MIN_IMP}, CTR < 50% of expected) ===`);
  console.log('');
  console.log(`  rank  imp   clk  pos  CTR   expected  ratio  missed  url`);
  console.log(`  ----  ----  ---  ---  ----  --------  -----  ------  ---`);
  scored.slice(0, 20).forEach((p, i) => {
    const u = p.url.replace('https://toolcalcs.com', '').padEnd(50);
    console.log(`  ${String(i+1).padStart(4)}  ${String(p.impressions).padStart(4)}  ${String(p.clicks).padStart(3)}  ${p.position.toFixed(1).padStart(3)}  ${(p.ctr*100).toFixed(1).padStart(3)}%  ${(p.expectedCtr*100).toFixed(1).padStart(5)}%   ${(p.ctrRatio*100).toFixed(0).padStart(3)}%   ${String(p.missedClicks).padStart(4)}   ${u}`);
  });

  // For top 10, also pull their best queries so the user knows what to optimize for
  console.log(`\n=== TOP QUERIES PER TOP-5 PAGE ===`);
  const topPagesForDetail = scored.slice(0, 5);
  const queryDetails = [];
  for (const p of topPagesForDetail) {
    const qRes = await sc.searchanalytics.query({
      siteUrl: SITE_DOMAIN,
      requestBody: {
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ['query'],
        rowLimit: 5,
        dimensionFilterGroups: [{
          filters: [{ dimension: 'page', operator: 'equals', expression: p.url }],
        }],
      },
    });
    const queries = (qRes.data.rows || []).sort((a, b) => b.impressions - a.impressions);
    queryDetails.push({ url: p.url, queries: queries.map(q => ({ query: q.keys[0], impressions: q.impressions, clicks: q.clicks, position: q.position })) });
    console.log(`\n  ${p.url.replace('https://toolcalcs.com', '') || '/'}  (missed ${p.missedClicks})`);
    queries.slice(0, 3).forEach(q => {
      console.log(`    - "${q.keys[0]}"  imp=${q.impressions}  clk=${q.clicks}  pos=${q.position.toFixed(1)}`);
    });
  }

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `ctr-anomaly-${fmt(today)}.json`);
  const totalMissed = scored.reduce((s, p) => s + p.missedClicks, 0);
  fs.writeFileSync(file, JSON.stringify({
    runAt: new Date().toISOString(),
    period: { start: fmt(start), end: fmt(end), days: DAYS },
    summary: {
      pagesWithImpressions: pageRows.length,
      pagesFlagged: scored.length,
      totalMissedClicks: totalMissed,
    },
    pages: scored,
    queryDetails,
  }, null, 2));

  console.log(`\n=== SUMMARY ===`);
  console.log(`  pages with ≥50 imp:        ${pageRows.filter(r => r.impressions >= 50).length}`);
  console.log(`  flagged (CTR < 50% of exp): ${scored.length}`);
  console.log(`  total estimated missed clicks: ${totalMissed}`);
  console.log(`  saved → ${file}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
