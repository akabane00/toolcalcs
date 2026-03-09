export interface BMIPage {
  slug: string;
  system: 'imperial' | 'metric';
  heightDisplay: string;
  weightDisplay: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  categoryColor: string;
}

const HEIGHTS: [number, number][] = [
  [5, 4], [5, 6], [5, 8], [5, 10], [6, 0],
];

const WEIGHTS = [120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 250];

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function getCategory(bmi: number): { category: string; categoryColor: string } {
  if (bmi < 18.5) return { category: 'Underweight', categoryColor: 'blue' };
  if (bmi < 25) return { category: 'Normal', categoryColor: 'green' };
  if (bmi < 30) return { category: 'Overweight', categoryColor: 'orange' };
  return { category: 'Obese', categoryColor: 'red' };
}

function buildBMIPage(feet: number, inches: number, weightLbs: number): BMIPage {
  const totalInches = feet * 12 + inches;
  const heightCm = round1(totalInches * 2.54);
  const weightKg = round1(weightLbs * 0.453592);
  const heightM = heightCm / 100;
  const bmi = round1(weightKg / (heightM * heightM));
  const { category, categoryColor } = getCategory(bmi);
  const inchStr = inches === 0 ? '' : `${inches}`;
  const slug = `${feet}ft${inchStr}-${weightLbs}lbs`;
  const heightDisplay = `${feet}'${inches}"`;
  return {
    slug,
    system: 'imperial',
    heightDisplay,
    weightDisplay: `${weightLbs} lbs`,
    heightCm,
    weightKg,
    bmi,
    category,
    categoryColor,
  };
}

let _cache: BMIPage[] | null = null;

export function getAllBMIPages(): BMIPage[] {
  if (_cache) return _cache;
  const pages: BMIPage[] = [];
  for (const [ft, inc] of HEIGHTS) {
    for (const w of WEIGHTS) {
      pages.push(buildBMIPage(ft, inc, w));
    }
  }
  _cache = pages;
  return pages;
}

export function getBMIPageBySlug(slug: string): BMIPage | undefined {
  return getAllBMIPages().find(p => p.slug === slug);
}
