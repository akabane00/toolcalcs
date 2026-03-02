// ==========================================================================
//  Percent Off Data for Programmatic SEO Pages
//  Generates 280 pages at /percent-off/{X}-percent-off-{Y}/
// ==========================================================================

export interface PercentOffPage {
  slug: string;            // "20-percent-off-50"
  discountPercent: number; // 20
  originalPrice: number;   // 50
  discountAmount: number;  // 10
  finalPrice: number;      // 40
  savingsRatio: string;    // "1/5"
}

export const discountPercents = [5, 10, 15, 20, 25, 30, 33, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];

export const originalPrices = [
  10, 15, 19, 20, 25, 29, 30, 35, 39, 40,
  45, 49, 50, 55, 60, 65, 69, 75, 79, 80,
  89, 90, 99, 100, 110, 120, 125, 130, 140,
  150, 175, 199, 200, 225, 250, 275, 300,
  350, 400, 450, 500, 600, 750, 800, 900, 1000,
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const fractionMap: Record<number, string> = {
  5: '1/20', 10: '1/10', 15: '3/20', 20: '1/5', 25: '1/4',
  30: '3/10', 33: '1/3', 35: '7/20', 40: '2/5', 45: '9/20',
  50: '1/2', 55: '11/20', 60: '3/5', 65: '13/20', 70: '7/10',
  75: '3/4', 80: '4/5', 85: '17/20', 90: '9/10',
};

export function getAllPercentOffPages(): PercentOffPage[] {
  const pages: PercentOffPage[] = [];
  for (const pct of discountPercents) {
    for (const price of originalPrices) {
      const discountAmount = round2(price * pct / 100);
      pages.push({
        slug: `${pct}-percent-off-${price}`,
        discountPercent: pct,
        originalPrice: price,
        discountAmount,
        finalPrice: round2(price - discountAmount),
        savingsRatio: fractionMap[pct] || `${pct}/100`,
      });
    }
  }
  return pages;
}

export function getPercentOffBySlug(slug: string): PercentOffPage | undefined {
  return getAllPercentOffPages().find(p => p.slug === slug);
}
