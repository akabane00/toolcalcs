// ==========================================================================
//  Mortgage Payment Data for Programmatic SEO Pages
//  Generates ~42 pages at /mortgage/{slug}/
// ==========================================================================

export interface MortgagePage {
  slug: string;
  loanAmount: number;
  loanDisplay: string;
  rate: number;
  termYears: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyTax: number;        // estimated monthly at 1.1% annual
  monthlyInsurance: number;  // estimated monthly at $100/mo per $200K
  monthlyPITI: number;
}

const LOAN_AMOUNTS = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 750000, 1000000];
const RATES = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5];
const TERMS = [15, 30];

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

function buildMortgagePage(amount: number, rate: number, term: number): MortgagePage {
  var monthly = calcMonthlyPayment(amount, rate, term);
  var totalMonths = term * 12;
  var totalPayment = round2(monthly * totalMonths);
  var totalInterest = round2(totalPayment - amount);

  // Property tax: 1.1% of loan amount annually, divided by 12
  var propertyTax = round2(amount * 0.011 / 12);

  // Insurance: $100/mo per $200K
  var insurance = round2(amount / 200000 * 100);

  var totalMonthlyPITI = round2(monthly + propertyTax + insurance);

  var slug = amount + '-mortgage-' + term + 'yr-' + rate + '-percent';

  return {
    slug: slug,
    loanAmount: amount,
    loanDisplay: '$' + amount.toLocaleString('en-US'),
    rate: rate,
    termYears: term,
    monthlyPayment: monthly,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    monthlyTax: propertyTax,
    monthlyInsurance: insurance,
    monthlyPITI: totalMonthlyPITI,
  };
}

// Select strategic combinations (~42 pages)
// - Primary amounts ($100K–$500K by $100K): 30-year at all 6 rates = 30 pages
// - Primary amounts ($200K–$500K): 15-year at 6%, 6.5%, 7% = 12 pages
// Total: ~42 pages covering the highest search volume combos
function selectCombinations(): { amount: number; rate: number; term: number }[] {
  var combos: { amount: number; rate: number; term: number }[] = [];

  var primaryAmounts = [100000, 200000, 300000, 400000, 500000];
  var fifteenYearAmounts = [200000, 300000, 400000, 500000];
  var currentRates = [6.0, 6.5, 7.0];

  // Primary amounts: 30-year at all rates
  for (var a = 0; a < primaryAmounts.length; a++) {
    for (var r = 0; r < RATES.length; r++) {
      combos.push({
        amount: primaryAmounts[a],
        rate: RATES[r],
        term: 30,
      });
    }
  }

  // Primary amounts (except $100K): 15-year at current popular rates
  for (var a = 0; a < fifteenYearAmounts.length; a++) {
    for (var r = 0; r < currentRates.length; r++) {
      combos.push({
        amount: fifteenYearAmounts[a],
        rate: currentRates[r],
        term: 15,
      });
    }
  }

  return combos;
}

let _cache: MortgagePage[] | null = null;

export function getAllMortgagePages(): MortgagePage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildMortgagePage(c.amount, c.rate, c.term);
  });
  return _cache;
}

export function getMortgagePageBySlug(slug: string): MortgagePage | undefined {
  return getAllMortgagePages().find(function (p) { return p.slug === slug; });
}

export { LOAN_AMOUNTS, RATES, TERMS, formatMoney };
