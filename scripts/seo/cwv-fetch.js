#!/usr/bin/env node
/**
 * Core Web Vitals snapshot via PageSpeed Insights API (no key needed for low volume).
 *
 * For each sample URL collects:
 *   - lab metrics (Lighthouse): LCP, CLS, FID, FCP, TBT, SI, performance score
 *   - field metrics (CrUX): LCP, CLS, INP, FCP, TTFB — only available for URLs with traffic
 *   - audits: render-blocking resources, unused JS, image opts, etc. (top issues)
 *
 * Strategy: ~10 sample URLs daily, alternating between hubs, flagship calcs, and blogs.
 *
 * Usage:
 *   node scripts/seo/cwv-fetch.js                    # default sample (10 URLs, mobile + desktop)
 *   node scripts/seo/cwv-fetch.js --mobile-only      # mobile strategy only
 *   node scripts/seo/cwv-fetch.js --urls=path        # custom URL list
 *
 * Output: logs/seo/cwv-{YYYY-MM-DD}.json with full data, stdout summary table.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.join(__dirname, '..', '..');
const LOG_DIR    = path.join(ROOT, 'logs', 'seo');

const DEFAULT_SAMPLE = [
  'https://toolcalcs.com/',
  'https://toolcalcs.com/financial-calculators/',
  'https://toolcalcs.com/health-calculators/',
  'https://toolcalcs.com/math-calculators/',
  'https://toolcalcs.com/about/',
  'https://toolcalcs.com/financial-calculators/mortgage-calculator/',
  'https://toolcalcs.com/health-calculators/bmi-calculator/',
  'https://toolcalcs.com/blog/running-pace-guide/',
  'https://toolcalcs.com/blog/2026-federal-tax-brackets/',
  'https://toolcalcs.com/blog/compound-interest-explained/',
];

const args = process.argv.slice(2);
const arg = (n, d = null) => {
  const a = args.find(x => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : d;
};
const URLS_FILE   = arg('urls', null);
const MOBILE_ONLY = args.includes('--mobile-only');
// PSI without API key is rate-limited ~1 req/sec; with key the limit is far
// higher. Use 5s spacing when keyless, 1s when keyed.
const REQ_DELAY_MS = process.env.PSI_API_KEY ? 1000 : 5000;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadUrls() {
  if (URLS_FILE && fs.existsSync(URLS_FILE)) {
    return fs.readFileSync(URLS_FILE, 'utf8')
      .split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  }
  return DEFAULT_SAMPLE;
}

async function psi(url, strategy) {
  // PSI without API key has a very tight rate limit (~1 req/sec per IP).
  // Optionally pass PSI_API_KEY via env to use Google API key quota
  // (25k requests/day, much higher per-second).
  const key = process.env.PSI_API_KEY;
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance${key ? `&key=${key}` : ''}`;
  const res = await fetch(api);
  if (!res.ok) throw new Error(`PSI HTTP ${res.status}`);
  const data = await res.json();
  const lh = data.lighthouseResult || {};
  const audits = lh.audits || {};
  const cat = (lh.categories && lh.categories.performance) || {};
  const crux = data.loadingExperience?.metrics || {};
  return {
    performanceScore: cat.score !== undefined ? Math.round(cat.score * 100) : null,
    lab: {
      lcp: audits['largest-contentful-paint']?.numericValue,
      cls: audits['cumulative-layout-shift']?.numericValue,
      tbt: audits['total-blocking-time']?.numericValue,
      fcp: audits['first-contentful-paint']?.numericValue,
      si:  audits['speed-index']?.numericValue,
      tti: audits['interactive']?.numericValue,
    },
    field: {
      lcp:  crux.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
      cls:  crux.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,
      inp:  crux.INTERACTION_TO_NEXT_PAINT?.percentile,
      fcp:  crux.FIRST_CONTENTFUL_PAINT_MS?.percentile,
      ttfb: crux.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile,
    },
    issues: {
      renderBlocking:    audits['render-blocking-resources']?.details?.items?.length || 0,
      unusedCss:         audits['unused-css-rules']?.details?.items?.length || 0,
      unusedJs:          audits['unused-javascript']?.details?.items?.length || 0,
      legacyJs:          audits['legacy-javascript']?.details?.items?.length || 0,
      imageSizing:       audits['unsized-images']?.details?.items?.length || 0,
      offscreenImages:   audits['offscreen-images']?.details?.items?.length || 0,
    },
  };
}

function classify(lab, field) {
  const issues = [];
  if (lab.lcp > 4000) issues.push(`LAB_LCP_POOR (${(lab.lcp/1000).toFixed(1)}s)`);
  else if (lab.lcp > 2500) issues.push(`LAB_LCP_WARN (${(lab.lcp/1000).toFixed(1)}s)`);
  if (lab.cls > 0.25) issues.push(`LAB_CLS_POOR (${lab.cls.toFixed(2)})`);
  else if (lab.cls > 0.1) issues.push(`LAB_CLS_WARN (${lab.cls.toFixed(2)})`);
  if (lab.tbt > 600) issues.push(`LAB_TBT_POOR (${Math.round(lab.tbt)}ms)`);

  if (field.lcp > 4000) issues.push(`FIELD_LCP_POOR (${(field.lcp/1000).toFixed(1)}s)`);
  if (field.cls > 25) issues.push(`FIELD_CLS_POOR (${(field.cls/100).toFixed(2)})`); // CrUX returns CLS × 100
  if (field.inp > 500) issues.push(`FIELD_INP_POOR (${field.inp}ms)`);

  return issues;
}

async function main() {
  const urls = loadUrls();
  console.log(`\n=== CWV snapshot (${urls.length} URLs, ${MOBILE_ONLY ? 'mobile only' : 'mobile + desktop'}) ===\n`);

  const strategies = MOBILE_ONLY ? ['mobile'] : ['mobile', 'desktop'];
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const short = url.replace('https://toolcalcs.com', '') || '/';
    process.stdout.write(`[${i + 1}/${urls.length}] ${short}\n`);
    const r = { url };
    for (const strat of strategies) {
      try {
        const psiData = await psi(url, strat);
        r[strat] = psiData;
        r[strat].issues = classify(psiData.lab, psiData.field);
        const score = psiData.performanceScore;
        const lcp = psiData.lab.lcp ? `LCP=${(psiData.lab.lcp/1000).toFixed(1)}s` : 'LCP=?';
        const cls = psiData.lab.cls !== undefined ? `CLS=${psiData.lab.cls.toFixed(3)}` : 'CLS=?';
        console.log(`  ${strat.padEnd(7)} score=${String(score).padStart(3)}  ${lcp.padEnd(11)}  ${cls.padEnd(11)}  issues=${psiData.issues.renderBlocking + psiData.issues.unusedJs + psiData.issues.legacyJs}`);
      } catch (e) {
        r[strat] = { error: e.message };
        console.log(`  ${strat} ERROR: ${e.message.substring(0, 60)}`);
      }
      // Rate-limit gap between requests (PSI keyless quota is tight)
      await sleep(REQ_DELAY_MS);
    }
    results.push(r);
  }

  // Aggregate
  const agg = { mobile: { scores: [], lcps: [], clss: [] }, desktop: { scores: [], lcps: [], clss: [] } };
  for (const r of results) {
    for (const strat of strategies) {
      if (r[strat]?.performanceScore !== null && r[strat]?.performanceScore !== undefined) {
        agg[strat].scores.push(r[strat].performanceScore);
      }
      if (r[strat]?.lab?.lcp) agg[strat].lcps.push(r[strat].lab.lcp);
      if (r[strat]?.lab?.cls !== undefined) agg[strat].clss.push(r[strat].lab.cls);
    }
  }
  const avg = a => a.length ? a.reduce((s,v)=>s+v,0) / a.length : 0;
  const median = a => { if (!a.length) return 0; const s = [...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };

  console.log('\n=== AGGREGATES ===');
  for (const strat of strategies) {
    const s = agg[strat];
    console.log(`${strat}: avg score=${avg(s.scores).toFixed(0)} median LCP=${(median(s.lcps)/1000).toFixed(2)}s median CLS=${median(s.clss).toFixed(3)}`);
  }

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const file  = path.join(LOG_DIR, `cwv-${today}.json`);
  fs.writeFileSync(file, JSON.stringify({
    runAt: new Date().toISOString(),
    urls: urls.length,
    strategies,
    aggregates: agg,
    results,
  }, null, 2));
  console.log(`\nsaved → ${file}`);
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
