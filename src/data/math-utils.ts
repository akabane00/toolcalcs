// ==========================================================================
//  Shared Math Utility Functions
//  Used by gcf-lcm, square-roots, powers, and prime-check data modules
// ==========================================================================

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function getFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

export function getFactorPairs(n: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) pairs.push([i, n / i]);
  }
  return pairs;
}

export function getPrimeFactors(n: number): number[] {
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

export function formatPrimeFactorization(factors: number[]): string {
  if (factors.length === 0) return '';
  const counts = new Map<number, number>();
  for (const f of factors) counts.set(f, (counts.get(f) || 0) + 1);
  return [...counts.entries()]
    .map(([base, exp]) => (exp === 1 ? String(base) : `${base}^${exp}`))
    .join(' × ');
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function nextPrime(n: number): number {
  let candidate = n + 1;
  while (!isPrime(candidate)) candidate++;
  return candidate;
}

export function previousPrime(n: number): number {
  if (n <= 2) return 0;
  let candidate = n - 1;
  while (candidate >= 2 && !isPrime(candidate)) candidate--;
  return candidate >= 2 ? candidate : 0;
}

/** Returns the ordinal position of n among primes (1-indexed), or 0 if not prime */
export function nthPrimeOrdinal(n: number): number {
  if (!isPrime(n)) return 0;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}

/** Simplify √n into coefficient√radicand (e.g., √12 → 2√3) */
export function simplifyRadical(n: number): { coefficient: number; radicand: number } {
  if (n <= 0) return { coefficient: 0, radicand: 0 };
  let coefficient = 1;
  let radicand = n;
  for (let i = 2; i * i <= radicand; i++) {
    while (radicand % (i * i) === 0) {
      coefficient *= i;
      radicand /= i * i;
    }
  }
  return { coefficient, radicand };
}
