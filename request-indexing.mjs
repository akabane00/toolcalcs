/**
 * Google Search Console - Batch Index Request Script
 *
 * Usage: npx playwright test request-indexing.mjs
 *   or:  node request-indexing.mjs
 *
 * 1. Opens Google Search Console
 * 2. Waits for you to log in manually (60 seconds)
 * 3. Automatically requests indexing for each URL
 */

import { chromium } from 'playwright';

const SITE_URL = 'https://toolcalcs.com';
const GSC_PROPERTY = 'sc-domain:toolcalcs.com'; // or URL property

// URLs to request indexing for
const URLS = [
  // E-E-A-T & Trust pages
  '/about/',
  '/editorial-standards/',

  // Business Calculators (Sprint 11)
  '/business-calculators/',
  '/business-calculators/break-even-calculator/',
  '/business-calculators/profit-margin-calculator/',
  '/business-calculators/llc-vs-scorp-calculator/',
  '/business-calculators/payroll-cost-calculator/',
  '/business-calculators/sba-loan-calculator/',
  '/business-calculators/business-roi-calculator/',

  // Sprint 11 Blog articles
  '/blog/how-to-calculate-break-even-point/',
  '/blog/llc-vs-s-corp-comparison/',
  '/blog/profit-margin-guide/',
  '/blog/sba-loan-guide/',
  '/blog/true-cost-of-employee/',
  '/blog/business-roi-guide/',

  // Sprint 12 Blog articles (Personal Finance Pillar)
  '/blog/how-to-create-a-budget/',
  '/blog/50-30-20-rule-budget/',
  '/blog/how-to-build-emergency-fund/',
  '/blog/debt-snowball-vs-avalanche/',
  '/blog/zero-based-budgeting-guide/',
  '/blog/how-much-should-i-have-saved-by-age/',
  '/blog/high-yield-savings-account-guide/',
  '/blog/401k-vs-ira/',
  '/blog/how-to-start-investing/',
  '/blog/index-funds-vs-etfs/',
  '/blog/4-percent-rule-retirement/',
  '/blog/roth-ira-vs-traditional-ira/',
  '/blog/how-to-improve-credit-score/',
  '/blog/compound-interest-explained/',
  '/blog/first-time-home-buyer-guide/',
  '/blog/renting-vs-buying-home/',
  '/blog/how-to-negotiate-salary/',
  '/blog/side-hustle-tax-guide/',
  '/blog/how-to-get-out-of-credit-card-debt/',
  '/blog/net-worth-by-age/',
];

const DELAY = (ms) => new Promise(r => setTimeout(r, ms));

async function requestIndexing(page, url) {
  const fullUrl = SITE_URL + url;
  const gscUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE_URL + '/')}&id=${encodeURIComponent(fullUrl)}&alt=external`;

  console.log(`\n--- Requesting: ${fullUrl} ---`);

  try {
    // Navigate to URL inspection
    await page.goto(gscUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await DELAY(3000);

    // Try the URL inspection input approach
    // Look for the inspection input bar at the top
    const inspectInput = page.locator('input[aria-label="Inspect any URL"]').first();
    if (await inspectInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await inspectInput.fill(fullUrl);
      await page.keyboard.press('Enter');
      await DELAY(8000); // Wait for inspection result
    }

    // Look for "Request Indexing" link/button
    const requestBtn = page.locator('text=Request Indexing').first();
    const reqBtnAlt = page.locator('text=색인 생성 요청').first(); // Korean UI

    let clicked = false;

    if (await requestBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
      await requestBtn.click();
      clicked = true;
      console.log(`  Clicked "Request Indexing"`);
    } else if (await reqBtnAlt.isVisible({ timeout: 3000 }).catch(() => false)) {
      await reqBtnAlt.click();
      clicked = true;
      console.log(`  Clicked "색인 생성 요청"`);
    }

    if (clicked) {
      // Wait for the confirmation dialog / processing
      await DELAY(15000); // Google takes ~10-15 seconds to process

      // Check for success message
      const success = page.locator('text=Indexing requested').first();
      const successKr = page.locator('text=색인 생성이 요청').first();
      const quotaError = page.locator('text=Quota exceeded').first();
      const quotaErrorKr = page.locator('text=할당량 초과').first();

      if (await success.isVisible({ timeout: 5000 }).catch(() => false) ||
          await successKr.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`  ✓ Success: Indexing requested for ${url}`);
      } else if (await quotaError.isVisible({ timeout: 2000 }).catch(() => false) ||
                 await quotaErrorKr.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`  ✗ Quota exceeded - stopping. Try again tomorrow.`);
        return 'quota';
      } else {
        console.log(`  ? Clicked but couldn't confirm result`);
      }

      // Close any dialog
      const okBtn = page.locator('text=OK').first();
      const okBtnKr = page.locator('text=확인').first();
      if (await okBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await okBtn.click();
      } else if (await okBtnKr.isVisible({ timeout: 2000 }).catch(() => false)) {
        await okBtnKr.click();
      }
      await DELAY(2000);
    } else {
      console.log(`  - "Request Indexing" button not found (may already be indexed)`);
    }

    return 'ok';
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    return 'error';
  }
}

async function main() {
  console.log('=== Google Search Console Batch Indexing ===');
  console.log(`Total URLs: ${URLS.length}`);
  console.log('');

  // Launch browser with persistent context for login
  const userDataDir = 'c:/Users/master/.claude/chrome';
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    locale: 'ko-KR',
  });

  const page = await browser.newPage();

  // Navigate to GSC
  console.log('Opening Google Search Console...');
  await page.goto('https://search.google.com/search-console?resource_id=' + encodeURIComponent(SITE_URL + '/'), {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  // Check if login is needed
  const loginCheck = page.locator('input[type="email"]').first();
  if (await loginCheck.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('');
    console.log('>>> Please log in to Google in the browser window <<<');
    console.log('>>> Waiting up to 120 seconds for login... <<<');
    console.log('');

    // Wait for GSC to load after login
    await page.waitForURL('**/search-console/**', { timeout: 120000 });
    await DELAY(3000);
  }

  console.log('Logged in! Starting indexing requests...');
  console.log('(Google allows ~10-20 requests per day)');
  console.log('');

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const url of URLS) {
    const result = await requestIndexing(page, url);
    if (result === 'ok') success++;
    else if (result === 'quota') {
      console.log(`\nQuota reached after ${success} requests. Remaining URLs will need to be done tomorrow.`);
      break;
    } else {
      failed++;
    }

    // Small delay between requests to avoid rate limiting
    await DELAY(2000);
  }

  console.log('\n=== Summary ===');
  console.log(`Processed: ${success + failed}`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Remaining: ${URLS.length - success - failed}`);

  await browser.close();
}

main().catch(console.error);
