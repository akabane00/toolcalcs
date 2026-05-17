#!/usr/bin/env node
/**
 * Indexing API campaign efficacy tracker.
 *
 * Reads the most recent reindex-{date}.json log(s), re-inspects each URL that
 * was requested for reindexing, and reports state transitions:
 *   - was "Crawled - currently not indexed" → now "Submitted and indexed" ✓
 *   - still "Crawled - currently not indexed" (no change)
 *   - new state ("Discovered", "Duplicate", error, etc.)
 *
 * Output: logs/seo/efficacy-{YYYY-MM-DD}.json + readable summary.
 *
 * Usage:
 *   node scripts/seo/efficacy-check.js               # check most recent reindex log
 *   node scripts/seo/efficacy-check.js --days=7      # check all reindex logs in last 7d
 *   node scripts/seo/efficacy-check.js --log=path    # check specific log file
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

const KEY_PATH    = 'x:\\www\\storage\\credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN = 'sc-domain:toolcalcs.com';

const args = process.argv.slice(2);
const arg  = (n, d = null) => {
  const a = args.find(x => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const DAYS    = parseInt(arg('days', '1'), 10);
const LOG_OVR = arg('log', null);

const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadReindexLogs() {
  if (LOG_OVR) {
    return [JSON.parse(fs.readFileSync(LOG_OVR, 'utf8'))];
  }
  if (!fs.existsSync(LOG_DIR)) return [];
  const cutoff = Date.now() - DAYS * 864e5;
  return fs.readdirSync(LOG_DIR)
    .filter(f => f.startsWith('reindex-') && f.endsWith('.json'))
    .map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(LOG_DIR, f), 'utf8'));
        return { file: f, data };
      } catch { return null; }
    })
    .filter(x => x && new Date(x.data.timestamp).getTime() > cutoff)
    .sort((a, b) => new Date(a.data.timestamp) - new Date(b.data.timestamp));
}

function isIndexed(coverage, verdict) {
  if (verdict !== 'PASS') return false;
  if (!coverage) return false;
  if (/not indexed/i.test(coverage)) return false;
  return /Submitted and indexed|URL is on Google/i.test(coverage);
}

async function main() {
  const logs = loadReindexLogs();
  if (!logs.length) {
    console.error('No reindex logs found within window. Run `npm run seo:reindex` first.');
    process.exit(1);
  }

  // Collect all URLs that were sent reindex request (deduped, keep latest baseline)
  const tracked = new Map(); // url -> { baselineCoverage, baselineVerdict, requestedAt }
  for (const l of logs) {
    for (const r of l.data.results) {
      if (!r.reindexed) continue;
      tracked.set(r.url, {
        baselineCoverage: r.coverage,
        baselineVerdict:  r.indexStatus,
        requestedAt:      l.data.timestamp,
      });
    }
  }

  if (!tracked.size) {
    console.error('No reindexed URLs in reindex logs. Likely all were already indexed.');
    process.exit(0);
  }

  console.log(`\n=== efficacy check: ${tracked.size} URLs (across ${logs.length} reindex logs in last ${DAYS}d) ===\n`);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  const results = [];
  let recovered = 0, stillNotIndexed = 0, other = 0, errors = 0;

  let i = 0;
  for (const [url, base] of tracked) {
    i++;
    const short = url.replace('https://toolcalcs.com', '') || '/';
    process.stdout.write(`[${i}/${tracked.size}] ${short.padEnd(50)}  `);
    try {
      const ins = await sc.urlInspection.index.inspect({
        requestBody: { siteUrl: SITE_DOMAIN, inspectionUrl: url },
      });
      const idx = ins.data.inspectionResult?.indexStatusResult || {};
      const cur = { coverage: idx.coverageState, verdict: idx.verdict, lastCrawl: idx.lastCrawlTime };
      const wasIndexed = isIndexed(base.baselineCoverage, base.baselineVerdict);
      const nowIndexed = isIndexed(cur.coverage, cur.verdict);

      let transition;
      if (!wasIndexed && nowIndexed) { recovered++; transition = 'RECOVERED ✓'; }
      else if (!wasIndexed && !nowIndexed) {
        if (cur.coverage !== base.baselineCoverage) { other++; transition = `CHANGED (${cur.coverage})`; }
        else { stillNotIndexed++; transition = 'unchanged'; }
      } else { other++; transition = `now=${cur.coverage}`; }

      console.log(transition);
      results.push({ url, baseline: base, current: cur, transition });
    } catch (e) {
      errors++;
      console.log(`ERR: ${e.message.substring(0, 50)}`);
      results.push({ url, baseline: base, error: e.message });
      if (e.message.toLowerCase().includes('quota')) {
        console.log('\n⚠️  Quota exceeded — stopping');
        break;
      }
    }
    if (i < tracked.size) await sleep(1100);
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`  total tracked:           ${tracked.size}`);
  console.log(`  RECOVERED (✓ indexed):   ${recovered}`);
  console.log(`  still not indexed:       ${stillNotIndexed}`);
  console.log(`  changed (other state):   ${other}`);
  console.log(`  errors:                  ${errors}`);
  const rate = tracked.size ? (recovered / tracked.size * 100).toFixed(1) : 0;
  console.log(`  recovery rate:           ${rate}%`);

  if (recovered) {
    console.log('\n=== RECOVERED URLs ===');
    results.filter(r => r.transition === 'RECOVERED ✓').forEach(r => {
      console.log(`  ${r.url.replace('https://toolcalcs.com', '') || '/'}`);
    });
  }

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const file  = path.join(LOG_DIR, `efficacy-${today}.json`);
  fs.writeFileSync(file, JSON.stringify({
    runAt: new Date().toISOString(),
    window: { days: DAYS, reindexLogs: logs.map(l => l.file) },
    summary: { tracked: tracked.size, recovered, stillNotIndexed, other, errors, recoveryRatePct: parseFloat(rate) },
    results,
  }, null, 2));
  console.log(`\nsaved → ${file}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
