// ==========================================================================
//  Born In Year Data for Programmatic SEO Pages
//  Generates 106 pages at /born-in/{year}/
// ==========================================================================

export interface BornInPage {
  year: number;
  slug: string;
  turningAge: number;
  generation: string;
  generationYears: string;
  chineseZodiac: string;
}

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
  return gen ? { name: gen.name, years: `${gen.start}–${gen.end}` } : { name: 'Unknown', years: '' };
}

function getChineseZodiac(year: number): string {
  return chineseZodiacAnimals[year % 12];
}

export function getAllBornInPages(): BornInPage[] {
  const buildYear = new Date().getFullYear();
  const pages: BornInPage[] = [];

  for (let year = 1920; year <= 2025; year++) {
    const gen = getGeneration(year);
    pages.push({
      year,
      slug: String(year),
      turningAge: buildYear - year,
      generation: gen.name,
      generationYears: gen.years,
      chineseZodiac: getChineseZodiac(year),
    });
  }

  return pages;
}
