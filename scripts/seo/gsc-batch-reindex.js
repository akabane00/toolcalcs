#!/usr/bin/env node
/**
 * GSC Indexing API automation for toolcalcs.com
 *
 * Flow:
 *   1. Pick URLs by priority (queue file override OR sitemap rotation)
 *   2. Per URL: URL Inspection API (current state)
 *   3. If not indexed: Indexing API publish (URL_UPDATED)
 *   4. Save run log to logs/seo/reindex-{YYYY-MM-DD}.json
 *
 * URL source priority:
 *   - If `data/reindex-queue.txt` exists: use it (one URL per line, # = comment)
 *   - Else: P1 (homepage + 19 hub indexes) + P3 (sitemap rotation by offset)
 *
 * Daily API quotas:
 *   - URL Inspection: 2000/property/day
 *   - Indexing API:   200/key/day
 *
 * Usage:
 *   node scripts/seo/gsc-batch-reindex.js                # default 50 URLs
 *   node scripts/seo/gsc-batch-reindex.js --limit=100
 *   node scripts/seo/gsc-batch-reindex.js --inspect-only # inspection only, no reindex
 *   node scripts/seo/gsc-batch-reindex.js --offset=200   # sitemap rotation cursor
 *   node scripts/seo/gsc-batch-reindex.js --queue=path   # custom queue file
 *
 * Pre-reqs:
 *   - Service account search-console-reader@river-overview-384807.iam.gserviceaccount.com
 *     added as Owner on toolcalcs.com GSC property
 *   - Web Search Indexing API enabled in river-overview-384807 Cloud project
 */

import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
// ROOT defaults to the script's parent-of-parent directory, but can be
// overridden via TOOLCALCS_ROOT env var (loaded from .env). This lets us run
// scripts from a worktree while logs / data still resolve to the main repo —
// matching where Task Scheduler runs the production daily campaign.
const ROOT       = process.env.TOOLCALCS_ROOT
  ? path.resolve(process.env.TOOLCALCS_ROOT)
  : path.resolve(__dirname, '..', '..');

// ── Config ──
// Credential path. Defaults to a stable local copy under the user profile so
// the automation does not depend on the x:\ RaiDrive mount (a jupjupday.kr
// network drive that was unrelated to toolcalcs and occasionally unmounted at
// the 04:00 trigger). Override with GSC_CREDENTIAL_PATH in .env if needed.
const KEY_PATH      = process.env.GSC_CREDENTIAL_PATH
  || 'C:\\Users\\master\\.gsc-credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN   = 'sc-domain:toolcalcs.com';
const SITE_URL_ALT  = 'https://toolcalcs.com/';
const SITEMAP_INDEX = 'https://toolcalcs.com/sitemap-index.xml';
const LOG_DIR       = path.join(ROOT, 'logs', 'seo');
const QUEUE_DEFAULT = path.join(ROOT, 'data', 'reindex-queue.txt');

// Always-include P1 URLs (homepage + 15 calculator categories + 4 hub indexes)
const P1_URLS = [
  'https://toolcalcs.com/',
  'https://toolcalcs.com/financial-calculators/',
  'https://toolcalcs.com/health-calculators/',
  'https://toolcalcs.com/math-calculators/',
  'https://toolcalcs.com/date-time-calculators/',
  'https://toolcalcs.com/conversion-calculators/',
  'https://toolcalcs.com/everyday-calculators/',
  'https://toolcalcs.com/construction-calculators/',
  'https://toolcalcs.com/astrology-calculators/',
  'https://toolcalcs.com/insurance-calculators/',
  'https://toolcalcs.com/tax-calculators/',
  'https://toolcalcs.com/real-estate-calculators/',
  'https://toolcalcs.com/business-calculators/',
  'https://toolcalcs.com/education-calculators/',
  'https://toolcalcs.com/automotive-calculators/',
  'https://toolcalcs.com/freelance-calculators/',
  'https://toolcalcs.com/blog/',
  'https://toolcalcs.com/worksheets/',
  'https://toolcalcs.com/tools/',
  'https://toolcalcs.com/test/',
];

// ── CLI ──
const args = process.argv.slice(2);
const arg  = (n, d = null) => {
  const a = args.find(x => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const LIMIT        = parseInt(arg('limit', '50'), 10);
const OFFSET       = parseInt(arg('offset', '0'), 10);
const INSPECT_ONLY = args.includes('--inspect-only');
const QUEUE_PATH   = arg('queue', QUEUE_DEFAULT);
const REQ_DELAY_MS = 1100;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── URL collection ──

function readQueueFile(p) {
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf8');
  return raw
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));
}

async function fetchSitemapUrls() {
  // Fetch sitemap-index.xml, follow each <sitemap><loc>, collect all <url><loc>
  const indexRes = await fetch(SITEMAP_INDEX);
  if (!indexRes.ok) throw new Error(`sitemap-index fetch failed: HTTP ${indexRes.status}`);
  const indexXml = await indexRes.text();
  const shardUrls = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

  const all = [];
  for (const shard of shardUrls) {
    const r = await fetch(shard);
    if (!r.ok) {
      console.warn(`  [warn] shard fetch failed (HTTP ${r.status}): ${shard}`);
      continue;
    }
    const xml = await r.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
    all.push(...locs);
  }
  return all;
}

