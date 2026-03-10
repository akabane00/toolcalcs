// ==========================================================================
//  Personal Loan Payment Data for Programmatic SEO Pages
//  Generates ~40 pages at /loan/{slug}/
// ==========================================================================

export interface LoanPage {
  slug: string;
  loanAmount: number;
  loanDisplay: string;
  rate: number;
  termYears: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

const LOAN_AMOUNTS = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000];
const RATES = [6, 8, 10, 12, 15];
const TERMS = [2, 3, 5, 7];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  var monthlyRate = annualRate / 100 / 12;
  var months = termYears * 12;
  if (monthlyRate === 0) return round2(principal / months);
  var payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return round2(payment);
}

function buildLoanPage(amount: number, rate: number, term: number): LoanPage {
  var monthly = calcMonthlyPayment(amount, rate, term);
  var totalMonths = term * 12;
  var totalPayment = round2(monthly * totalMonths);
  var totalInterest = round2(totalPayment - amount);

  var slug = amount + '-loan-' + term + 'yr-' + rate + '-percent';

  return {
    slug: slug,
    loanAmount: amount,
    loanDisplay: '$' + amount.toLocaleString('en-US'),
    rate: rate,
    termYears: term,
    monthlyPayment: monthly,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
  };
}

// Select strategic combinations (~40 pages)
// - All 8 amounts at 3yr with 8%, 10%, 12% = 24 pages
// - Popular amounts ($10K, $20K, $30K, $50K) at 5yr with all 5 rates = 20 pages
// - Deduplicate overlaps -> ~40 unique pages
function selectCombinations(): { amount: number; rate: number; term: number }[] {
  var combos: { amount: number; rate: number; term: number }[] = [];
  var seen: { [key: string]: boolean } = {};

  function addCombo(amount: number, rate: number, term: number) {
    var key = amount + '-' + rate + '-' + term;
    if (!seen[key]) {
      seen[key] = true;
      combos.push({ amount: amount, rate: rate, term: term });
    }
  }

  var threeYearRates = [8, 10, 12];
  var popularAmounts = [10000, 20000, 30000, 50000];

  // All 8 amounts at 3yr with 8%, 10%, 12%
  for (var a = 0; a < LOAN_AMOUNTS.length; a++) {
    for (var r = 0; r < threeYearRates.length; r++) {
      addCombo(LOAN_AMOUNTS[a], threeYearRates[r], 3);
    }
  }

  // Popular amounts at 5yr with all 5 rates
  for (var a = 0; a < popularAmounts.length; a++) {
    for (var r = 0; r < RATES.length; r++) {
      addCombo(popularAmounts[a], RATES[r], 5);
    }
  }

  return combos;
}

let _cache: LoanPage[] | null = null;

export function getAllLoanPages(): LoanPage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildLoanPage(c.amount, c.rate, c.term);
  });
  return _cache;
}

export function getLoanPageBySlug(slug: string): LoanPage | undefined {
  return getAllLoanPages().find(function (p) { return p.slug === slug; });
}

export { LOAN_AMOUNTS, RATES, TERMS, formatMoney };
