export interface FractionPage {
  slug: string;
  numerator: number;
  denominator: number;
  decimal: string;
  percent: string;
  simplified: { num: number; den: number };
  isProper: boolean;
  mixedNumber: { whole: number; num: number; den: number } | null;
  isTerminating: boolean;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function isTerminating(den: number): boolean {
  let d = den / gcd(den, 1);
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
}

function toDecimal(num: number, den: number): string {
  const val = num / den;
  if (isTerminating(den / gcd(num, den))) {
    return String(parseFloat(val.toFixed(10)));
  }
  // Show repeating with ellipsis, max 10 decimal places
  return val.toFixed(10).replace(/0+$/, '') + '…';
}

// Generate target fractions
const TARGET_DENOMINATORS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20, 25, 50, 100];

export function getAllFractionPages(): FractionPage[] {
  const pages: FractionPage[] = [];
  const seen = new Set<string>();

  for (const den of TARGET_DENOMINATORS) {
    for (let num = 1; num < den * 2; num++) {
      if (num === den) continue; // skip x/x = 1
      const g = gcd(num, den);
      const sNum = num / g;
      const sDen = den / g;
      const key = `${num}-${den}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const val = num / den;
      const proper = num < den;
      let mixed: FractionPage['mixedNumber'] = null;
      if (!proper) {
        const whole = Math.floor(num / den);
        const remNum = num - whole * den;
        if (remNum > 0) {
          const mg = gcd(remNum, den);
          mixed = { whole, num: remNum / mg, den: den / mg };
        }
      }

      pages.push({
        slug: `${num}-${den}`,
        numerator: num,
        denominator: den,
        decimal: toDecimal(num, den),
        percent: (val * 100).toFixed(val * 100 === Math.round(val * 100) ? 0 : 2).replace(/\.?0+$/, '') + '%',
        simplified: { num: sNum, den: sDen },
        isProper: proper,
        mixedNumber: mixed,
        isTerminating: isTerminating(sDen),
      });
    }
  }
  return pages;
}

export function getFractionBySlug(slug: string): FractionPage | undefined {
  return getAllFractionPages().find(p => p.slug === slug);
}
