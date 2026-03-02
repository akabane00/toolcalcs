export interface TemperatureConversionPage {
  slug: string;
  value: number;
  fromUnit: 'fahrenheit' | 'celsius' | 'kelvin';
  toUnit: 'fahrenheit' | 'celsius' | 'kelvin';
  result: number;
  resultRounded: string;
  fromSymbol: string;
  toSymbol: string;
  kelvinValue: number;
  formula: string;
  category: string;
  description: string;
}

const UNIT_SYMBOLS: Record<string, string> = {
  fahrenheit: '\u00B0F',
  celsius: '\u00B0C',
  kelvin: 'K',
};

const UNIT_NAMES: Record<string, string> = {
  fahrenheit: 'Fahrenheit',
  celsius: 'Celsius',
  kelvin: 'Kelvin',
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function fmtNum(n: number): string {
  const r = round2(n);
  if (Number.isInteger(r)) return String(r);
  return String(r);
}

function fToC(f: number): number { return round2((f - 32) * 5 / 9); }
function cToF(c: number): number { return round2(c * 9 / 5 + 32); }
function kToC(k: number): number { return round2(k - 273.15); }
function kToF(k: number): number { return round2((k - 273.15) * 9 / 5 + 32); }
function cToK(c: number): number { return round2(c + 273.15); }
function fToK(f: number): number { return round2((f - 32) * 5 / 9 + 273.15); }

function computeResult(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return fToC(value);
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return cToF(value);
  if (fromUnit === 'kelvin' && toUnit === 'celsius') return kToC(value);
  if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return kToF(value);
  if (fromUnit === 'celsius' && toUnit === 'kelvin') return cToK(value);
  if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return fToK(value);
  return value;
}

function computeKelvin(value: number, fromUnit: string): number {
  if (fromUnit === 'kelvin') return round2(value);
  if (fromUnit === 'celsius') return cToK(value);
  return fToK(value);
}

function buildFormula(value: number, fromUnit: string, toUnit: string, result: number): string {
  const vs = fmtNum(value);
  const rs = fmtNum(result);
  const fs = UNIT_SYMBOLS[fromUnit];
  const ts = UNIT_SYMBOLS[toUnit];

  if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return `(${vs}${fs} \u2212 32) \u00D7 5/9 = ${rs}${ts}`;
  }
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return `(${vs}${fs} \u00D7 9/5) + 32 = ${rs}${ts}`;
  }
  if (fromUnit === 'kelvin' && toUnit === 'celsius') {
    return `${vs}${fs} \u2212 273.15 = ${rs}${ts}`;
  }
  if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
    return `(${vs}${fs} \u2212 273.15) \u00D7 9/5 + 32 = ${rs}${ts}`;
  }
  if (fromUnit === 'celsius' && toUnit === 'kelvin') {
    return `${vs}${fs} + 273.15 = ${rs}${ts}`;
  }
  if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
    return `(${vs}${fs} \u2212 32) \u00D7 5/9 + 273.15 = ${rs}${ts}`;
  }
  return `${vs}${fs} = ${rs}${ts}`;
}

function buildSlug(value: number, fromUnit: string, toUnit: string): string {
  let valStr: string;
  if (value < 0) {
    valStr = 'minus-' + String(Math.abs(value)).replace('.', '-');
  } else {
    valStr = String(value).replace('.', '-');
  }
  return `${valStr}-${fromUnit}-to-${toUnit}`;
}

