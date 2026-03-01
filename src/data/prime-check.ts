// ==========================================================================
//  Prime Check Data for Programmatic SEO Pages
//  Generates ~226 pages at /math/is-{number}-prime/
// ==========================================================================

import { isPrime, nextPrime, previousPrime, nthPrimeOrdinal, getFactors, getPrimeFactors, formatPrimeFactorization } from './math-utils';

export interface PrimeCheckPage {
  slug: string;              // "91"
  number: number;
  isPrime: boolean;
  factors: number[];
  factorCount: number;
  nextPrimeNum: number;
  prevPrimeNum: number;
  primeFactorization: string;
  nthPrime: number;          // ordinal if prime, 0 if not
  nearbyPrimes: number[];
  isEven: boolean;
  digitSum: number;
}

// 1-200 + commonly confused composites + round numbers
const TARGET_NUMBERS = [
  ...Array.from({ length: 200 }, (_, i) => i + 1),
  // Commonly thought to be prime (but aren't)
  201, 207, 209, 213, 217, 219, 221, 247, 253, 259,
  261, 267, 289, 291, 299, 301, 309, 319, 321, 323,
  329, 333, 341, 351, 361, 371, 377, 381, 391, 399,
  // Round numbers
  250, 300, 400, 500, 750, 1000,
];

function getDigitSum(n: number): number {
  return String(n).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
}

function getNearbyPrimes(n: number): number[] {
  const primes: number[] = [];
  let below = n - 1;
  while (below >= 2 && primes.length < 3) {
    if (isPrime(below)) primes.unshift(below);
    below--;
  }
  let above = n + 1;
  let count = 0;
  while (count < 3 && above < n + 50) {
    if (isPrime(above)) { primes.push(above); count++; }
    above++;
  }
  return primes;
}

function buildAllPages(): PrimeCheckPage[] {
  const seen = new Set<number>();
  const pages: PrimeCheckPage[] = [];

  for (const n of TARGET_NUMBERS) {
    if (seen.has(n)) continue;
    seen.add(n);

    const prime = isPrime(n);
    const factors = getFactors(n);
    const pf = n > 1 ? getPrimeFactors(n) : [];

    pages.push({
      slug: String(n),
      number: n,
      isPrime: prime,
      factors,
      factorCount: factors.length,
      nextPrimeNum: nextPrime(n),
      prevPrimeNum: previousPrime(n),
      primeFactorization: n > 1 ? formatPrimeFactorization(pf) : '1',
      nthPrime: prime ? nthPrimeOrdinal(n) : 0,
      nearbyPrimes: getNearbyPrimes(n),
      isEven: n % 2 === 0,
      digitSum: getDigitSum(n),
    });
  }

  return pages.sort((a, b) => a.number - b.number);
}

let _cache: PrimeCheckPage[] | null = null;

export function getAllPrimeCheckPages(): PrimeCheckPage[] {
  if (!_cache) _cache = buildAllPages();
  return _cache;
}

export function getPrimeCheckBySlug(slug: string): PrimeCheckPage | undefined {
  return getAllPrimeCheckPages().find((p) => p.slug === slug);
}
