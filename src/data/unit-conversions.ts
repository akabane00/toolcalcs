// ==========================================================================
//  Unit Conversion Data for Programmatic SEO Pages
//  Generates ~90 pages at /convert/{from}-to-{to}/
// ==========================================================================

export interface Unit {
  name: string;
  slug: string;
  abbrev: string;
  category: 'length' | 'weight' | 'temperature' | 'volume';
  toBase: number; // multiply by this to get base unit (meters, kg, liters)
}

export const units: Unit[] = [
  // Length (base: meters)
  { name: 'Millimeters', slug: 'millimeters', abbrev: 'mm', category: 'length', toBase: 0.001 },
  { name: 'Centimeters', slug: 'centimeters', abbrev: 'cm', category: 'length', toBase: 0.01 },
  { name: 'Meters', slug: 'meters', abbrev: 'm', category: 'length', toBase: 1 },
  { name: 'Kilometers', slug: 'kilometers', abbrev: 'km', category: 'length', toBase: 1000 },
  { name: 'Inches', slug: 'inches', abbrev: 'in', category: 'length', toBase: 0.0254 },
  { name: 'Feet', slug: 'feet', abbrev: 'ft', category: 'length', toBase: 0.3048 },
  { name: 'Yards', slug: 'yards', abbrev: 'yd', category: 'length', toBase: 0.9144 },
  { name: 'Miles', slug: 'miles', abbrev: 'mi', category: 'length', toBase: 1609.344 },

  // Weight (base: kilograms)
  { name: 'Milligrams', slug: 'milligrams', abbrev: 'mg', category: 'weight', toBase: 0.000001 },
  { name: 'Grams', slug: 'grams', abbrev: 'g', category: 'weight', toBase: 0.001 },
  { name: 'Kilograms', slug: 'kilograms', abbrev: 'kg', category: 'weight', toBase: 1 },
  { name: 'Ounces', slug: 'ounces', abbrev: 'oz', category: 'weight', toBase: 0.0283495 },
  { name: 'Pounds', slug: 'pounds', abbrev: 'lb', category: 'weight', toBase: 0.453592 },
  { name: 'Tons (US)', slug: 'tons', abbrev: 'ton', category: 'weight', toBase: 907.185 },

  // Temperature (special handling — toBase is unused)
  { name: 'Celsius', slug: 'celsius', abbrev: '\u00B0C', category: 'temperature', toBase: 0 },
  { name: 'Fahrenheit', slug: 'fahrenheit', abbrev: '\u00B0F', category: 'temperature', toBase: 0 },
  { name: 'Kelvin', slug: 'kelvin', abbrev: 'K', category: 'temperature', toBase: 0 },

  // Volume (base: liters)
  { name: 'Milliliters', slug: 'milliliters', abbrev: 'mL', category: 'volume', toBase: 0.001 },
  { name: 'Liters', slug: 'liters', abbrev: 'L', category: 'volume', toBase: 1 },
  { name: 'Gallons (US)', slug: 'gallons', abbrev: 'gal', category: 'volume', toBase: 3.78541 },
  { name: 'Quarts', slug: 'quarts', abbrev: 'qt', category: 'volume', toBase: 0.946353 },
  { name: 'Pints', slug: 'pints', abbrev: 'pt', category: 'volume', toBase: 0.473176 },
  { name: 'Cups', slug: 'cups', abbrev: 'cup', category: 'volume', toBase: 0.236588 },
  { name: 'Fluid Ounces', slug: 'fluid-ounces', abbrev: 'fl oz', category: 'volume', toBase: 0.0295735 },
];

const unitMap = new Map(units.map(u => [u.slug, u]));

export function getUnit(slug: string): Unit | undefined {
  return unitMap.get(slug);
}

// --- Temperature conversion ---
export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  let c: number;
  if (from === 'celsius') c = value;
  else if (from === 'fahrenheit') c = (value - 32) * 5 / 9;
  else c = value - 273.15; // kelvin

  if (to === 'celsius') return c;
  if (to === 'fahrenheit') return c * 9 / 5 + 32;
  return c + 273.15; // kelvin
}

