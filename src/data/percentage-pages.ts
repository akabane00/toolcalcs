// ==========================================================================
//  Percentage Page Data for Programmatic SEO Pages
//  Generates 285 pages at /percentage/{X}-percent-of-{Y}/
// ==========================================================================

export interface PercentagePage {
  percentage: number;
  baseNumber: number;
  result: number;
  slug: string; // "20-percent-of-100"
}

const percentages = [1, 2, 3, 5, 10, 15, 20, 25, 30, 33, 40, 50, 60, 75, 80, 90, 100, 150, 200];
const baseNumbers = [50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 1000, 1500, 2000, 5000, 10000];

export function getAllPercentagePages(): PercentagePage[] {
  const pages: PercentagePage[] = [];

  for (const percentage of percentages) {
    for (const baseNumber of baseNumbers) {
      const result = (percentage / 100) * baseNumber;
      pages.push({
        percentage,
        baseNumber,
        result,
        slug: `${percentage}-percent-of-${baseNumber}`,
      });
    }
  }

  return pages;
}

export { percentages, baseNumbers };
