// ==========================================================================
//  Paycheck / Take-Home Pay Data for Programmatic SEO Pages
//  Generates 50 pages at /paycheck/{slug}/
//  10 states x 5 salary levels
// ==========================================================================

export interface PaycheckPage {
  slug: string;
  state: string;
  stateAbbr: string;
  annualSalary: number;
  salaryDisplay: string;
  stateTaxRate: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  biweeklyTakeHome: number;
  weeklyTakeHome: number;
  hourlyEquivalent: number;
  marginalRate: number;
}

interface StateDef {
  name: string;
  abbr: string;
  effectiveRate: number;   // effective state income tax rate for mid-range income
  marginalRate: number;    // state marginal rate
  noIncomeTax: boolean;
  description: string;
}

const STANDARD_DEDUCTION = 14600;
const SS_WAGE_BASE = 168600;
const HOURS_PER_YEAR = 2080;
const BIWEEKLY_PERIODS = 26;
const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

const STATES: StateDef[] = [
  { name: 'California', abbr: 'CA', effectiveRate: 0.055, marginalRate: 0.093, noIncomeTax: false, description: 'California has one of the highest state income tax rates in the country with a progressive system reaching up to 13.3% for top earners. The state also has a high cost of living, particularly in the Bay Area and Los Angeles metro. However, California does not tax Social Security benefits and offers various deductions and credits that can reduce your effective rate.' },
  { name: 'Texas', abbr: 'TX', effectiveRate: 0, marginalRate: 0, noIncomeTax: true, description: 'Texas is one of the most popular states for workers seeking higher take-home pay because it has no state income tax. This means your entire paycheck is only subject to federal income tax and FICA. However, Texas has higher property taxes (averaging about 1.8% of home value) and an 8.25% sales tax to compensate for the lack of income tax revenue.' },
  { name: 'Florida', abbr: 'FL', effectiveRate: 0, marginalRate: 0, noIncomeTax: true, description: 'Florida has no state income tax, making it an attractive destination for workers and retirees alike. Your paycheck in Florida is only reduced by federal taxes and FICA contributions. The state generates revenue through a 6% sales tax (plus local surtaxes) and property taxes. Florida also does not tax retirement income, pensions, or Social Security benefits.' },
  { name: 'New York', abbr: 'NY', effectiveRate: 0.050, marginalRate: 0.0685, noIncomeTax: false, description: 'New York has a progressive state income tax system with rates from 4% to 10.9% for the highest earners. New York City residents face an additional city income tax of 3.078% to 3.876%, which can significantly reduce take-home pay. The state offers a standard deduction and various credits. Outside NYC, the effective tax burden is more moderate but still among the higher states.' },
  { name: 'Illinois', abbr: 'IL', effectiveRate: 0.0495, marginalRate: 0.0495, noIncomeTax: false, description: 'Illinois has a flat state income tax rate of 4.95%, which applies equally regardless of income level. This means the calculation is straightforward — every dollar of taxable income is taxed at the same rate. Illinois does not tax retirement income, and the state offers personal exemptions that can slightly reduce your taxable income.' },
  { name: 'Pennsylvania', abbr: 'PA', effectiveRate: 0.0307, marginalRate: 0.0307, noIncomeTax: false, description: 'Pennsylvania has one of the lowest flat income tax rates in the country at 3.07%. The state taxes most earned income at this flat rate with very few deductions allowed. Some municipalities also levy a local earned income tax (typically 1-3%). Pennsylvania does not tax retirement income, Social Security benefits, or distributions from 401(k) and IRA accounts.' },
  { name: 'Ohio', abbr: 'OH', effectiveRate: 0.030, marginalRate: 0.04, noIncomeTax: false, description: 'Ohio uses a progressive income tax system with rates ranging from 0% to 3.75%. Recent tax reforms have reduced rates and eliminated the lowest bracket entirely, meaning the first $26,050 of income is tax-free. Many Ohio municipalities also levy a local income tax (typically 1-3%), which can add to the overall tax burden. The state offers various credits and deductions.' },
  { name: 'Washington', abbr: 'WA', effectiveRate: 0, marginalRate: 0, noIncomeTax: true, description: 'Washington state has no personal income tax, giving workers a significant take-home pay advantage. The state relies on sales tax (6.5% state rate plus local additions averaging about 10.25% total) and a Business & Occupation tax on businesses. Washington recently introduced a 7% capital gains tax on gains over $250,000, but regular wages and salaries remain untaxed at the state level.' },
  { name: 'Georgia', abbr: 'GA', effectiveRate: 0.045, marginalRate: 0.055, noIncomeTax: false, description: 'Georgia has a progressive income tax system with rates from 1% to 5.49% (recently reduced from 5.75%). The state is moving toward a flat tax rate through gradual reductions. Georgia offers a standard deduction and personal exemptions. The cost of living in Georgia, particularly outside metro Atlanta, is below the national average, which helps your take-home pay stretch further.' },
  { name: 'New Jersey', abbr: 'NJ', effectiveRate: 0.040, marginalRate: 0.0637, noIncomeTax: false, description: 'New Jersey has a progressive income tax with rates from 1.4% to 10.75% for the highest earners. For middle-income earners, the effective rate is moderate. New Jersey has some of the highest property taxes in the nation but offers various tax credits and deductions. The state does not tax Social Security benefits and provides a property tax credit/deduction for residents.' },
];

