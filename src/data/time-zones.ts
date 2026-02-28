export interface TimeZoneInfo {
  abbr: string;
  name: string;
  utcOffset: number; // hours from UTC (e.g., -5 for EST)
  region: string;
}

export interface TimeZonePage {
  slug: string;
  from: TimeZoneInfo;
  to: TimeZoneInfo;
  diffHours: number;
  diffLabel: string; // "+3 hours" or "-8 hours"
  examplePairs: { fromTime: string; toTime: string }[];
}

const ZONES: TimeZoneInfo[] = [
  { abbr: 'EST', name: 'Eastern Standard Time', utcOffset: -5, region: 'US/Canada' },
  { abbr: 'CST', name: 'Central Standard Time', utcOffset: -6, region: 'US/Canada' },
  { abbr: 'MST', name: 'Mountain Standard Time', utcOffset: -7, region: 'US/Canada' },
  { abbr: 'PST', name: 'Pacific Standard Time', utcOffset: -8, region: 'US/Canada' },
  { abbr: 'AKST', name: 'Alaska Standard Time', utcOffset: -9, region: 'US' },
  { abbr: 'HST', name: 'Hawaii Standard Time', utcOffset: -10, region: 'US' },
  { abbr: 'UTC', name: 'Coordinated Universal Time', utcOffset: 0, region: 'Global' },
  { abbr: 'GMT', name: 'Greenwich Mean Time', utcOffset: 0, region: 'UK/West Africa' },
  { abbr: 'CET', name: 'Central European Time', utcOffset: 1, region: 'Europe' },
  { abbr: 'EET', name: 'Eastern European Time', utcOffset: 2, region: 'Europe' },
  { abbr: 'MSK', name: 'Moscow Standard Time', utcOffset: 3, region: 'Russia' },
  { abbr: 'IST', name: 'India Standard Time', utcOffset: 5.5, region: 'India' },
  { abbr: 'ICT', name: 'Indochina Time', utcOffset: 7, region: 'Southeast Asia' },
  { abbr: 'SGT', name: 'Singapore Time', utcOffset: 8, region: 'Singapore/Malaysia' },
  { abbr: 'CST-CN', name: 'China Standard Time', utcOffset: 8, region: 'China' },
  { abbr: 'JST', name: 'Japan Standard Time', utcOffset: 9, region: 'Japan' },
  { abbr: 'KST', name: 'Korea Standard Time', utcOffset: 9, region: 'South Korea' },
  { abbr: 'AEST', name: 'Australian Eastern Standard Time', utcOffset: 10, region: 'Australia' },
  { abbr: 'NZST', name: 'New Zealand Standard Time', utcOffset: 12, region: 'New Zealand' },
];

function formatHour(h: number): string {
  let hour = ((h % 24) + 24) % 24;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:00 ${ampm}`;
}

function generateExamples(diff: number): { fromTime: string; toTime: string }[] {
  return [6, 9, 12, 15, 18, 21].map(h => ({
    fromTime: formatHour(h),
    toTime: formatHour(h + diff),
  }));
}

// Generate pages for popular zone pairs (not all combinations)
const POPULAR_PAIRS: [string, string][] = [
  // US internal
  ['EST', 'CST'], ['EST', 'MST'], ['EST', 'PST'], ['CST', 'PST'], ['CST', 'MST'], ['MST', 'PST'],
  ['EST', 'AKST'], ['EST', 'HST'], ['PST', 'HST'],
  // US to international
  ['EST', 'UTC'], ['EST', 'GMT'], ['EST', 'CET'], ['EST', 'IST'], ['EST', 'JST'], ['EST', 'KST'], ['EST', 'AEST'],
  ['CST', 'UTC'], ['CST', 'GMT'], ['CST', 'IST'], ['CST', 'JST'],
  ['PST', 'UTC'], ['PST', 'GMT'], ['PST', 'CET'], ['PST', 'IST'], ['PST', 'JST'], ['PST', 'KST'], ['PST', 'AEST'],
  // UTC/GMT to major zones
  ['UTC', 'CET'], ['UTC', 'EET'], ['UTC', 'IST'], ['UTC', 'SGT'], ['UTC', 'JST'], ['UTC', 'KST'], ['UTC', 'AEST'], ['UTC', 'NZST'],
  ['GMT', 'CET'], ['GMT', 'IST'], ['GMT', 'JST'], ['GMT', 'KST'], ['GMT', 'AEST'],
  // Europe
  ['CET', 'EET'], ['CET', 'GMT'], ['CET', 'IST'], ['CET', 'JST'],
  // Asia
  ['IST', 'SGT'], ['IST', 'JST'], ['IST', 'KST'], ['IST', 'AEST'],
  ['JST', 'KST'], ['JST', 'AEST'], ['JST', 'NZST'], ['JST', 'EST'], ['JST', 'PST'],
  ['KST', 'EST'], ['KST', 'PST'], ['KST', 'UTC'],
  ['SGT', 'JST'], ['SGT', 'EST'], ['SGT', 'PST'], ['SGT', 'UTC'],
  // Australia/NZ
  ['AEST', 'NZST'], ['AEST', 'PST'], ['AEST', 'EST'], ['AEST', 'UTC'],
  ['NZST', 'EST'], ['NZST', 'PST'], ['NZST', 'UTC'],
  // MSK
  ['MSK', 'UTC'], ['MSK', 'CET'], ['MSK', 'EST'],
  // ICT
  ['ICT', 'UTC'], ['ICT', 'EST'], ['ICT', 'JST'],
  // China
  ['CST-CN', 'UTC'], ['CST-CN', 'EST'], ['CST-CN', 'PST'], ['CST-CN', 'JST'],
];

function getZone(abbr: string): TimeZoneInfo {
  return ZONES.find(z => z.abbr === abbr)!;
}

export function getAllTimeZonePages(): TimeZonePage[] {
  const pages: TimeZonePage[] = [];
  const seen = new Set<string>();

  for (const [fromAbbr, toAbbr] of POPULAR_PAIRS) {
    const from = getZone(fromAbbr);
    const to = getZone(toAbbr);
    if (!from || !to) continue;

    // Generate both directions
    for (const [f, t] of [[from, to], [to, from]]) {
      const slug = `${f.abbr.toLowerCase()}-to-${t.abbr.toLowerCase()}`;
      if (seen.has(slug)) continue;
      seen.add(slug);

      const diff = t.utcOffset - f.utcOffset;
      const sign = diff >= 0 ? '+' : '';
      const diffLabel = diff === 0 ? 'same time' :
        Math.abs(diff) === 1 ? `${sign}${diff} hour` :
        Number.isInteger(diff) ? `${sign}${diff} hours` :
        `${sign}${diff} hours`;

      pages.push({
        slug,
        from: f,
        to: t,
        diffHours: diff,
        diffLabel,
        examplePairs: generateExamples(diff),
      });
    }
  }
  return pages;
}

export function getTimeZoneBySlug(slug: string): TimeZonePage | undefined {
  return getAllTimeZonePages().find(p => p.slug === slug);
}

export { ZONES };
