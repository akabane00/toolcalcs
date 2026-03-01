// ==========================================================================
//  Division Data for Programmatic SEO Pages
//  Generates ~210 pages at /math/{dividend}-divided-by-{divisor}/
// ==========================================================================

export interface DividedByPage {
  slug: string;              // "100-divided-by-3"
  dividend: number;          // 100
  divisor: number;           // 3
  quotient: number;          // 33
  remainder: number;         // 1
  decimalResult: string;     // "33.3333..."
  isDivisible: boolean;      // true if remainder === 0
  isRepeating: boolean;      // true if decimal repeats
}

export const dividends = [
  10, 12, 15, 16, 18, 20, 24, 25, 30, 36,
  48, 50, 60, 72, 100, 120, 144, 150, 200,
  250, 300, 360, 500, 1000,
];

export const divisors = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 20, 25,
];

function isRepeatingDecimal(dividend: number, divisor: number): boolean {
  if (dividend % divisor === 0) return false;
  var d = divisor;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d !== 1;
}

function toDecimalString(dividend: number, divisor: number): string {
  if (dividend % divisor === 0) return String(dividend / divisor);
  var result = dividend / divisor;
  if (isRepeatingDecimal(dividend, divisor)) {
    return result.toFixed(6) + '...';
  }
  return String(parseFloat(result.toFixed(10)));
}

export function getAllDividedByPages(): DividedByPage[] {
  const pages: DividedByPage[] = [];
  const seen = new Set<string>();

  for (const dividend of dividends) {
    for (const divisor of divisors) {
      if (divisor >= dividend) continue;
      const slug = `${dividend}-divided-by-${divisor}`;
      if (seen.has(slug)) continue;
      seen.add(slug);

      pages.push({
        slug,
        dividend,
        divisor,
        quotient: Math.floor(dividend / divisor),
        remainder: dividend % divisor,
        decimalResult: toDecimalString(dividend, divisor),
        isDivisible: dividend % divisor === 0,
        isRepeating: isRepeatingDecimal(dividend, divisor),
      });
    }
  }

  return pages;
}

export function getDividedByBySlug(slug: string): DividedByPage | undefined {
  return getAllDividedByPages().find(p => p.slug === slug);
}
