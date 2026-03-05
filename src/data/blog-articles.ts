export interface BlogArticle {
  title: string;
  slug: string;
  description: string;
  datePublished: string;
  dateModified: string;
  category: string;
  relatedCalculatorSlugs: string[];
}

export const blogArticles: BlogArticle[] = [
  // Existing articles
  {
    title: 'How Compound Interest Works: A Practical Guide',
    slug: 'how-compound-interest-works',
    description: 'Learn how compound interest grows your money over time, with real examples, formulas, and tips to maximize your returns.',
    datePublished: '2026-02-15',
    dateModified: '2026-03-01',
    category: 'Finance',
    relatedCalculatorSlugs: ['compound-interest-calculator', 'investment-calculator', 'savings-goal-calculator'],
  },
  {
    title: 'Understanding Your Paycheck: Taxes, Deductions, and Take-Home Pay',
    slug: 'understanding-your-paycheck',
    description: 'A clear breakdown of federal taxes, FICA, deductions, and how to calculate your actual take-home pay.',
    datePublished: '2026-02-15',
    dateModified: '2026-03-01',
    category: 'Finance',
    relatedCalculatorSlugs: ['take-home-pay-calculator', 'paycheck-calculator', 'tax-calculator'],
  },
  {
    title: 'BMI vs. Body Fat Percentage: What Actually Matters for Health',
    slug: 'bmi-vs-body-fat',
    description: 'Understand the differences between BMI and body fat percentage, their limitations, and which metric matters more.',
    datePublished: '2026-02-15',
    dateModified: '2026-03-01',
    category: 'Health',
    relatedCalculatorSlugs: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
  },
  {
    title: 'A Complete Guide to Tipping in the United States',
    slug: 'complete-guide-to-tipping',
    description: 'Standard tip amounts for restaurants, delivery, rideshare, hotels, and more, plus quick mental math methods.',
    datePublished: '2026-02-20',
    dateModified: '2026-03-01',
    category: 'Everyday',
    relatedCalculatorSlugs: ['tip-calculator', 'discount-calculator', 'percentage-calculator'],
  },
  {
    title: 'How to Calculate Percentages: 5 Methods for Everyday Math',
    slug: 'how-to-calculate-percentages',
    description: 'Five practical methods to calculate percentages, from basic formulas to mental math shortcuts you can use anywhere.',
    datePublished: '2026-02-20',
    dateModified: '2026-03-01',
    category: 'Math',
    relatedCalculatorSlugs: ['percentage-calculator', 'fraction-calculator', 'gpa-calculator'],
  },
  {
    title: 'Unit Conversion Cheat Sheet: The Most Common Conversions You Need',
    slug: 'unit-conversion-cheat-sheet',
    description: 'A quick reference for the most common length, weight, volume, and temperature conversions with exact factors.',
    datePublished: '2026-02-20',
    dateModified: '2026-03-01',
    category: 'Reference',
    relatedCalculatorSlugs: ['unit-converter', 'currency-converter'],
  },
  // Sprint 1 articles
  {
    title: 'How to Pay Off Debt Fast: Snowball vs. Avalanche Method',
    slug: 'how-to-pay-off-debt-fast',
    description: 'Compare the debt snowball and avalanche methods with real examples. Find which payoff strategy saves you the most money and time.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Finance',
    relatedCalculatorSlugs: ['credit-card-payoff-calculator', 'debt-to-income-calculator', 'loan-amortization-calculator'],
  },
  {
    title: 'How to Calculate Your BMI (And What It Actually Means)',
    slug: 'how-to-calculate-your-bmi',
    description: 'Step-by-step BMI calculation with the formula, BMI ranges, what your number means, and when BMI falls short.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Health',
    relatedCalculatorSlugs: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'tdee-calculator'],
  },
  {
    title: 'First-Time Homebuyer: Mortgage Basics Explained',
    slug: 'mortgage-basics-explained',
    description: 'Everything first-time buyers need to know about mortgages: how they work, fixed vs. adjustable rates, down payments, and how to estimate your monthly payment.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Finance',
    relatedCalculatorSlugs: ['mortgage-calculator', 'home-affordability-calculator', 'down-payment-calculator', 'rent-vs-buy-calculator'],
  },
  {
    title: 'How Much Paint Do I Need? A Room-by-Room Guide',
    slug: 'how-much-paint-do-i-need',
    description: 'Calculate exactly how much paint to buy for any room. Covers wall area, coverage rates, doors and windows, ceilings, and trim.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Construction',
    relatedCalculatorSlugs: ['paint-calculator', 'square-footage-calculator'],
  },
  {
    title: 'How Many Calories Should I Eat to Lose Weight?',
    slug: 'calories-for-weight-loss',
    description: 'Learn how to calculate your calorie needs for weight loss using TDEE, understand safe deficit ranges, and avoid common dieting mistakes.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Health',
    relatedCalculatorSlugs: ['calorie-calculator', 'tdee-calculator', 'macro-calculator', 'bmi-calculator'],
  },
];

export function getArticlesForCalculator(calculatorSlug: string): BlogArticle[] {
  return blogArticles.filter(a => a.relatedCalculatorSlugs.includes(calculatorSlug));
}

export function getRecentArticles(limit: number = 4): BlogArticle[] {
  return [...blogArticles]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit);
}