function rotate(arr, offset) {
  if (!arr.length) return arr;
  const k = ((offset % arr.length) + arr.length) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

async function pickUrls() {
  // 1) Queue file override
  const queue = readQueueFile(QUEUE_PATH);
  if (queue && queue.length) {
    console.log(`[urls] queue file → ${queue.length} URLs from ${QUEUE_PATH}`);
    return queue.slice(0, LIMIT).map((url, i) => ({ url, priority: i < 5 ? 1 : 2 }));
  }

  // 2) P1 always-include + P3 sitemap rotation
  console.log(`[urls] no queue file. Using P1 hubs + sitemap rotation (offset=${OFFSET})`);
  const sitemap = await fetchSitemapUrls();
  console.log(`  sitemap → ${sitemap.length} URLs`);

  const seen = new Set();
  const out = [];

  // P1: hub URLs (always)
  for (const u of P1_URLS) {
    if (seen.has(u)) continue;
    out.push({ url: u, priority: 1 });
    seen.add(u);
    if (out.length >= LIMIT) return out;
  }

  // P3: sitemap rotation, skip already-included
  const rotated = rotate(sitemap, OFFSET);
  for (const u of rotated) {
    if (seen.has(u)) continue;
    out.push({ url: u, priority: 3 });
    seen.add(u);
    if (out.length >= LIMIT) break;
  }
  return out;
}

// ── Main ──

async function main() {
  console.log(`\n=== toolcalcs.com GSC batch reindex ===`);
  console.log(`  limit=${LIMIT}  inspect_only=${INSPECT_ONLY}  offset=${OFFSET}`);

  // Auth (multi-scope: inspection + indexing)
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/indexing',
    ],
  });
  const client   = await auth.getClient();
  const sc       = google.searchconsole({ version: 'v1', auth: client });
  const indexing = google.indexing({ version: 'v3', auth: client });

  // Resolve siteUrl (domain property preferred, fall back to URL prefix)
  let siteUrl = SITE_DOMAIN;
  try {
    await sc.searchanalytics.query({
      siteUrl: SITE_DOMAIN,
      requestBody: { startDate: '2026-04-01', endDate: '2026-04-01', rowLimit: 1 },
    });
  } catch {
    siteUrl = SITE_URL_ALT;
    console.log(`  [info] domain property failed, falling back to ${siteUrl}`);
  }
  console.log(`  siteUrl=${siteUrl}\n`);

  const urls = await pickUrls();
  console.log(`  → ${urls.length} URLs to process (P1=${urls.filter(u => u.priority === 1).length}, P3=${urls.filter(u => u.priority === 3).length})\n`);

  if (!urls.length) { console.log('No URLs to process.'); return; }

  const results = [];
  let inspectQuota = 0, indexQuota = 0, indexed = 0, notIndexed = 0, reindexed = 0, errors = 0;

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    const result = { priority: u.priority, url: u.url };
    process.stdout.write(`  [${String(i + 1).padStart(3)}/${urls.length}] P${u.priority}  ${u.url.replace('https://toolcalcs.com', '').padEnd(50)}  `);

    try {
      const ins = await sc.urlInspection.index.inspect({
        requestBody: { siteUrl, inspectionUrl: u.url },
      });
      inspectQuota++;
      const v   = ins.data.inspectionResult?.indexStatusResult?.verdict;
      const cov = ins.data.inspectionResult?.indexStatusResult?.coverageState;
      result.indexStatus = v || 'UNKNOWN';
      result.coverage    = cov || '';
      // GSC verdict PASS = indexed. coverage strings: "Submitted and indexed",
      // "URL is on Google" = good. Any "not indexed" / "Crawled - currently not
      // indexed" / "Discovered" = NOT indexed even if "indexed" substring matches.
      const isIndexed = v === 'PASS' && !/not indexed/i.test(cov || '');
      if (isIndexed) indexed++; else notIndexed++;
      process.stdout.write(`${isIndexed ? '✓' : '✗'} ${(cov || v || '').substring(0, 28).padEnd(28)} `);

      if (!isIndexed && !INSPECT_ONLY && indexQuota < 180) {
        try {
          await indexing.urlNotifications.publish({
            requestBody: { url: u.url, type: 'URL_UPDATED' },
          });
          indexQuota++;
          reindexed++;
          result.reindexed = true;
          process.stdout.write('→ reindex\n');
        } catch (re) {
          result.reindexError = re.message;
          process.stdout.write(`→ fail: ${re.message.substring(0, 40)}\n`);
        }
      } else {
        process.stdout.write('\n');
      }
    } catch (e) {
      errors++;
      result.error = e.message;
      process.stdout.write(`ERR: ${e.message.substring(0, 60)}\n`);
      if (e.message.toLowerCase().includes('quota')) {
        console.log('\n⚠️  Quota exceeded — stopping');
        break;
      }
    }

    results.push(result);
    if (i < urls.length - 1) await sleep(REQ_DELAY_MS);
  }

  // Save log
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const today   = new Date().toISOString().slice(0, 10);
  const logFile = path.join(LOG_DIR, `reindex-${today}.json`);
  const summary = {
    timestamp: new Date().toISOString(),
    siteUrl,
    args: { limit: LIMIT, offset: OFFSET, inspect_only: INSPECT_ONLY, queue: QUEUE_PATH },
    totals: { processed: results.length, inspectQuotaUsed: inspectQuota, indexQuotaUsed: indexQuota, indexed, notIndexed, reindexed, errors },
    results,
  };
  fs.writeFileSync(logFile, JSON.stringify(summary, null, 2));

  console.log('\n=== SUMMARY ===');
  console.log(`  processed:       ${results.length}`);
  console.log(`  already indexed: ${indexed}`);
  console.log(`  not indexed:     ${notIndexed}`);
  console.log(`  reindex queued:  ${reindexed}${INSPECT_ONLY ? ' (inspect-only)' : ''}`);
  console.log(`  errors:          ${errors}`);
  console.log(`  inspect quota:   ${inspectQuota}/2000`);
  console.log(`  indexing quota:  ${indexQuota}/200`);
  console.log(`  log:             ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
