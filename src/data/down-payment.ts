// ==========================================================================
//  Down Payment Calculator Data for Programmatic SEO Pages
//  Generates ~33-40 pages at /down-payment/{slug}/
// ==========================================================================

export interface DownPaymentPage {
  slug: string;
  homePrice: number;
  priceDisplay: string;
  downPercent: number;
  downAmount: number;
  downDisplay: string;
  loanAmount: number;
  loanDisplay: string;
  estimatedMonthly: number;
  estimatedRate: number;
  pmiMonthly: number;
  totalMonthlyWithPMI: number;
}

var HOME_PRICES = [200000, 250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000];
var DOWN_PERCENTS = [3, 5, 10, 15, 20];
var ESTIMATED_RATE = 6.5;
var TERM_YEARS = 30;
var PMI_ANNUAL_RATE = 0.005; // 0.5% annual of loan amount

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatMoneyWhole(n: number): string {
  return n.toLocaleString('en-US');
}

function calcMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  var monthlyRate = annualRate / 100 / 12;
  var months = termYears * 12;
  if (monthlyRate === 0) return round2(principal / months);
  var payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return round2(payment);
}

function buildDownPaymentPage(price: number, percent: number): DownPaymentPage {
  var downAmount = round2(price * percent / 100);
  var loanAmount = round2(price - downAmount);
  var monthly = calcMonthlyPayment(loanAmount, ESTIMATED_RATE, TERM_YEARS);

  // PMI: 0.5% annual of loan amount / 12 when down < 20%, $0 when down >= 20%
  var pmiMonthly = percent < 20 ? round2(loanAmount * PMI_ANNUAL_RATE / 12) : 0;
  var totalMonthlyWithPMI = round2(monthly + pmiMonthly);

  var slug = price + '-home-' + percent + '-percent-down';

  return {
    slug: slug,
    homePrice: price,
    priceDisplay: formatMoneyWhole(price),
    downPercent: percent,
    downAmount: downAmount,
    downDisplay: formatMoneyWhole(downAmount),
    loanAmount: loanAmount,
    loanDisplay: formatMoneyWhole(loanAmount),
    estimatedMonthly: monthly,
    estimatedRate: ESTIMATED_RATE,
    pmiMonthly: pmiMonthly,
    totalMonthlyWithPMI: totalMonthlyWithPMI,
  };
}

// Select strategic combinations (~33-40 pages)
// - All 9 prices at 10% and 20% down = 18 pages
// - Popular prices ($250K, $300K, $400K, $500K) at 3%, 5%, 15% = 12 pages
// - High-end ($600K, $750K, $1M) at 5% down = 3 pages
// - Deduplicate overlaps -> ~33 pages
function selectCombinations(): { price: number; percent: number }[] {
  var combos: { price: number; percent: number }[] = [];
  var seen: { [key: string]: boolean } = {};

  function addCombo(price: number, percent: number): void {
    var key = price + '-' + percent;
    if (!seen[key]) {
      seen[key] = true;
      combos.push({ price: price, percent: percent });
    }
  }

  // All 9 prices at 10% and 20% down = 18 pages
  for (var i = 0; i < HOME_PRICES.length; i++) {
    addCombo(HOME_PRICES[i], 10);
    addCombo(HOME_PRICES[i], 20);
  }

  // Popular prices at 3%, 5%, 15% = 12 pages (minus overlaps)
  var popularPrices = [250000, 300000, 400000, 500000];
  var extraPercents = [3, 5, 15];
  for (var p = 0; p < popularPrices.length; p++) {
    for (var d = 0; d < extraPercents.length; d++) {
      addCombo(popularPrices[p], extraPercents[d]);
    }
  }

  // High-end at 5% down = 3 pages (minus overlaps)
  var highEndPrices = [600000, 750000, 1000000];
  for (var h = 0; h < highEndPrices.length; h++) {
    addCombo(highEndPrices[h], 5);
  }

  return combos;
}

let _cache: DownPaymentPage[] | null = null;

export function getAllDownPaymentPages(): DownPaymentPage[] {
  if (_cache) return _cache;
  var combos = selectCombinations();
  _cache = combos.map(function (c) {
    return buildDownPaymentPage(c.price, c.percent);
  });
  return _cache;
}

export function getDownPaymentPageBySlug(slug: string): DownPaymentPage | undefined {
  return getAllDownPaymentPages().find(function (p) { return p.slug === slug; });
}

export { HOME_PRICES, DOWN_PERCENTS, formatMoney, formatMoneyWhole };
