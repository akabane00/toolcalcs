export interface RatingLevel {
  max: number;
  label: string;
  color: string;
}

export interface Game {
  title: string;
  slug: string;
  description: string;
  icon: string;
  metricUnit: string;
  metricLabel: string;
  lowerIsBetter: boolean;
  ratingScale: RatingLevel[];
}

export const games: Game[] = [
  {
    title: 'Reaction Time Test',
    slug: 'reaction-time-test',
    description: 'Test how fast you can react to a visual stimulus. Measure your response time in milliseconds.',
    icon: '⚡',
    metricUnit: 'ms',
    metricLabel: 'Reaction Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 150, label: 'Incredible!', color: '#16a34a' },
      { max: 200, label: 'Fast!', color: '#22c55e' },
      { max: 250, label: 'Good', color: '#2563eb' },
      { max: 350, label: 'Average', color: '#f59e0b' },
      { max: 500, label: 'Slow', color: '#ef4444' },
      { max: Infinity, label: 'Very Slow', color: '#dc2626' },
    ],
  },
  {
    title: 'CPS Test',
    slug: 'cps-test',
    description: 'Measure your clicks per second. Click as fast as you can in a set time period.',
    icon: '🖱️',
    metricUnit: 'CPS',
    metricLabel: 'Clicks Per Second',
    lowerIsBetter: false,
    ratingScale: [
      { max: 4, label: 'Slow', color: '#ef4444' },
      { max: 6, label: 'Average', color: '#f59e0b' },
      { max: 8, label: 'Good', color: '#2563eb' },
      { max: 10, label: 'Fast!', color: '#22c55e' },
      { max: Infinity, label: 'Incredible!', color: '#16a34a' },
    ],
  },
  {
    title: 'Typing Speed Test',
    slug: 'typing-speed-test',
    description: 'Test your typing speed and accuracy. See your words per minute and error rate.',
    icon: '⌨️',
    metricUnit: 'WPM',
    metricLabel: 'Words Per Minute',
    lowerIsBetter: false,
    ratingScale: [
      { max: 20, label: 'Beginner', color: '#ef4444' },
      { max: 40, label: 'Average', color: '#f59e0b' },
      { max: 60, label: 'Good', color: '#2563eb' },
      { max: 80, label: 'Fast!', color: '#22c55e' },
      { max: Infinity, label: 'Pro Typist!', color: '#16a34a' },
    ],
  },
  {
    title: 'Perfect Circle Test',
    slug: 'perfect-circle-test',
    description: 'Draw a circle freehand and see how close to perfect it is. Score your circularity percentage.',
    icon: '⭕',
    metricUnit: '%',
    metricLabel: 'Circularity',
    lowerIsBetter: false,
    ratingScale: [
      { max: 50, label: 'Rough', color: '#ef4444' },
      { max: 70, label: 'Okay', color: '#f59e0b' },
      { max: 85, label: 'Good', color: '#2563eb' },
      { max: 95, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Perfect!', color: '#16a34a' },
    ],
  },
  {
    title: 'Number Memory Test',
    slug: 'number-memory-test',
    description: 'Test your short-term memory. Remember increasingly longer number sequences.',
    icon: '🧠',
    metricUnit: 'digits',
    metricLabel: 'Max Digits',
    lowerIsBetter: false,
    ratingScale: [
      { max: 4, label: 'Below Average', color: '#ef4444' },
      { max: 6, label: 'Average', color: '#f59e0b' },
      { max: 8, label: 'Good', color: '#2563eb' },
      { max: 10, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Exceptional!', color: '#16a34a' },
    ],
  },
  {
    title: 'Aim Trainer',
    slug: 'aim-trainer',
    description: 'Test your mouse accuracy and speed. Click on targets as fast and precisely as you can.',
    icon: '🎯',
    metricUnit: 'ms',
    metricLabel: 'Avg Hit Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 300, label: 'Incredible!', color: '#16a34a' },
      { max: 450, label: 'Fast!', color: '#22c55e' },
      { max: 600, label: 'Good', color: '#2563eb' },
      { max: 800, label: 'Average', color: '#f59e0b' },
      { max: Infinity, label: 'Slow', color: '#ef4444' },
    ],
  },
  {
    title: 'Color Blindness Test',
    slug: 'color-blindness-test',
    description: 'Test your color vision by finding the different colored tile. See how subtle a color difference you can detect.',
    icon: '🎨',
    metricUnit: 'level',
    metricLabel: 'Level Reached',
    lowerIsBetter: false,
    ratingScale: [
      { max: 10, label: 'Below Average', color: '#ef4444' },
      { max: 20, label: 'Average', color: '#f59e0b' },
      { max: 30, label: 'Good', color: '#2563eb' },
      { max: 40, label: 'Excellent!', color: '#22c55e' },
      { max: Infinity, label: 'Superhuman!', color: '#16a34a' },
    ],
  },
  {
    title: 'Visual Memory Test',
    slug: 'visual-memory-test',
    description: 'Test your visual short-term memory. Remember the pattern of highlighted tiles and recreate it.',
    icon: '👁️',
    metricUnit: 'level',
    metricLabel: 'Level Reached',
    lowerIsBetter: false,
    ratingScale: [
      { max: 5, label: 'Below Average', color: '#ef4444' },
      { max: 8, label: 'Average', color: '#f59e0b' },
      { max: 11, label: 'Good', color: '#2563eb' },
      { max: 14, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Exceptional!', color: '#16a34a' },
    ],
  },
  {
    title: 'Stroop Effect Test',
    slug: 'stroop-test',
    description: 'Test your cognitive speed with the Stroop Effect. Identify ink colors while ignoring the written word.',
    icon: '🧪',
    metricUnit: 'ms',
    metricLabel: 'Avg Response Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 700, label: 'Incredible!', color: '#16a34a' },
      { max: 1000, label: 'Fast!', color: '#22c55e' },
      { max: 1500, label: 'Good', color: '#2563eb' },
      { max: 2000, label: 'Average', color: '#f59e0b' },
      { max: Infinity, label: 'Slow', color: '#ef4444' },
    ],
  },
  {
    title: 'Chimp Test',
    slug: 'chimp-test',
    description: 'Can you beat a chimpanzee? Remember the positions of numbers and click them in order after they disappear.',
    icon: '🐵',
    metricUnit: 'numbers',
    metricLabel: 'Numbers Remembered',
    lowerIsBetter: false,
    ratingScale: [
      { max: 5, label: 'Below Average', color: '#ef4444' },
      { max: 7, label: 'Average', color: '#f59e0b' },
      { max: 9, label: 'Good', color: '#2563eb' },
      { max: 11, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Chimpanzee Level!', color: '#16a34a' },
    ],
  },
  {
    title: 'Math Flashcards',
    slug: 'math-flashcards',
    description: 'Practice arithmetic with timed flashcards. Answer as many math problems as you can before time runs out.',
    icon: '🔢',
    metricUnit: 'correct',
    metricLabel: 'Correct Answers',
    lowerIsBetter: false,
    ratingScale: [
      { max: 5, label: 'Keep Practicing', color: '#ef4444' },
      { max: 10, label: 'Getting There', color: '#f59e0b' },
      { max: 20, label: 'Good', color: '#2563eb' },
      { max: 30, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Math Whiz!', color: '#16a34a' },
    ],
  },
  {
    title: 'Timed Math Drills',
    slug: 'timed-math-drills',
    description: 'Race against the clock to solve as many math problems as possible. Build speed and accuracy with mental math.',
    icon: '⏱️',
    metricUnit: 'problems',
    metricLabel: 'Problems Solved',
    lowerIsBetter: false,
    ratingScale: [
      { max: 10, label: 'Warming Up', color: '#ef4444' },
      { max: 20, label: 'Average', color: '#f59e0b' },
      { max: 35, label: 'Good', color: '#2563eb' },
      { max: 50, label: 'Fast!', color: '#22c55e' },
      { max: Infinity, label: 'Speed Demon!', color: '#16a34a' },
    ],
  },
  {
    title: 'Sequence Memory Test',
    slug: 'sequence-memory-test',
    description: 'Watch the pattern of highlighted tiles and repeat it. How long a sequence can you remember?',
    icon: '🔢',
    metricUnit: 'tiles',
    metricLabel: 'Sequence Length',
    lowerIsBetter: false,
    ratingScale: [
      { max: 4, label: 'Below Average', color: '#ef4444' },
      { max: 7, label: 'Average', color: '#f59e0b' },
      { max: 10, label: 'Good', color: '#2563eb' },
      { max: 13, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Exceptional!', color: '#16a34a' },
    ],
  },
  {
    title: 'Verbal Memory Test',
    slug: 'verbal-memory-test',
    description: 'Words are shown one at a time. Decide if each word is new or if you have seen it before.',
    icon: '📝',
    metricUnit: 'correct',
    metricLabel: 'Words',
    lowerIsBetter: false,
    ratingScale: [
      { max: 14, label: 'Below Average', color: '#ef4444' },
      { max: 30, label: 'Average', color: '#f59e0b' },
      { max: 50, label: 'Good', color: '#2563eb' },
      { max: 75, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Exceptional!', color: '#16a34a' },
    ],
  },
  {
    title: 'Schulte Table Test',
    slug: 'schulte-table-test',
    description: 'Find numbers 1-25 in order on a 5×5 grid as fast as you can. Measures visual search speed.',
    icon: '🔍',
    metricUnit: 'seconds',
    metricLabel: 'Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 20, label: 'Incredible!', color: '#16a34a' },
      { max: 30, label: 'Fast!', color: '#22c55e' },
      { max: 45, label: 'Good', color: '#2563eb' },
      { max: 60, label: 'Average', color: '#f59e0b' },
      { max: Infinity, label: 'Slow', color: '#ef4444' },
    ],
  },
  {
    title: 'Spacebar Counter Test',
    slug: 'spacebar-counter-test',
    description: 'How fast can you press the spacebar? Measure your spacebar presses per second (SPS).',
    icon: '⌨️',
    metricUnit: 'SPS',
    metricLabel: 'Presses Per Second',
    lowerIsBetter: false,
    ratingScale: [
      { max: 3, label: 'Slow', color: '#ef4444' },
      { max: 6, label: 'Average', color: '#f59e0b' },
      { max: 8, label: 'Good', color: '#2563eb' },
      { max: 10, label: 'Fast!', color: '#22c55e' },
      { max: Infinity, label: 'Incredible!', color: '#16a34a' },
    ],
  },
  // Content Sprint 2 - Games
  {
    title: '2048 Game',
    slug: '2048-game',
    description: 'Slide numbered tiles on a 4x4 grid to combine them and reach the 2048 tile. A classic puzzle game of strategy.',
    icon: '🔢',
    metricUnit: 'pts',
    metricLabel: 'High Score',
    lowerIsBetter: false,
    ratingScale: [
      { max: 500, label: 'Beginner', color: '#ef4444' },
      { max: 2000, label: 'Learning', color: '#f59e0b' },
      { max: 5000, label: 'Good', color: '#2563eb' },
      { max: 10000, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Master!', color: '#16a34a' },
    ],
  },
  {
    title: 'Snake Game',
    slug: 'snake-game',
    description: 'Control a growing snake to eat food without hitting walls or yourself. A timeless classic arcade game.',
    icon: '🐍',
    metricUnit: 'pts',
    metricLabel: 'Score',
    lowerIsBetter: false,
    ratingScale: [
      { max: 5, label: 'Beginner', color: '#ef4444' },
      { max: 15, label: 'Average', color: '#f59e0b' },
      { max: 30, label: 'Good', color: '#2563eb' },
      { max: 50, label: 'Great!', color: '#22c55e' },
      { max: Infinity, label: 'Master!', color: '#16a34a' },
    ],
  },
  {
    title: 'Sudoku',
    slug: 'sudoku',
    description: 'Play unlimited Sudoku puzzles at easy, medium, or hard difficulty. Timer, hints, and mistake tracking included.',
    icon: '🧩',
    metricUnit: 'sec',
    metricLabel: 'Completion Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 120, label: 'Lightning!', color: '#16a34a' },
      { max: 300, label: 'Fast!', color: '#22c55e' },
      { max: 600, label: 'Good', color: '#2563eb' },
      { max: 900, label: 'Average', color: '#f59e0b' },
      { max: Infinity, label: 'Keep Practicing', color: '#ef4444' },
    ],
  },
  {
    title: 'Minesweeper',
    slug: 'minesweeper',
    description: 'Clear the board without detonating any mines. Use number clues to identify safe squares and flag mines.',
    icon: '💣',
    metricUnit: 'sec',
    metricLabel: 'Time',
    lowerIsBetter: true,
    ratingScale: [
      { max: 30, label: 'Speed Demon!', color: '#16a34a' },
      { max: 60, label: 'Fast!', color: '#22c55e' },
      { max: 120, label: 'Good', color: '#2563eb' },
      { max: 300, label: 'Average', color: '#f59e0b' },
      { max: Infinity, label: 'Careful Player', color: '#ef4444' },
    ],
  },
  {
    title: 'Wordle Game',
    slug: 'wordle-game',
    description: 'Guess the hidden 5-letter word in 6 tries. Green, yellow, and gray clues guide you to the answer.',
    icon: '🟩',
    metricUnit: 'guesses',
    metricLabel: 'Guesses Used',
    lowerIsBetter: true,
    ratingScale: [
      { max: 1, label: 'Genius!', color: '#16a34a' },
      { max: 2, label: 'Brilliant!', color: '#22c55e' },
      { max: 3, label: 'Great!', color: '#2563eb' },
      { max: 4, label: 'Good', color: '#f59e0b' },
      { max: 5, label: 'Close Call', color: '#ef4444' },
      { max: Infinity, label: 'Phew!', color: '#dc2626' },
    ],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(g => g.slug === slug);
}

export function getRating(game: Game, score: number): RatingLevel {
  if (game.lowerIsBetter) {
    return game.ratingScale.find(r => score <= r.max) || game.ratingScale[game.ratingScale.length - 1];
  }
  // For higher-is-better, iterate in reverse to find the highest matching bracket
  for (let i = game.ratingScale.length - 1; i >= 0; i--) {
    if (i === 0) return game.ratingScale[0];
    const prev = game.ratingScale[i - 1];
    if (score >= prev.max) return game.ratingScale[i];
  }
  return game.ratingScale[0];
}
