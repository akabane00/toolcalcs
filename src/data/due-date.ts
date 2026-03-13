// ==========================================================================
//  Pregnancy Due Date / Week-by-Week Data for Programmatic SEO Pages
//  Generates ~28 pages at /due-date/{slug}/
// ==========================================================================

export interface PregnancyWeekPage {
  slug: string;
  week: number;
  trimester: number;
  trimesterName: string;
  babySize: string;
  babySizeInches: number;
  babyWeightOz: number;
  babyWeightDisplay: string;
  developments: string[];
  symptoms: string[];
  tips: string[];
  weeksleft: number;
  daysLeft: number;
  percentComplete: number;
}

interface WeekDef {
  week: number;
  babySize: string;
  babySizeInches: number;
  babyWeightOz: number;
  developments: string[];
  symptoms: string[];
  tips: string[];
}

function getTrimester(week: number): number {
  if (week <= 13) return 1;
  if (week <= 26) return 2;
  return 3;
}

function getTrimesterName(trimester: number): string {
  if (trimester === 1) return 'First Trimester';
  if (trimester === 2) return 'Second Trimester';
  return 'Third Trimester';
}

function formatWeight(oz: number): string {
  if (oz < 1) return 'Less than 1 oz';
  if (oz < 16) return oz.toFixed(1) + ' oz';
  var lbs = oz / 16;
  return lbs.toFixed(1) + ' lbs';
}

