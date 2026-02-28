// ==========================================================================
//  Born In Year Data for Programmatic SEO Pages
//  Generates 106 pages at /born-in/{year}/
// ==========================================================================

export interface BornInPage {
  year: number;
  slug: string;              // "1990"
  turningAge: number;        // 2026 - year (hardcode build year as 2026)
  generation: string;        // "Millennial"
  generationYears: string;   // "1981-1996"
  chineseZodiac: string;     // "Horse"
}

const BUILD_YEAR = 2026;

const generationRanges: { name: string; start: number; end: number }[] = [
  { name: 'Greatest Generation', start: 1901, end: 1927 },
  { name: 'Silent Generation', start: 1928, end: 1945 },
  { name: 'Baby Boomer', start: 1946, end: 1964 },
  { name: 'Generation X', start: 1965, end: 1980 },
  { name: 'Millennial', start: 1981, end: 1996 },
  { name: 'Generation Z', start: 1997, end: 2012 },
  { name: 'Generation Alpha', start: 2013, end: 2025 },
];

const chineseZodiacAnimals = [
  'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox',
  'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat',
];

function getGeneration(year: number): { name: string; years: string } {
  const gen = generationRanges.find((g) => year >= g.start && year <= g.end);
  return gen
    ? { name: gen.name, years: `${gen.start}-${gen.end}` }
    : { name: 'Unknown', years: '' };
}

function getChineseZodiac(year: number): string {
  return chineseZodiacAnimals[year % 12];
}

function buildAllPages(): BornInPage[] {
  const pages: BornInPage[] = [];

  for (let year = 1920; year <= 2025; year++) {
    const gen = getGeneration(year);
    pages.push({
      year,
      slug: String(year),
      turningAge: BUILD_YEAR - year,
      generation: gen.name,
      generationYears: gen.years,
      chineseZodiac: getChineseZodiac(year),
    });
  }

  return pages;
}

export const BORN_IN_PAGES: BornInPage[] = buildAllPages();

export function getAllBornInPages(): BornInPage[] {
  return BORN_IN_PAGES;
}

export function getBornInBySlug(slug: string): BornInPage | undefined {
  return BORN_IN_PAGES.find((p) => p.slug === slug);
}
