// ==========================================================================
//  Number to Words Data for Programmatic SEO Pages
//  Generates ~120 pages at /number-to-words/{number}/
// ==========================================================================

export interface NumberWordsPage {
  number: number;
  slug: string;
  words: string;
  capitalizedWords: string;
  ordinal: string;
  ordinalSuffix: string;
  digitCount: number;
  isEven: boolean;
  isPrime: boolean;
}

// --- Number to Words Algorithm ---

const ones = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
];

const tens = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];

export function numberToWords(n: number): string {
  if (n === 0) return 'zero';
  if (n < 0) return 'negative ' + numberToWords(-n);

  let result = '';

  if (n >= 1000000000) {
    result += numberToWords(Math.floor(n / 1000000000)) + ' billion';
    n %= 1000000000;
    if (n > 0) result += ' ';
  }

  if (n >= 1000000) {
    result += numberToWords(Math.floor(n / 1000000)) + ' million';
    n %= 1000000;
    if (n > 0) result += ' ';
  }

  if (n >= 1000) {
    result += numberToWords(Math.floor(n / 1000)) + ' thousand';
    n %= 1000;
    if (n > 0) result += ' ';
  }

  if (n >= 100) {
    result += ones[Math.floor(n / 100)] + ' hundred';
    n %= 100;
    if (n > 0) result += ' ';
  }

  if (n >= 20) {
    result += tens[Math.floor(n / 10)];
    n %= 10;
    if (n > 0) result += '-' + ones[n];
  } else if (n > 0) {
    result += ones[n];
  }

  return result;
}

// --- Ordinal Words ---

const ordinalOnes: Record<string, string> = {
  'one': 'first', 'two': 'second', 'three': 'third', 'four': 'fourth',
  'five': 'fifth', 'six': 'sixth', 'seven': 'seventh', 'eight': 'eighth',
  'nine': 'ninth', 'ten': 'tenth', 'eleven': 'eleventh', 'twelve': 'twelfth',
  'thirteen': 'thirteenth', 'fourteen': 'fourteenth', 'fifteen': 'fifteenth',
  'sixteen': 'sixteenth', 'seventeen': 'seventeenth', 'eighteen': 'eighteenth',
  'nineteen': 'nineteenth',
};

const ordinalTens: Record<string, string> = {
  'twenty': 'twentieth', 'thirty': 'thirtieth', 'forty': 'fortieth',
  'fifty': 'fiftieth', 'sixty': 'sixtieth', 'seventy': 'seventieth',
  'eighty': 'eightieth', 'ninety': 'ninetieth',
};

export function numberToOrdinalWords(n: number): string {
  if (n === 0) return 'zeroth';
  const words = numberToWords(n);

  // Find the last word (may be hyphenated like "twenty-one")
  const parts = words.split(' ');
  const lastPart = parts[parts.length - 1];

  // Check if last part contains a hyphen (e.g., "twenty-one")
  if (lastPart.includes('-')) {
    const hyphenParts = lastPart.split('-');
    const lastWord = hyphenParts[hyphenParts.length - 1];
    if (ordinalOnes[lastWord]) {
      hyphenParts[hyphenParts.length - 1] = ordinalOnes[lastWord];
      parts[parts.length - 1] = hyphenParts.join('-');
      return parts.join(' ');
    }
  }

  // Check simple ordinal replacements
  if (ordinalOnes[lastPart]) {
    parts[parts.length - 1] = ordinalOnes[lastPart];
    return parts.join(' ');
  }

  if (ordinalTens[lastPart]) {
    parts[parts.length - 1] = ordinalTens[lastPart];
    return parts.join(' ');
  }

  // For "hundred", "thousand", "million", "billion"
  if (lastPart === 'hundred' || lastPart === 'thousand' || lastPart === 'million' || lastPart === 'billion') {
    parts[parts.length - 1] = lastPart + 'th';
    return parts.join(' ');
  }

  return words + 'th';
}

// --- Ordinal Suffix ---

export function ordinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return n.toLocaleString('en-US') + 'st';
  if (j === 2 && k !== 12) return n.toLocaleString('en-US') + 'nd';
  if (j === 3 && k !== 13) return n.toLocaleString('en-US') + 'rd';
  return n.toLocaleString('en-US') + 'th';
}

// --- Primality ---

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// --- Capitalize first letter ---

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --- Target numbers ---

const targetNumbers: number[] = [
  // 1-100
  ...Array.from({ length: 100 }, (_, i) => i + 1),
  // Notable numbers above 100
  101, 111, 150, 200, 300, 400, 500, 600, 700, 800, 900,
  1000, 1001, 1100, 1500, 2000, 3000, 4000, 5000,
  6000, 7000, 8000, 9000, 10000,
  50000, 100000, 500000,
  1000000, 10000000, 100000000,
  1000000000,
];

const uniqueNumbers = [...new Set(targetNumbers)].sort((a, b) => a - b);

export function getAllNumberWordsPages(): NumberWordsPage[] {
  return uniqueNumbers.map((n) => {
    const words = numberToWords(n);
    return {
      number: n,
      slug: String(n),
      words,
      capitalizedWords: capitalize(words),
      ordinal: numberToOrdinalWords(n),
      ordinalSuffix: ordinalSuffix(n),
      digitCount: String(n).length,
      isEven: n % 2 === 0,
      isPrime: isPrime(n),
    };
  });
}
