// =============================================================================
// Zodiac Sign Data — All 12 Western Zodiac Signs
// =============================================================================

export interface ZodiacSign {
  name: string;
  slug: string;
  symbol: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: string;
  quality: string;
  rulingPlanet: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  luckyNumbers: number[];
  luckyColor: string;
  bestMatch: string[];
  famousPeople: string[];
  description: string;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    slug: 'aries',
    symbol: '\u2648',
    dateRange: 'March 21 – April 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    traits: ['Courageous', 'Energetic', 'Optimistic', 'Passionate', 'Determined', 'Confident'],
    strengths: ['Natural leader who inspires others to take action', 'Fearless in the face of challenges and adversity', 'Honest and direct in communication', 'Enthusiastic and full of energy', 'Adventurous spirit that embraces new experiences'],
    weaknesses: ['Can be impatient and short-tempered', 'Tendency toward impulsiveness without thinking through consequences', 'May come across as aggressive or confrontational', 'Struggles with compromise and seeing other perspectives', 'Can lose interest quickly and abandon projects'],
    luckyNumbers: [1, 8, 17],
    luckyColor: 'Red',
    bestMatch: ['Leo', 'Sagittarius', 'Gemini'],
    famousPeople: ['Lady Gaga', 'Robert Downey Jr.', 'Emma Watson'],
    description: 'Aries is the first sign of the zodiac, symbolizing new beginnings and bold initiative. As a fire sign ruled by Mars, Aries individuals are natural-born leaders who charge headfirst into every situation with confidence and courage. They thrive on competition and are always ready for a challenge.',
  },
  {
    name: 'Taurus',
    slug: 'taurus',
    symbol: '\u2649',
    dateRange: 'April 20 – May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
    strengths: ['Incredibly loyal and dependable in relationships', 'Strong work ethic and determination to finish what they start', 'Excellent with finances and building long-term security', 'Patient and methodical approach to problem-solving', 'Deep appreciation for beauty, art, and comfort'],
    weaknesses: ['Stubbornness can make them resistant to change', 'Possessive tendencies in relationships', 'Can be overly materialistic or focused on comfort', 'Tendency to hold grudges for extended periods', 'May become lazy or complacent when comfortable'],
    luckyNumbers: [2, 6, 9],
    luckyColor: 'Green',
    bestMatch: ['Virgo', 'Capricorn', 'Cancer'],
    famousPeople: ['Adele', 'Dwayne Johnson', 'Queen Elizabeth II'],
    description: 'Taurus is the second sign of the zodiac, representing stability, sensuality, and determination. Ruled by Venus, the planet of love and beauty, Taurus individuals value comfort, security, and the finer things in life. They are grounded earth signs who build their lives on solid foundations.',
  },
  {
    name: 'Gemini',
    slug: 'gemini',
    symbol: '\u264A',
    dateRange: 'May 21 – June 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    traits: ['Adaptable', 'Curious', 'Witty', 'Expressive', 'Versatile', 'Sociable'],
    strengths: ['Brilliant communicator who can connect with anyone', 'Quick learner with an insatiable thirst for knowledge', 'Highly adaptable and thrives in changing environments', 'Witty and entertaining in social situations', 'Able to see multiple sides of any issue'],
    weaknesses: ['Can be inconsistent and indecisive', 'Tendency toward superficiality and not diving deep', 'May be perceived as two-faced or unreliable', 'Nervous energy and restlessness', 'Difficulty committing to one path or person'],
    luckyNumbers: [5, 7, 14],
    luckyColor: 'Yellow',
    bestMatch: ['Libra', 'Aquarius', 'Aries'],
    famousPeople: ['Marilyn Monroe', 'Kanye West', 'Angelina Jolie'],
    description: 'Gemini is the third sign of the zodiac, embodying intellectual curiosity, communication, and duality. Ruled by Mercury, the messenger planet, Geminis are quick-witted, socially adept, and endlessly curious about the world around them. They are the zodiac\'s storytellers and connectors.',
  },
  {
    name: 'Cancer',
    slug: 'cancer',
    symbol: '\u264B',
    dateRange: 'June 21 – July 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    traits: ['Intuitive', 'Nurturing', 'Protective', 'Empathetic', 'Loyal', 'Sentimental'],
    strengths: ['Deeply empathetic and emotionally intelligent', 'Fiercely protective of loved ones', 'Strong intuition that guides wise decisions', 'Creates warm and welcoming environments', 'Excellent memory and attention to emotional detail'],
    weaknesses: ['Prone to moodiness and emotional swings', 'Can be overly clingy or dependent in relationships', 'Tendency to retreat into their shell when hurt', 'May manipulate through guilt or emotional appeal', 'Difficulty letting go of past wounds'],
    luckyNumbers: [2, 7, 11],
    luckyColor: 'Silver',
    bestMatch: ['Scorpio', 'Pisces', 'Taurus'],
    famousPeople: ['Princess Diana', 'Tom Hanks', 'Selena Gomez'],
    description: 'Cancer is the fourth sign of the zodiac, representing home, family, and emotional depth. Ruled by the Moon, Cancer individuals are deeply intuitive and nurturing. They feel everything intensely and create deep emotional bonds with the people they care about.',
  },
  {
    name: 'Leo',
    slug: 'leo',
    symbol: '\u264C',
    dateRange: 'July 23 – August 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    traits: ['Charismatic', 'Generous', 'Creative', 'Warm-hearted', 'Confident', 'Dramatic'],
    strengths: ['Natural charisma that draws people in effortlessly', 'Extremely generous with time, energy, and resources', 'Creative vision and artistic talent', 'Loyal and protective of their inner circle', 'Courageous and willing to stand up for what is right'],
    weaknesses: ['Can be arrogant or self-centered', 'Need for constant attention and validation', 'Stubbornness and difficulty admitting mistakes', 'Tendency toward dramatic reactions', 'May dominate conversations and situations'],
    luckyNumbers: [1, 3, 10],
    luckyColor: 'Gold',
    bestMatch: ['Aries', 'Sagittarius', 'Libra'],
    famousPeople: ['Barack Obama', 'Jennifer Lopez', 'Daniel Radcliffe'],
    description: 'Leo is the fifth sign of the zodiac, symbolizing self-expression, creativity, and leadership. Ruled by the Sun, Leo individuals radiate warmth, confidence, and magnetism. They are born performers who light up every room they enter.',
  },
  {
    name: 'Virgo',
    slug: 'virgo',
    symbol: '\u264D',
    dateRange: 'August 23 – September 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    traits: ['Analytical', 'Practical', 'Detail-oriented', 'Modest', 'Hardworking', 'Helpful'],
    strengths: ['Exceptional attention to detail and precision', 'Highly organized and efficient in everything they do', 'Genuinely helpful and service-oriented', 'Practical problem-solver who finds workable solutions', 'Dedicated and hardworking with high standards'],
    weaknesses: ['Overly critical of themselves and others', 'Tendency toward perfectionism that causes stress', 'Can be overly cautious or worry excessively', 'May focus too much on flaws instead of the big picture', 'Difficulty relaxing and enjoying the moment'],
    luckyNumbers: [5, 14, 23],
    luckyColor: 'Navy Blue',
    bestMatch: ['Taurus', 'Capricorn', 'Cancer'],
    famousPeople: ['Beyoncé', 'Keanu Reeves', 'Zendaya'],
    description: 'Virgo is the sixth sign of the zodiac, representing analysis, service, and refinement. Ruled by Mercury, Virgo individuals are detail-oriented perfectionists who find satisfaction in order, efficiency, and helping others. They are the zodiac\'s problem-solvers.',
  },
  {
    name: 'Libra',
    slug: 'libra',
    symbol: '\u264E',
    dateRange: 'September 23 – October 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    traits: ['Diplomatic', 'Charming', 'Fair-minded', 'Social', 'Idealistic', 'Graceful'],
    strengths: ['Natural diplomat who brings people together', 'Strong sense of justice and fairness', 'Charming and graceful in social situations', 'Appreciation for beauty, art, and harmony', 'Excellent at seeing all sides of an issue'],
    weaknesses: ['Indecisive and may avoid making tough choices', 'Can be people-pleasing to a fault', 'Tendency to avoid conflict even when it is necessary', 'May sacrifice their own needs for peace', 'Can be superficial or overly concerned with appearances'],
    luckyNumbers: [4, 6, 13],
    luckyColor: 'Pink',
    bestMatch: ['Gemini', 'Aquarius', 'Leo'],
    famousPeople: ['Kim Kardashian', 'John Lennon', 'Serena Williams'],
    description: 'Libra is the seventh sign of the zodiac, symbolizing balance, partnership, and harmony. Ruled by Venus, Libra individuals are natural peacemakers who value fairness, beauty, and meaningful connections. They are the zodiac\'s diplomats and aesthetes.',
  },
  {
    name: 'Scorpio',
    slug: 'scorpio',
    symbol: '\u264F',
    dateRange: 'October 23 – November 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    traits: ['Passionate', 'Resourceful', 'Determined', 'Intense', 'Magnetic', 'Perceptive'],
    strengths: ['Incredible determination and willpower', 'Deeply loyal and protective of loved ones', 'Exceptional intuition and ability to read people', 'Resourceful and strategic in achieving goals', 'Emotional depth that creates powerful connections'],
    weaknesses: ['Can be jealous and possessive', 'Tendency toward secrecy and distrust', 'May hold grudges and seek revenge', 'Can be manipulative when feeling threatened', 'All-or-nothing approach that leaves little room for nuance'],
    luckyNumbers: [8, 11, 18],
    luckyColor: 'Dark Red',
    bestMatch: ['Cancer', 'Pisces', 'Virgo'],
    famousPeople: ['Leonardo DiCaprio', 'Drake', 'Katy Perry'],
    description: 'Scorpio is the eighth sign of the zodiac, representing transformation, intensity, and emotional depth. Ruled by Pluto, Scorpio individuals are passionate, perceptive, and fiercely determined. They are drawn to life\'s mysteries and are not afraid of the darkness.',
  },
  {
    name: 'Sagittarius',
    slug: 'sagittarius',
    symbol: '\u2650',
    dateRange: 'November 22 – December 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Honest', 'Independent', 'Enthusiastic'],
    strengths: ['Boundless optimism and enthusiasm for life', 'Love of adventure and exploration', 'Honest and straightforward communication', 'Philosophical mind that seeks deeper meaning', 'Open-minded and accepting of different cultures and ideas'],
    weaknesses: ['Can be tactless and blunt to the point of rudeness', 'Restless and struggles with commitment', 'Tendency to overpromise and underdeliver', 'Impatient with routine and mundane tasks', 'May be irresponsible with practical matters'],
    luckyNumbers: [3, 7, 9],
    luckyColor: 'Purple',
    bestMatch: ['Aries', 'Leo', 'Aquarius'],
    famousPeople: ['Taylor Swift', 'Brad Pitt', 'Miley Cyrus'],
    description: 'Sagittarius is the ninth sign of the zodiac, symbolizing exploration, wisdom, and freedom. Ruled by Jupiter, the planet of expansion, Sagittarius individuals are eternal optimists who crave adventure, knowledge, and new experiences. They are the zodiac\'s philosophers and travelers.',
  },
  {
    name: 'Capricorn',
    slug: 'capricorn',
    symbol: '\u2651',
    dateRange: 'December 22 – January 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    traits: ['Ambitious', 'Disciplined', 'Responsible', 'Practical', 'Patient', 'Strategic'],
    strengths: ['Incredible work ethic and self-discipline', 'Strategic thinker with long-term vision', 'Responsible and reliable in all commitments', 'Patient and persistent in pursuit of goals', 'Strong sense of duty and traditional values'],
    weaknesses: ['Can be overly rigid and resistant to change', 'Tendency toward pessimism and expecting the worst', 'May prioritize work over personal relationships', 'Can be condescending or dismissive of those less driven', 'Difficulty expressing emotions and vulnerability'],
    luckyNumbers: [4, 8, 13],
    luckyColor: 'Brown',
    bestMatch: ['Taurus', 'Virgo', 'Pisces'],
    famousPeople: ['Michelle Obama', 'LeBron James', 'Dolly Parton'],
    description: 'Capricorn is the tenth sign of the zodiac, representing ambition, discipline, and mastery. Ruled by Saturn, the planet of structure, Capricorn individuals are determined achievers who build their success brick by brick. They are the zodiac\'s executives and empire-builders.',
  },
  {
    name: 'Aquarius',
    slug: 'aquarius',
    symbol: '\u2652',
    dateRange: 'January 20 – February 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    traits: ['Innovative', 'Humanitarian', 'Independent', 'Progressive', 'Original', 'Intellectual'],
    strengths: ['Visionary thinker who sees possibilities others miss', 'Deeply humanitarian and committed to social justice', 'Fiercely independent and true to themselves', 'Innovative and original in ideas and approach', 'Accepting of all people regardless of background'],
    weaknesses: ['Can be emotionally detached and aloof', 'Stubbornly contrarian just for the sake of being different', 'May prioritize ideals over individual relationships', 'Tendency to be unpredictable and hard to pin down', 'Can come across as cold or uncaring in personal matters'],
    luckyNumbers: [4, 7, 11],
    luckyColor: 'Electric Blue',
    bestMatch: ['Gemini', 'Libra', 'Sagittarius'],
    famousPeople: ['Oprah Winfrey', 'Harry Styles', 'Cristiano Ronaldo'],
    description: 'Aquarius is the eleventh sign of the zodiac, symbolizing innovation, independence, and humanitarian ideals. Ruled by Uranus, the planet of revolution, Aquarius individuals are forward-thinking visionaries who march to the beat of their own drum.',
  },
  {
    name: 'Pisces',
    slug: 'pisces',
    symbol: '\u2653',
    dateRange: 'February 19 – March 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    traits: ['Compassionate', 'Imaginative', 'Intuitive', 'Gentle', 'Artistic', 'Empathetic'],
    strengths: ['Extraordinary empathy and compassion for others', 'Rich imagination and creative talent', 'Strong intuition that borders on psychic ability', 'Selfless and willing to sacrifice for loved ones', 'Ability to connect with people on a deep emotional level'],
    weaknesses: ['Can be overly escapist and avoidant of reality', 'Tendency to play the victim or be a martyr', 'Easily influenced by others and their environment', 'May struggle with boundaries and saying no', 'Prone to idealizing people and situations'],
    luckyNumbers: [3, 9, 12],
    luckyColor: 'Sea Green',
    bestMatch: ['Cancer', 'Scorpio', 'Capricorn'],
    famousPeople: ['Rihanna', 'Albert Einstein', 'Steve Jobs'],
    description: 'Pisces is the twelfth and final sign of the zodiac, representing intuition, spirituality, and universal compassion. Ruled by Neptune, the planet of dreams, Pisces individuals are deeply empathetic souls who feel the full spectrum of human emotion. They are the zodiac\'s dreamers and healers.',
  },
];

