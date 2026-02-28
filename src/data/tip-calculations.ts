export interface TipPage {
  slug: string;
  tipPercent: number;
  billAmount: number;
  tipAmount: number;
  totalAmount: number;
  perPerson: { people: number; tipEach: number; totalEach: number }[];
}

const PERCENTS = [10, 15, 18, 20, 25];
const AMOUNTS = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  60, 65, 70, 75, 80, 85, 90, 95, 100, 125, 150, 200,
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getAllTipPages(): TipPage[] {
  const pages: TipPage[] = [];
  for (const pct of PERCENTS) {
    for (const amt of AMOUNTS) {
      const tip = round2(amt * pct / 100);
      const total = round2(amt + tip);
      pages.push({
        slug: `${pct}-percent-on-${amt}`,
        tipPercent: pct,
        billAmount: amt,
        tipAmount: tip,
        totalAmount: total,
        perPerson: [2, 3, 4, 5, 6].map(n => ({
          people: n,
          tipEach: round2(tip / n),
          totalEach: round2(total / n),
        })),
      });
    }
  }
  return pages;
}

export function getTipBySlug(slug: string): TipPage | undefined {
  return getAllTipPages().find(p => p.slug === slug);
}
