# ToolCalcs - Free Online Calculator Site

## Project Overview
- **Domain**: toolcalcs.com
- **Stack**: Astro 6.x (static site generator) + Vanilla CSS + Vanilla JS
- **Hosting**: Cloudflare Pages (free tier, $0/month)
- **Revenue**: Google AdSense (CPM model)
- **Target Audience**: English-speaking, primarily US
- **Goal**: $5/day AdSense revenue within 6-9 months

## Site Scale (as of 2026-05-15)
- 15 calculator categories, 157 calculators
- 225 blog articles
- 98 worksheet pages
- 26 tool pages
- 43 test/game pages
- 36+ programmatic prefixes (mortgage/, bmi/, percentage/, ...) — all `noindex,nofollow`
- 4 programmatic categories re-promoted to indexable (number-to-words, roman-numerals, currency, calorie)

## Project Structure
```
C:\Users\master\Projects\toolcalcs\
├── src/
│   ├── layouts/                     # Astro layouts
│   ├── components/                  # Header, Footer, SEOHead, AdUnit, AuthorBio…
│   ├── pages/                       # 15 calc categories + blog/ + worksheets/ + tools/ + test/
│   ├── data/                        # 52 .ts data files (calculators registry, programmatic generators)
│   └── styles/global.css
├── public/                          # robots.txt, ads.txt, _redirects, manifest, sitemap helpers
├── scripts/seo/                     # GSC automation (Indexing API + Performance API)
│   ├── gsc-batch-reindex.js
│   └── gsc-fetch.js
├── data/                            # Optional reindex-queue.txt override (gitignored)
├── logs/seo/                        # Daily reindex + fetch snapshots (gitignored)
├── astro.config.mjs                 # Sitemap config: priority tiers, programmatic exclusions, lastmod
└── dist/                            # Build output (do not edit)
```

## Commands
```bash
npm run dev            # Start dev server (localhost:4321)
npm run build          # Build static site to dist/
npm run preview        # Preview built site locally
npm run seo:reindex    # GSC Indexing API: inspect + reindex priority URLs
npm run seo:fetch      # GSC Performance API: 28d snapshot + sitemap status
npm run seo:diagnose   # Deep URL Inspection on sample URLs + live HTML parse
npm run seo:cwv        # PageSpeed Insights (PSI_API_KEY in .env)
npm run seo:link-graph # Internal link graph (orphans, dead-ends, hub coverage)
npm run seo:audit      # Programmatic-prefix traffic audit (90d GSC)
npm run seo:report     # Weekly aggregate markdown report
npm run seo:efficacy   # Re-inspect reindexed URLs for state transitions
```

## SEO Automation (Indexing API + Performance API)
- Service account: `search-console-reader@river-overview-384807.iam.gserviceaccount.com`
  (Owner role on `sc-domain:toolcalcs.com` GSC property — shared with jupjupday.kr)
- Credential JSON: `x:\www\storage\credentials\river-overview-384807-53137236c33c.json`
- PSI API key: in `.env` (gitignored) — same project, raises PSI quota to 25k/day
- Daily quotas: URL Inspection 2000/day, Indexing API 200/day
- `scripts/seo/gsc-batch-reindex.js` — default flow: P1 hubs (homepage + 19 category indexes) + P3 sitemap rotation; override with `data/reindex-queue.txt` for Sprint launches
- Task Scheduler `ToolCalcs-Daily-Reindex` runs `scripts/seo/daily-reindex.ps1` daily at **04:00 KST** (moved from 09:00 to avoid overlapping with the user's workday)
- All scripts honor `TOOLCALCS_ROOT` env var (set in .env): worktree-launched runs still write to the main repo's `logs/seo/` and read `data/` from there
- Logs: `logs/seo/{reindex,gsc-fetch,cwv,link-graph,programmatic-audit,efficacy,weekly}-*.json` (all gitignored)

## GSC State Baseline (2026-05-15 snapshot)
- **28-day clicks: 2** / impressions 417 / avg position 34.83
- **Sitemap: 688 submitted, 0 indexed** — every URL in sitemap rejected
- All calculator category hubs return `Crawled - currently not indexed`
- GSC overview reports 1 indexed page, 12,726 not indexed (the 12k+ are mostly programmatic noindexed pages still tracked)
- Recovery hypothesis: indexing is gated on content-quality signals, not on crawl/submit. Reindex requests alone unlikely to flip "Crawled - not indexed" — content/E-E-A-T work has to land first.

## Adding a New Calculator
1. Add entry to `src/data/calculators.ts` (title, slug, description, category)
2. Create page file: `src/pages/{categorySlug}/{calculatorSlug}.astro`
3. Follow existing calculator pattern:
   - Breadcrumb navigation
   - H1 title + page description
   - Calculator UI (inputs + results)
   - AdUnit components (mid + bottom)
   - SEO content article (1,500+ words with H2/H3 headings)
   - FAQ structured data (FAQPage schema)
4. Run `npm run build` to verify no errors

## Calculator Page Template
Each calculator page should include:
- **Breadcrumb**: Home > Category > Calculator
- **Calculator Tool**: Interactive JS in `<script>` tag
- **Result Display**: Clear result cards with formatted numbers
- **SEO Content**: 1,500+ words explaining the concept, formula, examples, tips
- **FAQ Section**: 2-3 common questions with schema markup
- **Ad Units**: After calculator, mid-content, and bottom

## SEO Guidelines
- Title format: "{Calculator Name} - {Benefit/Action} | ToolCalcs"
- Meta description: 150-160 chars, include primary keyword
- H1: One per page, includes primary keyword
- H2/H3: Use for content sections, include related keywords
- Internal linking: Link to related calculators within content
- All calculations client-side (no server needed)

## AdSense Setup (After Domain Registration)
1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in:
   - `src/layouts/BaseLayout.astro` (script tag)
   - `src/components/AdUnit.astro` (data-ad-client)
   - `public/ads.txt`
2. Replace ad slot IDs in AdUnit component calls
3. Uncomment the AdSense script in BaseLayout.astro

## CSS Approach
- Vanilla CSS only (no frameworks)
- CSS variables defined in `src/styles/global.css`
- Component-scoped styles in each `.astro` file's `<style>` block
- Mobile-first responsive design (breakpoint: 640px)

## Content Quality Rules
- Each calculator page: minimum 1,500 words of explanatory content
- Include real examples with actual numbers
- FAQ section with FAQPage structured data
- No thin/duplicate content across pages
- Content must provide unique value beyond the calculator tool itself

## Deployment Checklist
- [x] Register toolcalcs.com domain
- [x] Create Cloudflare account
- [x] Connect GitHub repo to Cloudflare Pages
- [x] Set custom domain in Cloudflare Pages
- [x] Update DNS records
- [x] Submit sitemap to Google Search Console
- [x] Set up Google Analytics 4 (G-M0BQJJYZPX)
- [ ] Apply for Google AdSense (36 pages ready)
