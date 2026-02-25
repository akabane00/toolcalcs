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
    description: 'Compound interest, mortgage, loan amortization, retirement savings, and more financial planning tools.',
    icon: '💰',
  },
  {
    name: 'Health Calculators',
    slug: 'health-calculators',
    description: 'BMI, TDEE, calorie needs, body fat, and other health & fitness calculators.',
    icon: '❤️',
  },
  {
    name: 'Math Calculators',
    slug: 'math-calculators',
    description: 'Percentage, fraction, GPA, and everyday math calculators.',
    icon: '🔢',
  },
  {
    name: 'Date & Time Calculators',
    slug: 'date-time-calculators',
    description: 'Age calculator, date difference, countdown timers, and other date & time tools.',
    icon: '📅',
  },
  {
    name: 'Conversion Calculators',
    slug: 'conversion-calculators',
    description: 'Unit converter, currency converter, and other measurement conversion tools.',
    icon: '🔄',
  },
  {
    name: 'Everyday Calculators',
    slug: 'everyday-calculators',
    description: 'Tip calculator, discount calculator, and practical tools for daily life.',
    icon: '🧮',
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
  {
    title: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    description: 'Calculate monthly mortgage payments including principal, interest, taxes, and insurance. Compare loan terms.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '🏠',
  },
  {
    title: 'Retirement Savings Calculator',
    slug: 'retirement-savings-calculator',
    description: 'Plan your retirement by projecting savings growth. See if you are on track for your retirement goals.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '👴',
  },
  {
    title: 'Savings Goal Calculator',
    slug: 'savings-goal-calculator',
    description: 'Find out how much you need to save each month to reach your financial goal by your target date.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '🎯',
  },
  {
    title: 'Auto Loan Calculator',
    slug: 'auto-loan-calculator',
    description: 'Calculate monthly car payments, total interest, and compare different auto loan terms and rates.',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    icon: '🚗',
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
  {
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    description: 'Calculate your daily calorie needs based on age, sex, height, weight, activity level, and fitness goals.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '🍎',
  },
  {
    title: 'Body Fat Calculator',
    slug: 'body-fat-calculator',
    description: 'Estimate your body fat percentage using the U.S. Navy method. See your fat mass, lean mass, and fitness category.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '📏',
  },
  {
    title: 'Ideal Weight Calculator',
    slug: 'ideal-weight-calculator',
    description: 'Find your ideal body weight using four proven medical formulas. Compare results by height and frame size.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '💪',
  },
  {
    title: 'Pregnancy Due Date Calculator',
    slug: 'pregnancy-due-date-calculator',
    description: 'Calculate your estimated due date, current pregnancy week, trimester, and key milestone dates.',
    category: 'Health Calculators',
    categorySlug: 'health-calculators',
    icon: '🤰',
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
  {
    title: 'Fraction Calculator',
    slug: 'fraction-calculator',
    description: 'Add, subtract, multiply, and divide fractions. See step-by-step solutions with simplified results.',
    category: 'Math Calculators',
    categorySlug: 'math-calculators',
    icon: '⅓',
  },
  {
    title: 'GPA Calculator',
    slug: 'gpa-calculator',
    description: 'Calculate your cumulative GPA from course grades and credits. Supports standard 4.0 scale and weighted GPA.',
    category: 'Math Calculators',
    categorySlug: 'math-calculators',
    icon: '🎓',
  },
  {
    title: 'Random Number Generator',
    slug: 'random-number-generator',
    description: 'Generate random numbers within any range. Perfect for lotteries, games, decisions, and statistical sampling.',
    category: 'Math Calculators',
    categorySlug: 'math-calculators',
    icon: '🎲',
  },
  // Date & Time
  {
    title: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate your exact age in years, months, and days. See your next birthday countdown and day of birth.',
    category: 'Date & Time Calculators',
    categorySlug: 'date-time-calculators',
    icon: '🎂',
  },
  {
    title: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Find the exact number of days, weeks, months, and years between any two dates including business days.',
    category: 'Date & Time Calculators',
    categorySlug: 'date-time-calculators',
    icon: '📆',
  },
  {
    title: 'Days Until Calculator',
    slug: 'days-until-calculator',
    description: 'Count down the days until any future date. See weeks, months, and business days remaining.',
    category: 'Date & Time Calculators',
    categorySlug: 'date-time-calculators',
    icon: '⏳',
  },
  // Conversion
  {
    title: 'Unit Converter',
    slug: 'unit-converter',
    description: 'Convert between units of length, weight, temperature, volume, and more. Fast and accurate conversions.',
    category: 'Conversion Calculators',
    categorySlug: 'conversion-calculators',
    icon: '📐',
  },
  {
    title: 'Currency Converter',
    slug: 'currency-converter',
    description: 'Convert between world currencies with up-to-date exchange rates. Compare rates for popular currency pairs.',
    category: 'Conversion Calculators',
    categorySlug: 'conversion-calculators',
    icon: '💱',
  },
  // Everyday
  {
    title: 'Tip Calculator',
    slug: 'tip-calculator',
    description: 'Calculate tip amounts and split bills easily. Quick buttons for common tip percentages with per-person totals.',
    category: 'Everyday Calculators',
    categorySlug: 'everyday-calculators',
    icon: '🍽️',
  },
  {
    title: 'Discount Calculator',
    slug: 'discount-calculator',
    description: 'Calculate sale prices, savings amounts, and final costs after discounts and sales tax.',
    category: 'Everyday Calculators',
    categorySlug: 'everyday-calculators',
    icon: '🏷️',
  },
  {
    title: 'Hours Calculator',
    slug: 'hours-calculator',
    description: 'Calculate total work hours from time entries. Track daily hours, overtime, and weekly totals.',
    category: 'Everyday Calculators',
    categorySlug: 'everyday-calculators',
    icon: '⏰',
  },
];

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter(c => c.categorySlug === categorySlug);
}
