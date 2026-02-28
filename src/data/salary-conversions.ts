// ==========================================================================
//  Salary Conversion Data for Programmatic SEO Pages
//  Generates ~103 pages at /salary/{slug}/
// ==========================================================================

export interface SalaryPage {
  slug: string;
  direction: 'hourly' | 'annual';
  hourlyRate: number;
  annualSalary: number;      // hourly x 2080
  monthlySalary: number;     // annual / 12
  biweeklySalary: number;    // annual / 26
  weeklySalary: number;      // hourly x 40
  dailySalary: number;       // hourly x 8
  overtimeRate: number;      // hourly x 1.5
  afterTaxAnnual: number;    // simplified federal tax + FICA
  afterTaxMonthly: number;
  afterTaxBiweekly: number;
}

const HOURS_PER_YEAR = 2080; // 40 hours x 52 weeks
const WEEKS_PER_YEAR = 52;
const BIWEEKLY_PERIODS = 26;
const MONTHS_PER_YEAR = 12;
const HOURS_PER_DAY = 8;
const HOURS_PER_WEEK = 40;
const STANDARD_DEDUCTION = 14600;
const SS_WAGE_BASE = 168600;

const hourlyRates: number[] = [
  7, 7.25, 7.50, 8, 9, 10, 10.50, 11, 12, 12.50, 13, 14, 15, 15.50,
  16, 17, 17.50, 18, 19, 20, 21, 22, 22.50, 23, 24, 25,
  26, 27, 27.50, 28, 29, 30, 31, 32, 32.50, 33, 34, 35,
  36, 37, 37.50, 38, 39, 40, 42, 42.50, 45, 47, 47.50, 48, 50,
  52, 52.50, 55, 57.50, 58, 60, 62, 62.50, 65, 67, 70, 72, 75,
  78, 80, 85, 90, 95, 100,
];

const annualSalaries: number[] = [
  20000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000, 45000,
  48000, 50000, 52000, 55000, 58000, 60000, 62000, 65000, 68000, 70000,
  72000, 75000, 78000, 80000, 85000, 90000, 95000, 100000, 110000, 120000,
  130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function estimateAfterTax(annual: number): { annual: number; monthly: number; biweekly: number } {
  // FICA: Social Security (6.2% up to $168,600) + Medicare (1.45%)
  const ssTax = Math.min(annual, SS_WAGE_BASE) * 0.062;
  const medicareTax = annual * 0.0145;
  const fica = ssTax + medicareTax;

  // Simplified 2025-like federal income tax brackets (single filer)
  const taxable = Math.max(0, annual - STANDARD_DEDUCTION);
  let federalTax: number;
  if (taxable <= 11600) {
    federalTax = taxable * 0.10;
  } else if (taxable <= 47150) {
    federalTax = 1160 + (taxable - 11600) * 0.12;
  } else if (taxable <= 100525) {
    federalTax = 5426 + (taxable - 47150) * 0.22;
  } else if (taxable <= 191950) {
    federalTax = 17168.50 + (taxable - 100525) * 0.24;
  } else if (taxable <= 243725) {
    federalTax = 39110.50 + (taxable - 191950) * 0.32;
  } else if (taxable <= 609350) {
    federalTax = 55678.50 + (taxable - 243725) * 0.35;
  } else {
    federalTax = 183647.25 + (taxable - 609350) * 0.37;
  }

  const afterTaxAnnual = round2(annual - fica - federalTax);
  return {
    annual: afterTaxAnnual,
    monthly: round2(afterTaxAnnual / MONTHS_PER_YEAR),
    biweekly: round2(afterTaxAnnual / BIWEEKLY_PERIODS),
  };
}

function formatSlug(rate: number): string {
  if (Number.isInteger(rate)) return `${rate}-an-hour`;
  return `${rate.toFixed(2).replace('.', '-')}-an-hour`;
}

export function getAllSalaryPages(): SalaryPage[] {
  const pages: SalaryPage[] = [];

  // Hourly -> Annual
  for (const rate of hourlyRates) {
    const annual = round2(rate * HOURS_PER_YEAR);
    const tax = estimateAfterTax(annual);
    pages.push({
      slug: formatSlug(rate),
      direction: 'hourly',
      hourlyRate: rate,
      annualSalary: annual,
      monthlySalary: round2(annual / MONTHS_PER_YEAR),
      biweeklySalary: round2(annual / BIWEEKLY_PERIODS),
      weeklySalary: round2(rate * HOURS_PER_WEEK),
      dailySalary: round2(rate * HOURS_PER_DAY),
      overtimeRate: round2(rate * 1.5),
      afterTaxAnnual: tax.annual,
      afterTaxMonthly: tax.monthly,
      afterTaxBiweekly: tax.biweekly,
    });
  }

  // Annual -> Hourly
  for (const annual of annualSalaries) {
    const rate = round2(annual / HOURS_PER_YEAR);
    const tax = estimateAfterTax(annual);
    pages.push({
      slug: `${annual}-a-year`,
      direction: 'annual',
      hourlyRate: rate,
      annualSalary: annual,
      monthlySalary: round2(annual / MONTHS_PER_YEAR),
      biweeklySalary: round2(annual / BIWEEKLY_PERIODS),
      weeklySalary: round2(annual / WEEKS_PER_YEAR),
      dailySalary: round2(annual / (WEEKS_PER_YEAR * 5)),
      overtimeRate: round2(rate * 1.5),
      afterTaxAnnual: tax.annual,
      afterTaxMonthly: tax.monthly,
      afterTaxBiweekly: tax.biweekly,
    });
  }

  return pages;
}

export function getSalaryBySlug(slug: string): SalaryPage | undefined {
  return getAllSalaryPages().find(p => p.slug === slug);
}

export { hourlyRates, annualSalaries };
