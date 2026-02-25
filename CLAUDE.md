# ToolCalcs - Free Online Calculator Site

## Project Overview
- **Domain**: toolcalcs.com (pending registration)
- **Stack**: Astro (static site generator) + Vanilla CSS + Vanilla JS
- **Hosting**: Cloudflare Pages (free tier, $0/month)
- **Revenue**: Google AdSense (CPM model)
- **Target Audience**: English-speaking, primarily US
- **Goal**: $5/day AdSense revenue within 6-9 months

## Project Structure
```
x:/toolcalcs/
├── src/
│   ├── layouts/BaseLayout.astro     # Main layout (header, footer, SEO head)
│   ├── components/
│   │   ├── Header.astro             # Site header with navigation
│   │   ├── Footer.astro             # Site footer with links
│   │   ├── SEOHead.astro            # Meta tags, OG, structured data
│   │   └── AdUnit.astro             # AdSense ad wrapper
│   ├── pages/                       # Each .astro file = one page
│   │   ├── index.astro              # Homepage
│   │   ├── financial-calculators/   # Finance category
│   │   ├── health-calculators/      # Health category
│   │   ├── math-calculators/        # Math category
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   └── terms-of-service.astro
│   ├── data/calculators.ts          # Calculator metadata registry
│   └── styles/global.css            # Global CSS variables & reset
├── public/                          # Static files (copied as-is)
│   ├── favicon.svg
│   ├── robots.txt
│   └── ads.txt
├── astro.config.mjs                 # Astro config (sitemap, site URL)
└── dist/                            # Build output (do not edit)
```

## Commands
```bash
cd x:/toolcalcs
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build static site to dist/
npm run preview      # Preview built site locally
```

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
- [ ] Register toolcalcs.com domain
- [ ] Create Cloudflare account
- [ ] Connect GitHub repo to Cloudflare Pages
- [ ] Set custom domain in Cloudflare Pages
- [ ] Update DNS records
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Apply for Google AdSense (after 30+ pages)
