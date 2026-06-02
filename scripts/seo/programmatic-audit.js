#!/usr/bin/env node
/**
 * GSC traffic audit for programmatic (noindex) page prefixes.
 *
 * For each prefix in astro.config.mjs's programmaticPrefixes list, queries GSC
 * Performance API for 90-day impressions + clicks. Identifies:
 *   - prefixes with zero traffic 90 days → candidates for permanent removal
 *   - prefixes with growing traffic → candidates for re-indexing
 *
 * Output: logs/seo/programmatic-audit-{YYYY-MM-DD}.json + readable table.
 *
 * Usage:
 *   node scripts/seo/programmatic-audit.js          # 90-day window
 *   node scripts/seo/programmatic-audit.js 28       # 28-day window
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
const LOG_DIR    = path.join(ROOT, 'logs', 'seo');

const KEY_PATH    = process.env.GSC_CREDENTIAL_PATH
  || 'C:\\Users\\master\\.gsc-credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN = 'sc-domain:toolcalcs.com';
const DAYS        = parseInt(process.argv[2] || '90', 10);

// Prefixes from astro.config.mjs — these are noindex but still tracked by GSC
const PROGRAMMATIC_PREFIXES = [
  '/mortgage/', '/bmi/', '/loan/', '/savings/', '/down-payment/',
  '/paycheck/', '/macro/', '/data-convert/', '/pace/',
  '/due-date/', '/math/', '/percentage/', '/cooking/', '/compound-interest/',
  '/convert/', '/salary/', '/days-until/', '/days-ago/',
  '/days-from-now/', '/zodiac/', '/angel-number/', '/grade/', '/percent-off/',
  '/fraction/', '/what-percent/', '/auto-loan/', '/decimal-to-fraction/',
  '/times-tables/', '/factors-of/', '/time-convert/', '/tip/',
  '/temperature/', '/born-in/', '/time-zone/', '/how-many/', '/random/',
  // Recently re-promoted to indexable per May 1 commit:
  '/number-to-words/', '/roman-numerals/', '/currency/', '/calorie/',
];

function fmt(d) { return d.toISOString().slice(0, 10); }
const today = new Date();
const end   = new Date(today.getTime() - 2 * 864e5);
const start = new Date(end.getTime() - (DAYS - 1) * 864e5);

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  console.log(`\n=== programmatic audit ${fmt(start)} ~ ${fmt(end)} (${DAYS}d) ===\n`);
  console.log(`${PROGRAMMATIC_PREFIXES.length} prefixes\n`);

  const results = [];
  for (const prefix of PROGRAMMATIC_PREFIXES) {
    try {
      const res = await sc.searchanalytics.query({
        siteUrl: SITE_DOMAIN,
        requestBody: {
          startDate: fmt(start),
          endDate: fmt(end),
          dimensions: ['page'],
          rowLimit: 1000,
          dimensionFilterGroups: [{
            filters: [{ dimension: 'page', operator: 'contains', expression: prefix }],
          }],
        },
      });
      const rows = res.data.rows || [];
      const totals = rows.reduce((acc, r) => ({
        clicks: acc.clicks + r.clicks,
        impressions: acc.impressions + r.impressions,
      }), { clicks: 0, impressions: 0 });
      const positions = rows.map(r => r.position).filter(p => p > 0);
      const avgPos = positions.length ? positions.reduce((s, p) => s + p, 0) / positions.length : 0;

      results.push({
        prefix,
        pages: rows.length,
        clicks: totals.clicks,
        impressions: totals.impressions,
        avgPosition: avgPos,
        topPages: rows.sort((a, b) => b.impressions - a.impressions).slice(0, 5).map(r => ({
          url: r.keys[0],
          impressions: r.impressions,
          clicks: r.clicks,
          position: r.position,
        })),
      });
    } catch (e) {
      results.push({ prefix, error: e.message });
    }
  }

  // Classify
  const zeroTraffic = results.filter(r => !r.error && r.impressions === 0);
  const lowTraffic  = results.filter(r => !r.error && r.impressions > 0 && r.impressions < 10);
  const meaningful  = results.filter(r => !r.error && r.impressions >= 10);

  console.log('=== ZERO TRAFFIC (candidates for permanent removal) ===');
  zeroTraffic.forEach(r => console.log(`  ${r.prefix.padEnd(24)}  pages=${r.pages}`));
  console.log(`  → ${zeroTraffic.length} prefixes with 0 impressions in ${DAYS}d`);

  console.log('\n=== LOW TRAFFIC (<10 impressions, watch list) ===');
  lowTraffic.forEach(r => console.log(`  ${r.prefix.padEnd(24)}  imp=${String(r.impressions).padStart(3)}  clk=${r.clicks}  pages=${r.pages}`));

  console.log('\n=== MEANINGFUL TRAFFIC (≥10 impressions — keep, consider re-indexing) ===');
  meaningful.sort((a, b) => b.impressions - a.impressions);
  meaningful.forEach(r => {
    console.log(`  ${r.prefix.padEnd(24)}  imp=${String(r.impressions).padStart(5)}  clk=${String(r.clicks).padStart(3)}  pages=${r.pages}  avgPos=${r.avgPosition.toFixed(1)}`);
  });

  console.log('\n=== RECOMMENDATION ===');
  if (zeroTraffic.length > 0) {
    console.log(`  ${zeroTraffic.length} prefixes saw 0 impressions in ${DAYS}d. Removing them would:`);
    console.log('    - reduce noindex page count tracked by GSC');
    console.log('    - raise domain-average quality signal');
    console.log('    - simplify the sitemap-exclusion rule list');
    console.log('  Recommended action: .htaccess 410 Gone OR remove generators from src/data/');
  }
  if (meaningful.length > 0) {
    console.log(`  ${meaningful.length} prefixes have meaningful traffic. Consider promoting them back to indexable`);
    console.log('  (already done for /number-to-words/, /roman-numerals/, /currency/, /calorie/ per May 1 commit).');
  }

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `programmatic-audit-${fmt(today)}.json`);
  fs.writeFileSync(file, JSON.stringify({
    runAt: new Date().toISOString(),
    period: { start: fmt(start), end: fmt(end), days: DAYS },
    summary: {
      zeroTraffic: zeroTraffic.map(r => r.prefix),
      lowTraffic: lowTraffic.map(r => r.prefix),
      meaningful: meaningful.map(r => r.prefix),
    },
    results,
  }, null, 2));
  console.log(`\nsaved → ${file}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
