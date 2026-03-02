// ==========================================================================
//  Random Number Generator Data for Programmatic SEO Pages
//  Generates ~40 pages at /random/{slug}/
// ==========================================================================

export interface RandomGenPage {
  slug: string;
  title: string;
  min: number;
  max: number;
  type: 'number' | 'special';
  description: string;
  probability: string;
  uses: string[];
}

const RANGES: { slug: string; title: string; min: number; max: number; description: string; probability: string; uses: string[] }[] = [
  { slug: 'number-between-1-and-2', title: 'Random Number Between 1 and 2', min: 1, max: 2, description: 'Generate a random number: 1 or 2. Perfect for binary decisions and coin-flip alternatives.', probability: '50% each', uses: ['Binary decisions', 'Team selection', 'Coin flip alternative'] },
  { slug: 'number-between-1-and-3', title: 'Random Number Between 1 and 3', min: 1, max: 3, description: 'Generate a random number from 1 to 3. Great for three-way decisions.', probability: '33.3% each', uses: ['Three-way decisions', 'Rock-paper-scissors', 'Small group selection'] },
  { slug: 'number-between-1-and-4', title: 'Random Number Between 1 and 4', min: 1, max: 4, description: 'Generate a random number from 1 to 4. Useful for direction picking and quadrant selection.', probability: '25% each', uses: ['Direction picking (N/S/E/W)', 'Quarter selection', 'Card suit selection'] },
  { slug: 'number-between-1-and-5', title: 'Random Number Between 1 and 5', min: 1, max: 5, description: 'Generate a random number from 1 to 5. Common for rating scales and small group activities.', probability: '20% each', uses: ['Star rating selection', 'Small group games', 'Priority ranking'] },
  { slug: 'number-between-1-and-6', title: 'Random Number Between 1 and 6', min: 1, max: 6, description: 'Generate a random number from 1 to 6. Digital dice roller for board games.', probability: '16.67% each', uses: ['Dice roller', 'Board games', 'Tabletop RPG'] },
  { slug: 'number-between-1-and-8', title: 'Random Number Between 1 and 8', min: 1, max: 8, description: 'Generate a random number from 1 to 8. Like a digital Magic 8-Ball.', probability: '12.5% each', uses: ['8-sided die (D8)', 'Tournament brackets', 'Octant selection'] },
  { slug: 'number-between-1-and-10', title: 'Random Number Between 1 and 10', min: 1, max: 10, description: 'Generate a random number from 1 to 10. One of the most common random number ranges.', probability: '10% each', uses: ['Rating scales', 'Classroom activities', 'Quick decisions', 'Party games'] },
  { slug: 'number-between-1-and-12', title: 'Random Number Between 1 and 12', min: 1, max: 12, description: 'Generate a random number from 1 to 12. Useful for clock hours and month selection.', probability: '8.33% each', uses: ['Month selection', 'Clock hour picking', '12-sided die (D12)'] },
  { slug: 'number-between-1-and-20', title: 'Random Number Between 1 and 20', min: 1, max: 20, description: 'Generate a random number from 1 to 20. The classic D20 roll for tabletop RPGs.', probability: '5% each', uses: ['D20 roll (D&D)', 'Tabletop RPG', 'Classroom lottery', 'Number guessing games'] },
  { slug: 'number-between-1-and-25', title: 'Random Number Between 1 and 25', min: 1, max: 25, description: 'Generate a random number from 1 to 25. Great for classroom activities and bingo.', probability: '4% each', uses: ['Classroom selection', 'Bingo numbers', 'Small lottery'] },
  { slug: 'number-between-1-and-30', title: 'Random Number Between 1 and 30', min: 1, max: 30, description: 'Generate a random number from 1 to 30. Perfect for picking a day of the month.', probability: '3.33% each', uses: ['Day of month selection', 'Class of 30 students', 'Monthly planning'] },
  { slug: 'number-between-1-and-36', title: 'Random Number Between 1 and 36', min: 1, max: 36, description: 'Generate a random number from 1 to 36. Matches a roulette wheel (without 0/00).', probability: '2.78% each', uses: ['Roulette simulation', 'Grid selection (6x6)', 'Lottery practice'] },
  { slug: 'number-between-1-and-50', title: 'Random Number Between 1 and 50', min: 1, max: 50, description: 'Generate a random number from 1 to 50. Common range for lotteries and contests.', probability: '2% each', uses: ['Lottery numbers', 'Raffle drawing', 'Contest winner selection'] },
  { slug: 'number-between-1-and-52', title: 'Random Number Between 1 and 52', min: 1, max: 52, description: 'Generate a random number from 1 to 52. Pick a random card from a standard deck.', probability: '1.92% each', uses: ['Random card from deck', 'Weekly planner (52 weeks)', 'Card game simulation'] },
  { slug: 'number-between-1-and-100', title: 'Random Number Between 1 and 100', min: 1, max: 100, description: 'Generate a random number from 1 to 100. The most popular random number range.', probability: '1% each', uses: ['Percentile selection', 'Number guessing games', 'Statistical sampling', 'Lottery and raffle'] },
  { slug: 'number-between-1-and-200', title: 'Random Number Between 1 and 200', min: 1, max: 200, description: 'Generate a random number from 1 to 200.', probability: '0.5% each', uses: ['Large group selection', 'Extended range games', 'Survey sampling'] },
  { slug: 'number-between-1-and-500', title: 'Random Number Between 1 and 500', min: 1, max: 500, description: 'Generate a random number from 1 to 500.', probability: '0.2% each', uses: ['Large raffle', 'Database row selection', 'Inventory sampling'] },
  { slug: 'number-between-1-and-1000', title: 'Random Number Between 1 and 1000', min: 1, max: 1000, description: 'Generate a random number from 1 to 1000. Common for large-scale random selection.', probability: '0.1% each', uses: ['PIN generation', 'Large lottery', 'Random sampling', 'Security codes'] },
  { slug: 'number-between-1-and-10000', title: 'Random Number Between 1 and 10000', min: 1, max: 10000, description: 'Generate a random number from 1 to 10,000.', probability: '0.01% each', uses: ['Ticket numbers', 'Large-scale random selection', 'Test data generation'] },
  { slug: 'number-between-0-and-1', title: 'Random Number Between 0 and 1', min: 0, max: 1, description: 'Generate a random 0 or 1. Binary digit generator.', probability: '50% each', uses: ['Binary decisions', 'Bit generation', 'True/false selection'] },
  { slug: 'number-between-0-and-9', title: 'Random Number Between 0 and 9', min: 0, max: 9, description: 'Generate a random single digit from 0 to 9.', probability: '10% each', uses: ['Single digit generation', 'Phone number digits', 'PIN digits'] },
  { slug: 'number-between-0-and-100', title: 'Random Number Between 0 and 100', min: 0, max: 100, description: 'Generate a random number from 0 to 100, including zero.', probability: '~0.99% each', uses: ['Percentage generation', 'Score simulation', 'Progress randomizer'] },
  { slug: 'number-between-1-and-2000', title: 'Random Number Between 1 and 2000', min: 1, max: 2000, description: 'Generate a random number from 1 to 2,000.', probability: '0.05% each', uses: ['Year selection', 'Large group lottery', 'Historical year picker'] },
  // Special "dice" pages
  { slug: 'dice-roll', title: 'Online Dice Roller', min: 1, max: 6, description: 'Roll a virtual 6-sided die. Perfect for board games when you do not have dice handy.', probability: '16.67% per face', uses: ['Board games', 'Party games', 'Decision making', 'Teaching probability'] },
  { slug: 'two-dice-roll', title: 'Roll Two Dice', min: 2, max: 12, description: 'Roll two 6-sided dice and see the sum. Classic for Monopoly, Settlers of Catan, and more.', probability: '7 is most likely (16.67%)', uses: ['Monopoly', 'Settlers of Catan', 'Craps simulation', 'Board games'] },
  // Fun decision makers
  { slug: 'coin-flip', title: 'Flip a Coin - Heads or Tails', min: 0, max: 1, description: 'Flip a virtual coin. Get heads or tails instantly for quick decisions.', probability: '50% each side', uses: ['Quick decisions', 'Sports toss', 'Settling disputes', 'Probability teaching'] },
  { slug: 'yes-or-no', title: 'Random Yes or No Generator', min: 0, max: 1, description: 'Get a random Yes or No answer. Let fate decide when you cannot make up your mind.', probability: '50% each', uses: ['Decision making', 'Party games', 'Breaking deadlocks', 'Fun randomizer'] },
  { slug: 'random-letter', title: 'Random Letter Generator', min: 1, max: 26, description: 'Generate a random letter from A to Z. Perfect for word games and creative exercises.', probability: '3.85% each letter', uses: ['Scattergories', 'Word games', 'Creative writing prompts', 'Teaching alphabet'] },
  { slug: 'random-color', title: 'Random Color Generator', min: 0, max: 16777215, description: 'Generate a random color with hex code. Great for design inspiration and art projects.', probability: '1 in 16.7 million', uses: ['Design inspiration', 'Art projects', 'Web development', 'Color palette creation'] },
  { slug: 'number-between-1-and-60', title: 'Random Number Between 1 and 60', min: 1, max: 60, description: 'Generate a random number from 1 to 60. Useful for minute/second selection and lottery games.', probability: '1.67% each', uses: ['Minute/second picker', 'Lottery numbers', 'Bingo', 'Class selection'] },
  { slug: 'number-between-1-and-75', title: 'Random Number Between 1 and 75', min: 1, max: 75, description: 'Generate a random number from 1 to 75. Standard American Bingo number range.', probability: '1.33% each', uses: ['Bingo caller', 'Lottery', 'Large group selection'] },
  { slug: 'number-between-1-and-90', title: 'Random Number Between 1 and 90', min: 1, max: 90, description: 'Generate a random number from 1 to 90. Standard for European/UK Bingo.', probability: '1.11% each', uses: ['UK Bingo', 'Lottery', 'Tombola'] },
  { slug: 'number-between-1-and-150', title: 'Random Number Between 1 and 150', min: 1, max: 150, description: 'Generate a random number from 1 to 150.', probability: '0.67% each', uses: ['Large class selection', 'Extended lottery', 'Game scoring'] },
  { slug: 'number-between-1-and-300', title: 'Random Number Between 1 and 300', min: 1, max: 300, description: 'Generate a random number from 1 to 300.', probability: '0.33% each', uses: ['Large event raffle', 'Bowling scores', 'Random page picker'] },
  { slug: 'number-between-1-and-365', title: 'Random Number Between 1 and 365', min: 1, max: 365, description: 'Generate a random number from 1 to 365. Pick a random day of the year.', probability: '0.27% each', uses: ['Random day of year', 'Birthday paradox demo', 'Daily challenge picker'] },
];

let _cache: RandomGenPage[] | null = null;

export function getAllRandomGenPages(): RandomGenPage[] {
  if (_cache) return _cache;
  _cache = RANGES.map(function (r) {
    return {
      slug: r.slug,
      title: r.title,
      min: r.min,
      max: r.max,
      type: (r.slug === 'coin-flip' || r.slug === 'yes-or-no' || r.slug === 'random-letter' || r.slug === 'random-color' || r.slug === 'dice-roll' || r.slug === 'two-dice-roll') ? 'special' as const : 'number' as const,
      description: r.description,
      probability: r.probability,
      uses: r.uses,
    };
  });
  return _cache;
}

export function getRandomGenBySlug(slug: string): RandomGenPage | undefined {
  return getAllRandomGenPages().find(function (p) { return p.slug === slug; });
}
