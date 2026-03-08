// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://toolcalcs.com',
  integrations: [sitemap({
    filter(page) {
      // Keep noindex only for zodiac & angel-number (low-quality bulk content)
      const noindexRoutes = ['/zodiac/', '/angel-number/'];
      for (const route of noindexRoutes) {
        if (page.includes(route) && page !== `https://toolcalcs.com${route}`) {
          return false;
        }
      }
      return true;
    },
    serialize(item) {
      const url = item.url;

      // High-priority: homepage, category indexes, interactive tools/games
      if (url === 'https://toolcalcs.com/' ||
          url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology)-calculators\/$/) ||
          url.match(/toolcalcs\.com\/test\/$/) ||
          url.match(/toolcalcs\.com\/tools\/$/) ||
          url.match(/toolcalcs\.com\/blog\/$/)) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      }
      // Medium-high: individual calculators, games, tools, worksheets, blog articles
      else if (url.match(/toolcalcs\.com\/(financial|health|math|date-time|conversion|everyday|construction|astrology)-calculators\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/test\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/tools\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/worksheets\/[^/]+\/$/) ||
               url.match(/toolcalcs\.com\/blog\/[^/]+\/$/)) {
        item.priority = 0.8;
        item.changefreq = 'monthly';
      }
      // Medium: programmatic index pages
      else if (url.match(/toolcalcs\.com\/(percentage|convert|salary|roman-numerals|number-to-words|born-in|fraction|tip|time-zone|factors-of|days-until|days-from-now|days-ago|random|cooking|compound-interest|time-convert|auto-loan|currency|how-many|worksheets|math|times-tables|percent-off|what-percent|grade|decimal-to-fraction|temperature|zodiac|angel-number)\/$/) ) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      }
      // Lower: individual programmatic pages (bulk)
      else {
        item.priority = 0.5;
        item.changefreq = 'yearly';
      }

      // Remove lastmod to avoid "all same date" signal
      delete item.lastmod;

      return item;
    },
  })],
  build: {
    format: 'directory',
  },
});
