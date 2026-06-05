// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://toolcalcs.com',
  integrations: [sitemap({
    entryLimit: 2000,
    filter(page) {
      // Exclude utility pages
      const excludeExact = [
        'https://toolcalcs.com/404/',
        'https://toolcalcs.com/search/',
        'https://toolcalcs.com/sitemap/',
      ];
      if (excludeExact.includes(page)) return false;

      // Exclude all programmatic/templated sections from sitemap
      // These pages still exist and are crawlable via internal links,
      // but we prioritize original content for sitemap-based discovery
      // Programmatic prefixes excluded from sitemap.
      // History of promotions to indexable (each driven by GSC traffic data):
      //   - May 1, 2026: number-to-words, roman-numerals, currency, calorie
      //                  (~5,200 impressions/month combined)
      //   - May 17, 2026: born-in (28,595 imp / 69 clk / pos 7.4 over 90 days)
      //   - Jun 5, 2026 (batch 1): fraction, salary, percentage, tip,
      //                  time-zone, math, factors-of, grade — top 8 by traffic.
      //   - Jun 5, 2026 (batch 2, aggressive): mortgage, bmi, macro,
      //                  data-convert, cooking, compound-interest, convert,
      //                  days-until, days-from-now, percent-off, what-percent,
      //                  auto-loan, times-tables, time-convert, random — every
      //                  remaining prefix with >=10 impressions in the 90-day
      //                  audit. GSC revealed the site had ~7,500 pages indexed
      //                  in March (all programmatic) which collapsed to 1 after
      //                  the 4/28 mass-noindex. No penalty (manual actions +
      //                  security both clean), so restoring any prefix that
      //                  Google was already ranking is recovery, not new risk.
      //                  Child pages only — index pages keep their
      //                  cross-canonical to the main calculator.
      // Only LOW/ZERO-traffic prefixes remain noindexed: the audit measured
      // <10 impressions (or zero) for each of these over 90 days, so there is
      // no evidence they are worth indexing.
      const programmaticPrefixes = [
        '/loan/', '/savings/', '/down-payment/', '/paycheck/',
        '/pace/', '/due-date/', '/days-ago/',
        '/zodiac/', '/angel-number/',
        '/decimal-to-fraction/', '/temperature/', '/how-many/',
      ];
      const path = page.replace('https://toolcalcs.com', '');
      for (const prefix of programmaticPrefixes) {
        if (path.startsWith(prefix)) return false;
      }

      return true;
    },
    serialize(item) {
      const url = item.url;

      // High-priority: homepage, category indexes
      if (url === 'https://toolcalcs.com/' ||
          url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology|insurance|tax|real-estate|business|education|automotive|freelance)-calculators\/$/) ||
          url.match(/toolcalcs\.com\/(test|tools|blog|worksheets)\/$/)) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      }
      // High: individual calculators, games, tools, worksheets, blog articles
      else if (url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology|insurance|tax|real-estate|business|education|automotive|freelance)-calculators\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/(test|tools|worksheets|blog)\/[^/]+\/$/)) {
        item.priority = 0.8;
        item.changefreq = 'monthly';
      }
      // Standard: everything else (about, contact, policies)
      else {
        item.priority = 0.6;
        item.changefreq = 'monthly';
      }

      // Set lastmod to build date (YYYY-MM-DD) on every URL — Google reads
      // this as a "regenerated since" signal, which encourages re-crawl.
      // The sitemap integration does not populate lastmod by default for
      // SSG output, so we emit it here in W3C Datetime (date-only) form.
      item.lastmod = new Date().toISOString().slice(0, 10);
      return item;
    },
  })],
  build: {
    format: 'directory',
  },
});
