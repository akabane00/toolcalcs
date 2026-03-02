// ==========================================================================
//  Cooking Conversions Data for Programmatic SEO Pages
//  Generates ~525 pages at /cooking/{slug}/
// ==========================================================================

export interface CookingPage {
  slug: string;
  ingredient: string;
  ingredientSlug: string;
  direction: 'grams-to-cups' | 'cups-to-grams';
  grams: number;
  cups: number;
  cupsDisplay: string;
  gramsDisplay: string;
  tablespoons: number;
  teaspoons: number;
  ounces: number;
  mlEquiv: number;
  density: number;          // grams per cup
  category: string;
}

interface Ingredient {
  name: string;
  slug: string;
  gramsPerCup: number;
  category: string;
}

const INGREDIENTS: Ingredient[] = [
  // Flours
  { name: 'All-Purpose Flour', slug: 'flour', gramsPerCup: 120, category: 'Flours & Starches' },
  { name: 'Bread Flour', slug: 'bread-flour', gramsPerCup: 127, category: 'Flours & Starches' },
  { name: 'Cake Flour', slug: 'cake-flour', gramsPerCup: 114, category: 'Flours & Starches' },
  { name: 'Almond Flour', slug: 'almond-flour', gramsPerCup: 96, category: 'Flours & Starches' },
  { name: 'Coconut Flour', slug: 'coconut-flour', gramsPerCup: 112, category: 'Flours & Starches' },
  { name: 'Cornstarch', slug: 'cornstarch', gramsPerCup: 128, category: 'Flours & Starches' },
  { name: 'Cornmeal', slug: 'cornmeal', gramsPerCup: 150, category: 'Flours & Starches' },

  // Sugars
  { name: 'Granulated Sugar', slug: 'sugar', gramsPerCup: 200, category: 'Sugars & Sweeteners' },
  { name: 'Brown Sugar (packed)', slug: 'brown-sugar', gramsPerCup: 220, category: 'Sugars & Sweeteners' },
  { name: 'Powdered Sugar', slug: 'powdered-sugar', gramsPerCup: 120, category: 'Sugars & Sweeteners' },
  { name: 'Honey', slug: 'honey', gramsPerCup: 340, category: 'Sugars & Sweeteners' },
  { name: 'Maple Syrup', slug: 'maple-syrup', gramsPerCup: 312, category: 'Sugars & Sweeteners' },

  // Fats & Oils
  { name: 'Butter', slug: 'butter', gramsPerCup: 227, category: 'Fats & Oils' },
  { name: 'Vegetable Oil', slug: 'vegetable-oil', gramsPerCup: 218, category: 'Fats & Oils' },
  { name: 'Olive Oil', slug: 'olive-oil', gramsPerCup: 216, category: 'Fats & Oils' },
  { name: 'Coconut Oil', slug: 'coconut-oil', gramsPerCup: 218, category: 'Fats & Oils' },

  // Dairy
  { name: 'Milk', slug: 'milk', gramsPerCup: 244, category: 'Dairy' },
  { name: 'Heavy Cream', slug: 'heavy-cream', gramsPerCup: 238, category: 'Dairy' },
  { name: 'Cream Cheese', slug: 'cream-cheese', gramsPerCup: 232, category: 'Dairy' },
  { name: 'Yogurt', slug: 'yogurt', gramsPerCup: 245, category: 'Dairy' },
  { name: 'Sour Cream', slug: 'sour-cream', gramsPerCup: 230, category: 'Dairy' },

  // Grains & Others
  { name: 'Rice (uncooked)', slug: 'rice', gramsPerCup: 185, category: 'Grains & Dry Goods' },
  { name: 'Rolled Oats', slug: 'oats', gramsPerCup: 90, category: 'Grains & Dry Goods' },
  { name: 'Breadcrumbs', slug: 'breadcrumbs', gramsPerCup: 108, category: 'Grains & Dry Goods' },
  { name: 'Chocolate Chips', slug: 'chocolate-chips', gramsPerCup: 170, category: 'Grains & Dry Goods' },
  { name: 'Peanut Butter', slug: 'peanut-butter', gramsPerCup: 258, category: 'Grains & Dry Goods' },

  // Liquids & Basics
  { name: 'Water', slug: 'water', gramsPerCup: 237, category: 'Liquids & Basics' },
  { name: 'Cocoa Powder', slug: 'cocoa-powder', gramsPerCup: 86, category: 'Liquids & Basics' },
  { name: 'Salt (table)', slug: 'salt', gramsPerCup: 288, category: 'Liquids & Basics' },
  { name: 'Baking Powder', slug: 'baking-powder', gramsPerCup: 230, category: 'Liquids & Basics' },
];

