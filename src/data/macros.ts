// ==========================================================================
//  Macronutrient Data for Programmatic SEO Pages
//  Generates ~40 pages at /macro/{slug}/
// ==========================================================================

export interface MacroPage {
  slug: string;
  calories: number;
  goal: string;
  goalDisplay: string;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCals: number;
  carbsCals: number;
  fatCals: number;
  meals3: { protein: number; carbs: number; fat: number };
  meals4: { protein: number; carbs: number; fat: number };
  meals5: { protein: number; carbs: number; fat: number };
}

interface GoalDef {
  key: string;
  display: string;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

const CALORIE_LEVELS = [1200, 1400, 1500, 1600, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500];

const GOALS: GoalDef[] = [
  { key: 'weight-loss', display: 'Weight Loss', proteinPct: 40, carbsPct: 30, fatPct: 30 },
  { key: 'maintenance', display: 'Maintenance', proteinPct: 30, carbsPct: 40, fatPct: 30 },
  { key: 'muscle-gain', display: 'Muscle Gain', proteinPct: 30, carbsPct: 45, fatPct: 25 },
];

const BALANCED_CALORIES = [1500, 2000, 2500, 3000];
const BALANCED_GOAL: GoalDef = {
  key: 'balanced',
  display: 'Balanced',
  proteinPct: 30,
  carbsPct: 35,
  fatPct: 35,
};

function buildSlug(calories: number, goalKey: string): string {
  return calories + '-calorie-' + goalKey + '-macros';
}

function buildPage(calories: number, goal: GoalDef): MacroPage {
  var proteinCals = Math.round(calories * goal.proteinPct / 100);
  var carbsCals = Math.round(calories * goal.carbsPct / 100);
  var fatCals = Math.round(calories * goal.fatPct / 100);

  var proteinGrams = Math.round(proteinCals / 4);
  var carbsGrams = Math.round(carbsCals / 4);
  var fatGrams = Math.round(fatCals / 9);

  return {
    slug: buildSlug(calories, goal.key),
    calories: calories,
    goal: goal.key,
    goalDisplay: goal.display,
    proteinPct: goal.proteinPct,
    carbsPct: goal.carbsPct,
    fatPct: goal.fatPct,
    proteinGrams: proteinGrams,
    carbsGrams: carbsGrams,
    fatGrams: fatGrams,
    proteinCals: proteinCals,
    carbsCals: carbsCals,
    fatCals: fatCals,
    meals3: {
      protein: Math.round(proteinGrams / 3),
      carbs: Math.round(carbsGrams / 3),
      fat: Math.round(fatGrams / 3),
    },
    meals4: {
      protein: Math.round(proteinGrams / 4),
      carbs: Math.round(carbsGrams / 4),
      fat: Math.round(fatGrams / 4),
    },
    meals5: {
      protein: Math.round(proteinGrams / 5),
      carbs: Math.round(carbsGrams / 5),
      fat: Math.round(fatGrams / 5),
    },
  };
}

let _cache: MacroPage[] | null = null;

export function getAllMacroPages(): MacroPage[] {
  if (_cache) return _cache;
  var pages: MacroPage[] = [];

  // 12 calorie levels x 3 goals = 36 pages
  for (var i = 0; i < CALORIE_LEVELS.length; i++) {
    for (var j = 0; j < GOALS.length; j++) {
      pages.push(buildPage(CALORIE_LEVELS[i], GOALS[j]));
    }
  }

  // 4 balanced pages
  for (var k = 0; k < BALANCED_CALORIES.length; k++) {
    pages.push(buildPage(BALANCED_CALORIES[k], BALANCED_GOAL));
  }

  _cache = pages;
  return _cache;
}

export function getMacroPageBySlug(slug: string): MacroPage | undefined {
  return getAllMacroPages().find(function (p) { return p.slug === slug; });
}

export { CALORIE_LEVELS, GOALS, BALANCED_GOAL };
