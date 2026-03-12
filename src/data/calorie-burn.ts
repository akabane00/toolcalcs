// ==========================================================================
//  Calorie Burn Data for Programmatic SEO Pages
//  Generates ~55 pages at /calorie/{slug}/
// ==========================================================================

export interface CaloriePage {
  slug: string;
  activity: string;
  activityLower: string;
  duration: number;        // minutes
  durationDisplay: string;
  met: number;             // metabolic equivalent
  caloriesByWeight: { weight: number; weightKg: number; calories: number }[];
  category: string;
  description: string;
}

interface ActivityDef {
  name: string;
  met: number;
  category: string;
  durations: number[];
  description: string;
}

const WEIGHTS_LBS = [130, 155, 180, 205, 230];

const ACTIVITIES: ActivityDef[] = [
  {
    name: 'Walking (3.5 mph)',
    met: 4.3,
    category: 'Cardio',
    durations: [15, 30, 45, 60],
    description: 'Walking at a brisk pace of 3.5 mph on a flat surface. This moderate-intensity exercise is one of the most accessible and sustainable forms of physical activity, suitable for all fitness levels.',
  },
  {
    name: 'Running (6 mph / 10 min/mile)',
    met: 9.8,
    category: 'Cardio',
    durations: [15, 30, 45, 60],
    description: 'Running at a steady 6 mph pace, equivalent to a 10-minute mile. This is a popular pace for recreational runners and provides an excellent cardiovascular workout.',
  },
  {
    name: 'Running (8 mph / 7.5 min/mile)',
    met: 11.8,
    category: 'Cardio',
    durations: [15, 30, 45],
    description: 'Running at a vigorous 8 mph pace, equivalent to a 7.5-minute mile. This high-intensity pace is common among experienced runners training for races or looking to maximize calorie burn.',
  },
  {
    name: 'Cycling (moderate, 12-14 mph)',
    met: 8.0,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Cycling at a moderate effort of 12 to 14 mph on relatively flat terrain. This pace provides a solid cardiovascular workout while being sustainable for longer rides.',
  },
  {
    name: 'Cycling (vigorous, 14-16 mph)',
    met: 10.0,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Cycling at a vigorous pace of 14 to 16 mph, demanding sustained effort. This intensity level is typical for fitness cycling and competitive training.',
  },
  {
    name: 'Swimming (moderate)',
    met: 7.0,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Swimming at a moderate pace using strokes like freestyle or backstroke. Swimming is a full-body, low-impact exercise that builds endurance and muscle strength simultaneously.',
  },
  {
    name: 'Swimming (vigorous)',
    met: 9.8,
    category: 'Cardio',
    durations: [30, 45],
    description: 'Swimming at a vigorous pace with sustained effort, such as competitive lap swimming. This high-intensity aquatic exercise is one of the most effective full-body calorie-burning workouts.',
  },
  {
    name: 'Hiking',
    met: 6.0,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Hiking on trails with moderate elevation changes. Hiking combines cardiovascular exercise with the mental health benefits of spending time outdoors in nature.',
  },
  {
    name: 'Yoga',
    met: 3.0,
    category: 'Flexibility',
    durations: [30, 45, 60],
    description: 'Practicing yoga with a mix of poses, stretches, and controlled breathing. While the calorie burn is lower than cardio exercises, yoga improves flexibility, balance, and mental well-being.',
  },
  {
    name: 'HIIT',
    met: 8.0,
    category: 'Cardio',
    durations: [15, 30, 45],
    description: 'High-Intensity Interval Training alternating between short bursts of maximum effort and brief recovery periods. HIIT is highly efficient for calorie burning and continues to burn calories even after the workout ends.',
  },
  {
    name: 'Jump Rope',
    met: 12.3,
    category: 'Cardio',
    durations: [15, 30],
    description: 'Jumping rope at a moderate to fast pace. Jump rope is one of the highest calorie-burning exercises per minute and improves coordination, agility, and cardiovascular fitness.',
  },
  {
    name: 'Elliptical',
    met: 5.0,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Using an elliptical trainer at moderate resistance. The elliptical provides a low-impact cardio workout that mimics running without the joint stress, making it ideal for those with knee or hip concerns.',
  },
  {
    name: 'Rowing',
    met: 7.0,
    category: 'Cardio',
    durations: [15, 30, 45],
    description: 'Rowing on a machine or in a boat at moderate intensity. Rowing engages roughly 86% of the muscles in the body, making it one of the most comprehensive full-body exercises available.',
  },
  {
    name: 'Stair Climbing',
    met: 9.0,
    category: 'Cardio',
    durations: [15, 30, 45],
    description: 'Climbing stairs at a steady pace using a stair climber or actual stairs. This exercise builds lower-body strength and cardiovascular endurance while burning calories at a high rate.',
  },
  {
    name: 'Dancing',
    met: 5.5,
    category: 'Cardio',
    durations: [30, 45, 60],
    description: 'Dancing at moderate intensity including styles like ballroom, salsa, or aerobic dance. Dancing is a fun way to burn calories while improving coordination, balance, and mood.',
  },
  {
    name: 'Tennis',
    met: 7.3,
    category: 'Sports',
    durations: [30, 60],
    description: 'Playing singles tennis at a recreational to competitive level. Tennis combines bursts of sprinting, lateral movement, and upper-body work for a well-rounded athletic workout.',
  },
  {
    name: 'Basketball',
    met: 6.5,
    category: 'Sports',
    durations: [30, 60],
    description: 'Playing basketball in a casual or pickup game setting. Basketball involves running, jumping, and quick directional changes that build both cardiovascular endurance and agility.',
  },
  {
    name: 'Strength Training',
    met: 3.5,
    category: 'Strength',
    durations: [30, 45, 60],
    description: 'Weight lifting or resistance training at moderate intensity with short rest periods. While the immediate calorie burn is moderate, strength training builds muscle mass which increases your resting metabolic rate over time.',
  },
  {
    name: 'Boxing',
    met: 7.8,
    category: 'Sports',
    durations: [30, 45, 60],
    description: 'Boxing training including bag work, shadowboxing, and drills. Boxing is an intense full-body workout that improves hand-eye coordination, agility, and cardiovascular fitness.',
  },
];

