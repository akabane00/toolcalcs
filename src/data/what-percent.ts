// ==========================================================================
//  "What Percentage Is X of Y" Data for Programmatic SEO Pages
//  Generates ~200 pages at /what-percent/{X}-of-{Y}/
// ==========================================================================

export interface WhatPercentPage {
  slug: string;            // "25-of-100"
  partValue: number;       // 25
  wholeValue: number;      // 100
  percentage: number;      // 25
  percentStr: string;      // "25%"
  fractionSimplified: string; // "1/4"
  decimalForm: string;     // "0.25"
  isCleanPercent: boolean; // true if result is integer
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { var t = b; b = a % t; a = t; }
  return a;
}

const PAIRS: [number, number][] = [
  // Halves, thirds, quarters, fifths, sixths, eighths, tenths
  [1, 2], [1, 3], [2, 3], [1, 4], [3, 4],
  [1, 5], [2, 5], [3, 5], [4, 5],
  [1, 6], [5, 6], [1, 8], [3, 8], [5, 8], [7, 8],
  [1, 10], [3, 10], [7, 10], [9, 10],
  // Twelfths
  [1, 12], [5, 12], [7, 12], [11, 12],
  // Test / grade scores
  [7, 10], [8, 10], [9, 10],
  [13, 20], [15, 20], [17, 20], [18, 20], [19, 20],
  [70, 100], [75, 100], [80, 100], [85, 100], [90, 100], [95, 100],
  [33, 100], [67, 100],
  // Small everyday
  [1, 100], [5, 100], [10, 100], [15, 100], [20, 100], [25, 100],
  [30, 100], [40, 100], [50, 100], [60, 100], [99, 100],
  // Out of 50
  [10, 50], [15, 50], [20, 50], [25, 50], [30, 50], [35, 50], [40, 50], [45, 50],
  // Financial / shopping
  [10, 40], [10, 80], [15, 60], [20, 80], [25, 75],
  [30, 90], [40, 160], [50, 200], [75, 300],
  [100, 200], [100, 300], [100, 400], [100, 500],
  [200, 500], [200, 800], [250, 1000],
  // Educational
  [3, 12], [5, 20], [7, 28], [8, 32], [9, 36],
  [10, 25], [10, 30], [10, 40], [10, 50],
  [12, 48], [15, 60], [20, 80], [25, 100],
  [30, 120], [35, 140], [40, 200], [50, 250],
  [60, 300], [75, 150], [80, 200], [90, 300],
  [100, 150], [100, 250], [100, 1000],
  [150, 200], [150, 300], [150, 600],
  [200, 250], [200, 400], [200, 1000],
  [250, 500], [300, 400], [300, 500], [300, 600],
  [400, 500], [400, 800], [500, 600], [500, 1000],
  [600, 800], [750, 1000], [800, 1000],
  // Non-clean results commonly searched
  [1, 7], [2, 7], [3, 7], [1, 9], [2, 9], [4, 9],
  [1, 11], [2, 11],
  [33, 50], [17, 100],
  // Over 100%
  [3, 2], [5, 4], [4, 3], [5, 3], [7, 5], [10, 8],
  [150, 100], [200, 100],
];

const GRID_WHOLES = [10, 25, 50, 100];

function buildPage(x: number, y: number): WhatPercentPage {
  const pct = (x / y) * 100;
  const g = gcd(x, y);
  const isClean = Math.abs(pct - Math.round(pct)) < 0.0001;
  return {
    slug: `${x}-of-${y}`,
    partValue: x,
    wholeValue: y,
    percentage: isClean ? Math.round(pct) : parseFloat(pct.toFixed(4)),
    percentStr: isClean
      ? Math.round(pct) + '%'
      : pct.toFixed(2).replace(/\.?0+$/, '') + '%',
    fractionSimplified: `${x / g}/${y / g}`,
    decimalForm: isClean
      ? (pct / 100).toString()
      : (x / y).toFixed(6).replace(/0+$/, ''),
    isCleanPercent: isClean,
  };
}

let _cache: WhatPercentPage[] | null = null;

export function getAllWhatPercentPages(): WhatPercentPage[] {
  if (_cache) return _cache;
  const pages: WhatPercentPage[] = [];
  const seen = new Set<string>();

  // Curated pairs first
  for (const [x, y] of PAIRS) {
    const slug = `${x}-of-${y}`;
    if (seen.has(slug)) continue;
    seen.add(slug);
    pages.push(buildPage(x, y));
  }

  // Grid-generated pairs
  for (const y of GRID_WHOLES) {
    for (var x = 1; x <= 20; x++) {
      if (x >= y) continue;
      const slug = `${x}-of-${y}`;
      if (seen.has(slug)) continue;
      seen.add(slug);
      pages.push(buildPage(x, y));
    }
  }

  _cache = pages;
  return pages;
}

export function getWhatPercentBySlug(slug: string): WhatPercentPage | undefined {
  return getAllWhatPercentPages().find(p => p.slug === slug);
}
