// ==========================================================================
//  Data Size Conversion Data for Programmatic SEO Pages
//  Generates ~35 pages at /data-convert/{slug}/
// ==========================================================================

export interface DataConvertPage {
  slug: string;
  fromValue: number;
  fromUnit: string;
  fromUnitFull: string;
  toUnit: string;
  toUnitFull: string;
  result: number;
  resultDisplay: string;
  formula: string;
  category: string;
  relatedConversions: { slug: string; label: string }[];
}

interface UnitDef {
  abbr: string;
  full: string;
  bytes: number; // how many bytes in 1 of this unit (binary)
}

const UNITS: UnitDef[] = [
  { abbr: 'B', full: 'Bytes', bytes: 1 },
  { abbr: 'KB', full: 'Kilobytes', bytes: 1024 },
  { abbr: 'MB', full: 'Megabytes', bytes: 1024 ** 2 },
  { abbr: 'GB', full: 'Gigabytes', bytes: 1024 ** 3 },
  { abbr: 'TB', full: 'Terabytes', bytes: 1024 ** 4 },
  { abbr: 'PB', full: 'Petabytes', bytes: 1024 ** 5 },
];

function getUnit(abbr: string): UnitDef {
  return UNITS.find(u => u.abbr === abbr)!;
}

function convert(value: number, from: UnitDef, to: UnitDef): number {
  return (value * from.bytes) / to.bytes;
}

function formatResult(n: number): string {
  if (n >= 1_000_000) {
    return n.toLocaleString('en-US');
  }
  if (Number.isInteger(n)) {
    return n.toLocaleString('en-US');
  }
  // Show enough precision
  if (n < 0.0001) {
    return n.toExponential(4);
  }
  if (n < 1) {
    // remove trailing zeros but keep meaningful decimals
    return parseFloat(n.toPrecision(6)).toString();
  }
  return parseFloat(n.toFixed(4)).toLocaleString('en-US');
}

function makeSlug(value: number, fromAbbr: string, toAbbr: string): string {
  return value + '-' + fromAbbr.toLowerCase() + '-to-' + toAbbr.toLowerCase();
}

function makeFormula(fromAbbr: string, toAbbr: string): string {
  var from = getUnit(fromAbbr);
  var to = getUnit(toAbbr);
  if (from.bytes > to.bytes) {
    // multiplying
    var factor = from.bytes / to.bytes;
    return fromAbbr + ' x ' + factor.toLocaleString('en-US') + ' = ' + toAbbr;
  }
  // dividing
  var divisor = to.bytes / from.bytes;
  return fromAbbr + ' / ' + divisor.toLocaleString('en-US') + ' = ' + toAbbr;
}

interface ConversionDef {
  fromUnit: string;
  toUnit: string;
  values: number[];
}

const CONVERSIONS: ConversionDef[] = [
  { fromUnit: 'MB', toUnit: 'GB', values: [100, 200, 500, 1000, 1500, 2000, 5000, 10000] },
  { fromUnit: 'GB', toUnit: 'TB', values: [100, 250, 500, 1000, 2000, 5000] },
  { fromUnit: 'GB', toUnit: 'MB', values: [1, 2, 5, 10, 50, 100] },
  { fromUnit: 'TB', toUnit: 'GB', values: [1, 2, 5, 10] },
  { fromUnit: 'KB', toUnit: 'MB', values: [1000, 5000, 10000, 100000, 500000] },
  { fromUnit: 'MB', toUnit: 'KB', values: [1, 5, 10, 50, 100] },
  { fromUnit: 'TB', toUnit: 'PB', values: [1, 10, 100] },
  { fromUnit: 'PB', toUnit: 'TB', values: [1, 5] },
];

function buildPage(fromAbbr: string, toAbbr: string, value: number, allSlugs: string[]): DataConvertPage {
  var from = getUnit(fromAbbr);
  var to = getUnit(toAbbr);
  var result = convert(value, from, to);
  var slug = makeSlug(value, fromAbbr, toAbbr);

  // Related: same conversion type, different values
  var related: { slug: string; label: string }[] = [];
  for (var i = 0; i < CONVERSIONS.length; i++) {
    var c = CONVERSIONS[i];
    if (c.fromUnit === fromAbbr && c.toUnit === toAbbr) {
      for (var j = 0; j < c.values.length; j++) {
        var v = c.values[j];
        if (v !== value) {
          var s = makeSlug(v, fromAbbr, toAbbr);
          related.push({ slug: s, label: v.toLocaleString('en-US') + ' ' + fromAbbr + ' to ' + toAbbr });
        }
      }
    }
  }
  // Also add reverse conversion if it exists
  for (var i = 0; i < CONVERSIONS.length; i++) {
    var c = CONVERSIONS[i];
    if (c.fromUnit === toAbbr && c.toUnit === fromAbbr) {
      for (var j = 0; j < Math.min(c.values.length, 3); j++) {
        var v = c.values[j];
        var s = makeSlug(v, toAbbr, fromAbbr);
        related.push({ slug: s, label: v.toLocaleString('en-US') + ' ' + toAbbr + ' to ' + fromAbbr });
      }
      break;
    }
  }

  return {
    slug: slug,
    fromValue: value,
    fromUnit: fromAbbr,
    fromUnitFull: from.full,
    toUnit: toAbbr,
    toUnitFull: to.full,
    result: result,
    resultDisplay: formatResult(result),
    formula: makeFormula(fromAbbr, toAbbr),
    category: 'Storage',
    relatedConversions: related.slice(0, 10),
  };
}

let _cache: DataConvertPage[] | null = null;

export function getAllDataConvertPages(): DataConvertPage[] {
  if (_cache) return _cache;
  var allSlugs: string[] = [];
  // Collect all slugs first
  for (var i = 0; i < CONVERSIONS.length; i++) {
    var c = CONVERSIONS[i];
    for (var j = 0; j < c.values.length; j++) {
      allSlugs.push(makeSlug(c.values[j], c.fromUnit, c.toUnit));
    }
  }
  var pages: DataConvertPage[] = [];
  for (var i = 0; i < CONVERSIONS.length; i++) {
    var c = CONVERSIONS[i];
    for (var j = 0; j < c.values.length; j++) {
      pages.push(buildPage(c.fromUnit, c.toUnit, c.values[j], allSlugs));
    }
  }
  _cache = pages;
  return _cache;
}

export function getDataConvertPageBySlug(slug: string): DataConvertPage | undefined {
  return getAllDataConvertPages().find(function (p) { return p.slug === slug; });
}

export { UNITS, CONVERSIONS };