function slugify(activity: string, duration: number): string {
  var durationStr = duration === 60 ? '1-hour' : duration + '-minutes';
  var activitySlug = activity
    .toLowerCase()
    .replace(/[()\/]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return 'calories-burned-' + activitySlug + '-' + durationStr;
}

function formatDuration(minutes: number): string {
  if (minutes === 60) return '1 Hour';
  return minutes + ' Minutes';
}

function calcCalories(met: number, weightLbs: number, durationMinutes: number): number {
  var weightKg = weightLbs * 0.4536;
  var durationHours = durationMinutes / 60;
  return Math.round(met * weightKg * durationHours);
}

function buildCaloriePage(activity: ActivityDef, duration: number): CaloriePage {
  var caloriesByWeight = WEIGHTS_LBS.map(function (w) {
    return {
      weight: w,
      weightKg: Math.round(w * 0.4536 * 10) / 10,
      calories: calcCalories(activity.met, w, duration),
    };
  });

  return {
    slug: slugify(activity.name, duration),
    activity: activity.name,
    activityLower: activity.name.toLowerCase(),
    duration: duration,
    durationDisplay: formatDuration(duration),
    met: activity.met,
    caloriesByWeight: caloriesByWeight,
    category: activity.category,
    description: activity.description,
  };
}

let _cache: CaloriePage[] | null = null;

export function getAllCaloriePages(): CaloriePage[] {
  if (_cache) return _cache;
  var pages: CaloriePage[] = [];
  for (var i = 0; i < ACTIVITIES.length; i++) {
    var act = ACTIVITIES[i];
    for (var j = 0; j < act.durations.length; j++) {
      pages.push(buildCaloriePage(act, act.durations[j]));
    }
  }
  _cache = pages;
  return _cache;
}

export function getCaloriePageBySlug(slug: string): CaloriePage | undefined {
  return getAllCaloriePages().find(function (p) { return p.slug === slug; });
}

export { WEIGHTS_LBS, ACTIVITIES };
