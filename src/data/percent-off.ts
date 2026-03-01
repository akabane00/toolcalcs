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

export const discountPercents = [5, 10, 15, 20, 25, 30, 33, 40, 50, 60, 70, 75, 80, 90];

export const originalPrices = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 60,
  75, 80, 100, 120, 150, 200, 250, 300, 500, 1000,
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const fractionMap: Record<number, string> = {
  5: '1/20', 10: '1/10', 15: '3/20', 20: '1/5', 25: '1/4',
  30: '3/10', 33: '1/3', 40: '2/5', 50: '1/2', 60: '3/5',
  70: '7/10', 75: '3/4', 80: '4/5', 90: '9/10',
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
