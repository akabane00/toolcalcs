#!/usr/bin/env node
/**
 * Force-resubmit the sitemap to GSC.
 *
 * GSC stopped re-downloading sitemap-index.xml after 2026-05-12 (confirmed via
 * gsc-fetch: lastDownloaded frozen while submitted=688 / indexed=0). New URLs
 * added since then (e.g. the 107 /born-in/ pages promoted 5/17) are not being
 * re-discovered through the sitemap. A submit call updates lastSubmitted and
 * nudges Google to re-fetch.
 *
 * Requires the WRITE scope (https://www.googleapis.com/auth/webmasters), unlike
 * the read-only reporting scripts. The service account already has Owner on the
 * property, so this is authorized.
 *
 * Usage:
 *   node scripts/seo/sitemap-resubmit.js              # submit (idempotent)
 *   node scripts/seo/sitemap-resubmit.js --recreate   # delete then submit (harder nudge)
 *
 * Output: prints the before/after sitemap status line.
 */

import { google } from 'googleapis';

const KEY_PATH     = process.env.GSC_CREDENTIAL_PATH
  || 'C:\\Users\\master\\.gsc-credentials\\river-overview-384807-53137236c33c.json';
const SITE_DOMAIN  = 'sc-domain:toolcalcs.com';
const SITEMAP_URL  = 'https://toolcalcs.com/sitemap-index.xml';
const RECREATE     = process.argv.includes('--recreate');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function statusLine(sc) {
  try {
    const sm = await sc.sitemaps.list({ siteUrl: SITE_DOMAIN });
    const entry = (sm.data.sitemap || []).find(s => s.path === SITEMAP_URL) || (sm.data.sitemap || [])[0];
    if (!entry) return '(no sitemap registered)';
    const c = (entry.contents || [])[0] || {};
    return `path=${entry.path} lastSubmitted=${entry.lastSubmitted} lastDownloaded=${entry.lastDownloaded} submitted=${c.submitted ?? '?'} indexed=${c.indexed ?? '?'} pending=${entry.isPending}`;
  } catch (e) {
    return `(status error: ${e.message})`;
  }
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters'], // write scope
  });
  const sc = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  console.log('=== sitemap resubmit ===');
  console.log('BEFORE: ' + await statusLine(sc));

  if (RECREATE) {
    console.log('\n[recreate] deleting sitemap registration...');
    try {
      await sc.sitemaps.delete({ siteUrl: SITE_DOMAIN, feedpath: SITEMAP_URL });
      console.log('  deleted. waiting 3s...');
      await sleep(3000);
    } catch (e) {
      console.log('  delete failed (continuing): ' + e.message);
    }
  }

  console.log('\n[submit] submitting ' + SITEMAP_URL + ' ...');
  try {
    await sc.sitemaps.submit({ siteUrl: SITE_DOMAIN, feedpath: SITEMAP_URL });
    console.log('  submit OK');
  } catch (e) {
    console.error('  submit FAILED: ' + e.message);
    process.exit(1);
  }

  // GSC updates lastSubmitted near-instantly; lastDownloaded follows when the
  // crawler re-fetches (can be minutes to hours).
  await sleep(2000);
  console.log('\nAFTER:  ' + await statusLine(sc));
  console.log('\nNote: lastDownloaded updates only when Google actually re-crawls the sitemap (minutes-to-hours). Re-run gsc-fetch tomorrow to confirm.');
}

main().catch(e => { console.error('FATAL:', e.stack || e); process.exit(1); });
