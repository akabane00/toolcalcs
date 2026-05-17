#!/usr/bin/env node
/**
 * GSC Search Analytics + sitemap status snapshot for toolcalcs.com
 *
 * Reports:
 *   - 28-day totals (clicks, impressions, CTR, avg position)
 *   - Daily trend (last 14 days)
 *   - Top 25 queries by impressions
 *   - Top 25 pages by impressions
 *   - Device + country breakdown
 *   - Per-category page performance (calculator/blog/worksheet/tools)
 *   - Sitemap submission/index status
 *
 * Saves snapshot to logs/seo/gsc-fetch-{YYYY-MM-DD}.json
 *
 * Usage:
 *   node scripts/seo/gsc-fetch.js          # 28-day default
 *   node scripts/seo/gsc-fetch.js 90       # 90-day window
 *   node scripts/seo/gsc-fetch.js 7        # 7-day window
 *
 * Pre-reqs: same as gsc-batch-reindex.js (service account as Owner)
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

const KEY_PATH     = 'x:\\www\\storage\\credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN  = 'sc-domain:toolcalcs.com';
const SITE_URL_ALT = 'https://toolcalcs.com/';
const LOG_DIR      = path.join(ROOT, 'logs', 'seo');
const DAYS         = parseInt(process.argv[2] || '28', 10);

const CATEGORIES = [
  'financial-calculators', 'health-calculators', 'math-calculators',
  'date-time-calculators', 'conversion-calculators', 'everyday-calculators',
  'construction-calculators', 'astrology-calculators', 'insurance-calculators',
  'tax-calculators', 'real-estate-calculators', 'business-calculators',
  'education-calculators', 'automotive-calculators', 'freelance-calculators',
];

function fmt(d) { return d.toISOString().slice(0, 10); }
const today = new Date();
const end   = new Date(today.getTime() - 2 * 864e5); // GSC has ~2-day lag
const start = new Date(end.getTime() - (DAYS - 1) * 864e5);

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  // List verified sites
  console.log('=== Verified GSC properties ===');
  try {
    const list = await sc.sites.list();
    (list.data.siteEntry || []).forEach(s => console.log(`  - ${s.siteUrl}  [${s.permissionLevel}]`));
  } catch (e) { console.error('sites.list error:', e.message); }

  // Resolve active siteUrl
  let activeSite = SITE_DOMAIN;
  try {
    await sc.searchanalytics.query({
      siteUrl: SITE_DOMAIN,
      requestBody: { startDate: fmt(start), endDate: fmt(end), rowLimit: 1 },
    });
  } catch {
    activeSite = SITE_URL_ALT;
    console.log(`  [info] domain property not accessible, using ${activeSite}`);
  }
  console.log(`\n[period] ${fmt(start)} ~ ${fmt(end)} (${DAYS}d) on ${activeSite}\n`);

  async function q(dimensions, rowLimit = 25, filters = null) {
    const body = { startDate: fmt(start), endDate: fmt(end), dimensions, rowLimit };
    if (filters) body.dimensionFilterGroups = [{ filters }];
    const res = await sc.searchanalytics.query({ siteUrl: activeSite, requestBody: body });
    return res.data.rows || [];
  }

  const snapshot = { runAt: new Date().toISOString(), siteUrl: activeSite, period: { start: fmt(start), end: fmt(end), days: DAYS } };

  // 1) Totals
  const total = await q([], 1);
  if (total.length) {
    const r = total[0];
    snapshot.totals = { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position };
    console.log('=== TOTAL ===');
    console.log(`  clicks=${r.clicks}  impressions=${r.impressions}  CTR=${(r.ctr*100).toFixed(2)}%  avgPos=${r.position.toFixed(2)}\n`);
  }

  // 2) Daily trend (last 14)
  const daily = await q(['date'], 1000);
  snapshot.daily = daily.map(r => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
  console.log('=== DAILY (last 14) ===');
  daily.slice(-14).forEach(r => {
    console.log(`  ${r.keys[0]}  clk=${String(r.clicks).padStart(3)}  imp=${String(r.impressions).padStart(5)}  CTR=${(r.ctr*100).toFixed(1).padStart(5)}%  pos=${r.position.toFixed(1)}`);
  });

  // 3) Top queries
  console.log('\n=== TOP 25 QUERIES (by impressions) ===');
  const queries = await q(['query'], 25);
  queries.sort((a,b) => b.impressions - a.impressions);
  snapshot.topQueries = queries.map(r => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
  queries.forEach((r, i) => {
    console.log(`  ${String(i+1).padStart(2)}. imp=${String(r.impressions).padStart(4)} clk=${String(r.clicks).padStart(3)} pos=${r.position.toFixed(1).padStart(5)}  ${r.keys[0]}`);
  });

  // 4) Top pages
  console.log('\n=== TOP 25 PAGES (by impressions) ===');
  const pages = await q(['page'], 25);
  pages.sort((a,b) => b.impressions - a.impressions);
  snapshot.topPages = pages.map(r => ({ url: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
  pages.forEach((r, i) => {
    const url = r.keys[0].replace('https://toolcalcs.com', '');
    console.log(`  ${String(i+1).padStart(2)}. imp=${String(r.impressions).padStart(4)} clk=${String(r.clicks).padStart(3)} pos=${r.position.toFixed(1).padStart(5)}  ${url}`);
  });

  // 5) Devices
  console.log('\n=== DEVICE ===');
  const devices = await q(['device'], 10);
  snapshot.devices = devices.map(r => ({ device: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
  devices.forEach(r => {
    console.log(`  ${r.keys[0].padEnd(8)}  clk=${r.clicks}  imp=${r.impressions}  CTR=${(r.ctr*100).toFixed(2)}%  pos=${r.position.toFixed(1)}`);
  });

  // 6) Countries (top 10)
  console.log('\n=== COUNTRY (top 10) ===');
  const countries = await q(['country'], 10);
  snapshot.countries = countries.map(r => ({ country: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position }));
  countries.forEach(r => {
    console.log(`  ${r.keys[0]}  clk=${r.clicks}  imp=${r.impressions}  pos=${r.position.toFixed(1)}`);
  });

  // 7) Per-category performance (totals across each /xxx-calculators/ path)
  console.log('\n=== PER-CATEGORY (impressions) ===');
  snapshot.byCategory = {};
  for (const cat of CATEGORIES) {
    const rows = await q(['page'], 50, [{ dimension: 'page', operator: 'contains', expression: `/${cat}/` }]);
    if (!rows.length) continue;
    const tot = rows.reduce((acc, r) => {
      acc.clicks += r.clicks; acc.impressions += r.impressions; return acc;
    }, { clicks: 0, impressions: 0 });
    snapshot.byCategory[cat] = { clicks: tot.clicks, impressions: tot.impressions, pageCount: rows.length };
    console.log(`  ${cat.padEnd(26)}  pages=${String(rows.length).padStart(3)}  imp=${String(tot.impressions).padStart(5)}  clk=${tot.clicks}`);
  }

  // 8) Blog summary
  console.log('\n=== BLOG ===');
  const blogPages = await q(['page'], 500, [{ dimension: 'page', operator: 'contains', expression: '/blog/' }]);
  const blogTotals = blogPages.reduce((a, r) => { a.clicks += r.clicks; a.impressions += r.impressions; return a; }, { clicks: 0, impressions: 0 });
  snapshot.blog = { pageCount: blogPages.length, clicks: blogTotals.clicks, impressions: blogTotals.impressions };
  console.log(`  /blog/  pages=${blogPages.length}  imp=${blogTotals.impressions}  clk=${blogTotals.clicks}`);

  // 9) Worksheets / tools / test summaries
  for (const seg of ['worksheets', 'tools', 'test']) {
    const rows = await q(['page'], 200, [{ dimension: 'page', operator: 'contains', expression: `/${seg}/` }]);
    const t = rows.reduce((a, r) => { a.clicks += r.clicks; a.impressions += r.impressions; return a; }, { clicks: 0, impressions: 0 });
    snapshot[seg] = { pageCount: rows.length, clicks: t.clicks, impressions: t.impressions };
    console.log(`  /${seg}/  pages=${rows.length}  imp=${t.impressions}  clk=${t.clicks}`);
  }

  // 10) Sitemap status
  try {
    const sm = await sc.sitemaps.list({ siteUrl: activeSite });
    console.log('\n=== SITEMAPS ===');
    snapshot.sitemaps = (sm.data.sitemap || []).map(s => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      lastDownloaded: s.lastDownloaded,
      isPending: s.isPending,
      warnings: s.warnings,
      errors: s.errors,
      contents: s.contents || [],
    }));
    snapshot.sitemaps.forEach(s => {
      console.log(`  ${s.path}`);
      console.log(`    lastSubmitted=${s.lastSubmitted}  lastDownloaded=${s.lastDownloaded}`);
      console.log(`    isPending=${s.isPending}  warnings=${s.warnings}  errors=${s.errors}`);
      s.contents.forEach(c => console.log(`    ${c.type}: submitted=${c.submitted} indexed=${c.indexed}`));
    });
  } catch (e) { console.error('sitemaps error:', e.message); }

  // Save snapshot
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `gsc-fetch-${fmt(today)}.json`);
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2));
  console.log(`\nsaved → ${file}`);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
