export interface Calculator {
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    name: 'Financial Calculators',
    slug: 'financial-calculators',
    description: 'Compound interest, loan amortization, retirement savings, and more financial planning tools.',
    icon: '💰',
  },
  {
    name: 'Health Calculators',
    slug: 'health-calculators',
    description: 'BMI, TDEE, calorie needs, and other health & fitness calculators.',
    icon: '❤️',
  },
  {
    name: 'Math Calculators',
    slug: 'math-calculators',
    description: 'Percentage, fraction, and everyday math calculators.',
    icon: '🔢',
  },
];

export const calculators: Calculator[] = [
  // Financial
  {
    title: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    description: 'Calculate how your savings grow over time with compound interest. See the power of compounding with visual charts.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '📈',
  },
  {
    title: 'Loan Amortization Calculator',
    slug: 'loan-amortization-calculator',
    description: 'Generate a full loan amortization schedule. See monthly payments, interest breakdown, and payoff timeline.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '🏦',
  },
  {
    title: 'Take-Home Pay Calculator',
    slug: 'take-home-pay-calculator',
    description: 'Estimate your net pay after federal and state taxes, Social Security, and Medicare deductions.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '💵',
  },
  // Health
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate your Body Mass Index and understand what your BMI means for your health.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '⚖️',
  },
  {
    title: 'TDEE Calculator',
    slug: 'tdee-calculator',
    description: 'Find your Total Daily Energy Expenditure to plan your diet for weight loss, maintenance, or muscle gain.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '🔥',
  },
  // Math
  {
    title: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Calculate percentages easily. Find what percent of a number is, percentage increase/decrease, and more.',
    category: 'Math Calculators',
    categorySlug: 'math-calculators',
    icon: '%',
  },
];

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter(c => c.categorySlug === categorySlug);
}