const SALARIES: number[] = [30000, 40000, 50000, 60000, 75000];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function calcFederalTax(annual: number): number {
  var taxable = Math.max(0, annual - STANDARD_DEDUCTION);
  if (taxable <= 11600) return round2(taxable * 0.10);
  if (taxable <= 47150) return round2(1160 + (taxable - 11600) * 0.12);
  if (taxable <= 100525) return round2(5426 + (taxable - 47150) * 0.22);
  if (taxable <= 191950) return round2(17168.50 + (taxable - 100525) * 0.24);
  if (taxable <= 243725) return round2(39110.50 + (taxable - 191950) * 0.32);
  if (taxable <= 609350) return round2(55678.50 + (taxable - 243725) * 0.35);
  return round2(183647.25 + (taxable - 609350) * 0.37);
}

function getFederalMarginalRate(annual: number): number {
  var taxable = Math.max(0, annual - STANDARD_DEDUCTION);
  if (taxable <= 11600) return 0.10;
  if (taxable <= 47150) return 0.12;
  if (taxable <= 100525) return 0.22;
  if (taxable <= 191950) return 0.24;
  if (taxable <= 243725) return 0.32;
  if (taxable <= 609350) return 0.35;
  return 0.37;
}

function calcFICA(annual: number): number {
  var ss = Math.min(annual, SS_WAGE_BASE) * 0.062;
  var medicare = annual * 0.0145;
  return round2(ss + medicare);
}

function buildPage(state: StateDef, salary: number): PaycheckPage {
  var federalTax = calcFederalTax(salary);
  var stateTax = round2(salary * state.effectiveRate);
  var ficaTax = calcFICA(salary);
  var totalTax = round2(federalTax + stateTax + ficaTax);
  var annualTakeHome = round2(salary - totalTax);
  var monthlyTakeHome = round2(annualTakeHome / MONTHS_PER_YEAR);
  var biweeklyTakeHome = round2(annualTakeHome / BIWEEKLY_PERIODS);
  var weeklyTakeHome = round2(annualTakeHome / WEEKS_PER_YEAR);
  var hourlyEquivalent = round2(annualTakeHome / HOURS_PER_YEAR);

  var fedMarginal = getFederalMarginalRate(salary);
  var marginalRate = round2((fedMarginal + state.marginalRate + 0.0765) * 100) / 100;

  var salaryStr = salary.toLocaleString('en-US');
  var stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');

  return {
    slug: salary + '-salary-in-' + stateSlug,
    state: state.name,
    stateAbbr: state.abbr,
    annualSalary: salary,
    salaryDisplay: salaryStr,
    stateTaxRate: state.effectiveRate,
    federalTax: federalTax,
    stateTax: stateTax,
    ficaTax: ficaTax,
    totalTax: totalTax,
    annualTakeHome: annualTakeHome,
    monthlyTakeHome: monthlyTakeHome,
    biweeklyTakeHome: biweeklyTakeHome,
    weeklyTakeHome: weeklyTakeHome,
    hourlyEquivalent: hourlyEquivalent,
    marginalRate: marginalRate,
  };
}

let _cache: PaycheckPage[] | null = null;

export function getAllPaycheckPages(): PaycheckPage[] {
  if (_cache) return _cache;
  var pages: PaycheckPage[] = [];
  for (var i = 0; i < STATES.length; i++) {
    for (var j = 0; j < SALARIES.length; j++) {
      pages.push(buildPage(STATES[i], SALARIES[j]));
    }
  }
  _cache = pages;
  return pages;
}

export function getPaycheckPageBySlug(slug: string): PaycheckPage | undefined {
  return getAllPaycheckPages().find(function (p) { return p.slug === slug; });
}

export { STATES, SALARIES };
