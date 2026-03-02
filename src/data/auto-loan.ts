// ==========================================================================
//  Auto Loan Payment Data for Programmatic SEO Pages
//  Generates ~300 pages at /auto-loan/{slug}/
// ==========================================================================

export interface AutoLoanPage {
  slug: string;
  loanAmount: number;
  loanDisplay: string;
  rate: number;
  termMonths: number;
  termYears: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: string; // "Month YYYY" relative description
  schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[];
}

var LOAN_AMOUNTS = [5000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000];
var RATES = [3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.9, 12];
var TERMS = [36, 48, 60, 72, 84]; // months

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcMonthlyPayment(principal: number, annualRate: number, months: number): number {
  var monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return round2(principal / months);
  var payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return round2(payment);
}

function buildPage(amount: number, rate: number, termMonths: number): AutoLoanPage {
  var monthly = calcMonthlyPayment(amount, rate, termMonths);
  var totalPayment = round2(monthly * termMonths);
  var totalInterest = round2(totalPayment - amount);
  var termYears = termMonths / 12;

  // Build first 12 months + every 12th month after that for the schedule
  var schedule: AutoLoanPage['schedule'] = [];
  var balance = amount;
  var monthlyRate = rate / 100 / 12;

  for (var m = 1; m <= termMonths; m++) {
    var interestPart = round2(balance * monthlyRate);
    var principalPart = round2(monthly - interestPart);
    balance = round2(balance - principalPart);
    if (balance < 0) balance = 0;

    // Include first 12, then every 12th, and the last month
    if (m <= 12 || m % 12 === 0 || m === termMonths) {
      schedule.push({
        month: m,
        payment: monthly,
        principal: principalPart,
        interest: interestPart,
        balance: Math.max(0, balance),
      });
    }
  }

  var slug = amount + '-at-' + rate.toString().replace('.', '-') + '-for-' + termMonths + '-months';

  return {
    slug: slug,
    loanAmount: amount,
    loanDisplay: '$' + amount.toLocaleString('en-US'),
    rate: rate,
    termMonths: termMonths,
    termYears: termYears,
    monthlyPayment: monthly,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    payoffDate: termYears + ' years (' + termMonths + ' months)',
    schedule: schedule,
  };
}

function selectCombinations(): { amount: number; rate: number; term: number }[] {
  var combos: { amount: number; rate: number; term: number }[] = [];

  for (var a = 0; a < LOAN_AMOUNTS.length; a++) {
    for (var r = 0; r < RATES.length; r++) {
      for (var t = 0; t < TERMS.length; t++) {
        // Skip very short terms for very large loans (uncommon)
        if (LOAN_AMOUNTS[a] >= 60000 && TERMS[t] <= 36) continue;
        // Skip very long terms for small loans (uncommon)
        if (LOAN_AMOUNTS[a] <= 8000 && TERMS[t] >= 84) continue;
        // Skip highest rates for large loans
        if (LOAN_AMOUNTS[a] >= 50000 && RATES[r] >= 12) continue;
        combos.push({
          amount: LOAN_AMOUNTS[a],
          rate: RATES[r],
          term: TERMS[t],
        });
      }
    }
  }

  return combos;
}

let _cache: AutoLoanPage[] | null = null;

export function getAllAutoLoanPages(): AutoLoanPage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildPage(c.amount, c.rate, c.term);
  });
  return _cache;
}

export function getAutoLoanBySlug(slug: string): AutoLoanPage | undefined {
  return getAllAutoLoanPages().find(function (p) { return p.slug === slug; });
}

export { LOAN_AMOUNTS, RATES, TERMS, formatMoney };
