// ==========================================================================
//  Running Pace Data for Programmatic SEO Pages
//  Generates ~40 pages at /pace/{slug}/
// ==========================================================================

export interface PacePage {
  slug: string;
  paceMinPerMile: number;
  paceDisplay: string;       // "8:00 min/mile"
  paceMinPerKm: number;
  paceKmDisplay: string;     // "4:58 min/km"
  speedMph: number;
  speedKph: number;
  race5k: string;
  race10k: string;
  raceHalf: string;
  raceMarathon: string;
  category: string;
  description: string;
  pageType: 'pace' | 'race-target';
  title: string;
}

// --- Race distances in miles ---
const DIST_5K = 3.10686;
const DIST_10K = 6.21371;
const DIST_HALF = 13.1094;
const DIST_MARATHON = 26.2188;

function formatTime(totalMinutes: number): string {
  var hours = Math.floor(totalMinutes / 60);
  var mins = Math.floor(totalMinutes % 60);
  var secs = Math.round((totalMinutes % 1) * 60);
  if (secs === 60) { mins += 1; secs = 0; }
  if (mins === 60) { hours += 1; mins = 0; }
  var secStr = secs < 10 ? '0' + secs : '' + secs;
  var minStr = mins < 10 ? '0' + mins : '' + mins;
  if (hours > 0) {
    return hours + ':' + minStr + ':' + secStr;
  }
  return mins + ':' + secStr;
}

function formatPace(totalMinutes: number): string {
  var mins = Math.floor(totalMinutes);
  var secs = Math.round((totalMinutes - mins) * 60);
  if (secs === 60) { mins += 1; secs = 0; }
  var secStr = secs < 10 ? '0' + secs : '' + secs;
  return mins + ':' + secStr;
}

function getCategory(paceMinPerMile: number): string {
  if (paceMinPerMile < 6) return 'Elite';
  if (paceMinPerMile <= 7.5) return 'Advanced';
  if (paceMinPerMile <= 9) return 'Intermediate';
  if (paceMinPerMile <= 11) return 'Recreational';
  return 'Beginner';
}

function buildPacePage(paceMin: number, paceSec: number): PacePage {
  var paceMinPerMile = paceMin + paceSec / 60;
  var paceMinPerKm = paceMinPerMile / 1.60934;
  var speedMph = 60 / paceMinPerMile;
  var speedKph = speedMph * 1.60934;
  var category = getCategory(paceMinPerMile);

  var race5k = formatTime(paceMinPerMile * DIST_5K);
  var race10k = formatTime(paceMinPerMile * DIST_10K);
  var raceHalf = formatTime(paceMinPerMile * DIST_HALF);
  var raceMarathon = formatTime(paceMinPerMile * DIST_MARATHON);

  var paceDisplay = formatPace(paceMinPerMile) + ' min/mile';
  var paceKmDisplay = formatPace(paceMinPerKm) + ' min/km';

  var paceLabel = paceMin + ':' + (paceSec < 10 ? '0' + paceSec : '' + paceSec);
  var slug = paceMin + '-' + (paceSec === 0 ? 'minute' : paceSec.toString()) + '-mile-pace';
  if (paceSec !== 0) {
    slug = paceMin + '-' + (paceSec < 10 ? '0' + paceSec : paceSec) + '-mile-pace';
  }

  var titleLabel = paceSec === 0
    ? paceMin + ' Minute Mile'
    : paceMin + ':' + (paceSec < 10 ? '0' + paceSec : paceSec) + ' Mile';

  var descriptions: Record<string, string> = {
    'Elite': 'This is an elite-level pace typically seen in competitive distance runners and professional athletes. Maintaining a ' + paceLabel + ' min/mile pace requires exceptional cardiovascular fitness, years of dedicated training, and efficient running form. Runners at this level often follow periodized training plans that include tempo runs, interval sessions, and high weekly mileage. Recovery, nutrition timing, and sleep are critical components of training at this intensity.',
    'Advanced': 'A ' + paceLabel + ' min/mile pace is an advanced running pace that places you among the faster recreational and competitive runners. Achieving this pace consistently requires a solid base of aerobic fitness, regular speed work, and disciplined training. Runners at this level typically log 30-50 miles per week and incorporate tempo runs, hill repeats, and track workouts into their training schedule. Proper warm-up routines and post-run stretching help prevent injuries at this demanding pace.',
    'Intermediate': 'Running at a ' + paceLabel + ' min/mile pace represents an intermediate fitness level that many dedicated recreational runners achieve. This pace is fast enough to provide excellent cardiovascular benefits while remaining sustainable for longer runs. Training at this level typically involves a mix of easy runs, tempo efforts, and occasional interval sessions. Most runners at this pace run 15-30 miles per week and can complete a 5K in a competitive time.',
    'Recreational': 'A ' + paceLabel + ' min/mile pace is a solid recreational running pace that is comfortable for regular runners who exercise for health and enjoyment. This pace provides excellent cardiovascular exercise and is sustainable for extended periods, making it ideal for longer training runs and half marathon preparation. At this level, focus on building consistency and gradually increasing weekly mileage rather than speed. Most recreational runners find this pace allows them to hold a conversation while running.',
    'Beginner': 'Running at a ' + paceLabel + ' min/mile pace is a great starting point for new runners or those returning to running after a break. This pace allows you to build aerobic fitness gradually without excessive strain on joints and muscles. Many successful marathon finishers maintain this pace throughout their race. Focus on running consistently 3-4 times per week and gradually increasing your distance. Walk-run intervals are an excellent strategy for building up to sustained running at this pace.',
  };

  return {
    slug: slug,
    paceMinPerMile: paceMinPerMile,
    paceDisplay: paceDisplay,
    paceMinPerKm: paceMinPerKm,
    paceKmDisplay: paceKmDisplay,
    speedMph: Math.round(speedMph * 100) / 100,
    speedKph: Math.round(speedKph * 100) / 100,
    race5k: race5k,
    race10k: race10k,
    raceHalf: raceHalf,
    raceMarathon: raceMarathon,
    category: category,
    description: descriptions[category],
    pageType: 'pace',
    title: titleLabel + ' Pace',
  };
}