/**
 * Get the zodiac sign for a given birth month and day.
 * @param month - Birth month (1-12)
 * @param day - Birth day (1-31)
 * @returns The matching ZodiacSign object
 */
export function getZodiacSign(month: number, day: number): ZodiacSign {
  // Handle Capricorn spanning year boundary (Dec 22 – Jan 19)
  for (const sign of zodiacSigns) {
    if (sign.startMonth === sign.endMonth) {
      // Sign within a single month (doesn't happen currently but safe)
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) {
        return sign;
      }
    } else if (sign.startMonth > sign.endMonth) {
      // Sign spans year boundary (Capricorn: Dec 22 – Jan 19)
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    } else {
      // Normal sign within consecutive months
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }

  // Fallback (should never reach here with valid input)
  return zodiacSigns[0];
}

// =============================================================================
// Compatibility Data — Zodiac Sign Compatibility Scores
// =============================================================================

export interface CompatibilityResult {
  overall: number;
  love: number;
  friendship: number;
  work: number;
  description: string;
}

/**
 * Compatibility scores between all zodiac sign pairs.
 * Key format: "SignA-SignB" (alphabetical order).
 */
const compatibilityMap: Record<string, CompatibilityResult> = {
  'Aries-Aries': { overall: 65, love: 70, friendship: 75, work: 50, description: 'Two Aries create a dynamic, high-energy partnership, though clashes of ego and competitiveness can spark frequent conflicts. When they learn to share the spotlight, their combined ambition is unstoppable.' },
  'Aries-Taurus': { overall: 45, love: 40, friendship: 50, work: 45, description: 'Aries\' impulsive nature clashes with Taurus\' need for stability and routine. While they can learn from each other, this pairing requires significant patience from both sides.' },
  'Aries-Gemini': { overall: 83, love: 80, friendship: 90, work: 78, description: 'A vibrant and exciting match! Aries\' boldness pairs brilliantly with Gemini\'s wit and adaptability. They share a love for adventure and keep each other endlessly entertained.' },
  'Aries-Cancer': { overall: 42, love: 45, friendship: 40, work: 42, description: 'Aries\' direct approach can hurt sensitive Cancer, while Cancer\'s emotional needs may overwhelm independent Aries. Both need to develop deeper empathy to make this work.' },
  'Aries-Leo': { overall: 93, love: 95, friendship: 90, work: 85, description: 'A powerhouse fire sign duo! Both are passionate, confident, and love to lead. Their mutual admiration creates an exciting, warm, and deeply loyal partnership.' },
  'Aries-Virgo': { overall: 48, love: 40, friendship: 50, work: 55, description: 'Aries acts on impulse while Virgo analyzes everything carefully. Their different approaches to life create friction, but in work settings their contrasting skills can be complementary.' },
  'Aries-Libra': { overall: 72, love: 78, friendship: 68, work: 60, description: 'Opposites on the zodiac wheel, Aries and Libra are magnetically drawn to each other. Aries brings decisiveness while Libra offers balance and grace. A surprisingly harmonious match when they meet halfway.' },
  'Aries-Scorpio': { overall: 55, love: 65, friendship: 45, work: 50, description: 'Both ruled by Mars, this pair shares intensity and passion. However, Scorpio\'s need for emotional depth can conflict with Aries\' desire for independence and simplicity.' },
  'Aries-Sagittarius': { overall: 93, love: 90, friendship: 95, work: 88, description: 'An outstanding fire sign combination! Both crave adventure, freedom, and excitement. Their shared optimism and enthusiasm make this one of the most naturally compatible pairings in the zodiac.' },
  'Aries-Capricorn': { overall: 47, love: 42, friendship: 45, work: 55, description: 'Aries\' spontaneity clashes with Capricorn\'s methodical planning. While both are ambitious, they pursue goals very differently. In business, their complementary strengths can work well.' },
  'Aries-Aquarius': { overall: 78, love: 75, friendship: 85, work: 72, description: 'Both value independence and innovation, making this a stimulating match. Aries\' passion combined with Aquarius\' originality creates a forward-thinking, exciting partnership.' },
  'Aries-Pisces': { overall: 50, love: 55, friendship: 45, work: 42, description: 'Aries\' directness can overwhelm gentle Pisces, while Pisces\' emotional depth may confuse action-oriented Aries. With effort, they can balance each other beautifully.' },
  'Taurus-Taurus': { overall: 80, love: 85, friendship: 78, work: 75, description: 'Two Taurus individuals share a deep appreciation for comfort, stability, and the finer things. Their relationship is steady and sensual, though stubbornness from both sides can cause deadlocks.' },
  'Taurus-Gemini': { overall: 38, love: 35, friendship: 45, work: 35, description: 'Taurus craves routine while Gemini needs constant change. This fundamental difference makes long-term harmony challenging, though brief connections can be exciting.' },
  'Taurus-Cancer': { overall: 90, love: 92, friendship: 88, work: 82, description: 'A beautifully nurturing match! Both value home, security, and emotional connection. Taurus provides stability while Cancer offers emotional depth, creating a deeply satisfying bond.' },
  'Taurus-Leo': { overall: 55, love: 60, friendship: 50, work: 52, description: 'Both are fixed signs who love luxury and attention. While they share some values, their stubbornness and differing needs for validation can create persistent tension.' },
  'Taurus-Virgo': { overall: 92, love: 90, friendship: 92, work: 95, description: 'An excellent earth sign pairing! Both are practical, reliable, and value quality. Taurus provides warmth and sensuality while Virgo adds precision and helpfulness.' },
  'Taurus-Libra': { overall: 62, love: 70, friendship: 58, work: 55, description: 'Both ruled by Venus, they share a love of beauty and harmony. However, Taurus\' possessiveness can conflict with Libra\'s social nature. Their shared aesthetics keep them connected.' },
  'Taurus-Scorpio': { overall: 75, love: 85, friendship: 65, work: 68, description: 'Opposite signs that share incredible magnetic attraction. Both are intensely loyal and possessive. Their physical chemistry is powerful, though power struggles are inevitable.' },
  'Taurus-Sagittarius': { overall: 35, love: 30, friendship: 40, work: 38, description: 'Taurus wants to settle down while Sagittarius wants to explore. Their fundamentally different life philosophies make lasting compatibility very challenging.' },
  'Taurus-Capricorn': { overall: 93, love: 90, friendship: 90, work: 98, description: 'A powerhouse earth sign duo! Both are ambitious, practical, and value long-term security. They build an empire together with shared goals and mutual respect.' },
  'Taurus-Aquarius': { overall: 35, love: 30, friendship: 38, work: 40, description: 'Taurus\' traditional values clash sharply with Aquarius\' unconventional approach. Both are fixed signs, making compromise extremely difficult for this pair.' },
  'Taurus-Pisces': { overall: 82, love: 88, friendship: 78, work: 72, description: 'A gentle and romantic pairing! Taurus grounds dreamy Pisces while Pisces adds imagination and emotional richness. Their complementary natures create a tender, supportive bond.' },
  'Cancer-Gemini': { overall: 45, love: 48, friendship: 50, work: 40, description: 'Gemini\'s light-hearted approach can seem dismissive to emotional Cancer, while Cancer\'s depth may feel heavy to free-spirited Gemini. Communication styles differ greatly.' },
  'Cancer-Cancer': { overall: 75, love: 80, friendship: 78, work: 65, description: 'Two Cancers create a deeply emotional and nurturing home environment. Their shared sensitivity means they understand each other well, though mood swings can amplify in this pairing.' },
  'Cancer-Leo': { overall: 60, love: 65, friendship: 55, work: 58, description: 'Cancer provides emotional support while Leo offers confidence and warmth. If Leo appreciates Cancer\'s nurturing and Cancer admires Leo\'s strength, this can blossom into a loving bond.' },
  'Cancer-Virgo': { overall: 85, love: 82, friendship: 88, work: 85, description: 'A wonderfully caring combination! Both are dedicated to helping others and creating a comfortable life. Virgo\'s practical nature complements Cancer\'s emotional intelligence perfectly.' },
  'Cancer-Libra': { overall: 42, love: 45, friendship: 40, work: 42, description: 'Cancer seeks emotional security while Libra prefers intellectual harmony. Their different approaches to relationships can leave both feeling unfulfilled without significant compromise.' },
  'Cancer-Scorpio': { overall: 94, love: 97, friendship: 90, work: 85, description: 'One of the most powerful water sign connections! Both are deeply emotional, intuitive, and fiercely loyal. Their bond is intense, transformative, and built on profound trust.' },
  'Cancer-Sagittarius': { overall: 38, love: 35, friendship: 42, work: 38, description: 'Cancer\'s need for home and security conflicts with Sagittarius\' wanderlust and independence. These fundamentally different needs make long-term harmony a significant challenge.' },
  'Cancer-Capricorn': { overall: 72, love: 78, friendship: 65, work: 70, description: 'Opposites on the zodiac wheel, Cancer and Capricorn balance emotion with ambition. Cancer brings warmth to Capricorn\'s structure, and together they build a secure family life.' },
  'Cancer-Aquarius': { overall: 32, love: 28, friendship: 38, work: 35, description: 'Cancer craves emotional intimacy while Aquarius values intellectual freedom. This fundamental mismatch makes it one of the more challenging zodiac pairings.' },
  'Cancer-Pisces': { overall: 95, love: 98, friendship: 92, work: 80, description: 'A dreamy, deeply intuitive water sign match! Both are empathetic, creative, and emotionally attuned. Their connection feels almost psychic, and they create a beautiful, supportive world together.' },
  'Gemini-Gemini': { overall: 70, love: 65, friendship: 80, work: 68, description: 'Double Gemini means double the fun, conversation, and social energy! While they keep each other entertained, they may both avoid emotional depth and struggle with commitment.' },
  'Gemini-Leo': { overall: 80, love: 78, friendship: 85, work: 75, description: 'A fun-loving, creative match! Leo loves the spotlight and Gemini loves an audience. Together they create an exciting social life full of laughter and adventure.' },
  'Gemini-Virgo': { overall: 55, love: 50, friendship: 60, work: 62, description: 'Both ruled by Mercury, they share intellectual curiosity. However, Gemini\'s scattered energy conflicts with Virgo\'s need for order. In work, their complementary mental skills can shine.' },
  'Gemini-Libra': { overall: 90, love: 88, friendship: 95, work: 82, description: 'A brilliant air sign combination! Both love socializing, intellectual conversation, and cultural experiences. Their mental connection is electric and their social life is vibrant.' },
  'Gemini-Scorpio': { overall: 33, love: 35, friendship: 30, work: 38, description: 'Gemini\'s lightness clashes with Scorpio\'s intensity. Scorpio demands emotional depth that Gemini may find suffocating, while Gemini\'s flirtatiousness triggers Scorpio\'s jealousy.' },
  'Gemini-Sagittarius': { overall: 78, love: 80, friendship: 82, work: 68, description: 'Opposite signs that share a love of adventure and learning! Both are restless, curious, and freedom-loving. Their relationship is exciting and intellectually stimulating.' },
  'Gemini-Capricorn': { overall: 35, love: 30, friendship: 38, work: 45, description: 'Gemini\'s playfulness frustrates serious Capricorn, while Capricorn\'s rigidity bores spontaneous Gemini. This pair needs to work hard to find common ground.' },
  'Gemini-Aquarius': { overall: 92, love: 88, friendship: 95, work: 88, description: 'An outstanding intellectual match! Both are progressive, innovative, and value mental stimulation. They understand each other\'s need for independence and create an exciting, future-oriented bond.' },
  'Gemini-Pisces': { overall: 43, love: 45, friendship: 42, work: 38, description: 'Both are mutable signs, making them adaptable but also indecisive together. Pisces\' emotional depth may overwhelm logical Gemini, while Gemini\'s detachment hurts sensitive Pisces.' },
  'Leo-Leo': { overall: 70, love: 75, friendship: 72, work: 55, description: 'Two Leos create a dazzling, dramatic partnership full of passion and creativity. However, the battle for dominance and attention can be fierce. They must learn to share the throne.' },
  'Leo-Virgo': { overall: 48, love: 45, friendship: 50, work: 55, description: 'Leo\'s flamboyance clashes with Virgo\'s modesty. Leo craves praise while Virgo offers constructive criticism. With mutual respect, Leo can inspire Virgo and Virgo can ground Leo.' },
  'Leo-Libra': { overall: 82, love: 85, friendship: 80, work: 75, description: 'A glamorous and romantic pairing! Both love beauty, socializing, and the finer things. Leo provides passion and warmth while Libra adds grace and balance to the partnership.' },
  'Leo-Scorpio': { overall: 50, love: 55, friendship: 42, work: 48, description: 'Both are intensely loyal but also extremely stubborn. Power struggles are inevitable as both want control. When they align, their combined intensity is formidable.' },
  'Leo-Sagittarius': { overall: 93, love: 92, friendship: 95, work: 85, description: 'A spectacular fire sign match! Both are optimistic, generous, and love adventure. Their shared enthusiasm and warmth create one of the most exciting and joyful zodiac pairings.' },
  'Leo-Capricorn': { overall: 45, love: 40, friendship: 42, work: 55, description: 'Leo\'s need for admiration conflicts with Capricorn\'s reserved nature. Both are ambitious but express it differently. In business, their complementary leadership styles can work well.' },
  'Leo-Aquarius': { overall: 68, love: 72, friendship: 70, work: 58, description: 'Opposite signs with a magnetic attraction. Leo\'s warmth draws out Aquarius\' humanity, while Aquarius offers Leo fresh perspectives. Their differences can be complementary or conflicting.' },
  'Leo-Pisces': { overall: 50, love: 55, friendship: 48, work: 42, description: 'Leo\'s confidence can overwhelm gentle Pisces, while Pisces\' emotional complexity may confuse straightforward Leo. When they connect, Leo protects and Pisces inspires beautifully.' },
  'Virgo-Virgo': { overall: 72, love: 68, friendship: 78, work: 85, description: 'Two Virgos create an efficient, well-organized partnership. They understand each other\'s perfectionism, though double the criticism can be challenging. Their shared values keep them aligned.' },
  'Virgo-Libra': { overall: 48, love: 45, friendship: 52, work: 50, description: 'Virgo\'s critical eye conflicts with Libra\'s desire for harmony. They appreciate each other\'s intelligence but approach decisions very differently, causing frequent frustration.' },
  'Virgo-Scorpio': { overall: 82, love: 80, friendship: 82, work: 88, description: 'A deeply compatible match! Both are analytical, perceptive, and value authenticity. Virgo brings order while Scorpio adds depth. Their shared intensity creates a powerful bond.' },
  'Virgo-Sagittarius': { overall: 40, love: 35, friendship: 45, work: 42, description: 'Virgo\'s detail-orientation clashes with Sagittarius\' big-picture thinking. Virgo finds Sagittarius reckless, while Sagittarius finds Virgo too restrictive.' },
  'Virgo-Capricorn': { overall: 92, love: 88, friendship: 90, work: 98, description: 'An excellent earth sign match! Both are hardworking, practical, and value stability. Together they build a secure, well-organized life with shared goals and mutual admiration.' },
  'Virgo-Aquarius': { overall: 40, love: 35, friendship: 45, work: 48, description: 'Virgo\'s traditional approach conflicts with Aquarius\' unconventional methods. Both are intellectual but apply their minds very differently, leading to misunderstandings.' },
  'Virgo-Pisces': { overall: 72, love: 78, friendship: 68, work: 62, description: 'Opposite signs that complement each other beautifully when in balance. Virgo grounds Pisces\' dreams while Pisces softens Virgo\'s critical nature. Together they blend practicality with imagination.' },
  'Libra-Libra': { overall: 70, love: 72, friendship: 75, work: 55, description: 'Two Libras create a harmonious, aesthetically pleasing partnership. However, decision-making becomes nearly impossible as both defer to the other. They need occasional outside input.' },
  'Libra-Scorpio': { overall: 45, love: 50, friendship: 40, work: 42, description: 'Libra\'s lightness and social nature conflicts with Scorpio\'s intensity and possessiveness. Scorpio\'s emotional demands can overwhelm harmony-seeking Libra.' },
  'Libra-Sagittarius': { overall: 78, love: 75, friendship: 82, work: 70, description: 'A fun, adventurous pairing! Both love socializing, travel, and intellectual exploration. Libra adds refinement to Sagittarius\' adventures, creating an enjoyable and balanced partnership.' },
  'Libra-Capricorn': { overall: 42, love: 38, friendship: 40, work: 50, description: 'Libra\'s social, easygoing nature conflicts with Capricorn\'s serious, work-focused approach. Both are cardinal signs who want to lead, creating friction over direction and priorities.' },
  'Libra-Aquarius': { overall: 90, love: 85, friendship: 95, work: 82, description: 'A fantastic air sign match! Both are intellectual, social, and progressive. They share a vision for a better world and stimulate each other mentally. Their friendship is the foundation of their bond.' },
  'Libra-Pisces': { overall: 48, love: 52, friendship: 45, work: 40, description: 'Both are romantic and idealistic but express it differently. Libra seeks intellectual harmony while Pisces craves emotional connection. They can create beauty together but may struggle with practicalities.' },
  'Scorpio-Scorpio': { overall: 72, love: 80, friendship: 65, work: 68, description: 'An intensely passionate but volatile pairing. Two Scorpios understand each other\'s depth like no one else, but power struggles and jealousy can be destructive. When aligned, they are unstoppable.' },
  'Scorpio-Sagittarius': { overall: 40, love: 42, friendship: 38, work: 40, description: 'Scorpio\'s possessiveness clashes with Sagittarius\' need for freedom. Their different emotional needs make lasting compatibility challenging, though the initial attraction can be magnetic.' },
  'Scorpio-Capricorn': { overall: 82, love: 80, friendship: 78, work: 92, description: 'A powerful, ambitious pairing! Both are determined, strategic, and goal-oriented. Scorpio adds emotional depth while Capricorn provides structure. Together they are an unstoppable force.' },
  'Scorpio-Aquarius': { overall: 38, love: 35, friendship: 40, work: 42, description: 'Both are fixed signs with strong opinions but very different approaches. Scorpio is emotionally intense while Aquarius is intellectually detached, creating fundamental misunderstandings.' },
  'Scorpio-Pisces': { overall: 92, love: 95, friendship: 88, work: 82, description: 'A deeply intuitive and emotional water sign match! Both understand unspoken feelings and create an almost mystical bond. Scorpio protects while Pisces inspires, forming a profoundly intimate connection.' },
  'Sagittarius-Sagittarius': { overall: 75, love: 72, friendship: 85, work: 60, description: 'Double Sagittarius means double the adventure, optimism, and freedom! While they have incredible fun together, neither wants to handle practical matters, which can create instability.' },
  'Sagittarius-Capricorn': { overall: 40, love: 35, friendship: 42, work: 48, description: 'Sagittarius\' spontaneity frustrates methodical Capricorn, while Capricorn\'s seriousness dampens Sagittarius\' spirit. They move through life at very different speeds.' },
  'Sagittarius-Aquarius': { overall: 88, love: 82, friendship: 95, work: 80, description: 'An exciting, progressive pairing! Both value freedom, innovation, and big ideas. They inspire each other to think bigger and explore further. Their shared idealism makes them natural allies.' },
  'Sagittarius-Pisces': { overall: 48, love: 52, friendship: 45, work: 38, description: 'Both ruled by Jupiter, they share optimism and spiritual curiosity. However, Sagittarius\' bluntness hurts sensitive Pisces, and Pisces\' emotional needs can feel constraining to free-spirited Sagittarius.' },
  'Capricorn-Capricorn': { overall: 78, love: 72, friendship: 78, work: 90, description: 'Two Capricorns build an empire together with shared ambition and discipline. Their partnership is productive and stable, though they need to remember to have fun and show vulnerability.' },
  'Capricorn-Aquarius': { overall: 38, love: 32, friendship: 40, work: 48, description: 'Capricorn\'s traditional values clash with Aquarius\' revolutionary ideas. Both are stubborn in their ways. In work settings, Capricorn provides structure while Aquarius innovates.' },
  'Capricorn-Pisces': { overall: 80, love: 82, friendship: 75, work: 78, description: 'A complementary pairing where Capricorn provides security and structure for dreamy Pisces, while Pisces adds imagination and emotional warmth to Capricorn\'s structured world.' },
  'Aquarius-Aquarius': { overall: 72, love: 65, friendship: 85, work: 75, description: 'Two Aquarians create an intellectually stimulating and unconventional partnership. They respect each other\'s independence but may struggle with emotional intimacy and practical matters.' },
  'Aquarius-Pisces': { overall: 45, love: 42, friendship: 48, work: 42, description: 'Aquarius\' intellectual detachment conflicts with Pisces\' emotional sensitivity. Both are idealistic but express it very differently. Finding common ground requires conscious effort from both.' },
  'Pisces-Pisces': { overall: 75, love: 82, friendship: 78, work: 55, description: 'Two Pisces create a dreamy, deeply emotional and creative partnership. They understand each other\'s inner worlds intuitively, though they may struggle with practicalities and boundaries.' },
};

/**
 * Get compatibility data between two zodiac signs.
 * @param signA - First sign name (e.g., "Aries")
 * @param signB - Second sign name (e.g., "Leo")
 * @returns CompatibilityResult with overall, love, friendship, work scores and description
 */
export function getCompatibility(signA: string, signB: string): CompatibilityResult {
  // Alphabetical key lookup
  const key = [signA, signB].sort().join('-');
  return compatibilityMap[key] || { overall: 50, love: 50, friendship: 50, work: 50, description: 'Compatibility data not available for this pairing.' };
}
