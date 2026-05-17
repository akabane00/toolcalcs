#!/usr/bin/env node
/**
 * Weekly SEO report — aggregates GSC + reindex + CWV + link-graph + audit logs
 * into a single markdown report.
 *
 * Run first:  npm run seo:fetch    (or rely on most-recent gsc-fetch-*.json)
 *
 * Output: logs/seo/weekly-{YYYY}-W{WW}.md
 *
 * Usage:
 *   node scripts/seo/weekly-report.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = process.env.TOOLCALCS_ROOT
  ? path.resolve(process.env.TOOLCALCS_ROOT)
  : path.resolve(__dirname, '..', '..');
const LOG_DIR    = path.join(ROOT, 'logs', 'seo');

function isoWeek(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((t - yearStart) / 864e5) + 1) / 7);
  return { year: t.getUTCFullYear(), week: weekNum };
}

function latestLog(prefix) {
  if (!fs.existsSync(LOG_DIR)) return null;
  const files = fs.readdirSync(LOG_DIR).filter(f => f.startsWith(prefix)).sort();
  if (!files.length) return null;
  try { return JSON.parse(fs.readFileSync(path.join(LOG_DIR, files[files.length - 1]), 'utf8')); }
  catch { return null; }
}

function previousLog(prefix, beforeFile) {
  if (!fs.existsSync(LOG_DIR)) return null;
  const files = fs.readdirSync(LOG_DIR).filter(f => f.startsWith(prefix)).sort();
  const idx = beforeFile ? files.indexOf(beforeFile) : files.length - 1;
  if (idx <= 0) return null;
  try { return JSON.parse(fs.readFileSync(path.join(LOG_DIR, files[idx - 1]), 'utf8')); }
  catch { return null; }
}

function thisWeekReindexLogs() {
  if (!fs.existsSync(LOG_DIR)) return [];
  const sevenDaysAgo = Date.now() - 7 * 864e5;
  return fs.readdirSync(LOG_DIR)
    .filter(f => f.startsWith('reindex-'))
    .map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(LOG_DIR, f), 'utf8'));
        return { file: f, data };
      } catch { return null; }
    })
    .filter(x => x && new Date(x.data.timestamp).getTime() > sevenDaysAgo);
}

function deltaArrow(curr, prev) {
  if (prev === undefined || prev === null) return '—';
  const diff = curr - prev;
  if (diff === 0) return '→ 0';
  return diff > 0 ? `↑ +${diff}` : `↓ ${diff}`;
}

function main() {
  const now = new Date();
  const { year, week } = isoWeek(now);
  const reportName = `weekly-${year}-W${String(week).padStart(2, '0')}.md`;

  const gsc       = latestLog('gsc-fetch-');
  const gscPrev   = previousLog('gsc-fetch-');
  const diagnose  = latestLog('diagnose-');
  const linkGraph = latestLog('link-graph-');
  const audit     = latestLog('programmatic-audit-');
  const cwv       = latestLog('cwv-');
  const reindexLogs = thisWeekReindexLogs();

  const lines = [];
  lines.push(`# toolcalcs.com weekly SEO report — ${year} W${String(week).padStart(2, '0')}`);
  lines.push('');
  lines.push(`Generated ${now.toISOString()}`);
  lines.push('');

  // GSC totals
  lines.push('## 1. GSC Performance (28-day rolling)');
  lines.push('');
  if (gsc && gsc.totals) {
    const t = gsc.totals;
    const pt = gscPrev && gscPrev.totals ? gscPrev.totals : null;
    lines.push('| Metric | Current | Previous | Δ |');
    lines.push('|---|---:|---:|---|');
    lines.push(`| clicks | ${t.clicks} | ${pt?.clicks ?? '—'} | ${deltaArrow(t.clicks, pt?.clicks)} |`);
    lines.push(`| impressions | ${t.impressions} | ${pt?.impressions ?? '—'} | ${deltaArrow(t.impressions, pt?.impressions)} |`);
    lines.push(`| CTR | ${(t.ctr * 100).toFixed(2)}% | ${pt ? (pt.ctr * 100).toFixed(2) + '%' : '—'} | — |`);
    lines.push(`| avg position | ${t.position.toFixed(2)} | ${pt ? pt.position.toFixed(2) : '—'} | — |`);
    lines.push('');
    lines.push(`Period: ${gsc.period.start} ~ ${gsc.period.end}`);
  } else {
    lines.push('_No GSC data — run `npm run seo:fetch` first._');
  }
  lines.push('');

  // Sitemap indexing
  lines.push('## 2. Sitemap indexing status');
  lines.push('');
  if (gsc && gsc.sitemaps && gsc.sitemaps.length) {
    for (const sm of gsc.sitemaps) {
      lines.push(`- **${sm.path}** — lastDownloaded ${sm.lastDownloaded || 'never'}`);
      for (const c of sm.contents || []) {
        lines.push(`  - ${c.type}: submitted=${c.submitted} **indexed=${c.indexed}**`);
      }
    }
  } else {
    lines.push('_No sitemap data._');
  }
  lines.push('');

  // Reindex campaign
  lines.push('## 3. Indexing API campaign');
  lines.push('');
  if (reindexLogs.length) {
    let totalReindexed = 0, totalIndexed = 0, totalNotIndexed = 0, totalErrors = 0;
    for (const r of reindexLogs) {
      totalReindexed += r.data.totals.reindexed || 0;
      totalIndexed   += r.data.totals.indexed || 0;
      totalNotIndexed += r.data.totals.notIndexed || 0;
      totalErrors    += r.data.totals.errors || 0;
    }
    lines.push(`- ${reindexLogs.length} runs in last 7 days`);
    lines.push(`- Total inspections: ${reindexLogs.reduce((s, r) => s + (r.data.totals.processed || 0), 0)}`);
    lines.push(`- Total reindex requests: ${totalReindexed}`);
    lines.push(`- Indexed snapshots: ${totalIndexed} | Not indexed snapshots: ${totalNotIndexed}`);
    lines.push(`- Errors: ${totalErrors}`);
  } else {
    lines.push('_No reindex runs in last 7 days. Verify Task Scheduler `ToolCalcs-Daily-Reindex`._');
  }
  lines.push('');

  // Top queries
  lines.push('## 4. Top queries (current 28d)');
  lines.push('');
  if (gsc && gsc.topQueries && gsc.topQueries.length) {
    lines.push('| Query | imp | clk | pos |');
    lines.push('|---|---:|---:|---:|');
    gsc.topQueries.slice(0, 10).forEach(q => {
      lines.push(`| ${q.query.replace(/\|/g, '\\|')} | ${q.impressions} | ${q.clicks} | ${q.position.toFixed(1)} |`);
    });
  }
  lines.push('');

  // Per-category traffic
  lines.push('## 5. Per-category performance (28d impressions)');
  lines.push('');
  if (gsc && gsc.byCategory) {
    lines.push('| Category | pages | imp | clk |');
    lines.push('|---|---:|---:|---:|');
    Object.entries(gsc.byCategory).forEach(([k, v]) => {
      lines.push(`| ${k} | ${v.pageCount} | ${v.impressions} | ${v.clicks} |`);
    });
  }
  lines.push('');

  // CWV
  lines.push('## 6. Core Web Vitals (latest sample)');
  lines.push('');
  if (cwv && cwv.aggregates) {
    for (const [strat, agg] of Object.entries(cwv.aggregates)) {
      if (!agg.scores?.length) continue;
      const avg = agg.scores.reduce((s, v) => s + v, 0) / agg.scores.length;
      const medianLcp = agg.lcps.sort((a, b) => a - b)[Math.floor(agg.lcps.length / 2)] || 0;
      const medianCls = agg.clss.sort((a, b) => a - b)[Math.floor(agg.clss.length / 2)] || 0;
      lines.push(`- ${strat}: avg score ${avg.toFixed(0)} | median LCP ${(medianLcp / 1000).toFixed(2)}s | median CLS ${medianCls.toFixed(3)}`);
    }
  } else {
    lines.push('_No CWV data — run `node scripts/seo/cwv-fetch.js`._');
  }
  lines.push('');

  // Link graph
  lines.push('## 7. Internal link graph');
  lines.push('');
  if (linkGraph && linkGraph.stats) {
    const s = linkGraph.stats;
    lines.push(`- Indexable pages: ${linkGraph.indexablePages}`);
    lines.push(`- Orphans (in=0): **${s.orphans}**`);
    lines.push(`- Dead ends (out=0): ${s.deadEnds}`);
    lines.push(`- Low in-degree (in=1): ${s.lowInDegree}`);
    lines.push(`- Avg incoming: ${s.avgIncoming}`);
    if (linkGraph.hubCoverage) {
      const incomplete = Object.entries(linkGraph.hubCoverage).filter(([, c]) => c.missing?.length);
      if (incomplete.length) {
        lines.push('');
        lines.push('Hubs missing links to children:');
        incomplete.forEach(([cat, c]) => lines.push(`- ${cat}: ${c.missing.length} children unreachable`));
      }
    }
  } else {
    lines.push('_No link-graph data — run `node scripts/seo/link-graph.js`._');
  }
  lines.push('');

  // Programmatic audit
  lines.push('## 8. Programmatic prefix traffic');
  lines.push('');
  if (audit && audit.summary) {
    lines.push(`- Zero-traffic prefixes (90d): **${audit.summary.zeroTraffic.length}**`);
    lines.push(`- Low-traffic prefixes (<10 imp): ${audit.summary.lowTraffic.length}`);
    lines.push(`- Meaningful traffic prefixes (≥10 imp): ${audit.summary.meaningful.length}`);
    if (audit.summary.zeroTraffic.length) {
      lines.push('');
      lines.push('Zero-traffic prefixes (removal candidates):');
      audit.summary.zeroTraffic.forEach(p => lines.push(`- ${p}`));
    }
  } else {
    lines.push('_No audit data — run `node scripts/seo/programmatic-audit.js`._');
  }
  lines.push('');

  // Action items
  lines.push('## 9. Recommended actions');
  lines.push('');
  const actions = [];
  if (gsc && gsc.sitemaps?.[0]?.contents?.[0]?.indexed === 0) {
    actions.push('- Indexed count still 0. Continue daily Indexing API + monitor `Crawled - currently not indexed` → `Indexed` transitions.');
  }
  if (linkGraph && linkGraph.stats?.orphans > 0) {
    actions.push(`- ${linkGraph.stats.orphans} orphan pages detected. Investigate.`);
  }
  if (audit && audit.summary?.zeroTraffic.length > 5) {
    actions.push(`- ${audit.summary.zeroTraffic.length} zero-traffic prefixes — consider removal (decision: user).`);
  }
  if (cwv?.aggregates?.mobile?.scores?.length) {
    const avg = cwv.aggregates.mobile.scores.reduce((s, v) => s + v, 0) / cwv.aggregates.mobile.scores.length;
    if (avg < 90) actions.push(`- Mobile PSI avg ${avg.toFixed(0)} (target ≥ 90). Investigate slow pages.`);
  }
  if (!actions.length) actions.push('- All key metrics within target range. Continue current cadence.');
  actions.forEach(a => lines.push(a));
  lines.push('');

  // Save
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, reportName);
  fs.writeFileSync(file, lines.join('\n'));
  console.log(`Weekly report → ${file}`);
  console.log(`\n${lines.slice(0, 30).join('\n')}\n...`);
}

main();
