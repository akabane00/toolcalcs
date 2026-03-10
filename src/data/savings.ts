// ==========================================================================
//  Savings Growth Data for Programmatic SEO Pages
//  Generates ~40 pages at /savings/{slug}/
// ==========================================================================

export interface SavingsPage {
  slug: string;
  initialDeposit: number;
  depositDisplay: string;
  rate: number;
  termYears: number;
  futureValue: number;
  totalInterest: number;
  monthlyEquivalent: number;
}

var DEPOSITS = [1000, 5000, 10000, 25000, 50000, 100000];
var RATES = [3, 4, 4.5, 5, 6, 7];
var TERMS = [1, 5, 10, 20, 30];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildPage(deposit: number, rate: number, termYears: number): SavingsPage {
  var r = rate / 100;
  // Annual compounding: FV = P * (1 + r)^t
  var futureValue = deposit * Math.pow(1 + r, termYears);
  var totalInterest = futureValue - deposit;
  var monthlyEquivalent = totalInterest / (termYears * 12);

  return {
    slug: deposit + '-savings-' + termYears + 'yr-' + rate.toString().replace('.', '-') + '-percent',
    initialDeposit: deposit,
    depositDisplay: '$' + deposit.toLocaleString('en-US'),
    rate: rate,
    termYears: termYears,
    futureValue: round2(futureValue),
    totalInterest: round2(totalInterest),
    monthlyEquivalent: round2(monthlyEquivalent),
  };
}

// Strategic combinations (~40 pages)
function selectCombinations(): { deposit: number; rate: number; termYears: number }[] {
  var combos: { deposit: number; rate: number; termYears: number }[] = [];
  var seen: { [key: string]: boolean } = {};

  function add(d: number, r: number, t: number) {
    var key = d + '-' + r + '-' + t;
    if (!seen[key]) {
      seen[key] = true;
      combos.push({ deposit: d, rate: r, termYears: t });
    }
  }

  // Popular amounts ($5K, $10K, $25K, $50K) at 5yr with all 6 rates = 24 pages
  var popularAmounts5yr = [5000, 10000, 25000, 50000];
  for (var i = 0; i < popularAmounts5yr.length; i++) {
    for (var j = 0; j < RATES.length; j++) {
      add(popularAmounts5yr[i], RATES[j], 5);
    }
  }

  // Popular amounts ($10K, $25K, $50K, $100K) at 10yr with 4%, 5%, 6% = 12 pages
  var popularAmounts10yr = [10000, 25000, 50000, 100000];
  var rates10yr = [4, 5, 6];
  for (var i = 0; i < popularAmounts10yr.length; i++) {
    for (var j = 0; j < rates10yr.length; j++) {
      add(popularAmounts10yr[i], rates10yr[j], 10);
    }
  }

  // $10K, $50K at 20yr with 5%, 6%, 7% = 6 pages
  var amounts20yr = [10000, 50000];
  var rates20yr = [5, 6, 7];
  for (var i = 0; i < amounts20yr.length; i++) {
    for (var j = 0; j < rates20yr.length; j++) {
      add(amounts20yr[i], rates20yr[j], 20);
    }
  }

  return combos;
}

var _cache: SavingsPage[] | null = null;

export function getAllSavingsPages(): SavingsPage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildPage(c.deposit, c.rate, c.termYears);
  });
  return _cache;
}

export function getSavingsPageBySlug(slug: string): SavingsPage | undefined {
  return getAllSavingsPages().find(function (p) { return p.slug === slug; });
}

export { DEPOSITS, RATES, TERMS, formatMoney, round2 };