const WEEKS: WeekDef[] = [
  {
    week: 4,
    babySize: 'Poppy seed',
    babySizeInches: 0.04,
    babyWeightOz: 0.01,
    developments: [
      'The fertilized egg implants in the uterine wall',
      'The amniotic sac and fluid begin forming',
      'The placenta starts developing to nourish the baby',
      'Cells are dividing rapidly into layers that will become different organs',
    ],
    symptoms: [
      'Missed period or very light spotting',
      'Mild cramping similar to menstrual cramps',
      'Breast tenderness and swelling',
      'Fatigue and increased sleepiness',
    ],
    tips: [
      'Take a home pregnancy test if you suspect pregnancy',
      'Start taking prenatal vitamins with folic acid (400-800 mcg daily)',
      'Schedule your first prenatal appointment',
      'Avoid alcohol, smoking, and recreational drugs',
    ],
  },
  {
    week: 5,
    babySize: 'Sesame seed',
    babySizeInches: 0.05,
    babyWeightOz: 0.02,
    developments: [
      'The neural tube (brain and spinal cord) begins forming',
      'The heart starts to develop and may begin beating',
      'Arm and leg buds start to appear',
      'The circulatory system is the first organ system to function',
    ],
    symptoms: [
      'Morning sickness or nausea may begin',
      'Increased urination frequency',
      'Heightened sense of smell',
      'Mood swings and emotional changes',
    ],
    tips: [
      'Eat small, frequent meals to manage nausea',
      'Stay hydrated by drinking plenty of water',
      'Get plenty of rest and listen to your body',
      'Continue taking prenatal vitamins daily',
    ],
  },
  {
    week: 6,
    babySize: 'Lentil',
    babySizeInches: 0.08,
    babyWeightOz: 0.03,
    developments: [
      'Facial features begin to form including jaw, cheeks, and chin',
      'The heart beats at about 100-160 times per minute',
      'Small buds that will become arms and legs are growing',
      'The lungs, liver, and kidneys begin developing',
    ],
    symptoms: [
      'Morning sickness may intensify',
      'Food aversions and cravings start',
      'Bloating and gas',
      'Breast tenderness continues',
    ],
    tips: [
      'Try ginger tea or crackers to ease nausea',
      'Avoid strong-smelling foods that trigger nausea',
      'Wear comfortable, supportive bras',
      'Start documenting your pregnancy journey',
    ],
  },
  {
    week: 7,
    babySize: 'Blueberry',
    babySizeInches: 0.31,
    babyWeightOz: 0.04,
    developments: [
      'Brain is growing rapidly with new nerve cells forming',
      'Arms and legs are lengthening and developing joints',
      'Tiny nostrils and eye lenses begin forming',
      'The umbilical cord is now clearly visible',
    ],
    symptoms: [
      'Nausea and vomiting may peak',
      'Excessive saliva production',
      'Frequent urination',
      'Acne or skin changes',
    ],
    tips: [
      'Eat protein-rich snacks to help with nausea',
      'Avoid skipping meals even if you feel sick',
      'Start researching prenatal care options',
      'Consider sharing news with your partner or close family',
    ],
  },
  {
    week: 8,
    babySize: 'Raspberry',
    babySizeInches: 0.63,
    babyWeightOz: 0.07,
    developments: [
      'Fingers and toes are forming but may still be webbed',
      'The baby starts making spontaneous movements',
      'Upper lip and nose have formed',
      'The eyes are developing pigment in the retina',
    ],
    symptoms: [
      'Continued morning sickness',
      'Cramping as the uterus expands',
      'Heightened sense of smell',
      'Constipation due to hormonal changes',
    ],
    tips: [
      'Eat fiber-rich foods to help with constipation',
      'Take short walks to boost energy levels',
      'Prepare questions for your first prenatal visit',
      'Start a pregnancy journal',
    ],
  },
  {
    week: 9,
    babySize: 'Cherry',
    babySizeInches: 0.90,
    babyWeightOz: 0.10,
    developments: [
      'The embryo is now officially called a fetus',
      'All essential organs have begun forming',
      'The tail has disappeared',
      'Muscles begin to develop allowing tiny movements',
    ],
    symptoms: [
      'Fatigue may be at its worst',
      'Increased blood volume',
      'Nasal congestion',
      'Emotional sensitivity',
    ],
    tips: [
      'Get 8-10 hours of sleep per night',
      'Take naps when possible',
      'Stay active with gentle exercises like walking',
      'Avoid hot tubs and saunas',
    ],
  },
  {
    week: 10,
    babySize: 'Strawberry',
    babySizeInches: 1.22,
    babyWeightOz: 0.14,
    developments: [
      'Vital organs are fully formed and beginning to function',
      'Tiny teeth buds are forming beneath the gums',
      'The baby can bend limbs at elbows and knees',
      'Fingernails and hair start to grow',
    ],
    symptoms: [
      'Visible veins due to increased blood volume',
      'Round ligament pain',
      'Headaches',
      'Morning sickness may begin to ease',
    ],
    tips: [
      'Wear loose-fitting clothing for comfort',
      'Stay hydrated to help with headaches',
      'Discuss genetic testing options with your doctor',
      'Start planning your birth preferences',
    ],
  },
  {
    week: 11,
    babySize: 'Fig',
    babySizeInches: 1.61,
    babyWeightOz: 0.25,
    developments: [
      'The baby is now fully formed with distinct human features',
      'Bones are beginning to harden',
      'The baby can open and close fists',
      'External genitalia are developing but not yet visible on ultrasound',
    ],
    symptoms: [
      'Gas and bloating',
      'Skin changes including darkening of the areola',
      'Leg cramps',
      'Reduced nausea for many women',
    ],
    tips: [
      'Consider a first trimester screening test',
      'Continue moderate exercise',
      'Start looking into maternity clothing',
      'Practice stress-reduction techniques',
    ],
  },
  {
    week: 12,
    babySize: 'Lime',
    babySizeInches: 2.10,
    babyWeightOz: 0.50,
    developments: [
      'The baby has reflexes and can feel touch',
      'Intestines move from the umbilical cord into the abdomen',
      'The pituitary gland begins producing hormones',
      'Vocal cords are forming',
    ],
    symptoms: [
      'Morning sickness often starts to subside',
      'Dizziness from increased blood volume',
      'Increased appetite',
      'A small baby bump may be visible',
    ],
    tips: [
      'Many parents announce their pregnancy after this milestone',
      'Schedule your nuchal translucency ultrasound',
      'Start incorporating calcium-rich foods',
      'Begin pelvic floor exercises',
    ],
  },
  {
    week: 13,
    babySize: 'Peach',
    babySizeInches: 2.91,
    babyWeightOz: 0.81,
    developments: [
      'Fingerprints have formed on tiny fingertips',
      'The baby can suck the thumb',
      'The placenta is now fully functional',
      'Veins and organs are visible through translucent skin',
    ],
    symptoms: [
      'Energy levels begin to increase',
      'Nausea typically decreasing',
      'Food cravings becoming more noticeable',
      'Visible veins on the chest',
    ],
    tips: [
      'Celebrate entering the second trimester',
      'Start shopping for maternity basics',
      'Increase protein intake to support baby growth',
      'Plan a dental checkup (dental health is linked to pregnancy outcomes)',
    ],
  },
  {
    week: 14,
    babySize: 'Lemon',
    babySizeInches: 3.42,
    babyWeightOz: 1.52,
    developments: [
      'The baby can make facial expressions like squinting',
      'Lanugo (fine hair) covers the body for warmth',
      'The roof of the mouth has formed',
      'The baby is producing urine',
    ],
    symptoms: [
      'Increased energy (the second trimester glow)',
      'Thicker, shinier hair',
      'Less nausea and more appetite',
      'Nasal congestion due to increased blood flow',
    ],
    tips: [
      'Enjoy the energy boost of the second trimester',
      'Start sleeping on your side',
      'Look into childbirth education classes',
      'Continue regular prenatal visits',
    ],
  },
  {
    week: 16,
    babySize: 'Avocado',
    babySizeInches: 4.57,
    babyWeightOz: 3.53,
    developments: [
      'The baby can hear sounds and may respond to noise',
      'The eyes can slowly move and are sensitive to light',
      'The skeletal system continues to harden from cartilage to bone',
      'The circulatory system is fully functional',
    ],
    symptoms: [
      'Baby bump is becoming more noticeable',
      'Backaches may begin',
      'Nasal congestion or nosebleeds',
      'Possible first feeling of quickening (baby movement)',
    ],
    tips: [
      'Schedule your anatomy scan (typically done at 18-20 weeks)',
      'Invest in a good pregnancy pillow',
      'Talk, sing, or read to your baby',
      'Stay active with pregnancy-safe exercises',
    ],
  },
  {
    week: 18,
    babySize: 'Bell pepper',
    babySizeInches: 5.59,
    babyWeightOz: 6.70,
    developments: [
      'The baby is yawning, hiccupping, and swallowing',
      'Myelin (protective coating) is forming around nerves',
      'If female, the uterus and fallopian tubes are in place',
      'The baby develops sleep and wake cycles',
    ],
    symptoms: [
      'Feeling the baby move for the first time (quickening)',
      'Growing appetite',
      'Dizziness when standing up quickly',
      'Swelling in feet and ankles',
    ],
    tips: [
      'Start tracking baby movements',
      'Eat iron-rich foods to prevent anemia',
      'Wear comfortable, supportive shoes',
      'Consider prenatal yoga or swimming',
    ],
  },
  {
    week: 20,
    babySize: 'Banana',
    babySizeInches: 6.46,
    babyWeightOz: 10.19,
    developments: [
      'The baby is now measured from head to heel (previously crown to rump)',
      'Vernix caseosa (waxy coating) covers the skin for protection',
      'Taste buds are functional and the baby can taste amniotic fluid',
      'The uterus has reached the navel',
    ],
    symptoms: [
      'Baby movements are stronger and more regular',
      'Shortness of breath as the uterus pushes up',
      'Stretch marks may appear',
      'Increased vaginal discharge',
    ],
    tips: [
      'Attend your mid-pregnancy anatomy scan',
      'You may learn the sex of your baby at this scan',
      'Apply moisturizer to help with stretch marks',
      'Start planning the nursery',
    ],
  },
  {
    week: 22,
    babySize: 'Papaya',
    babySizeInches: 7.60,
    babyWeightOz: 15.17,
    developments: [
      'The baby looks like a miniature newborn',
      'Eyebrows and eyelashes are visible',
      'The inner ear is developed enough for balance',
      'The pancreas is maturing steadily',
    ],
    symptoms: [
      'Braxton Hicks contractions may begin',
      'Stretch marks becoming more visible',
      'Increased skin pigmentation (linea nigra)',
      'Swollen gums',
    ],
    tips: [
      'Practice breathing exercises for labor preparation',
      'Maintain good posture to reduce back pain',
      'Eat small, frequent meals to avoid heartburn',
      'Keep up with prenatal appointments',
    ],
  },
  {
    week: 24,
    babySize: 'Ear of corn',
    babySizeInches: 11.81,
    babyWeightOz: 20.80,
    developments: [
      'The baby has reached viability (could survive outside the womb with intensive care)',
      'Lungs are developing surfactant for breathing',
      'The brain is growing rapidly',
      'The baby responds to sound and may jump at loud noises',
    ],
    symptoms: [
      'Carpal tunnel syndrome symptoms',
      'Itchy skin on the stretching belly',
      'Trouble sleeping',
      'Leg cramps especially at night',
    ],
    tips: [
      'Take a glucose screening test (typically between 24-28 weeks)',
      'Consider signing up for birthing classes',
      'Start thinking about a birth plan',
      'Keep feet elevated to reduce swelling',
    ],
  },
  {
    week: 25,
    babySize: 'Cauliflower',
    babySizeInches: 13.07,
    babyWeightOz: 22.72,
    developments: [
      'The baby is gaining baby fat and filling out',
      'Nostrils begin to open and practice breathing',
      'The baby can respond to familiar voices',
      'Skin is becoming less transparent',
    ],
    symptoms: [
      'Hemorrhoids from increased pressure',
      'Heartburn and indigestion',
      'Difficulty finding comfortable sleeping positions',
      'Restless legs syndrome',
    ],
    tips: [
      'Sleep on your left side for optimal blood flow',
      'Eat plenty of fiber and drink water for digestion',
      'Start researching pediatricians',
      'Consider a prenatal massage for relief',
    ],
  },
  {
    week: 26,
    babySize: 'Zucchini',
    babySizeInches: 13.39,
    babyWeightOz: 25.60,
    developments: [
      'The eyes open for the first time',
      'The baby can see light filtering through the womb',
      'The immune system is absorbing antibodies',
      'Brain wave activity begins for visual and auditory systems',
    ],
    symptoms: [
      'Difficulty sleeping due to baby size',
      'Braxton Hicks contractions more frequent',
      'Pelvic pressure',
      'Higher blood pressure',
    ],
    tips: [
      'Monitor your blood pressure at prenatal visits',
      'Start preparing your hospital bag list',
      'Practice relaxation and stress-management techniques',
      'Continue moderate exercise with doctor approval',
    ],
  },
  {
    week: 27,
    babySize: 'Head of lettuce',
    babySizeInches: 14.10,
    babyWeightOz: 29.28,
    developments: [
      'The baby has regular sleep and wake cycles',
      'The lungs are still maturing but could function with support',
      'The baby can recognize the mother\'s voice',
      'The brain surface is becoming wrinkled (allowing more brain cells)',
    ],
    symptoms: [
      'Shortness of breath',
      'Swelling in hands and feet',
      'Vivid dreams',
      'Leg cramps at night',
    ],
    tips: [
      'Celebrate entering the third trimester',
      'Start doing kick counts daily',
      'Sign up for breastfeeding classes if interested',
      'Tour the hospital or birthing center',
    ],
  },
  {
    week: 28,
    babySize: 'Eggplant',
    babySizeInches: 14.80,
    babyWeightOz: 35.20,
    developments: [
      'The baby can blink and has eyelashes',
      'REM (dream) sleep begins',
      'The baby is developing billions of brain neurons',
      'If born now, the baby has a strong chance of survival',
    ],
    symptoms: [
      'Increasing back pain',
      'Frequent urination returns',
      'Shortness of breath',
      'Trouble sleeping and insomnia',
    ],
    tips: [
      'Begin third trimester prenatal visits (every 2 weeks)',
      'Know the signs of preterm labor',
      'Continue eating a balanced, nutrient-rich diet',
      'Practice perineal massage to prepare for delivery',
    ],
  },
  {
    week: 30,
    babySize: 'Cabbage',
    babySizeInches: 15.71,
    babyWeightOz: 42.56,
    developments: [
      'The baby is gaining about half a pound per week',
      'Red blood cells are now forming in the bone marrow',
      'The lanugo (body hair) starts to disappear',
      'The baby can grasp firmly with hands',
    ],
    symptoms: [
      'Heartburn and indigestion worsen',
      'Mood swings and anxiety about delivery',
      'Fatigue returns',
      'Swollen ankles and feet',
    ],
    tips: [
      'Install the car seat and learn how to use it',
      'Finalize your birth plan',
      'Pack your hospital bag',
      'Rest when you can and delegate tasks',
    ],
  },
  {
    week: 32,
    babySize: 'Squash',
    babySizeInches: 16.69,
    babyWeightOz: 59.20,
    developments: [
      'The baby practices breathing movements',
      'Toenails and fingernails are fully formed',
      'The baby is likely in a head-down position',
      'Fat layers continue to fill out the body',
    ],
    symptoms: [
      'Braxton Hicks contractions more intense',
      'Leaking colostrum from breasts',
      'Difficulty breathing as baby pushes on diaphragm',
      'Frequent need to urinate',
    ],
    tips: [
      'Attend prenatal visits every 2 weeks',
      'Learn the difference between Braxton Hicks and real labor',
      'Prepare sibling(s) if applicable',
      'Finalize nursery preparations',
    ],
  },
  {
    week: 34,
    babySize: 'Cantaloupe',
    babySizeInches: 17.72,
    babyWeightOz: 73.28,
    developments: [
      'The lungs and central nervous system are maturing',
      'The baby fat smooths out wrinkled skin',
      'The vernix coating gets thicker',
      'The baby can recognize and react to simple songs',
    ],
    symptoms: [
      'Fatigue and difficulty sleeping',
      'Pelvic pain and pressure',
      'Blurred vision',
      'Swelling in face and hands',
    ],
    tips: [
      'Know the signs of preeclampsia (sudden swelling, headaches, vision changes)',
      'Do a hospital pre-registration',
      'Stock up on postpartum supplies',
      'Prepare meals to freeze for after delivery',
    ],
  },
  {
    week: 36,
    babySize: 'Romaine lettuce',
    babySizeInches: 18.66,
    babyWeightOz: 92.80,
    developments: [
      'The baby drops lower into the pelvis (lightening or engagement)',
      'The digestive system is fully mature',
      'The baby gains about an ounce a day',
      'The immune system is ready for life outside',
    ],
    symptoms: [
      'Easier breathing as baby drops lower',
      'Increased pelvic pressure and discomfort',
      'Frequent urination intensifies',
      'Nesting instinct may kick in',
    ],
    tips: [
      'Prenatal visits are now weekly',
      'Know the signs of labor (regular contractions, water breaking)',
      'Rest and conserve energy',
      'Review your birth plan with your provider',
    ],
  },
  {
    week: 37,
    babySize: 'Swiss chard',
    babySizeInches: 19.13,
    babyWeightOz: 103.04,
    developments: [
      'The baby is now considered early term',
      'The lungs are mature enough to function on their own',
      'The baby is practicing breathing, sucking, and gripping',
      'Fat continues to accumulate at about 14 grams per day',
    ],
    symptoms: [
      'Pelvic pain increases',
      'Mucus plug may be discharged (bloody show)',
      'Braxton Hicks feel stronger',
      'Nesting urge intensifies',
    ],
    tips: [
      'Have your hospital bag packed and ready',
      'Keep your phone charged for the big day',
      'Rest as much as possible',
      'Discuss pain management options with your doctor',
    ],
  },
  {
    week: 38,
    babySize: 'Mini watermelon',
    babySizeInches: 19.61,
    babyWeightOz: 108.16,
    developments: [
      'The baby has a firm grasp and strong reflexes',
      'Organ systems are fully developed and functional',
      'The baby is shedding lanugo and vernix',
      'Meconium (first stool) is accumulating in the intestines',
    ],
    symptoms: [
      'Intense pelvic pressure',
      'Difficulty walking comfortably',
      'Increased vaginal discharge',
      'Anxiety and excitement about delivery',
    ],
    tips: [
      'Finalize childcare plans for older children',
      'Keep gas in the car and bags by the door',
      'Stay within a reasonable distance of your hospital',
      'Practice labor breathing techniques',
    ],
  },
  {
    week: 39,
    babySize: 'Pumpkin',
    babySizeInches: 19.96,
    babyWeightOz: 114.56,
    developments: [
      'The baby is full term and ready for birth',
      'The brain and lungs continue their final maturation',
      'The baby adds more fat for temperature regulation',
      'Antibodies from the placenta boost the immune system',
    ],
    symptoms: [
      'Lightning crotch (sharp pelvic pain)',
      'Diarrhea or loose stools (body preparing for labor)',
      'Difficulty sleeping',
      'Increased Braxton Hicks contractions',
    ],
    tips: [
      'Monitor contractions and call your provider if they become regular',
      'Stay hydrated and eat lightly',
      'Try gentle walking to encourage labor',
      'Practice patience and try to relax',
    ],
  },
  {
    week: 40,
    babySize: 'Watermelon',
    babySizeInches: 20.16,
    babyWeightOz: 121.60,
    developments: [
      'The baby is fully developed and ready to meet you',
      'Average weight is 7.6 lbs and length is about 20 inches',
      'The skull bones are not yet fused for easier delivery',
      'The baby has over 300 bones (adults have 206)',
    ],
    symptoms: [
      'Loss of mucus plug',
      'Water breaking or slow leak of fluid',
      'Regular contractions increasing in intensity',
      'Strong nesting urge',
    ],
    tips: [
      'Your due date is here! Babies can arrive up to 2 weeks after',
      'Call your provider if contractions are 5 minutes apart for 1 hour',
      'Go to the hospital if your water breaks',
      'Trust your body and your care team',
    ],
  },
];

function buildPage(def: WeekDef): PregnancyWeekPage {
  var trimester = getTrimester(def.week);
  return {
    slug: def.week + '-weeks-pregnant',
    week: def.week,
    trimester: trimester,
    trimesterName: getTrimesterName(trimester),
    babySize: def.babySize,
    babySizeInches: def.babySizeInches,
    babyWeightOz: def.babyWeightOz,
    babyWeightDisplay: formatWeight(def.babyWeightOz),
    developments: def.developments,
    symptoms: def.symptoms,
    tips: def.tips,
    weeksleft: 40 - def.week,
    daysLeft: (40 - def.week) * 7,
    percentComplete: Math.round((def.week / 40) * 100),
  };
}

let _cache: PregnancyWeekPage[] | null = null;

export function getAllPregnancyPages(): PregnancyWeekPage[] {
  if (_cache) return _cache;
  _cache = WEEKS.map(function (def) {
    return buildPage(def);
  });
  return _cache;
}

export function getPregnancyPageBySlug(slug: string): PregnancyWeekPage | undefined {
  return getAllPregnancyPages().find(function (p) { return p.slug === slug; });
}
