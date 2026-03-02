// ==========================================================================
//  Decimal-to-Fraction Page Data for Programmatic SEO Pages
//  Generates ~150 pages at /decimal-to-fraction/{slug}/
// ==========================================================================

export interface DecimalToFractionPage {
  slug: string;           // "0.5", "0.333", "1.25"
  decimal: number;        // 0.5
  displayDecimal: string; // "0.5"
  numerator: number;      // 1
  denominator: number;    // 2
  simplifiedNum: number;  // 1
  simplifiedDen: number;  // 2
  isRepeating: boolean;
  percentage: string;     // "50%"
  mixedWhole: number | null; // null for <1, e.g. 1 for 1.25
  mixedNum: number | null;   // e.g. 1 for 1.25 = 1 1/4
  mixedDen: number | null;   // e.g. 4 for 1.25 = 1 1/4
  category: string;       // "halves", "thirds", "quarters", etc.
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function formatPercentage(decimal: number): string {
  var pct = decimal * 100;
  if (Math.abs(pct - Math.round(pct)) < 0.0001) {
    return Math.round(pct) + '%';
  }
  // Show up to 2 decimal places, trim trailing zeros
  var str = pct.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  return str + '%';
}

interface RawEntry {
  slug: string;
  displayDecimal: string;
  decimal: number;
  numerator: number;
  denominator: number;
  isRepeating: boolean;
  category: string;
}

// Hardcoded repeating decimal entries (fractions that cannot be computed from terminating decimals)
function getRepeatingEntries(): RawEntry[] {
  return [
    // Thirds
    { slug: '0.333', displayDecimal: '0.333...', decimal: 1 / 3, numerator: 1, denominator: 3, isRepeating: true, category: 'thirds' },
    { slug: '0.667', displayDecimal: '0.667...', decimal: 2 / 3, numerator: 2, denominator: 3, isRepeating: true, category: 'thirds' },
    // Sixths
    { slug: '0.167', displayDecimal: '0.167...', decimal: 1 / 6, numerator: 1, denominator: 6, isRepeating: true, category: 'sixths' },
    { slug: '0.833', displayDecimal: '0.833...', decimal: 5 / 6, numerator: 5, denominator: 6, isRepeating: true, category: 'sixths' },
    // Sevenths
    { slug: '0.143', displayDecimal: '0.143...', decimal: 1 / 7, numerator: 1, denominator: 7, isRepeating: true, category: 'sevenths' },
    { slug: '0.286', displayDecimal: '0.286...', decimal: 2 / 7, numerator: 2, denominator: 7, isRepeating: true, category: 'sevenths' },
    { slug: '0.429', displayDecimal: '0.429...', decimal: 3 / 7, numerator: 3, denominator: 7, isRepeating: true, category: 'sevenths' },
    { slug: '0.571', displayDecimal: '0.571...', decimal: 4 / 7, numerator: 4, denominator: 7, isRepeating: true, category: 'sevenths' },
    { slug: '0.714', displayDecimal: '0.714...', decimal: 5 / 7, numerator: 5, denominator: 7, isRepeating: true, category: 'sevenths' },
    { slug: '0.857', displayDecimal: '0.857...', decimal: 6 / 7, numerator: 6, denominator: 7, isRepeating: true, category: 'sevenths' },
    // Ninths
    { slug: '0.111', displayDecimal: '0.111...', decimal: 1 / 9, numerator: 1, denominator: 9, isRepeating: true, category: 'ninths' },
    { slug: '0.222', displayDecimal: '0.222...', decimal: 2 / 9, numerator: 2, denominator: 9, isRepeating: true, category: 'ninths' },
    { slug: '0.444', displayDecimal: '0.444...', decimal: 4 / 9, numerator: 4, denominator: 9, isRepeating: true, category: 'ninths' },
    { slug: '0.556', displayDecimal: '0.556...', decimal: 5 / 9, numerator: 5, denominator: 9, isRepeating: true, category: 'ninths' },
    { slug: '0.778', displayDecimal: '0.778...', decimal: 7 / 9, numerator: 7, denominator: 9, isRepeating: true, category: 'ninths' },
    { slug: '0.889', displayDecimal: '0.889...', decimal: 8 / 9, numerator: 8, denominator: 9, isRepeating: true, category: 'ninths' },
    // Over-one repeating
    { slug: '1.333', displayDecimal: '1.333...', decimal: 4 / 3, numerator: 4, denominator: 3, isRepeating: true, category: 'over-one' },
    { slug: '1.667', displayDecimal: '1.667...', decimal: 5 / 3, numerator: 5, denominator: 3, isRepeating: true, category: 'over-one' },
    { slug: '2.333', displayDecimal: '2.333...', decimal: 7 / 3, numerator: 7, denominator: 3, isRepeating: true, category: 'over-one' },
    { slug: '2.667', displayDecimal: '2.667...', decimal: 8 / 3, numerator: 8, denominator: 3, isRepeating: true, category: 'over-one' },
    { slug: '3.333', displayDecimal: '3.333...', decimal: 10 / 3, numerator: 10, denominator: 3, isRepeating: true, category: 'over-one' },
  ];
}

// Terminating decimal entries computed from the decimal value
function makeTerminating(decStr: string, category: string): RawEntry {
  var decimal = parseFloat(decStr);
  // Count decimal places
  var parts = decStr.split('.');
  var decPlaces = parts.length > 1 ? parts[1].length : 0;
  var power = Math.pow(10, decPlaces);
  var numerator = Math.round(decimal * power);
  var denominator = power;
  var g = gcd(numerator, denominator);
  return {
    slug: decStr,
    displayDecimal: decStr,
    decimal: decimal,
    numerator: numerator / g,
    denominator: denominator / g,
    isRepeating: false,
    category: category,
  };
}

function buildAllEntries(): RawEntry[] {
  var entries: RawEntry[] = [];

  // Halves
  entries.push(makeTerminating('0.5', 'halves'));

  // Quarters
  entries.push(makeTerminating('0.25', 'quarters'));
  entries.push(makeTerminating('0.75', 'quarters'));

  // Fifths
  entries.push(makeTerminating('0.2', 'fifths'));
  entries.push(makeTerminating('0.4', 'fifths'));
  entries.push(makeTerminating('0.6', 'fifths'));
  entries.push(makeTerminating('0.8', 'fifths'));

  // Eighths
  entries.push(makeTerminating('0.125', 'eighths'));
  entries.push(makeTerminating('0.375', 'eighths'));
  entries.push(makeTerminating('0.625', 'eighths'));
  entries.push(makeTerminating('0.875', 'eighths'));

  // Tenths (0.1 through 0.9 - some will dedup against halves/fifths)
  entries.push(makeTerminating('0.1', 'tenths'));
  entries.push(makeTerminating('0.2', 'tenths'));
  entries.push(makeTerminating('0.3', 'tenths'));
  entries.push(makeTerminating('0.4', 'tenths'));
  entries.push(makeTerminating('0.5', 'tenths'));
  entries.push(makeTerminating('0.6', 'tenths'));
  entries.push(makeTerminating('0.7', 'tenths'));
  entries.push(makeTerminating('0.8', 'tenths'));
  entries.push(makeTerminating('0.9', 'tenths'));

  // Hundredths
  var hundredths = [
    '0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09',
    '0.11', '0.12', '0.14', '0.15', '0.16', '0.18', '0.19',
    '0.21', '0.22', '0.24', '0.26', '0.28', '0.29',
    '0.31', '0.32', '0.34', '0.35', '0.36', '0.38', '0.39',
    '0.41', '0.42', '0.44', '0.45', '0.46', '0.48', '0.49',
    '0.51', '0.52', '0.54', '0.55', '0.56', '0.58', '0.59',
    '0.61', '0.62', '0.64', '0.65', '0.66', '0.68', '0.69',
    '0.71', '0.72', '0.74', '0.76', '0.78', '0.79',
    '0.81', '0.82', '0.84', '0.85', '0.86', '0.88', '0.89',
    '0.91', '0.92', '0.94', '0.95', '0.96', '0.98', '0.99',
  ];
  for (var h of hundredths) {
    entries.push(makeTerminating(h, 'hundredths'));
  }

  // Thousandths
  var thousandths = [
    '0.125', '0.175', '0.225', '0.275', '0.325', '0.375',
    '0.425', '0.475', '0.525', '0.575', '0.625', '0.675',
    '0.725', '0.775', '0.825', '0.875', '0.925', '0.975',
    '0.015', '0.025', '0.035', '0.045', '0.055', '0.065',
    '0.075', '0.085', '0.095', '0.105', '0.115', '0.135',
  ];
  for (var t of thousandths) {
    entries.push(makeTerminating(t, 'thousandths'));
  }

  // Over-one terminating (mixed numbers)
  var overOne = [
    '1.1', '1.2', '1.25', '1.3', '1.4', '1.5', '1.6', '1.75', '1.8',
    '1.125', '1.375', '1.625', '1.875',
    '2.25', '2.5', '2.75',
    '3.25', '3.5', '3.75',
    '4.25', '4.5', '4.75',
    '5.5',
  ];
  for (var o of overOne) {
    entries.push(makeTerminating(o, 'over-one'));
  }

  // Repeating decimals (hardcoded)
  var repeating = getRepeatingEntries();
  for (var r of repeating) {
    entries.push(r);
  }

  return entries;
}

function buildPages(): DecimalToFractionPage[] {
  var rawEntries = buildAllEntries();
  var seen = new Set<string>();
  var pages: DecimalToFractionPage[] = [];

  for (var entry of rawEntries) {
    if (seen.has(entry.slug)) continue;
    seen.add(entry.slug);

    // Skip whole numbers
    if (entry.decimal === Math.floor(entry.decimal) && entry.decimal >= 1) continue;

    var num = entry.numerator;
    var den = entry.denominator;
    var g = gcd(num, den);
    var simplifiedNum = num / g;
    var simplifiedDen = den / g;

    // Mixed number calculation
    var mixedWhole: number | null = null;
    var mixedNum: number | null = null;
    var mixedDen: number | null = null;

    if (entry.decimal >= 1) {
      var whole = Math.floor(num / den);
      var remainder = num - whole * den;
      if (remainder > 0) {
        var mg = gcd(remainder, den);
        mixedWhole = whole;
        mixedNum = remainder / mg;
        mixedDen = den / mg;
      }
    }

    pages.push({
      slug: entry.slug,
      decimal: entry.decimal,
      displayDecimal: entry.displayDecimal,
      numerator: num,
      denominator: den,
      simplifiedNum: simplifiedNum,
      simplifiedDen: simplifiedDen,
      isRepeating: entry.isRepeating,
      percentage: formatPercentage(entry.decimal),
      mixedWhole: mixedWhole,
      mixedNum: mixedNum,
      mixedDen: mixedDen,
      category: entry.category,
    });
  }

  // Sort: by category order, then by decimal value
  var categoryOrder = [
    'halves', 'thirds', 'quarters', 'fifths', 'sixths', 'sevenths',
    'eighths', 'ninths', 'tenths', 'hundredths', 'thousandths', 'over-one',
  ];
  pages.sort(function (a, b) {
    var catA = categoryOrder.indexOf(a.category);
    var catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.decimal - b.decimal;
  });

  return pages;
}

var _cache: DecimalToFractionPage[] | null = null;

export function getAllDecimalToFractionPages(): DecimalToFractionPage[] {
  if (!_cache) {
    _cache = buildPages();
  }
  return _cache;
}

export function getDecimalToFractionBySlug(slug: string): DecimalToFractionPage | undefined {
  return getAllDecimalToFractionPages().find(function (p) { return p.slug === slug; });
}