// --- Pace entries (min:sec per mile) ---
const PACE_DEFS: [number, number][] = [
  [5, 0], [5, 30], [6, 0], [6, 30], [7, 0], [7, 30],
  [8, 0], [8, 30], [9, 0], [9, 30], [10, 0], [10, 30],
  [11, 0], [11, 30], [12, 0], [12, 30], [13, 0], [13, 30],
  [14, 0], [15, 0],
];

// --- Race target pages ---
interface RaceTarget {
  slug: string;
  title: string;
  raceName: string;
  raceDistMiles: number;
  targetTime: string;
  targetMinutes: number;
}

const RACE_TARGETS: RaceTarget[] = [
  { slug: 'sub-18-5k-pace', title: 'Sub 18 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '18:00', targetMinutes: 18 },
  { slug: 'sub-20-5k-pace', title: 'Sub 20 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '20:00', targetMinutes: 20 },
  { slug: 'sub-22-5k-pace', title: 'Sub 22 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '22:00', targetMinutes: 22 },
  { slug: 'sub-25-5k-pace', title: 'Sub 25 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '25:00', targetMinutes: 25 },
  { slug: 'sub-30-5k-pace', title: 'Sub 30 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '30:00', targetMinutes: 30 },
  { slug: 'sub-35-5k-pace', title: 'Sub 35 Minute 5K Pace', raceName: '5K', raceDistMiles: DIST_5K, targetTime: '35:00', targetMinutes: 35 },
  { slug: 'sub-40-10k-pace', title: 'Sub 40 Minute 10K Pace', raceName: '10K', raceDistMiles: DIST_10K, targetTime: '40:00', targetMinutes: 40 },
  { slug: 'sub-45-10k-pace', title: 'Sub 45 Minute 10K Pace', raceName: '10K', raceDistMiles: DIST_10K, targetTime: '45:00', targetMinutes: 45 },
  { slug: 'sub-50-10k-pace', title: 'Sub 50 Minute 10K Pace', raceName: '10K', raceDistMiles: DIST_10K, targetTime: '50:00', targetMinutes: 50 },
  { slug: 'sub-55-10k-pace', title: 'Sub 55 Minute 10K Pace', raceName: '10K', raceDistMiles: DIST_10K, targetTime: '55:00', targetMinutes: 55 },
  { slug: 'sub-60-10k-pace', title: 'Sub 60 Minute 10K Pace', raceName: '10K', raceDistMiles: DIST_10K, targetTime: '1:00:00', targetMinutes: 60 },
  { slug: 'sub-1-30-half-marathon-pace', title: 'Sub 1:30 Half Marathon Pace', raceName: 'Half Marathon', raceDistMiles: DIST_HALF, targetTime: '1:30:00', targetMinutes: 90 },
  { slug: 'sub-1-45-half-marathon-pace', title: 'Sub 1:45 Half Marathon Pace', raceName: 'Half Marathon', raceDistMiles: DIST_HALF, targetTime: '1:45:00', targetMinutes: 105 },
  { slug: 'sub-2-hour-half-marathon-pace', title: 'Sub 2 Hour Half Marathon Pace', raceName: 'Half Marathon', raceDistMiles: DIST_HALF, targetTime: '2:00:00', targetMinutes: 120 },
  { slug: 'sub-2-15-half-marathon-pace', title: 'Sub 2:15 Half Marathon Pace', raceName: 'Half Marathon', raceDistMiles: DIST_HALF, targetTime: '2:15:00', targetMinutes: 135 },
  { slug: 'sub-3-hour-marathon-pace', title: 'Sub 3 Hour Marathon Pace', raceName: 'Marathon', raceDistMiles: DIST_MARATHON, targetTime: '3:00:00', targetMinutes: 180 },
  { slug: '3-30-marathon-pace', title: '3:30 Marathon Pace', raceName: 'Marathon', raceDistMiles: DIST_MARATHON, targetTime: '3:30:00', targetMinutes: 210 },
  { slug: '4-hour-marathon-pace', title: '4 Hour Marathon Pace', raceName: 'Marathon', raceDistMiles: DIST_MARATHON, targetTime: '4:00:00', targetMinutes: 240 },
  { slug: '4-30-marathon-pace', title: '4:30 Marathon Pace', raceName: 'Marathon', raceDistMiles: DIST_MARATHON, targetTime: '4:30:00', targetMinutes: 270 },
  { slug: '5-hour-marathon-pace', title: '5 Hour Marathon Pace', raceName: 'Marathon', raceDistMiles: DIST_MARATHON, targetTime: '5:00:00', targetMinutes: 300 },
];

function buildRaceTargetPage(target: RaceTarget): PacePage {
  var paceMinPerMile = target.targetMinutes / target.raceDistMiles;
  var paceMinPerKm = paceMinPerMile / 1.60934;
  var speedMph = 60 / paceMinPerMile;
  var speedKph = speedMph * 1.60934;
  var category = getCategory(paceMinPerMile);

  var race5k = formatTime(paceMinPerMile * DIST_5K);
  var race10k = formatTime(paceMinPerMile * DIST_10K);
  var raceHalf = formatTime(paceMinPerMile * DIST_HALF);
  var raceMarathon = formatTime(paceMinPerMile * DIST_MARATHON);

  var paceDisplay = formatPace(paceMinPerMile) + ' min/mile';
  var paceKmDisplay = formatPace(paceMinPerKm) + ' min/km';

  var description = 'To achieve a ' + target.targetTime + ' ' + target.raceName + ', you need to maintain a pace of ' + formatPace(paceMinPerMile) + ' per mile (' + formatPace(paceMinPerKm) + ' per km). This is a ' + category.toLowerCase() + '-level pace that requires structured training and consistent effort. A training plan for this goal should include easy runs at a conversational pace, tempo runs slightly faster than race pace, and interval sessions to build speed. Most runners benefit from a 12-16 week training block with gradual increases in weekly mileage. Cross-training activities like cycling or swimming can supplement running while reducing injury risk. Proper pacing strategy on race day is crucial — starting too fast is the most common mistake that prevents runners from hitting their target time.';

  return {
    slug: target.slug,
    paceMinPerMile: paceMinPerMile,
    paceDisplay: paceDisplay,
    paceMinPerKm: paceMinPerKm,
    paceKmDisplay: paceKmDisplay,
    speedMph: Math.round(speedMph * 100) / 100,
    speedKph: Math.round(speedKph * 100) / 100,
    race5k: race5k,
    race10k: race10k,
    raceHalf: raceHalf,
    raceMarathon: raceMarathon,
    category: category,
    description: description,
    pageType: 'race-target',
    title: target.title,
  };
}

let _cache: PacePage[] | null = null;

export function getAllPacePages(): PacePage[] {
  if (_cache) return _cache;
  var pages: PacePage[] = [];
  for (var i = 0; i < PACE_DEFS.length; i++) {
    pages.push(buildPacePage(PACE_DEFS[i][0], PACE_DEFS[i][1]));
  }
  for (var j = 0; j < RACE_TARGETS.length; j++) {
    pages.push(buildRaceTargetPage(RACE_TARGETS[j]));
  }
  _cache = pages;
  return _cache;
}

export function getPacePageBySlug(slug: string): PacePage | undefined {
  return getAllPacePages().find(function (p) { return p.slug === slug; });
}

export { PACE_DEFS, RACE_TARGETS };
