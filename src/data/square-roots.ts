// ==========================================================================
//  Square Root Data for Programmatic SEO Pages
//  Generates ~217 pages at /math/square-root-of-{number}/
// ==========================================================================

import { simplifyRadical, isPrime as checkPrime, getFactors } from './math-utils';

export interface SquareRootPage {
  slug: string;              // "144"
  number: number;
  squareRoot: string;        // "12" or "7.0710678..."
  squareRootDecimal: string; // full decimal representation
  isPerfectSquare: boolean;
  simplifiedForm: string;    // "12" or "2√3"
  coefficient: number;       // 2 (for 2√3)
  radicand: number;          // 3 (for 2√3)
  nearestPerfectBelow: number;
  nearestPerfectAbove: number;
  squareOfNumber: number;    // n^2
  isPrime: boolean;
}

const TARGET_NUMBERS = [
  ...Array.from({ length: 500 }, (_, i) => i + 1),
  625, 729, 900, 1000, 1024, 1296, 1600, 2000, 2025, 2500, 10000,
];

function nearestPerfect(n: number, dir: 'below' | 'above'): number {
  const sqrtN = Math.sqrt(n);
  if (dir === 'below') {
    const base = Math.floor(sqrtN);
    return base * base === n && base > 0 ? (base - 1) * (base - 1) : base * base;
  }
  const base = Math.ceil(sqrtN);
  return base * base === n ? (base + 1) * (base + 1) : base * base;
}

function buildAllPages(): SquareRootPage[] {
  const seen = new Set<number>();
  const pages: SquareRootPage[] = [];

  for (const n of TARGET_NUMBERS) {
    if (seen.has(n)) continue;
    seen.add(n);

    const sqrtVal = Math.sqrt(n);
    const perfect = Number.isInteger(sqrtVal);
    const { coefficient, radicand } = simplifyRadical(n);

    let simplified: string;
    if (perfect) {
      simplified = String(Math.round(sqrtVal));
    } else if (coefficient === 1) {
      simplified = `√${radicand}`;
    } else {
      simplified = `${coefficient}√${radicand}`;
    }

    let decStr: string;
    if (perfect) {
      decStr = String(Math.round(sqrtVal));
    } else {
      decStr = sqrtVal.toFixed(10).replace(/0+$/, '');
    }

    pages.push({
      slug: String(n),
      number: n,
      squareRoot: perfect ? String(Math.round(sqrtVal)) : sqrtVal.toFixed(6),
      squareRootDecimal: decStr,
      isPerfectSquare: perfect,
      simplifiedForm: simplified,
      coefficient,
      radicand,
      nearestPerfectBelow: nearestPerfect(n, 'below'),
      nearestPerfectAbove: nearestPerfect(n, 'above'),
      squareOfNumber: n * n,
      isPrime: checkPrime(n),
    });
  }

  return pages.sort((a, b) => a.number - b.number);
}

let _cache: SquareRootPage[] | null = null;

export function getAllSquareRootPages(): SquareRootPage[] {
  if (!_cache) _cache = buildAllPages();
  return _cache;
}

export function getSquareRootBySlug(slug: string): SquareRootPage | undefined {
  return getAllSquareRootPages().find((p) => p.slug === slug);
}
