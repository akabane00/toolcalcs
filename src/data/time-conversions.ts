// ==========================================================================
//  Time Conversions Data for Programmatic SEO Pages
//  Generates ~200 pages at /time-convert/{slug}/
// ==========================================================================

export interface TimeConversionPage {
  slug: string;
  value: number;
  fromUnit: string;
  toUnit: string;
  result: number;
  resultDisplay: string;
  fromPlural: string;
  toPlural: string;
  formula: string;
  reverseResult: number;
  reverseDisplay: string;
  category: string;
}

interface UnitPair {
  from: string;
  to: string;
  fromPlural: string;
  toPlural: string;
  factor: number; // 1 fromUnit = factor toUnits
  category: string;
  values: number[];
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function fmtResult(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString('en-US');
  if (n >= 100) return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

var PAIRS: UnitPair[] = [
  // Hours <-> Minutes (high volume)
  {
    from: 'hours', to: 'minutes', fromPlural: 'Hours', toPlural: 'Minutes',
    factor: 60, category: 'Hours & Minutes',
    values: [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 10, 12, 15, 18, 20, 24, 36, 48, 72],
  },
  {
    from: 'minutes', to: 'hours', fromPlural: 'Minutes', toPlural: 'Hours',
    factor: 1 / 60, category: 'Hours & Minutes',
    values: [5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 100, 120, 150, 180, 200, 240, 300, 360, 420, 480, 600, 720, 1000, 1440],
  },
  // Minutes <-> Seconds
  {
    from: 'minutes', to: 'seconds', fromPlural: 'Minutes', toPlural: 'Seconds',
    factor: 60, category: 'Minutes & Seconds',
    values: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30, 45, 60, 90],
  },
  {
    from: 'seconds', to: 'minutes', fromPlural: 'Seconds', toPlural: 'Minutes',
    factor: 1 / 60, category: 'Minutes & Seconds',
    values: [10, 15, 20, 30, 45, 60, 90, 100, 120, 150, 180, 200, 240, 300, 360, 420, 480, 600, 900, 1000, 1200, 1500, 1800, 3600],
  },
  // Hours <-> Seconds
  {
    from: 'hours', to: 'seconds', fromPlural: 'Hours', toPlural: 'Seconds',
    factor: 3600, category: 'Hours & Seconds',
    values: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 24],
  },
  // Days <-> Hours
  {
    from: 'days', to: 'hours', fromPlural: 'Days', toPlural: 'Hours',
    factor: 24, category: 'Days & Hours',
    values: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 10, 14, 21, 28, 30, 60, 90, 180, 365],
  },
  {
    from: 'hours', to: 'days', fromPlural: 'Hours', toPlural: 'Days',
    factor: 1 / 24, category: 'Days & Hours',
    values: [6, 8, 10, 12, 16, 18, 24, 36, 48, 72, 96, 100, 120, 168, 200, 240, 336, 500, 720, 1000],
  },
  // Weeks <-> Days
  {
    from: 'weeks', to: 'days', fromPlural: 'Weeks', toPlural: 'Days',
    factor: 7, category: 'Weeks & Days',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20, 24, 26, 36, 40, 48, 52],
  },
  {
    from: 'days', to: 'weeks', fromPlural: 'Days', toPlural: 'Weeks',
    factor: 1 / 7, category: 'Weeks & Days',
    values: [3, 5, 7, 10, 14, 21, 28, 30, 45, 60, 90, 100, 120, 180, 365],
  },
  // Weeks <-> Hours
  {
    from: 'weeks', to: 'hours', fromPlural: 'Weeks', toPlural: 'Hours',
    factor: 168, category: 'Weeks & Hours',
    values: [1, 2, 3, 4, 6, 8, 12, 26, 52],
  },
  // Months <-> Days (using 30.4375 average)
  {
    from: 'months', to: 'days', fromPlural: 'Months', toPlural: 'Days',
    factor: 30.4375, category: 'Months & Days',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 36],
  },
  // Months <-> Weeks
  {
    from: 'months', to: 'weeks', fromPlural: 'Months', toPlural: 'Weeks',
    factor: 4.348, category: 'Months & Weeks',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24],
  },
  // Years <-> Days
  {
    from: 'years', to: 'days', fromPlural: 'Years', toPlural: 'Days',
    factor: 365.25, category: 'Years & Days',
    values: [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100],
  },
  // Years <-> Months
  {
    from: 'years', to: 'months', fromPlural: 'Years', toPlural: 'Months',
    factor: 12, category: 'Years & Months',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50, 100],
  },
  // Years <-> Weeks
  {
    from: 'years', to: 'weeks', fromPlural: 'Years', toPlural: 'Weeks',
    factor: 52.1775, category: 'Years & Weeks',
    values: [1, 2, 3, 4, 5, 10, 15, 20, 25, 50],
  },
  // Years <-> Hours
  {
    from: 'years', to: 'hours', fromPlural: 'Years', toPlural: 'Hours',
    factor: 8766, category: 'Years & Hours',
    values: [1, 2, 3, 5, 10, 20, 50, 100],
  },
];

function slugify(value: number): string {
  var s = value.toString();
  return s.replace('.', '-');
}

let _cache: TimeConversionPage[] | null = null;

export function getAllTimeConversionPages(): TimeConversionPage[] {
  if (_cache) return _cache;
  var pages: TimeConversionPage[] = [];

  for (var i = 0; i < PAIRS.length; i++) {
    var pair = PAIRS[i];
    for (var j = 0; j < pair.values.length; j++) {
      var val = pair.values[j];
      var result = round4(val * pair.factor);
      var reverseResult = round4(1 / pair.factor);

      var slug = slugify(val) + '-' + pair.from + '-to-' + pair.to;

      var formula = val + ' ' + pair.from + ' × ' + pair.factor + ' = ' + fmtResult(result) + ' ' + pair.to;
      if (pair.factor < 1) {
        formula = val + ' ' + pair.from + ' ÷ ' + round4(1 / pair.factor) + ' = ' + fmtResult(result) + ' ' + pair.to;
      }

      pages.push({
        slug: slug,
        value: val,
        fromUnit: pair.from,
        toUnit: pair.to,
        result: result,
        resultDisplay: fmtResult(result),
        fromPlural: pair.fromPlural,
        toPlural: pair.toPlural,
        formula: formula,
        reverseResult: reverseResult,
        reverseDisplay: fmtResult(reverseResult),
        category: pair.category,
      });
    }
  }

  _cache = pages;
  return pages;
}

export function getTimeConversionBySlug(slug: string): TimeConversionPage | undefined {
  return getAllTimeConversionPages().find(function (p) { return p.slug === slug; });
}

export { PAIRS };