const GRAM_AMOUNTS = [25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500];

const CUP_AMOUNTS: { value: number; display: string; slug: string }[] = [
  { value: 0.25, display: '1/4 cup', slug: 'quarter-cup' },
  { value: 1 / 3, display: '1/3 cup', slug: 'third-cup' },
  { value: 0.5, display: '1/2 cup', slug: 'half-cup' },
  { value: 2 / 3, display: '2/3 cup', slug: 'two-thirds-cup' },
  { value: 0.75, display: '3/4 cup', slug: 'three-quarters-cup' },
  { value: 1, display: '1 cup', slug: '1-cup' },
  { value: 1.5, display: '1 1/2 cups', slug: '1-and-half-cups' },
  { value: 2, display: '2 cups', slug: '2-cups' },
  { value: 3, display: '3 cups', slug: '3-cups' },
];

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatCups(cups: number): string {
  if (cups >= 10) return round1(cups).toString();
  if (cups >= 1) return round2(cups).toString();
  // Show as fraction for common values
  var diff25 = Math.abs(cups - 0.25);
  var diff33 = Math.abs(cups - 1 / 3);
  var diff50 = Math.abs(cups - 0.5);
  var diff67 = Math.abs(cups - 2 / 3);
  var diff75 = Math.abs(cups - 0.75);
  if (diff25 < 0.01) return '1/4';
  if (diff33 < 0.01) return '1/3';
  if (diff50 < 0.01) return '1/2';
  if (diff67 < 0.01) return '2/3';
  if (diff75 < 0.01) return '3/4';
  return round2(cups).toString();
}

let _cache: CookingPage[] | null = null;

export function getAllCookingPages(): CookingPage[] {
  if (_cache) return _cache;
  var pages: CookingPage[] = [];

  for (var i = 0; i < INGREDIENTS.length; i++) {
    var ing = INGREDIENTS[i];

    // Grams to cups
    for (var g = 0; g < GRAM_AMOUNTS.length; g++) {
      var grams = GRAM_AMOUNTS[g];
      var cups = grams / ing.gramsPerCup;
      var tbsp = cups * 16;
      var tsp = cups * 48;
      var oz = grams / 28.3495;
      var ml = cups * 236.588;

      pages.push({
        slug: grams + '-grams-' + ing.slug + '-to-cups',
        ingredient: ing.name,
        ingredientSlug: ing.slug,
        direction: 'grams-to-cups',
        grams: grams,
        cups: round2(cups),
        cupsDisplay: formatCups(cups),
        gramsDisplay: grams.toString(),
        tablespoons: round1(tbsp),
        teaspoons: round1(tsp),
        ounces: round2(oz),
        mlEquiv: Math.round(ml),
        density: ing.gramsPerCup,
        category: ing.category,
      });
    }

    // Cups to grams
    for (var c = 0; c < CUP_AMOUNTS.length; c++) {
      var cupInfo = CUP_AMOUNTS[c];
      var gramsResult = cupInfo.value * ing.gramsPerCup;
      var tbspResult = cupInfo.value * 16;
      var tspResult = cupInfo.value * 48;
      var ozResult = gramsResult / 28.3495;
      var mlResult = cupInfo.value * 236.588;

      pages.push({
        slug: cupInfo.slug + '-' + ing.slug + '-in-grams',
        ingredient: ing.name,
        ingredientSlug: ing.slug,
        direction: 'cups-to-grams',
        grams: Math.round(gramsResult),
        cups: cupInfo.value,
        cupsDisplay: cupInfo.display,
        gramsDisplay: Math.round(gramsResult).toString(),
        tablespoons: round1(tbspResult),
        teaspoons: round1(tspResult),
        ounces: round2(ozResult),
        mlEquiv: Math.round(mlResult),
        density: ing.gramsPerCup,
        category: ing.category,
      });
    }
  }

  _cache = pages;
  return pages;
}

export function getCookingBySlug(slug: string): CookingPage | undefined {
  return getAllCookingPages().find(function (p) { return p.slug === slug; });
}

export { INGREDIENTS, GRAM_AMOUNTS, CUP_AMOUNTS };
