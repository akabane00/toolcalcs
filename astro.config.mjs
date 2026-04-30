// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

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
      // Programmatic prefixes excluded from sitemap. Per GSC data (May 1, 2026)
      // four categories — number-to-words, roman-numerals, currency, calorie —
      // received meaningful organic impressions (combined ~5,200/month) and
      // were promoted back to indexable status. The remaining 36 categories
      // stay sitemap-excluded with meta noindex on child pages.
      const programmaticPrefixes = [
        '/mortgage/', '/bmi/', '/loan/', '/savings/', '/down-payment/',
        '/paycheck/', '/macro/', '/data-convert/', '/pace/',
        '/due-date/', '/math/', '/percentage/', '/cooking/', '/compound-interest/',
        '/convert/', '/salary/', '/days-until/', '/days-ago/',
        '/days-from-now/', '/zodiac/', '/angel-number/', '/grade/', '/percent-off/',
        '/fraction/', '/what-percent/',
        '/auto-loan/', '/decimal-to-fraction/', '/times-tables/', '/factors-of/',
        '/time-convert/', '/tip/', '/temperature/', '/born-in/', '/time-zone/',
        '/how-many/', '/random/',
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

  adapter: cloudflare(),
});