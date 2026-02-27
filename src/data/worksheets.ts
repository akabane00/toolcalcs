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
];

export function getWorksheetBySlug(slug: string): Worksheet | undefined {
  return worksheets.find(w => w.slug === slug);
}