// --- General conversion ---
export function convert(value: number, fromSlug: string, toSlug: string): number {
  const from = unitMap.get(fromSlug)!;
  const to = unitMap.get(toSlug)!;
  if (from.category === 'temperature') {
    return convertTemperature(value, fromSlug, toSlug);
  }
  return value * from.toBase / to.toBase;
}

// --- Pair definitions (each generates 2 pages: A→B and B→A) ---
const bidirectionalPairs: [string, string][] = [
  // Length
  ['inches', 'centimeters'],
  ['inches', 'millimeters'],
  ['inches', 'feet'],
  ['inches', 'meters'],
  ['inches', 'yards'],
  ['feet', 'meters'],
  ['feet', 'centimeters'],
  ['feet', 'yards'],
  ['feet', 'kilometers'],
  ['yards', 'meters'],
  ['yards', 'kilometers'],
  ['miles', 'kilometers'],
  ['centimeters', 'millimeters'],
  ['meters', 'centimeters'],
  ['meters', 'kilometers'],
  ['meters', 'millimeters'],

  // Weight
  ['pounds', 'kilograms'],
  ['pounds', 'ounces'],
  ['pounds', 'grams'],
  ['ounces', 'grams'],
  ['ounces', 'kilograms'],
  ['kilograms', 'grams'],
  ['kilograms', 'milligrams'],
  ['grams', 'milligrams'],
  ['tons', 'kilograms'],
  ['tons', 'pounds'],

  // Temperature
  ['celsius', 'fahrenheit'],
  ['celsius', 'kelvin'],
  ['fahrenheit', 'kelvin'],

  // Volume
  ['gallons', 'liters'],
  ['gallons', 'cups'],
  ['gallons', 'quarts'],
  ['gallons', 'fluid-ounces'],
  ['gallons', 'pints'],
  ['liters', 'milliliters'],
  ['liters', 'cups'],
  ['liters', 'fluid-ounces'],
  ['cups', 'milliliters'],
  ['cups', 'fluid-ounces'],
  ['quarts', 'liters'],
  ['pints', 'liters'],
  ['pints', 'cups'],
  ['quarts', 'cups'],
  ['pints', 'fluid-ounces'],
  ['quarts', 'pints'],
];

// Expand to both directions
export const conversionPairs: [string, string][] = bidirectionalPairs.flatMap(
  ([a, b]) => [[a, b], [b, a]] as [string, string][]
);

// --- Smart common values based on conversion factor ---
export function getCommonValues(fromSlug: string, toSlug: string): number[] {
  const from = unitMap.get(fromSlug)!;
  if (from.category === 'temperature') {
    if (fromSlug === 'celsius') return [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 37, 50, 100];
    if (fromSlug === 'fahrenheit') return [-40, 0, 32, 50, 68, 72, 77, 86, 98.6, 100, 150, 200, 212];
    // kelvin
    return [0, 100, 173, 233, 273, 283, 293, 300, 310, 323, 373, 473];
  }
  const factor = convert(1, fromSlug, toSlug);
  if (factor >= 1000) return [1, 2, 3, 5, 10, 25, 50, 100];
  if (factor >= 100) return [1, 2, 5, 10, 20, 50, 100, 500];
  if (factor >= 10) return [1, 2, 5, 10, 25, 50, 100, 500, 1000];
  if (factor >= 1) return [1, 2, 5, 10, 25, 50, 100, 500, 1000];
  if (factor >= 0.1) return [1, 5, 10, 50, 100, 500, 1000, 5000];
  if (factor >= 0.01) return [1, 10, 50, 100, 500, 1000, 5000, 10000];
  return [1, 10, 100, 1000, 5000, 10000, 50000, 100000];
}

// --- Format number for display ---
export function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString('en-US');
  if (Math.abs(n) >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (Math.abs(n) >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
  if (Math.abs(n) >= 0.01) return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
  return n.toExponential(4);
}

// --- Category display names ---
export const categoryNames: Record<string, string> = {
  length: 'Length',
  weight: 'Weight',
  temperature: 'Temperature',
  volume: 'Volume',
};
