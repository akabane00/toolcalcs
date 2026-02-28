export interface FactorsPage {
  slug: string;
  number: number;
  factors: number[];
  factorPairs: [number, number][];
  primeFactors: number[];
  primeFactorization: string;
  isPrime: boolean;
  isComposite: boolean;
  isEven: boolean;
  factorCount: number;
  factorSum: number;
  isPerfect: boolean;
}

function getFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

function getFactorPairs(n: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) pairs.push([i, n / i]);
  }
  return pairs;
}

function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  let val = n;
  while (d * d <= val) {
    while (val % d === 0) {
      factors.push(d);
      val /= d;
    }
    d++;
  }
  if (val > 1) factors.push(val);
  return factors;
}

function formatPrimeFactorization(factors: number[]): string {
  if (factors.length === 0) return '';
  const counts = new Map<number, number>();
  for (const f of factors) counts.set(f, (counts.get(f) || 0) + 1);
  return [...counts.entries()]
    .map(([base, exp]) => exp === 1 ? String(base) : `${base}^${exp}`)
    .join(' × ');
}

// Target numbers: 1-100, plus selected larger numbers
const TARGET_NUMBERS = [
  ...Array.from({ length: 100 }, (_, i) => i + 1),
  102, 108, 110, 112, 120, 125, 128, 132, 140, 144, 150,
  160, 175, 180, 192, 196, 200, 210, 225, 240, 250,
  256, 270, 288, 300, 360, 400, 432, 480, 500, 512,
  600, 625, 720, 750, 800, 900, 1000, 1024, 1440, 2000,
];

export function getAllFactorsPages(): FactorsPage[] {
  return [...new Set(TARGET_NUMBERS)].sort((a, b) => a - b).map(n => {
    const factors = getFactors(n);
    const primeFactors = n > 1 ? getPrimeFactors(n) : [];
    const factorSum = factors.reduce((s, f) => s + f, 0);
    return {
      slug: String(n),
      number: n,
      factors,
      factorPairs: getFactorPairs(n),
      primeFactors,
      primeFactorization: n > 1 ? formatPrimeFactorization(primeFactors) : '1',
      isPrime: n > 1 && factors.length === 2,
      isComposite: n > 1 && factors.length > 2,
      isEven: n % 2 === 0,
      factorCount: factors.length,
      factorSum,
      isPerfect: factorSum - n === n,
    };
  });
}

export function getFactorsBySlug(slug: string): FactorsPage | undefined {
  return getAllFactorsPages().find(p => p.slug === slug);
}
