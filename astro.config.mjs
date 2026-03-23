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
      const programmaticPrefixes = [
        '/mortgage/', '/bmi/', '/loan/', '/savings/', '/down-payment/',
        '/calorie/', '/paycheck/', '/macro/', '/data-convert/', '/pace/',
        '/due-date/', '/math/', '/percentage/', '/cooking/', '/compound-interest/',
        '/convert/', '/currency/', '/salary/', '/days-until/', '/days-ago/',
        '/days-from-now/', '/zodiac/', '/angel-number/', '/grade/', '/percent-off/',
        '/fraction/', '/roman-numerals/', '/number-to-words/', '/what-percent/',
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
          url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology|insurance|tax|real-estate|business)-calculators\/$/) ||
          url.match(/toolcalcs\.com\/(test|tools|blog|worksheets)\/$/)) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      }
      // High: individual calculators, games, tools, worksheets, blog articles
      else if (url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology|insurance|tax|real-estate|business)-calculators\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/(test|tools|worksheets|blog)\/[^/]+\/$/)) {
        item.priority = 0.8;
        item.changefreq = 'monthly';
      }
      // Standard: everything else (about, contact, policies)
      else {
        item.priority = 0.6;
        item.changefreq = 'monthly';
      }

      delete item.lastmod;
      return item;
    },
  })],
  build: {
    format: 'directory',
  },
});