// Notable temperature descriptions
const DESCRIPTIONS: Record<string, string> = {
  // F->C
  '95-fahrenheit-to-celsius': 'Hypothermia threshold',
  '96-fahrenheit-to-celsius': 'Below normal body temperature',
  '97-fahrenheit-to-celsius': 'Low-normal body temperature',
  '97-5-fahrenheit-to-celsius': 'Low-normal body temperature',
  '98-fahrenheit-to-celsius': 'Near normal body temperature',
  '98-2-fahrenheit-to-celsius': 'Average oral temperature',
  '98-6-fahrenheit-to-celsius': 'Normal body temperature',
  '99-fahrenheit-to-celsius': 'Slightly elevated temperature',
  '99-5-fahrenheit-to-celsius': 'Low-grade fever boundary',
  '100-fahrenheit-to-celsius': 'Low-grade fever',
  '100-4-fahrenheit-to-celsius': 'Fever threshold',
  '101-fahrenheit-to-celsius': 'Mild fever',
  '102-fahrenheit-to-celsius': 'Moderate fever',
  '103-fahrenheit-to-celsius': 'High fever',
  '104-fahrenheit-to-celsius': 'Very high fever - seek medical attention',
  '105-fahrenheit-to-celsius': 'Dangerously high fever - emergency',
  // C->F body
  '35-celsius-to-fahrenheit': 'Hypothermia threshold',
  '36-celsius-to-fahrenheit': 'Low-normal body temperature',
  '36-5-celsius-to-fahrenheit': 'Normal body temperature (low end)',
  '37-celsius-to-fahrenheit': 'Normal body temperature',
  '37-5-celsius-to-fahrenheit': 'Slightly elevated temperature',
  '38-celsius-to-fahrenheit': 'Fever threshold',
  '38-5-celsius-to-fahrenheit': 'Mild fever',
  '39-celsius-to-fahrenheit': 'Moderate fever',
  '39-5-celsius-to-fahrenheit': 'High fever',
  '40-celsius-to-fahrenheit': 'Very high fever - seek medical attention',
  '41-celsius-to-fahrenheit': 'Dangerously high fever - emergency',
  // Weather F->C
  'minus-40-fahrenheit-to-celsius': 'Where Fahrenheit equals Celsius',
  'minus-30-fahrenheit-to-celsius': 'Extreme cold',
  'minus-20-fahrenheit-to-celsius': 'Severe cold',
  'minus-10-fahrenheit-to-celsius': 'Very cold winter temperature',
  'minus-5-fahrenheit-to-celsius': 'Cold winter day',
  '0-fahrenheit-to-celsius': 'Very cold, well below freezing',
  '5-fahrenheit-to-celsius': 'Extremely cold',
  '10-fahrenheit-to-celsius': 'Bitter cold',
  '14-fahrenheit-to-celsius': 'Very cold winter day',
  '20-fahrenheit-to-celsius': 'Cold winter day',
  '25-fahrenheit-to-celsius': 'Below freezing',
  '30-fahrenheit-to-celsius': 'Near freezing',
  '32-fahrenheit-to-celsius': 'Freezing point of water',
  '40-fahrenheit-to-celsius': 'Cold day',
  '50-fahrenheit-to-celsius': 'Cool day',
  '55-fahrenheit-to-celsius': 'Cool and pleasant',
  '60-fahrenheit-to-celsius': 'Mild temperature',
  '65-fahrenheit-to-celsius': 'Comfortable temperature',
  '68-fahrenheit-to-celsius': 'Ideal indoor temperature',
  '70-fahrenheit-to-celsius': 'Comfortable room temperature',
  '72-fahrenheit-to-celsius': 'Room temperature',
  '75-fahrenheit-to-celsius': 'Warm and pleasant',
  '77-fahrenheit-to-celsius': 'Warm day',
  '80-fahrenheit-to-celsius': 'Warm summer day',
  '85-fahrenheit-to-celsius': 'Hot day',
  '90-fahrenheit-to-celsius': 'Very hot day',
  '95-fahrenheit-to-celsius-weather': '', // handled by body version slug
  '100-fahrenheit-to-celsius-weather': '', // handled by body version slug
  '105-fahrenheit-to-celsius-weather': '', // handled by body version slug
  '110-fahrenheit-to-celsius': 'Extreme heat',
  '115-fahrenheit-to-celsius': 'Dangerously hot',
  '120-fahrenheit-to-celsius': 'Extreme desert heat',
  // Weather C->F
  'minus-40-celsius-to-fahrenheit': 'Where Celsius equals Fahrenheit',
  'minus-30-celsius-to-fahrenheit': 'Extreme cold',
  'minus-20-celsius-to-fahrenheit': 'Severe winter cold',
  'minus-15-celsius-to-fahrenheit': 'Very cold',
  'minus-10-celsius-to-fahrenheit': 'Cold winter day',
  'minus-5-celsius-to-fahrenheit': 'Cold, below freezing',
  '0-celsius-to-fahrenheit': 'Freezing point of water',
  '5-celsius-to-fahrenheit': 'Cold day',
  '10-celsius-to-fahrenheit': 'Cool day',
  '15-celsius-to-fahrenheit': 'Mild temperature',
  '20-celsius-to-fahrenheit': 'Comfortable room temperature',
  '25-celsius-to-fahrenheit': 'Warm day',
  '30-celsius-to-fahrenheit': 'Hot day',
  '35-celsius-to-fahrenheit-weather': '', // handled by body version slug
  '40-celsius-to-fahrenheit-weather': '', // handled by body version slug
  '45-celsius-to-fahrenheit': 'Extreme heat',
  '50-celsius-to-fahrenheit': 'Extreme desert heat',
  // Cooking F->C
  '170-fahrenheit-to-celsius': 'Low warming temperature',
  '180-fahrenheit-to-celsius': 'Simmering temperature',
  '200-fahrenheit-to-celsius': 'Very low oven',
  '212-fahrenheit-to-celsius': 'Boiling point of water',
  '225-fahrenheit-to-celsius': 'Very low oven / smoking',
  '250-fahrenheit-to-celsius': 'Low oven temperature',
  '275-fahrenheit-to-celsius': 'Low oven temperature',
  '300-fahrenheit-to-celsius': 'Slow oven',
  '325-fahrenheit-to-celsius': 'Moderate low oven',
  '350-fahrenheit-to-celsius': 'Common baking temperature',
  '375-fahrenheit-to-celsius': 'Moderate oven',
  '400-fahrenheit-to-celsius': 'Hot oven',
  '425-fahrenheit-to-celsius': 'Hot oven',
  '450-fahrenheit-to-celsius': 'Very hot oven',
  '475-fahrenheit-to-celsius': 'Very hot oven',
  '500-fahrenheit-to-celsius': 'Pizza oven temperature',
  '525-fahrenheit-to-celsius': 'Broiling temperature',
  '550-fahrenheit-to-celsius': 'Maximum home oven',
  // Cooking C->F
  '100-celsius-to-fahrenheit': 'Boiling point of water',
  '110-celsius-to-fahrenheit': 'Caramel stage begins',
  '120-celsius-to-fahrenheit': 'Hard ball candy stage',
  '130-celsius-to-fahrenheit': 'Hard crack candy stage',
  '140-celsius-to-fahrenheit': 'Deep frying low temperature',
  '150-celsius-to-fahrenheit': 'Caramelization temperature',
  '160-celsius-to-fahrenheit': 'Low oven temperature',
  '170-celsius-to-fahrenheit': 'Low oven temperature',
  '180-celsius-to-fahrenheit': 'Moderate oven (Gas Mark 4)',
  '190-celsius-to-fahrenheit': 'Moderate oven',
  '200-celsius-to-fahrenheit': 'Hot oven',
  '220-celsius-to-fahrenheit': 'Very hot oven',
  '230-celsius-to-fahrenheit': 'Very hot oven',
  '250-celsius-to-fahrenheit': 'Pizza oven temperature',
  '260-celsius-to-fahrenheit': 'Broiling temperature',
  // Science
  'minus-459-67-fahrenheit-to-celsius': 'Absolute zero',
  'minus-273-15-celsius-to-fahrenheit': 'Absolute zero',
  '0-kelvin-to-celsius': 'Absolute zero',
  '0-kelvin-to-fahrenheit': 'Absolute zero',
  '77-kelvin-to-celsius': 'Boiling point of liquid nitrogen',
  '100-kelvin-to-celsius': 'Cryogenic temperature',
  '273-kelvin-to-celsius': 'Near freezing point of water',
  '273-15-kelvin-to-celsius': 'Freezing point of water (exact)',
  '293-kelvin-to-celsius': 'Standard room temperature',
  '300-kelvin-to-celsius': 'Warm room temperature',
  '310-kelvin-to-celsius': 'Human body temperature',
  '373-kelvin-to-celsius': 'Near boiling point of water',
  '373-15-kelvin-to-celsius': 'Boiling point of water (exact)',
};

