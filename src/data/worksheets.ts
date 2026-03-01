export interface ConfigOption {
  name: string;
  label: string;
  type: 'number' | 'select';
  default: number | string;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}

export interface Worksheet {
  title: string;
  slug: string;
  description: string;
  icon: string;
  gradeRange: string;
  mathTopic: string;
  configOptions: ConfigOption[];
}

export const worksheets: Worksheet[] = [
  {
    title: 'Addition Worksheets',
    slug: 'addition-worksheets',
    description: 'Free printable addition worksheets. Generate unlimited practice problems from single-digit to three-digit addition.',
    icon: '➕',
    gradeRange: 'K-3',
    mathTopic: 'Addition',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'maxDigits', label: 'Max Digits', type: 'select', default: '1', options: [{ value: '1', label: '1 Digit (0-9)' }, { value: '2', label: '2 Digits (10-99)' }, { value: '3', label: '3 Digits (100-999)' }] },
      { name: 'carry', label: 'Allow Carrying', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    ],
  },
  {
    title: 'Subtraction Worksheets',
    slug: 'subtraction-worksheets',
    description: 'Free printable subtraction worksheets. Practice from basic facts to multi-digit subtraction with borrowing.',
    icon: '➖',
    gradeRange: 'K-3',
    mathTopic: 'Subtraction',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'maxDigits', label: 'Max Digits', type: 'select', default: '1', options: [{ value: '1', label: '1 Digit (0-9)' }, { value: '2', label: '2 Digits (10-99)' }, { value: '3', label: '3 Digits (100-999)' }] },
      { name: 'negative', label: 'Allow Negative Answers', type: 'select', default: 'no', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    ],
  },
  {
    title: 'Multiplication Worksheets',
    slug: 'multiplication-worksheets',
    description: 'Free printable multiplication worksheets. Practice times tables and multi-digit multiplication problems.',
    icon: '✖️',
    gradeRange: '2-5',
    mathTopic: 'Multiplication',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'tableRange', label: 'Times Table Range', type: 'select', default: '12', options: [{ value: '5', label: '1-5' }, { value: '10', label: '1-10' }, { value: '12', label: '1-12' }] },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'single', options: [{ value: 'single', label: 'Single Digit x Single' }, { value: 'multi', label: 'Double Digit x Single' }] },
    ],
  },
  {
    title: 'Division Worksheets',
    slug: 'division-worksheets',
    description: 'Free printable division worksheets. Practice basic division facts and long division with or without remainders.',
    icon: '➗',
    gradeRange: '3-5',
    mathTopic: 'Division',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 50 },
      { name: 'divisorMax', label: 'Max Divisor', type: 'select', default: '10', options: [{ value: '5', label: 'Up to 5' }, { value: '10', label: 'Up to 10' }, { value: '12', label: 'Up to 12' }] },
      { name: 'remainder', label: 'Remainders', type: 'select', default: 'no', options: [{ value: 'no', label: 'No Remainders' }, { value: 'yes', label: 'With Remainders' }] },
    ],
  },
  {
    title: 'Number Tracing Worksheets',
    slug: 'number-tracing',
    description: 'Free printable number tracing worksheets for preschool and kindergarten. Practice writing numbers 0-20.',
    icon: '✏️',
    gradeRange: 'Pre-K',
    mathTopic: 'Number Writing',
    configOptions: [
      { name: 'rangeEnd', label: 'Number Range', type: 'select', default: '10', options: [{ value: '5', label: '0-5' }, { value: '10', label: '0-10' }, { value: '20', label: '0-20' }] },
      { name: 'repetitions', label: 'Repetitions Per Number', type: 'number', default: 4, min: 2, max: 8 },
    ],
  },
  {
    title: 'Skip Counting Worksheets',
    slug: 'skip-counting',
    description: 'Free printable skip counting worksheets. Practice counting by 2s, 5s, 10s, and more with fill-in-the-blank.',
    icon: '🔢',
    gradeRange: 'K-2',
    mathTopic: 'Skip Counting',
    configOptions: [
      { name: 'skipBy', label: 'Count By', type: 'select', default: '2', options: [{ value: '2', label: 'By 2s' }, { value: '3', label: 'By 3s' }, { value: '5', label: 'By 5s' }, { value: '10', label: 'By 10s' }] },
      { name: 'rows', label: 'Number of Rows', type: 'number', default: 8, min: 4, max: 12 },
      { name: 'blanks', label: 'Blanks Per Row', type: 'select', default: '3', options: [{ value: '2', label: '2 blanks' }, { value: '3', label: '3 blanks' }, { value: '5', label: '5 blanks' }] },
    ],
  },
  {
    title: 'Telling Time Worksheets',
    slug: 'telling-time-worksheets',
    description: 'Free printable telling time worksheets with analog clock faces. Practice reading clocks to the hour and minute.',
    icon: '🕐',
    gradeRange: '1-3',
    mathTopic: 'Telling Time',
    configOptions: [
      { name: 'problems', label: 'Number of Clocks', type: 'number', default: 12, min: 4, max: 20 },
      { name: 'precision', label: 'Time Precision', type: 'select', default: 'hour', options: [{ value: 'hour', label: 'To the Hour' }, { value: 'half', label: 'To the Half Hour' }, { value: '5min', label: 'To 5 Minutes' }, { value: '1min', label: 'To the Minute' }] },
    ],
  },
  {
    title: 'Counting Money Worksheets',
    slug: 'counting-money-worksheets',
    description: 'Free printable counting money worksheets with US coins and bills. Practice adding up pennies, nickels, dimes, and quarters.',
    icon: '🪙',
    gradeRange: '1-3',
    mathTopic: 'Counting Money',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 10, min: 4, max: 20 },
      { name: 'coinTypes', label: 'Coin Types', type: 'select', default: 'coins', options: [{ value: 'coins', label: 'Coins Only' }, { value: 'bills', label: 'Bills Only' }, { value: 'both', label: 'Coins and Bills' }] },
      { name: 'maxTotal', label: 'Max Total', type: 'select', default: '1.00', options: [{ value: '0.50', label: 'Up to 50¢' }, { value: '1.00', label: 'Up to $1.00' }, { value: '5.00', label: 'Up to $5.00' }, { value: '20.00', label: 'Up to $20.00' }] },
    ],
  },
  {
    title: 'Place Value Worksheets',
    slug: 'place-value-worksheets',
    description: 'Free printable place value worksheets. Practice identifying digit values, expanded form, and standard form for numbers up to 5 digits.',
    icon: '🔟',
    gradeRange: '1-4',
    mathTopic: 'Place Value',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 15, min: 5, max: 30 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'identify', options: [{ value: 'identify', label: 'Identify Digit Value' }, { value: 'expanded', label: 'Expanded Form' }, { value: 'standard', label: 'Standard Form' }, { value: 'compose', label: 'Write the Number' }] },
      { name: 'maxDigits', label: 'Max Digits', type: 'select', default: '3', options: [{ value: '2', label: '2 Digits (10-99)' }, { value: '3', label: '3 Digits (100-999)' }, { value: '4', label: '4 Digits (1,000-9,999)' }, { value: '5', label: '5 Digits (10,000-99,999)' }] },
    ],
  },
  {
    title: 'Rounding Worksheets',
    slug: 'rounding-worksheets',
    description: 'Free printable rounding worksheets. Practice rounding numbers to the nearest 10, 100, and 1,000 with unlimited problems.',
    icon: '🔄',
    gradeRange: '3-5',
    mathTopic: 'Rounding',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 40 },
      { name: 'roundTo', label: 'Round To', type: 'select', default: '10', options: [{ value: '10', label: 'Nearest 10' }, { value: '100', label: 'Nearest 100' }, { value: '1000', label: 'Nearest 1,000' }] },
      { name: 'maxNumber', label: 'Max Number', type: 'select', default: '999', options: [{ value: '99', label: 'Up to 99' }, { value: '999', label: 'Up to 999' }, { value: '9999', label: 'Up to 9,999' }, { value: '99999', label: 'Up to 99,999' }] },
    ],
  },
  {
    title: 'Comparing Numbers Worksheets',
    slug: 'comparing-numbers-worksheets',
    description: 'Free printable greater than less than worksheets. Practice comparing numbers using >, <, and = symbols.',
    icon: '⚖️',
    gradeRange: 'K-3',
    mathTopic: 'Comparing Numbers',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 5, max: 40 },
      { name: 'maxDigits', label: 'Max Digits', type: 'select', default: '2', options: [{ value: '1', label: '1 Digit (0-9)' }, { value: '2', label: '2 Digits (10-99)' }, { value: '3', label: '3 Digits (100-999)' }, { value: '4', label: '4 Digits (1,000-9,999)' }] },
      { name: 'includeEquals', label: 'Include Equals', type: 'select', default: 'yes', options: [{ value: 'yes', label: 'Yes (>, <, =)' }, { value: 'no', label: 'No (>, < only)' }] },
    ],
  },
  {
    title: 'Even & Odd Worksheets',
    slug: 'even-and-odd-worksheets',
    description: 'Free printable even and odd number worksheets. Practice identifying, sorting, and classifying numbers as even or odd.',
    icon: '🎯',
    gradeRange: 'K-2',
    mathTopic: 'Even & Odd Numbers',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 20, min: 10, max: 40 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'classify', options: [{ value: 'classify', label: 'Classify (Even or Odd?)' }, { value: 'color', label: 'Color Even Numbers' }, { value: 'fill', label: 'Fill Missing Even/Odd' }] },
      { name: 'maxNumber', label: 'Max Number', type: 'select', default: '20', options: [{ value: '10', label: 'Up to 10' }, { value: '20', label: 'Up to 20' }, { value: '50', label: 'Up to 50' }, { value: '100', label: 'Up to 100' }] },
    ],
  },
  {
    title: 'Fractions Worksheets',
    slug: 'fractions-worksheets',
    description: 'Free printable fractions worksheets. Practice identifying, comparing, and adding fractions with visual models and step-by-step problems.',
    icon: '½',
    gradeRange: '3-5',
    mathTopic: 'Fractions',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 16, min: 5, max: 30 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'identify', options: [{ value: 'identify', label: 'Identify Fractions (Visual)' }, { value: 'equivalent', label: 'Equivalent Fractions' }, { value: 'compare', label: 'Compare Fractions' }, { value: 'addSame', label: 'Add (Same Denominator)' }, { value: 'subSame', label: 'Subtract (Same Denominator)' }, { value: 'addDiff', label: 'Add (Different Denom.)' }, { value: 'subDiff', label: 'Subtract (Different Denom.)' }] },
      { name: 'maxDenom', label: 'Max Denominator', type: 'select', default: '8', options: [{ value: '4', label: 'Up to 4' }, { value: '8', label: 'Up to 8' }, { value: '12', label: 'Up to 12' }] },
    ],
  },
  {
    title: 'Order of Operations Worksheets',
    slug: 'order-of-operations-worksheets',
    description: 'Free printable order of operations (PEMDAS) worksheets. Practice evaluating expressions with parentheses, exponents, and mixed operations.',
    icon: '📐',
    gradeRange: '4-6',
    mathTopic: 'Order of Operations',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 15, min: 5, max: 30 },
      { name: 'difficulty', label: 'Difficulty', type: 'select', default: 'basic', options: [{ value: 'basic', label: 'Basic (2 operations, no parentheses)' }, { value: 'medium', label: 'Medium (2-3 operations, parentheses)' }, { value: 'advanced', label: 'Advanced (3-4 operations, exponents)' }] },
      { name: 'maxNumber', label: 'Max Number', type: 'select', default: '9', options: [{ value: '9', label: 'Up to 9' }, { value: '12', label: 'Up to 12' }, { value: '20', label: 'Up to 20' }] },
    ],
  },
  {
    title: 'Long Division Worksheets',
    slug: 'long-division-worksheets',
    description: 'Free printable long division worksheets. Practice dividing 2-4 digit numbers with step-by-step long division format.',
    icon: '➗',
    gradeRange: '4-6',
    mathTopic: 'Long Division',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 10, min: 4, max: 20 },
      { name: 'type', label: 'Division Type', type: 'select', default: '2by1', options: [{ value: '2by1', label: '2-digit ÷ 1-digit' }, { value: '3by1', label: '3-digit ÷ 1-digit' }, { value: '3by2', label: '3-digit ÷ 2-digit' }, { value: '4by2', label: '4-digit ÷ 2-digit' }] },
      { name: 'remainder', label: 'Remainders', type: 'select', default: 'no', options: [{ value: 'no', label: 'No Remainders' }, { value: 'yes', label: 'With Remainders' }] },
    ],
  },
  {
    title: 'Number Patterns Worksheets',
    slug: 'number-patterns-worksheets',
    description: 'Free printable number patterns worksheets. Practice recognizing and extending addition, subtraction, and multiplication patterns.',
    icon: '🔢',
    gradeRange: '1-4',
    mathTopic: 'Number Patterns',
    configOptions: [
      { name: 'problems', label: 'Number of Patterns', type: 'number', default: 10, min: 5, max: 20 },
      { name: 'patternType', label: 'Pattern Type', type: 'select', default: 'adding', options: [{ value: 'adding', label: 'Adding' }, { value: 'subtracting', label: 'Subtracting' }, { value: 'multiplying', label: 'Multiplying' }, { value: 'mixed', label: 'Mixed' }] },
      { name: 'difficulty', label: 'Difficulty', type: 'select', default: 'easy', options: [{ value: 'easy', label: 'Easy (numbers < 50)' }, { value: 'medium', label: 'Medium (numbers < 200)' }, { value: 'hard', label: 'Hard (numbers < 1,000)' }] },
    ],
  },
  {
    title: 'Number Line Worksheets',
    slug: 'number-line-worksheets',
    description: 'Free printable number line worksheets. Practice identifying numbers, placing values, and visualizing addition and subtraction on a number line.',
    icon: '📏',
    gradeRange: '1-3',
    mathTopic: 'Number Line',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 8, min: 4, max: 15 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'identify', options: [{ value: 'identify', label: 'Identify the Number' }, { value: 'place', label: 'Place the Number' }, { value: 'addition', label: 'Addition on Number Line' }, { value: 'subtraction', label: 'Subtraction on Number Line' }] },
      { name: 'range', label: 'Number Range', type: 'select', default: '20', options: [{ value: '10', label: '0 to 10' }, { value: '20', label: '0 to 20' }, { value: '50', label: '0 to 50' }, { value: '100', label: '0 to 100' }] },
    ],
  },
  {
    title: 'Area & Perimeter Worksheets',
    slug: 'area-and-perimeter-worksheets',
    description: 'Free printable area and perimeter worksheets. Practice calculating area and perimeter of rectangles, squares, and triangles with visual diagrams.',
    icon: '📐',
    gradeRange: '3-5',
    mathTopic: 'Area & Perimeter',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 10, min: 5, max: 20 },
      { name: 'type', label: 'Find', type: 'select', default: 'both', options: [{ value: 'area', label: 'Area Only' }, { value: 'perimeter', label: 'Perimeter Only' }, { value: 'both', label: 'Area and Perimeter' }] },
      { name: 'shapes', label: 'Shapes', type: 'select', default: 'rectangles', options: [{ value: 'rectangles', label: 'Rectangles & Squares' }, { value: 'triangles', label: 'Triangles' }, { value: 'mixed', label: 'Mixed' }] },
      { name: 'maxSide', label: 'Max Side Length', type: 'select', default: '12', options: [{ value: '10', label: 'Up to 10' }, { value: '12', label: 'Up to 12' }, { value: '20', label: 'Up to 20' }] },
    ],
  },
  {
    title: 'Decimals Worksheets',
    slug: 'decimals-worksheets',
    description: 'Free printable decimals worksheets. Practice adding, subtracting, multiplying, and dividing decimal numbers with configurable decimal places.',
    icon: '🔢',
    gradeRange: '4-6',
    mathTopic: 'Decimals',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 15, min: 5, max: 30 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'addSub', options: [{ value: 'addSub', label: 'Add & Subtract' }, { value: 'multiply', label: 'Multiply' }, { value: 'divide', label: 'Divide' }, { value: 'placeValue', label: 'Place Value' }, { value: 'compare', label: 'Compare Decimals' }] },
      { name: 'maxDecimalPlaces', label: 'Decimal Places', type: 'select', default: '2', options: [{ value: '1', label: '1 Place (0.1)' }, { value: '2', label: '2 Places (0.01)' }, { value: '3', label: '3 Places (0.001)' }] },
    ],
  },
  {
    title: 'Percentages Worksheets',
    slug: 'percentages-worksheets',
    description: 'Free printable percentages worksheets. Practice finding percent of a number, percent change, discounts, and converting between fractions, decimals, and percents.',
    icon: '%',
    gradeRange: '5-7',
    mathTopic: 'Percentages',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 15, min: 5, max: 30 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'percentOf', options: [{ value: 'findPercent', label: 'Find the Percent' }, { value: 'percentOf', label: 'Percent of a Number' }, { value: 'percentChange', label: 'Percent Change' }, { value: 'discount', label: 'Discounts & Sale Price' }] },
      { name: 'difficulty', label: 'Difficulty', type: 'select', default: 'easy', options: [{ value: 'easy', label: 'Easy (nice percentages)' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard (multi-step)' }] },
    ],
  },
  {
    title: 'Fact Families Worksheets',
    slug: 'fact-families-worksheets',
    description: 'Free printable fact family worksheets. Practice addition/subtraction and multiplication/division fact families with visual triangle models.',
    icon: '🏠',
    gradeRange: 'K-2',
    mathTopic: 'Fact Families',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 10, min: 5, max: 20 },
      { name: 'operation', label: 'Operation', type: 'select', default: 'addSub', options: [{ value: 'addSub', label: 'Addition & Subtraction' }, { value: 'mulDiv', label: 'Multiplication & Division' }] },
      { name: 'maxNumber', label: 'Max Number', type: 'select', default: '10', options: [{ value: '10', label: 'Up to 10' }, { value: '12', label: 'Up to 12' }, { value: '20', label: 'Up to 20' }] },
    ],
  },
  {
    title: 'Measurement Worksheets',
    slug: 'measurement-worksheets',
    description: 'Free printable measurement worksheets. Practice converting between customary and metric units, comparing measurements, and solving measurement word problems.',
    icon: '📏',
    gradeRange: '2-4',
    mathTopic: 'Measurement',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 15, min: 5, max: 30 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'convert', options: [{ value: 'convert', label: 'Unit Conversions' }, { value: 'compare', label: 'Compare Measurements' }, { value: 'wordProblem', label: 'Word Problems' }] },
      { name: 'system', label: 'Measurement System', type: 'select', default: 'customary', options: [{ value: 'customary', label: 'Customary (US)' }, { value: 'metric', label: 'Metric' }, { value: 'both', label: 'Both' }] },
    ],
  },
  {
    title: 'Word Problems Worksheets',
    slug: 'word-problems-worksheets',
    description: 'Free printable math word problems worksheets. Practice solving addition, subtraction, multiplication, and division word problems for grades 1-6.',
    icon: '📝',
    gradeRange: '1-6',
    mathTopic: 'Word Problems',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 8, min: 5, max: 15 },
      { name: 'operation', label: 'Operation', type: 'select', default: 'mixed', options: [{ value: 'addition', label: 'Addition' }, { value: 'subtraction', label: 'Subtraction' }, { value: 'multiplication', label: 'Multiplication' }, { value: 'division', label: 'Division' }, { value: 'mixed', label: 'Mixed Operations' }] },
      { name: 'gradeLevel', label: 'Grade Level', type: 'select', default: '3-4', options: [{ value: '1-2', label: 'Grades 1-2 (numbers < 20)' }, { value: '3-4', label: 'Grades 3-4 (numbers < 100)' }, { value: '5-6', label: 'Grades 5-6 (larger numbers)' }] },
    ],
  },
  {
    title: 'Geometry Worksheets',
    slug: 'geometry-worksheets',
    description: 'Free printable geometry worksheets. Practice identifying shapes, classifying angles, finding lines of symmetry, and classifying triangles with visual diagrams.',
    icon: '📐',
    gradeRange: '2-5',
    mathTopic: 'Geometry',
    configOptions: [
      { name: 'problems', label: 'Number of Problems', type: 'number', default: 10, min: 5, max: 20 },
      { name: 'type', label: 'Problem Type', type: 'select', default: 'identifyShapes', options: [{ value: 'identifyShapes', label: 'Identify Shapes' }, { value: 'angles', label: 'Classify Angles' }, { value: 'symmetry', label: 'Lines of Symmetry' }, { value: 'classify', label: 'Classify Triangles' }] },
      { name: 'difficulty', label: 'Difficulty', type: 'select', default: 'easy', options: [{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }] },
    ],
  },
];

export function getWorksheetBySlug(slug: string): Worksheet | undefined {
  return worksheets.find(w => w.slug === slug);
}
