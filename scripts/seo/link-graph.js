#!/usr/bin/env node
/**
 * Internal link graph diagnostic.
 *
 * Parses all built HTML in dist/ to construct a directed graph of internal
 * links. Reports:
 *   - orphan pages (no incoming internal links)
 *   - dead-end pages (no outgoing internal links to other content)
 *   - weak clusters (low in-degree among related pages)
 *   - per-category hub coverage (does each category index link to every child?)
 *
 * Run AFTER `npm run build` so dist/ is fresh.
 *
 * Usage:
 *   node scripts/seo/link-graph.js              # default — needs dist/ folder
 *   node scripts/seo/link-graph.js --src=src    # parse .astro source instead
 *                                                 (less accurate, includes dynamic links)
 *
 * Output: logs/seo/link-graph-{YYYY-MM-DD}.json + readable summary.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.join(__dirname, '..', '..');
const LOG_DIR    = path.join(ROOT, 'logs', 'seo');

const args = process.argv.slice(2);
const SRC_MODE = args.includes('--src');
const SCAN_DIR = SRC_MODE ? path.join(ROOT, 'src') : path.join(ROOT, 'dist');
const SCAN_EXT = SRC_MODE ? '.astro' : '.html';

// Skip these route prefixes (programmatic noindex pages aren't part of the
// indexable graph but they DO add internal-link noise; keep them out)
const SKIP_PREFIXES = [
  '/mortgage/', '/bmi/', '/loan/', '/savings/', '/down-payment/',
  '/paycheck/', '/macro/', '/data-convert/', '/pace/',
  '/due-date/', '/math/', '/percentage/', '/cooking/', '/compound-interest/',
  '/convert/', '/salary/', '/days-until/', '/days-ago/',
  '/days-from-now/', '/zodiac/', '/angel-number/', '/grade/', '/percent-off/',
  '/fraction/', '/what-percent/', '/auto-loan/', '/decimal-to-fraction/',
  '/times-tables/', '/factors-of/', '/time-convert/', '/tip/',
  '/temperature/', '/born-in/', '/time-zone/', '/how-many/', '/random/',
  // Re-promoted but still high-volume:
  '/number-to-words/', '/roman-numerals/', '/currency/', '/calorie/',
];

function shouldSkip(urlPath) {
  return SKIP_PREFIXES.some(p => urlPath.startsWith(p));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(p, files);
    } else if (entry.name.endsWith(SCAN_EXT)) {
      files.push(p);
    }
  }
  return files;
}

function pathToUrl(filePath) {
  const rel = path.relative(SCAN_DIR, filePath).replace(/\\/g, '/');
  if (SRC_MODE) {
    // src/pages/foo/bar.astro → /foo/bar/
    let url = rel.replace(/^pages\//, '/').replace(/\.astro$/, '/');
    url = url.replace(/index\/$/, '');
    if (!url.startsWith('/')) url = '/' + url;
    if (url !== '/' && !url.endsWith('/')) url += '/';
    return url;
  } else {
    // dist/foo/bar/index.html → /foo/bar/
    let url = '/' + rel.replace(/index\.html$/, '');
    if (url !== '/' && !url.endsWith('/')) url += '/';
    return url;
  }
}

function extractLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/<a\s+[^>]*href=["']([^"'#?]+)/gi)) {
    let href = m[1];
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.startsWith('https://toolcalcs.com')) continue;
      href = href.replace('https://toolcalcs.com', '');
    }
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (!href.startsWith('/')) continue;
    if (!href.endsWith('/') && !href.match(/\.(html|pdf|png|jpg)$/i)) href += '/';
    out.add(href);
  }
  return out;
}

function main() {
  if (!fs.existsSync(SCAN_DIR)) {
    console.error(`scan dir not found: ${SCAN_DIR}`);
    console.error(SRC_MODE ? 'src/ should exist' : 'run `npm run build` first');
    process.exit(1);
  }

  console.log(`\n=== link-graph (${SRC_MODE ? 'source' : 'dist'} mode) ===\n`);
  const files = walk(SCAN_DIR);
  console.log(`  ${files.length} files`);

  // Build graph: url -> Set of urls it links to
  const out = new Map();
  // Reverse graph: url -> Set of urls that link to it
  const inc = new Map();
  // Track which URLs exist (= are pages we built/wrote)
  const exists = new Set();

  for (const f of files) {
    const url = pathToUrl(f);
    if (shouldSkip(url)) continue;
    exists.add(url);
    const html = fs.readFileSync(f, 'utf8');
    const links = extractLinks(html);
    out.set(url, links);
    for (const target of links) {
      if (shouldSkip(target)) continue;
      if (!inc.has(target)) inc.set(target, new Set());
      inc.get(target).add(url);
    }
  }
  console.log(`  ${exists.size} indexable pages`);

  // Orphans: pages with 0 incoming internal links
  const orphans = [];
  for (const url of exists) {
    if (url === '/') continue; // homepage doesn't need incoming
    const incCount = (inc.get(url) || new Set()).size;
    if (incCount === 0) orphans.push(url);
  }

  // Dead ends: pages with 0 outgoing internal links to indexable pages
  const deadEnds = [];
  for (const url of exists) {
    const outLinks = out.get(url) || new Set();
    const indexableOut = [...outLinks].filter(l => exists.has(l));
    if (indexableOut.length === 0) deadEnds.push(url);
  }

  // Low in-degree: pages with only 1 incoming link
  const lowInDegree = [];
  for (const url of exists) {
    if (url === '/') continue;
    const incCount = (inc.get(url) || new Set()).size;
    if (incCount === 1) lowInDegree.push(url);
  }

  // Hub coverage: for each calculator category, does its hub link to every child?
  const hubCoverage = {};
  const categoryRoots = [
    'financial-calculators', 'health-calculators', 'math-calculators',
    'date-time-calculators', 'conversion-calculators', 'everyday-calculators',
    'construction-calculators', 'astrology-calculators', 'insurance-calculators',
    'tax-calculators', 'real-estate-calculators', 'business-calculators',
    'education-calculators', 'automotive-calculators', 'freelance-calculators',
  ];
  for (const cat of categoryRoots) {
    const hubUrl = `/${cat}/`;
    if (!exists.has(hubUrl)) continue;
    const hubLinks = out.get(hubUrl) || new Set();
    const children = [...exists].filter(u => u.startsWith(hubUrl) && u !== hubUrl);
    const missing = children.filter(c => !hubLinks.has(c));
    hubCoverage[cat] = {
      total: children.length,
      linked: children.length - missing.length,
      missing,
    };
  }

  // Stats summary
  let totalInc = 0, max = 0;
  for (const s of inc.values()) { totalInc += s.size; if (s.size > max) max = s.size; }
  const avgInc = (totalInc / exists.size).toFixed(2);

  console.log('\n=== STATS ===');
  console.log(`  indexable pages:          ${exists.size}`);
  console.log(`  orphans (in=0):           ${orphans.length}`);
  console.log(`  dead ends (out=0):        ${deadEnds.length}`);
  console.log(`  low in-degree (in=1):     ${lowInDegree.length}`);
  console.log(`  avg incoming links:       ${avgInc}`);
  console.log(`  max incoming links:       ${max}`);

  console.log('\n=== HUB COVERAGE ===');
  for (const [cat, c] of Object.entries(hubCoverage)) {
    const pct = c.total ? Math.round(100 * c.linked / c.total) : 100;
    const ok = c.missing.length === 0 ? '✓' : '⚠';
    console.log(`  ${ok} ${cat.padEnd(26)}  ${c.linked}/${c.total}  ${pct}%${c.missing.length ? '  missing: ' + c.missing.slice(0, 3).join(', ') + (c.missing.length > 3 ? ` +${c.missing.length - 3} more` : '') : ''}`);
  }

  if (orphans.length) {
    console.log('\n=== ORPHANS (no incoming links — sample 20) ===');
    orphans.slice(0, 20).forEach(o => console.log(`  ${o}`));
    if (orphans.length > 20) console.log(`  ... +${orphans.length - 20} more`);
  }

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const file  = path.join(LOG_DIR, `link-graph-${today}.json`);
  fs.writeFileSync(file, JSON.stringify({
    runAt: new Date().toISOString(),
    mode: SRC_MODE ? 'src' : 'dist',
    totalFiles: files.length,
    indexablePages: exists.size,
    stats: { orphans: orphans.length, deadEnds: deadEnds.length, lowInDegree: lowInDegree.length, avgIncoming: avgInc, maxIncoming: max },
    orphans,
    deadEnds,
    lowInDegree,
    hubCoverage,
  }, null, 2));
  console.log(`\nsaved → ${file}`);
}

main();