interface RawEntry {
  value: number;
  fromUnit: 'fahrenheit' | 'celsius' | 'kelvin';
  toUnit: 'fahrenheit' | 'celsius' | 'kelvin';
  category: string;
}

function buildAllEntries(): RawEntry[] {
  const entries: RawEntry[] = [];

  // Body temperatures F->C
  for (const v of [95, 96, 97, 97.5, 98, 98.2, 98.6, 99, 99.5, 100, 100.4, 101, 102, 103, 104, 105]) {
    entries.push({ value: v, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'body' });
  }
  // Body temperatures C->F
  for (const v of [35, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 41]) {
    entries.push({ value: v, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'body' });
  }

  // Weather F->C
  for (const v of [-40, -30, -20, -10, -5, 0, 5, 10, 14, 20, 25, 30, 32, 40, 50, 55, 60, 65, 68, 70, 72, 75, 77, 80, 85, 90, 95, 100, 105, 110, 115, 120]) {
    entries.push({ value: v, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'weather' });
  }
  // Weather C->F
  for (const v of [-40, -30, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]) {
    entries.push({ value: v, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'weather' });
  }

  // Cooking F->C
  for (const v of [170, 180, 200, 212, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550]) {
    entries.push({ value: v, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'cooking' });
  }
  // Cooking C->F
  for (const v of [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 230, 250, 260]) {
    entries.push({ value: v, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'cooking' });
  }

  // Science
  entries.push({ value: -459.67, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'science' });
  entries.push({ value: -273.15, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'science' });
  entries.push({ value: 0, fromUnit: 'kelvin', toUnit: 'celsius', category: 'science' });
  entries.push({ value: 0, fromUnit: 'kelvin', toUnit: 'fahrenheit', category: 'science' });
  entries.push({ value: 32, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'science' });
  entries.push({ value: 0, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'science' });
  entries.push({ value: 100, fromUnit: 'celsius', toUnit: 'fahrenheit', category: 'science' });
  entries.push({ value: 212, fromUnit: 'fahrenheit', toUnit: 'celsius', category: 'science' });
  // K->C
  for (const v of [0, 77, 100, 273, 273.15, 293, 300, 310, 373, 373.15]) {
    entries.push({ value: v, fromUnit: 'kelvin', toUnit: 'celsius', category: 'science' });
  }

  return entries;
}

