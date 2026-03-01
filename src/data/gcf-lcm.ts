// ==========================================================================
//  GCF & LCM Data for Programmatic SEO Pages
//  Generates ~400 pages at /math/gcf-of-{a}-and-{b}/
// ==========================================================================

import { gcd, lcm, getFactors, getPrimeFactors, formatPrimeFactorization } from './math-utils';

export interface GcfLcmPage {
  slug: string;              // "12-and-18"
  numA: number;
  numB: number;
  gcf: number;
  lcm: number;
  factorsA: number[];
  factorsB: number[];
  commonFactors: number[];
  primeFactorsA: number[];
  primeFactorsB: number[];
  primeFactorizationA: string;
  primeFactorizationB: string;
  product: number;
  relationship: string;      // "12 × 18 = 216 = 6 × 36"
}

// All pairs from [2..30]
function smallPairs(): [number, number][] {
  const pairs: [number, number][] = [];
  for (let a = 2; a <= 30; a++) {
    for (let b = a + 1; b <= 30; b++) {
      pairs.push([a, b]);
    }
  }
  return pairs;
}

// Selected pairs from [31..100] — commonly searched
function mediumPairs(): [number, number][] {
  const meds = [32, 33, 35, 36, 40, 42, 44, 45, 48, 50, 54, 55, 56, 60,
    63, 64, 66, 70, 72, 75, 80, 81, 84, 90, 96, 100];
  const pairs: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < meds.length; i++) {
    for (let j = i + 1; j < meds.length; j++) {
      const a = meds[i], b = meds[j];
      const key = `${a}-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push([a, b]);
      }
    }
  }
  // Also pair small numbers with medium numbers
  const smalls = [2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30];
  for (const s of smalls) {
    for (const m of meds) {
      if (s < m) {
        const key = `${s}-${m}`;
        if (!seen.has(key)) {
          seen.add(key);
          pairs.push([s, m]);
        }
      }
    }
  }
  return pairs;
}

// Larger popular/educational pairs
const EXTRA_PAIRS: [number, number][] = [
  [48, 60], [54, 72], [56, 84], [60, 90], [72, 96],
  [80, 120], [84, 108], [90, 120], [100, 150], [120, 180],
  [24, 36], [36, 48], [48, 72], [60, 84], [72, 108],
  [90, 150], [100, 120], [108, 144], [120, 160], [144, 180],
  [150, 200], [180, 240], [200, 300], [240, 360], [300, 400],
  [360, 480], [400, 500], [500, 600], [600, 720], [720, 840],
];

function buildAllPages(): GcfLcmPage[] {
  const seen = new Set<string>();
  const pages: GcfLcmPage[] = [];

  const allPairs = [...smallPairs(), ...mediumPairs(), ...EXTRA_PAIRS];

  for (const [a, b] of allPairs) {
    const numA = Math.min(a, b);
    const numB = Math.max(a, b);
    const key = `${numA}-and-${numB}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const g = gcd(numA, numB);
    const l = lcm(numA, numB);
    const fA = getFactors(numA);
    const fB = getFactors(numB);
    const common = fA.filter((f) => fB.includes(f));
    const pfA = getPrimeFactors(numA);
    const pfB = getPrimeFactors(numB);
    const prod = numA * numB;

    pages.push({
      slug: key,
      numA,
      numB,
      gcf: g,
      lcm: l,
      factorsA: fA,
      factorsB: fB,
      commonFactors: common,
      primeFactorsA: pfA,
      primeFactorsB: pfB,
      primeFactorizationA: formatPrimeFactorization(pfA),
      primeFactorizationB: formatPrimeFactorization(pfB),
      product: prod,
      relationship: `${numA} × ${numB} = ${prod} = ${g} × ${l}`,
    });
  }

  return pages.sort((a, b) => a.numA - b.numA || a.numB - b.numB);
}

let _cache: GcfLcmPage[] | null = null;

export function getAllGcfLcmPages(): GcfLcmPage[] {
  if (!_cache) _cache = buildAllPages();
  return _cache;
}

export function getGcfLcmBySlug(slug: string): GcfLcmPage | undefined {
  return getAllGcfLcmPages().find((p) => p.slug === slug);
}
