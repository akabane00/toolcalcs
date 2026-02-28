// ==========================================================================
//  Salary Conversion Data for Programmatic SEO Pages
//  Generates ~103 pages at /salary/{slug}/
// ==========================================================================

export interface SalaryPage {
  slug: string;
  direction: 'hourly' | 'annual';
  hourlyRate: number;
  annualSalary: number;
  monthlySalary: number;
  biweeklySalary: number;
  weeklySalary: number;
  dailySalary: number;
  overtimeRate: number;
  afterTaxAnnual: number;
  afterTaxMonthly: number;
  afterTaxBiweekly: number;
}

const HOURS_PER_YEAR = 2080; // 40 hours × 52 weeks
const WEEKS_PER_YEAR = 52;
const BIWEEKLY_PERIODS = 26;
const MONTHS_PER_YEAR = 12;
const HOURS_PER_DAY = 8;
const WORKING_DAYS = 260; // 52 × 5

const hourlyRates: number[] = [
  7, 7.25, 7.50, 8, 9, 10, 10.50, 11, 12, 12.50, 13, 14, 15, 15.50,
  16, 17, 17.50, 18, 19, 20, 21, 22, 22.50, 23, 24, 25,
  26, 27, 27.50, 28, 29, 30, 31, 32, 32.50, 33, 34, 35,
  36, 37, 37.50, 38, 39, 40, 42, 42.50, 45, 47.50, 48, 50,
  52.50, 55, 57.50, 60, 62.50, 65, 70, 75, 80, 85, 90, 95, 100,
];

const annualSalaries: number[] = [
  20000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000, 45000,
  48000, 50000, 52000, 55000, 58000, 60000, 62000, 65000, 68000, 70000,
  72000, 75000, 78000, 80000, 85000, 90000, 95000, 100000, 110000, 120000,
  130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000,
];

function estimateAfterTax(annual: number): { annual: number; monthly: number; biweekly: number } {
  // FICA: Social Security (6.2% up to $168,600) + Medicare (1.45%)
  const ssTax = Math.min(annual, 168600) * 0.062;
  const medicareTax = annual * 0.0145;
  const fica = ssTax + medicareTax;

  // Simplified 2026 federal income tax brackets (single filer, standard deduction $15,000)
  const taxable = Math.max(0, annual - 15000);
  let federalTax: number;
  if (taxable <= 11600) federalTax = taxable * 0.10;
  else if (taxable <= 47150) federalTax = 1160 + (taxable - 11600) * 0.12;
  else if (taxable <= 100525) federalTax = 5426 + (taxable - 47150) * 0.22;
  else if (taxable <= 191950) federalTax = 17168.50 + (taxable - 100525) * 0.24;
  else if (taxable <= 243725) federalTax = 39110.50 + (taxable - 191950) * 0.32;
  else if (taxable <= 609350) federalTax = 55678.50 + (taxable - 243725) * 0.35;
  else federalTax = 183647.25 + (taxable - 609350) * 0.37;

  const afterTaxAnnual = Math.round(annual - fica - federalTax);
  return {
    annual: afterTaxAnnual,
    monthly: Math.round(afterTaxAnnual / 12),
    biweekly: Math.round(afterTaxAnnual / 26),
  };
}

function formatSlug(rate: number): string {
  if (Number.isInteger(rate)) return `${rate}-an-hour`;
  return `${rate.toFixed(2).replace('.', '-')}-an-hour`;
}

export function getAllSalaryPages(): SalaryPage[] {
  const pages: SalaryPage[] = [];

  // Hourly → Annual
  for (const rate of hourlyRates) {
    const annual = rate * HOURS_PER_YEAR;
    const tax = estimateAfterTax(annual);
    pages.push({
      slug: formatSlug(rate),
      direction: 'hourly',
      hourlyRate: rate,
      annualSalary: annual,
      monthlySalary: Math.round(annual / MONTHS_PER_YEAR),
      biweeklySalary: Math.round(rate * 80),
      weeklySalary: rate * 40,
      dailySalary: rate * HOURS_PER_DAY,
      overtimeRate: rate * 1.5,
      afterTaxAnnual: tax.annual,
      afterTaxMonthly: tax.monthly,
      afterTaxBiweekly: tax.biweekly,
    });
  }

  // Annual → Hourly
  for (const annual of annualSalaries) {
    const rate = Math.round((annual / HOURS_PER_YEAR) * 100) / 100;
    const tax = estimateAfterTax(annual);
    pages.push({
      slug: `${annual}-a-year`,
      direction: 'annual',
      hourlyRate: rate,
      annualSalary: annual,
      monthlySalary: Math.round(annual / MONTHS_PER_YEAR),
      biweeklySalary: Math.round(annual / BIWEEKLY_PERIODS),
      weeklySalary: Math.round(annual / WEEKS_PER_YEAR),
      dailySalary: Math.round(annual / WORKING_DAYS),
      overtimeRate: Math.round(rate * 1.5 * 100) / 100,
      afterTaxAnnual: tax.annual,
      afterTaxMonthly: tax.monthly,
      afterTaxBiweekly: tax.biweekly,
    });
  }

  return pages;
}

export { hourlyRates, annualSalaries };
