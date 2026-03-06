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
    relatedCalculatorSlugs: ['credit-card-payoff-calculator', 'debt-to-income-calculator', 'loan-amortization-calculator', 'debt-payoff-calculator'],
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
    relatedCalculatorSlugs: ['mortgage-calculator', 'home-affordability-calculator', 'down-payment-calculator', 'rent-vs-buy-calculator', 'mortgage-amortization-calculator'],
  },
  {
    title: 'How Much Paint Do I Need? A Room-by-Room Guide',
    slug: 'how-much-paint-do-i-need',
    description: 'Calculate exactly how much paint to buy for any room. Covers wall area, coverage rates, doors and windows, ceilings, and trim.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Construction',
    relatedCalculatorSlugs: ['paint-calculator', 'square-footage-calculator', 'gravel-calculator'],
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
  // Sprint 2 articles
  {
    title: 'Understanding Your 401(k): Contributions, Match, and Growth',
    slug: 'understanding-your-401k',
    description: 'How 401(k) plans work, contribution limits, employer matching, investment growth projections, and common mistakes to avoid.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Finance',
    relatedCalculatorSlugs: ['401k-calculator', 'retirement-savings-calculator', 'compound-interest-calculator', 'fire-calculator'],
  },
  {
    title: 'How to Calculate Square Footage for Any Room or Space',
    slug: 'how-to-calculate-square-footage',
    description: 'Step-by-step guide to measuring square footage for rooms, irregular shapes, flooring, and real estate with practical examples.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Everyday',
    relatedCalculatorSlugs: ['square-footage-calculator', 'area-calculator', 'flooring-calculator', 'gravel-calculator'],
  },
  {
    title: 'Standard Deviation Explained: What It Is and When You Need It',
    slug: 'standard-deviation-explained',
    description: 'A plain-English guide to standard deviation with step-by-step calculations, the 68-95-99.7 rule, and real-world applications.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Math',
    relatedCalculatorSlugs: ['standard-deviation-calculator', 'probability-calculator', 'gpa-calculator'],
  },
  {
    title: 'Do Solar Panels Really Save Money? A Full Cost Breakdown',
    slug: 'how-solar-panels-save-money',
    description: 'Complete cost analysis of residential solar panels: installation costs, tax credits, monthly savings, payback period, and 25-year projections.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Construction',
    relatedCalculatorSlugs: ['solar-panel-calculator', 'electricity-cost-calculator', 'roi-calculator'],
  },
  {
    title: 'Sleep Cycles Explained: How to Wake Up Feeling Refreshed',
    slug: 'sleep-cycles-explained',
    description: 'Understand the four stages of sleep, why waking mid-cycle feels terrible, and how to time your bedtime for better mornings.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Health',
    relatedCalculatorSlugs: ['sleep-calculator', 'age-calculator'],
  },
  // Sprint 6 articles
  {
    title: 'How Much Protein Do You Really Need?',
    slug: 'how-much-protein-do-you-need',
    description: 'Calculate your daily protein needs based on body weight, activity level, and goals. Covers RDA guidelines, athlete needs, and high-protein food sources.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Health',
    relatedCalculatorSlugs: ['protein-intake-calculator', 'macro-calculator', 'calorie-calculator', 'tdee-calculator'],
  },
  {
    title: 'Car Lease vs Buy: Which Saves You More Money?',
    slug: 'car-lease-vs-buy',
    description: 'Compare the true costs of leasing vs buying a car over 3-6 years. Includes monthly payments, total cost of ownership, and when each option makes sense.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Finance',
    relatedCalculatorSlugs: ['car-lease-calculator', 'auto-loan-calculator', 'roi-calculator'],
  },
  {
    title: 'Tax Season Checklist: Deductions You Might Be Missing',
    slug: 'tax-season-checklist',
    description: 'A complete tax preparation checklist covering commonly missed deductions, credits, and documents you need to maximize your refund.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Finance',
    relatedCalculatorSlugs: ['tax-calculator', 'take-home-pay-calculator', 'paycheck-calculator'],
  },
  {
    title: 'How to Calculate and Build Deck Stairs',
    slug: 'how-to-build-deck-stairs',
    description: 'Step-by-step guide to calculating stair rise, run, and stringer dimensions for deck stairs. Includes building code requirements and material estimates.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Construction',
    relatedCalculatorSlugs: ['stair-calculator', 'square-footage-calculator', 'concrete-calculator'],
  },
  {
    title: 'How BAC Works: What Every Adult Should Know',
    slug: 'bac-and-alcohol-guide',
    description: 'Understand blood alcohol concentration (BAC), how your body processes alcohol, factors that affect BAC levels, and legal limits by state.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    category: 'Health',
    relatedCalculatorSlugs: ['bac-calculator', 'bmi-calculator'],
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