let cachedPages: TemperatureConversionPage[] | null = null;

export function getAllTemperaturePages(): TemperatureConversionPage[] {
  if (cachedPages) return cachedPages;

  const entries = buildAllEntries();
  const seen = new Set<string>();
  const pages: TemperatureConversionPage[] = [];

  for (const entry of entries) {
    const slug = buildSlug(entry.value, entry.fromUnit, entry.toUnit);
    if (seen.has(slug)) continue;
    seen.add(slug);

    const result = computeResult(entry.value, entry.fromUnit, entry.toUnit);
    const kelvinValue = computeKelvin(entry.value, entry.fromUnit);
    const fromSymbol = UNIT_SYMBOLS[entry.fromUnit];
    const toSymbol = UNIT_SYMBOLS[entry.toUnit];
    const formula = buildFormula(entry.value, entry.fromUnit, entry.toUnit, result);
    const description = DESCRIPTIONS[slug] || '';

    pages.push({
      slug,
      value: entry.value,
      fromUnit: entry.fromUnit,
      toUnit: entry.toUnit,
      result,
      resultRounded: fmtNum(result),
      fromSymbol,
      toSymbol,
      kelvinValue,
      formula,
      category: entry.category,
      description,
    });
  }

  cachedPages = pages;
  return pages;
}

export function getTemperatureBySlug(slug: string): TemperatureConversionPage | undefined {
  return getAllTemperaturePages().find(p => p.slug === slug);
}
