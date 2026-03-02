// ==========================================================================
//  Days From Today / Days Ago Data for Programmatic SEO Pages
//  Generates ~384 pages at /days-from-now/{N}/ and /days-ago/{N}/
// ==========================================================================

export interface DaysCalcPage {
  slug: string;
  days: number;
  weeks: number;
  remainderDays: number;
  approxMonths: string;
  businessDays: number;
}

export const DAY_NUMBERS: number[] = [
  // 1-180 continuous
  ...Array.from({ length: 180 }, (_, i) => i + 1),
  // Selected larger numbers
  200, 210, 240, 270, 300, 330, 365, 400, 500, 600, 730, 1000,
];

let _cache: DaysCalcPage[] | null = null;

export function getAllDaysCalcPages(): DaysCalcPage[] {
  if (_cache) return _cache;
  _cache = DAY_NUMBERS.map(function (d) {
    return {
      slug: String(d),
      days: d,
      weeks: Math.floor(d / 7),
      remainderDays: d % 7,
      approxMonths: (d / 30.44).toFixed(1),
      businessDays: Math.round(d * 5 / 7),
    };
  });
  return _cache;
}

export function getDaysCalcBySlug(slug: string): DaysCalcPage | undefined {
  return getAllDaysCalcPages().find(function (p) { return p.slug === slug; });
}
