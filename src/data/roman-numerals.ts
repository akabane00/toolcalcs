// ==========================================================================
//  Roman Numerals Data for Programmatic SEO Pages
//  Generates ~231 pages at /roman-numerals/{number}/
// ==========================================================================

export interface RomanNumeralPage {
  number: number;
  roman: string;
  slug: string;
  breakdown: { symbol: string; value: number }[];
}

const romanValues: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function intToRoman(num: number): string {
  let result = '';
  let remaining = num;
  for (const [value, symbol] of romanValues) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function romanToInt(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && map[s[i]] < map[s[i + 1]]) {
      result -= map[s[i]];
    } else {
      result += map[s[i]];
    }
  }
  return result;
}

export function getBreakdown(num: number): { symbol: string; value: number }[] {
  const parts: { symbol: string; value: number }[] = [];
  let remaining = num;
  for (const [value, symbol] of romanValues) {
    while (remaining >= value) {
      parts.push({ symbol, value });
      remaining -= value;
    }
  }
  return parts;
}

// Numbers to generate pages for
const targetNumbers: number[] = [
  // 1-100
  ...Array.from({ length: 100 }, (_, i) => i + 1),
  // 1900-2030
  ...Array.from({ length: 131 }, (_, i) => 1900 + i),
];

// Deduplicate and sort
const uniqueNumbers = [...new Set(targetNumbers)].sort((a, b) => a - b);

export function getAllRomanNumeralPages(): RomanNumeralPage[] {
  return uniqueNumbers.map((num) => ({
    number: num,
    roman: intToRoman(num),
    slug: String(num),
    breakdown: getBreakdown(num),
  }));
}

export function getRomanNumeralBySlug(slug: string): RomanNumeralPage | undefined {
  return getAllRomanNumeralPages().find(p => p.slug === slug);
}

// Symbol reference table for use in pages
export const romanSymbols = [
  { symbol: 'I', value: 1 },
  { symbol: 'V', value: 5 },
  { symbol: 'X', value: 10 },
  { symbol: 'L', value: 50 },
  { symbol: 'C', value: 100 },
  { symbol: 'D', value: 500 },
  { symbol: 'M', value: 1000 },
];
