// ==========================================================================
//  Compound Interest Data for Programmatic SEO Pages
//  Generates ~250 pages at /compound-interest/{slug}/
// ==========================================================================

export interface CompoundInterestPage {
  slug: string;
  principal: number;
  principalDisplay: string;
  rate: number;
  years: number;
  compoundFreq: string;        // "monthly"
  finalAmount: number;
  totalInterest: number;
  effectiveRate: number;       // effective annual rate
  doublingYears: number;       // Rule of 72
  yearlyBreakdown: { year: number; balance: number; interest: number; totalInterest: number }[];
}

const PRINCIPALS = [1000, 5000, 10000, 25000, 50000, 100000];
const RATES = [3, 4, 5, 6, 7, 8, 10, 12];
const YEARS = [1, 3, 5, 10, 15, 20, 25, 30];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildPage(principal: number, rate: number, years: number): CompoundInterestPage {
  var r = rate / 100;
  var n = 12; // monthly compounding
  var finalAmount = principal * Math.pow(1 + r / n, n * years);
  var totalInterest = finalAmount - principal;
  var effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
  var doublingYears = round2(72 / rate);

  var breakdown: { year: number; balance: number; interest: number; totalInterest: number }[] = [];
  var prevBalance = principal;
  for (var y = 1; y <= years; y++) {
    var balance = principal * Math.pow(1 + r / n, n * y);
    var yearInterest = balance - prevBalance;
    var cumInterest = balance - principal;
    breakdown.push({
      year: y,
      balance: round2(balance),
      interest: round2(yearInterest),
      totalInterest: round2(cumInterest),
    });
    prevBalance = balance;
  }

  return {
    slug: principal + '-at-' + rate + '-percent-for-' + years + '-years',
    principal: principal,
    principalDisplay: '$' + principal.toLocaleString('en-US'),
    rate: rate,
    years: years,
    compoundFreq: 'monthly',
    finalAmount: round2(finalAmount),
    totalInterest: round2(totalInterest),
    effectiveRate: round2(effectiveRate),
    doublingYears: doublingYears,
    yearlyBreakdown: breakdown,
  };
}

// Select meaningful combinations (~250 pages)
function selectCombinations(): { principal: number; rate: number; years: number }[] {
  var combos: { principal: number; rate: number; years: number }[] = [];

  for (var p = 0; p < PRINCIPALS.length; p++) {
    for (var r = 0; r < RATES.length; r++) {
      for (var y = 0; y < YEARS.length; y++) {
        // Skip very short periods for large principals (less interesting)
        if (PRINCIPALS[p] >= 50000 && YEARS[y] <= 1) continue;
        // Skip very long periods for very small principals
        if (PRINCIPALS[p] <= 1000 && YEARS[y] >= 25) continue;
        combos.push({
          principal: PRINCIPALS[p],
          rate: RATES[r],
          years: YEARS[y],
        });
      }
    }
  }

  return combos;
}

let _cache: CompoundInterestPage[] | null = null;

export function getAllCompoundInterestPages(): CompoundInterestPage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildPage(c.principal, c.rate, c.years);
  });
  return _cache;
}

export function getCompoundInterestBySlug(slug: string): CompoundInterestPage | undefined {
  return getAllCompoundInterestPages().find(function (p) { return p.slug === slug; });
}

export { PRINCIPALS, RATES, YEARS, formatMoney };
