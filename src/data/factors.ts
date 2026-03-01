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

// Target numbers: 1-200 continuous, plus selected larger composites
const TARGET_NUMBERS = [
  ...Array.from({ length: 200 }, (_, i) => i + 1),
  210, 216, 225, 240, 250, 252, 256, 270, 280, 288, 300, 315, 320,
  336, 343, 350, 360, 375, 378, 384, 392, 400, 420, 432, 441, 450,
  480, 500, 504, 512, 525, 540, 560, 576, 600, 625, 630, 648, 660,
  672, 700, 720, 729, 750, 768, 784, 800, 840, 864, 900, 960, 1000,
  1024, 1200, 1440, 1500, 2000, 2500, 3000, 5000, 10000,
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
