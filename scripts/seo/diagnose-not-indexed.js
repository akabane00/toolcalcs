#!/usr/bin/env node
/**
 * Diagnose "Crawled - currently not indexed" pages.
 *
 * For each URL:
 *   1. GSC URL Inspection API — full result (canonical, indexing state, crawl time, reasons)
 *   2. Live HTML fetch — extract meta robots, canonical, title, description, h1, word count, structured data, redirects
 *   3. Compare user_canonical vs google_canonical
 *   4. Surface anomalies (mismatched canonical, noindex slipped in, redirects, thin content, etc.)
 *
 * Output: logs/seo/diagnose-{YYYY-MM-DD}.json + readable stdout summary.
 *
 * Usage:
 *   node scripts/seo/diagnose-not-indexed.js                 # default 10 sample URLs
 *   node scripts/seo/diagnose-not-indexed.js --urls=path     # custom URL list (one per line)
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

// Default sample: mix of hub categories, flagship calculators, blogs, and a top performer
const DEFAULT_SAMPLE = [
  'https://toolcalcs.com/',                                          // control (currently indexed)
  'https://toolcalcs.com/financial-calculators/',                    // hub — not indexed
  'https://toolcalcs.com/health-calculators/',                       // hub — not indexed
  'https://toolcalcs.com/financial-calculators/mortgage-calculator/',// flagship calculator
  'https://toolcalcs.com/health-calculators/bmi-calculator/',        // flagship calculator
  'https://toolcalcs.com/blog/running-pace-guide/',                  // best-performing blog (13 imp)
  'https://toolcalcs.com/blog/profit-margin-guide/',                 // pos 1.0 in GSC
  'https://toolcalcs.com/blog/compound-interest-explained/',         // finance pillar
  'https://toolcalcs.com/blog/2026-federal-tax-brackets/',           // recent reindex target
  'https://toolcalcs.com/about/',                                    // E-E-A-T authority page
];

const args = process.argv.slice(2);
const arg  = (n, d = null) => {
  const a = args.find(x => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const URLS_FILE = arg('urls', null);

const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadUrls() {
  if (URLS_FILE && fs.existsSync(URLS_FILE)) {
    return fs.readFileSync(URLS_FILE, 'utf8')
      .split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  }
  return DEFAULT_SAMPLE;
}

async function inspectUrl(sc, url) {
  try {
    const res = await sc.urlInspection.index.inspect({
      requestBody: { siteUrl: SITE_DOMAIN, inspectionUrl: url, languageCode: 'en-US' },
    });
    const r   = res.data.inspectionResult || {};
    const idx = r.indexStatusResult || {};
    const mob = r.mobileUsabilityResult || {};
    const rch = r.richResultsResult || {};
    return {
      verdict: idx.verdict || null,
      coverageState: idx.coverageState || null,
      robotsTxtState: idx.robotsTxtState || null,
      indexingState: idx.indexingState || null,
      lastCrawlTime: idx.lastCrawlTime || null,
      pageFetchState: idx.pageFetchState || null,
      googleCanonical: idx.googleCanonical || null,
      userCanonical: idx.userCanonical || null,
      sitemap: idx.sitemap || null,
      referringUrls: idx.referringUrls || null,
      crawledAs: idx.crawledAs || null,
      mobileFriendly: mob.verdict || null,
      richResults: rch.verdict || null,
      raw: { idx },
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function fetchLive(url) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ToolcalcsBot/1.0)' },
    });
    const meta = {
      httpStatus: res.status,
      location: res.headers.get('location') || null,
      contentType: res.headers.get('content-type') || null,
      contentLength: res.headers.get('content-length') || null,
      cacheControl: res.headers.get('cache-control') || null,
      xRobotsTag: res.headers.get('x-robots-tag') || null,
      cfCacheStatus: res.headers.get('cf-cache-status') || null,
    };
    if (res.status >= 300 && res.status < 400) {
      return { ...meta, body: null };
    }
    const html = await res.text();

    // Helper: extract attribute value robustly. Match either double-quoted
    // value (apostrophes allowed inside) or single-quoted value. The naive
    // `[^"']+` pattern truncates at the first apostrophe even inside a
    // double-quoted attribute, which is wrong.
    const attrMatch = (re) => {
      const dq = html.match(new RegExp(`<meta[^>]+${re}[^>]+content="([^"]+)"`, 'i'));
      if (dq) return dq[1];
      const sq = html.match(new RegExp(`<meta[^>]+${re}[^>]+content='([^']+)'`, 'i'));
      return sq ? sq[1] : null;
    };
    const linkAttr = (rel, attr) => {
      const dq = html.match(new RegExp(`<link[^>]+rel="${rel}"[^>]+${attr}="([^"]+)"`, 'i')) ||
                 html.match(new RegExp(`<link[^>]+${attr}="([^"]+)"[^>]+rel="${rel}"`, 'i'));
      if (dq) return dq[1];
      const sq = html.match(new RegExp(`<link[^>]+rel='${rel}'[^>]+${attr}='([^']+)'`, 'i')) ||
                 html.match(new RegExp(`<link[^>]+${attr}='([^']+)'[^>]+rel='${rel}'`, 'i'));
      return sq ? sq[1] : null;
    };

    meta.metaRobots = attrMatch('name="robots"');
    meta.canonical  = linkAttr('canonical', 'href');

    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    meta.title = titleMatch ? titleMatch[1].trim() : null;
    meta.titleLen = meta.title ? meta.title.length : 0;

    // Meta description
    meta.description = attrMatch('name="description"');
    meta.descriptionLen = meta.description ? meta.description.length : 0;

    // H1
    const h1Match = html.match(/<h1[^>]*>(?:<[^>]+>)*([^<]+)/i);
    meta.h1 = h1Match ? h1Match[1].trim() : null;

    // Hreflang
    const hreflangs = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["']/gi)].map(m => m[1]);
    meta.hreflangs = hreflangs.length ? hreflangs : null;

    // Strip HTML and count words in <main> if present
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const bodyContent = mainMatch ? mainMatch[1] : html;
    const text = bodyContent
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    meta.bodyWordCount = text.split(/\s+/).filter(Boolean).length;
    meta.htmlBytes = html.length;

    // Structured data count
    const ldJson = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    meta.ldJsonBlocks = ldJson.length;
    meta.ldJsonTypes = [];
    for (const m of ldJson) {
      try {
        const data = JSON.parse(m[1].trim());
        const types = Array.isArray(data) ? data.map(d => d['@type']).flat() : [data['@type']].flat();
        meta.ldJsonTypes.push(...types.filter(Boolean));
      } catch {}
    }

    return meta;
  } catch (err) {
    return { error: err.message };
  }
}

function classify(insp, live) {
  const issues = [];

  if (live.error) issues.push(`LIVE_ERROR: ${live.error}`);
  if (live.httpStatus >= 300 && live.httpStatus < 400) issues.push(`REDIRECT_${live.httpStatus} → ${live.location}`);
  if (live.httpStatus >= 400) issues.push(`HTTP_${live.httpStatus}`);

  if (live.metaRobots && /noindex/i.test(live.metaRobots)) issues.push(`META_NOINDEX (${live.metaRobots})`);
  if (live.xRobotsTag && /noindex/i.test(live.xRobotsTag)) issues.push(`HEADER_NOINDEX (${live.xRobotsTag})`);

  // Canonical mismatch — user said X, Google chose Y
  if (insp.userCanonical && insp.googleCanonical &&
      insp.userCanonical !== insp.googleCanonical) {
    issues.push(`CANONICAL_MISMATCH user=${insp.userCanonical} google=${insp.googleCanonical}`);
  }
  // Live canonical points elsewhere
  const reqUrl = live.canonical || null;
  if (reqUrl) {
    try {
      const u = new URL(reqUrl);
      const insUrl = new URL(insp.raw?.idx?.inspectionUrl || 'https://toolcalcs.com/');
      // We can't reliably know the original URL here, skip for now
    } catch {}
  }

  if (live.bodyWordCount !== undefined && live.bodyWordCount < 200) issues.push(`THIN_CONTENT (${live.bodyWordCount}w)`);
  if (!live.title) issues.push('NO_TITLE');
  if (live.titleLen && live.titleLen > 70) issues.push(`TITLE_TOO_LONG (${live.titleLen})`);
  if (!live.description) issues.push('NO_META_DESCRIPTION');
  if (live.descriptionLen && live.descriptionLen > 170) issues.push(`DESCRIPTION_TOO_LONG (${live.descriptionLen})`);
  if (!live.h1) issues.push('NO_H1');
  if (live.ldJsonBlocks === 0) issues.push('NO_STRUCTURED_DATA');

  // GSC-side signals
  if (insp.indexingState && insp.indexingState !== 'INDEXING_ALLOWED') issues.push(`GSC_INDEXING_STATE=${insp.indexingState}`);
  if (insp.robotsTxtState && insp.robotsTxtState !== 'ALLOWED') issues.push(`GSC_ROBOTS_STATE=${insp.robotsTxtState}`);
  if (insp.pageFetchState && insp.pageFetchState !== 'SUCCESSFUL') issues.push(`GSC_FETCH_STATE=${insp.pageFetchState}`);

  return issues;
}

async function main() {
  const urls = loadUrls();
  console.log(`\n=== diagnose-not-indexed (${urls.length} URLs) ===\n`);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`  [${i + 1}/${urls.length}] ${url.replace('https://toolcalcs.com', '') || '/'}...`);
    const insp = await inspectUrl(sc, url);
    const live = await fetchLive(url);
    const issues = classify(insp, live);
    results.push({ url, insp, live, issues });
    process.stdout.write(` ${insp.coverageState || insp.error || 'OK'}  [${issues.length} issues]\n`);
    if (i < urls.length - 1) await sleep(1100);
  }

  // Save full log
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const today   = new Date().toISOString().slice(0, 10);
  const logFile = path.join(LOG_DIR, `diagnose-${today}.json`);
  fs.writeFileSync(logFile, JSON.stringify({ runAt: new Date().toISOString(), results }, null, 2));

  // Print summary table
  console.log('\n=== SUMMARY ===\n');
  for (const r of results) {
    const p = r.url.replace('https://toolcalcs.com', '') || '/';
    console.log(`${p}`);
    console.log(`  GSC coverage:       ${r.insp.coverageState || '?'}`);
    console.log(`  GSC verdict:        ${r.insp.verdict || '?'}`);
    console.log(`  GSC indexing state: ${r.insp.indexingState || '?'}`);
    console.log(`  GSC robots state:   ${r.insp.robotsTxtState || '?'}`);
    console.log(`  GSC fetch state:    ${r.insp.pageFetchState || '?'}`);
    console.log(`  user canonical:     ${r.insp.userCanonical || '(none)'}`);
    console.log(`  google canonical:   ${r.insp.googleCanonical || '(none)'}`);
    console.log(`  last crawled:       ${r.insp.lastCrawlTime || '(never)'}`);
    console.log(`  crawled as:         ${r.insp.crawledAs || '?'}`);
    console.log(`  GSC sitemap source: ${(r.insp.sitemap || []).join(', ') || '(none)'}`);
    console.log(`  ── live page ──`);
    console.log(`  HTTP status:        ${r.live.httpStatus}${r.live.location ? ' → ' + r.live.location : ''}`);
    console.log(`  meta robots:        ${r.live.metaRobots || '(none)'}`);
    console.log(`  X-Robots-Tag:       ${r.live.xRobotsTag || '(none)'}`);
    console.log(`  live canonical:     ${r.live.canonical || '(none)'}`);
    console.log(`  title (${r.live.titleLen || 0}):       ${(r.live.title || '').substring(0, 80)}`);
    console.log(`  description (${r.live.descriptionLen || 0}): ${(r.live.description || '').substring(0, 80)}`);
    console.log(`  h1:                 ${(r.live.h1 || '').substring(0, 80)}`);
    console.log(`  body word count:    ${r.live.bodyWordCount || 0}`);
    console.log(`  html bytes:         ${r.live.htmlBytes || 0}`);
    console.log(`  structured data:    ${r.live.ldJsonBlocks || 0} blocks (${(r.live.ldJsonTypes || []).join(', ')})`);
    console.log(`  cf-cache-status:    ${r.live.cfCacheStatus || '(none)'}`);
    if (r.issues.length) {
      console.log(`  ⚠️  ISSUES:`);
      r.issues.forEach(iss => console.log(`     - ${iss}`));
    } else {
      console.log(`  ✓ no issues detected`);
    }
    console.log();
  }

  console.log(`saved → ${logFile}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
