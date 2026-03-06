export interface LifePathNumber {
  number: number;
  name: string;
  meaning: string;
  traits: string[];
  careers: string[];
  compatibility: number[];
  celebrities: string[];
  challenges: string;
  strengths: string;
  isMaster: boolean;
}

export const lifePathNumbers: LifePathNumber[] = [
  {
    number: 1,
    name: 'The Leader',
    meaning: 'Life Path 1 is the path of the pioneer and the innovator. You are fiercely independent, driven by ambition, and naturally drawn to positions of authority. People with this life path are often the ones who forge new trails, start businesses, and inspire others through sheer force of will. You have an innate confidence that draws people to you, though you sometimes struggle with delegating tasks because you believe you can do everything better yourself. Your greatest gift is your ability to turn ideas into reality. When you set your mind to something, very little can stand in your way. You thrive on challenges and actually perform better when the odds are stacked against you. However, you must be careful not to let your drive for independence turn into isolation. Learning to collaborate and accept help from others is one of your key life lessons. At your best, you are a trailblazer who inspires others to believe in themselves and take bold action.',
    traits: ['Independent', 'Ambitious', 'Confident', 'Innovative', 'Determined'],
    careers: ['Entrepreneur', 'CEO/Executive', 'Freelancer', 'Inventor', 'Director'],
    compatibility: [3, 5, 7],
    celebrities: ['Martin Luther King Jr.', 'Steve Jobs', 'Lady Gaga', 'Nikola Tesla', 'Scarlett Johansson'],
    challenges: 'Your biggest challenge is learning to balance independence with collaboration. You may struggle with being overly self-reliant, impatient with others, or unwilling to compromise. Practice active listening and remember that true leadership means lifting others up.',
    strengths: 'Unmatched determination, creative problem-solving, natural authority, and the courage to start from scratch when needed.',
    isMaster: false,
  },
  {
    number: 2,
    name: 'The Peacemaker',
    meaning: 'Life Path 2 is the path of diplomacy, cooperation, and emotional intelligence. You are the natural mediator who brings people together and creates harmony wherever you go. Your sensitivity to others\' feelings is almost intuitive — you can walk into a room and immediately sense the emotional undercurrents. This makes you an extraordinary friend, partner, and teammate. Unlike the bold energy of Life Path 1, your power is subtle and deeply influential. You work behind the scenes, building bridges and smoothing conflicts with grace. Your patience is remarkable, and you understand that the best outcomes often come from gentle persistence rather than force. However, your sensitivity can also be your Achilles\' heel. You may absorb others\' emotions, struggle with setting boundaries, or avoid conflict to your own detriment. Learning to stand up for yourself while maintaining your natural kindness is your key life lesson. At your best, you are the glue that holds communities, families, and teams together.',
    traits: ['Diplomatic', 'Sensitive', 'Cooperative', 'Patient', 'Intuitive'],
    careers: ['Counselor', 'Mediator', 'Therapist', 'Human Resources', 'Musician'],
    compatibility: [4, 6, 8],
    celebrities: ['Barack Obama', 'Jennifer Aniston', 'Kanye West', 'Emma Watson', 'Tim Burton'],
    challenges: 'You may struggle with indecisiveness, people-pleasing, and absorbing the negative emotions of those around you. Learn to set healthy boundaries and trust that saying "no" can be an act of love — for yourself and others.',
    strengths: 'Exceptional emotional intelligence, ability to see all sides of a situation, patience under pressure, and a gift for creating genuine connections.',
    isMaster: false,
  },
  {
    number: 3,
    name: 'The Communicator',
    meaning: 'Life Path 3 is the path of creative expression, joy, and social connection. You are the natural entertainer, storyteller, and artist of the numerology world. Your energy is magnetic — people are drawn to your warmth, humor, and ability to make even mundane moments feel special. You see beauty and possibility everywhere, and you have a remarkable talent for putting feelings into words, images, or music. Communication in all forms comes naturally to you, whether through writing, speaking, performing, or visual art. Your optimism is infectious, and you have the rare ability to lift people\'s spirits simply by being present. However, your love of fun and social interaction can sometimes lead you to scatter your energy across too many projects or relationships. You may struggle with follow-through, using humor to deflect from deeper emotions, or taking criticism too personally. The key lesson for Life Path 3 is learning to channel your creative energy with discipline and to express your authentic self, even when it feels vulnerable.',
    traits: ['Creative', 'Expressive', 'Optimistic', 'Social', 'Charismatic'],
    careers: ['Writer', 'Actor', 'Designer', 'Public Speaker', 'Marketing Creative'],
    compatibility: [1, 5, 9],
    celebrities: ['John Travolta', 'Snoop Dogg', 'Celine Dion', 'Christina Aguilera', 'David Bowie'],
    challenges: 'Scattered focus, difficulty with follow-through, tendency to use humor as a defense mechanism, and fear of being truly vulnerable. Practice committing to one creative project at a time and finishing what you start.',
    strengths: 'Natural charm, creative vision, ability to inspire and uplift others, excellent communication skills across all mediums.',
    isMaster: false,
  },
  {
    number: 4,
    name: 'The Builder',
    meaning: 'Life Path 4 is the path of structure, discipline, and solid foundations. You are the reliable one — the person everyone turns to when they need something done right. Your approach to life is methodical and practical, and you find deep satisfaction in creating systems, processes, and structures that stand the test of time. While others may dream, you build. You understand that lasting success comes from hard work, patience, and attention to detail. There is a quiet strength in your consistency that others deeply admire, even if they don\'t always say it. You are loyal to your core, and once you commit to something — a relationship, a job, a goal — you see it through no matter what. However, your love of order can sometimes make you rigid or resistant to change. You may struggle with perfectionism, workaholic tendencies, or difficulty relaxing and having fun. The key lesson for Life Path 4 is learning that flexibility and spontaneity are not threats to stability — they are essential ingredients of a well-lived life.',
    traits: ['Disciplined', 'Reliable', 'Practical', 'Organized', 'Hardworking'],
    careers: ['Engineer', 'Accountant', 'Project Manager', 'Architect', 'Operations Director'],
    compatibility: [2, 6, 8],
    celebrities: ['Oprah Winfrey', 'Bill Gates', 'Elton John', 'Arnold Schwarzenegger', 'Usher'],
    challenges: 'Rigidity, resistance to change, perfectionism, and difficulty relaxing. Remember that control is an illusion — learn to embrace uncertainty and find joy in the unplanned moments of life.',
    strengths: 'Unshakeable reliability, excellent organizational skills, strong work ethic, ability to turn abstract ideas into concrete reality.',
    isMaster: false,
  },
  {
    number: 5,
    name: 'The Adventurer',
    meaning: 'Life Path 5 is the path of freedom, adventure, and dynamic change. You are the explorer of the numerology world — restless, curious, and always hungry for new experiences. Routine feels like a cage to you, and you thrive in environments that offer variety, excitement, and the unexpected. Your adaptability is your superpower: you can walk into any situation, anywhere in the world, and find a way to not just survive but thrive. You are a natural storyteller because you\'ve actually lived the stories you tell. People are drawn to your energy because you make life feel like an adventure worth taking. You are sensory-oriented and deeply attuned to the physical world — travel, food, music, and physical experiences bring you alive. However, your love of freedom can sometimes manifest as commitment-phobia, impulsiveness, or a tendency to run when things get difficult. The key lesson for Life Path 5 is learning that true freedom isn\'t about avoiding commitment — it\'s about choosing the commitments that align with your authentic self.',
    traits: ['Adventurous', 'Adaptable', 'Curious', 'Energetic', 'Freedom-loving'],
    careers: ['Travel Writer', 'Sales Executive', 'Consultant', 'Event Planner', 'Journalist'],
    compatibility: [1, 3, 7],
    celebrities: ['Abraham Lincoln', 'Angelina Jolie', 'Mick Jagger', 'Beyoncé', 'Steven Spielberg'],
    challenges: 'Restlessness, commitment issues, impulsive decisions, and tendency to avoid responsibility. Practice staying present and finding adventure in depth, not just breadth.',
    strengths: 'Remarkable adaptability, magnetic personality, courage to embrace change, and an infectious enthusiasm for life.',
    isMaster: false,
  },
  {
    number: 6,
    name: 'The Nurturer',
    meaning: 'Life Path 6 is the path of love, responsibility, and service to others. You are the natural caretaker — the person who makes a house feel like a home and a group feel like a family. Your sense of responsibility runs deep, and you genuinely find fulfillment in supporting, protecting, and nurturing the people you love. Home and family are central to your identity, and you have an instinct for creating beauty, comfort, and harmony in your environment. Your compassion is extraordinary, and you often put others\' needs before your own — sometimes to a fault. You have high standards for yourself and others, driven by a deep belief in how things "should" be. This idealism can be a beautiful motivating force, but it can also lead to disappointment when reality doesn\'t match your vision. You may struggle with being overly controlling, taking on too much responsibility, or neglecting your own needs while caring for everyone else. The key lesson for Life Path 6 is learning that you cannot pour from an empty cup — self-care is not selfish, it\'s essential.',
    traits: ['Nurturing', 'Responsible', 'Compassionate', 'Idealistic', 'Protective'],
    careers: ['Teacher', 'Nurse/Doctor', 'Interior Designer', 'Social Worker', 'Chef'],
    compatibility: [2, 4, 9],
    celebrities: ['John Lennon', 'Albert Einstein', 'Meryl Streep', 'Michael Jackson', 'Victoria Beckham'],
    challenges: 'Over-responsibility, perfectionism in relationships, difficulty accepting help, and tendency to become controlling when anxious. Practice letting go of the need to fix everything and everyone.',
    strengths: 'Deep capacity for love, natural ability to create harmony, strong moral compass, and a gift for making others feel safe and valued.',
    isMaster: false,
  },
  {
    number: 7,
    name: 'The Seeker',
    meaning: 'Life Path 7 is the path of the philosopher, the analyst, and the spiritual seeker. You are driven by an insatiable desire to understand the deeper meaning behind everything. While others accept the surface of life, you dive deep — questioning, researching, analyzing, and seeking truth in all its forms. Your mind is your greatest asset, capable of extraordinary insight and penetrating analysis. You are naturally drawn to science, philosophy, spirituality, or any field that allows you to explore the mysteries of existence. Solitude is not loneliness for you — it is a sacred space where you recharge and connect with your inner wisdom. You are deeply introspective and often know things intuitively before you can logically explain them. However, your love of solitude can sometimes become isolation, and your analytical nature can make it difficult to connect emotionally with others. You may come across as aloof, secretive, or overly critical. The key lesson for Life Path 7 is learning to balance the life of the mind with the life of the heart — to share your inner world with trusted people and to accept that not everything needs to be understood to be valued.',
    traits: ['Analytical', 'Introspective', 'Spiritual', 'Intellectual', 'Perceptive'],
    careers: ['Researcher', 'Scientist', 'Philosopher', 'Data Analyst', 'Psychologist'],
    compatibility: [1, 5, 9],
    celebrities: ['Princess Diana', 'Leonardo DiCaprio', 'Julia Roberts', 'Johnny Depp', 'Elon Musk'],
    challenges: 'Social isolation, overthinking, emotional unavailability, and skepticism that borders on cynicism. Practice opening your heart as much as your mind.',
    strengths: 'Extraordinary analytical ability, deep wisdom, strong intuition, and the rare courage to question everything in pursuit of truth.',
    isMaster: false,
  },
  {
    number: 8,
    name: 'The Powerhouse',
    meaning: 'Life Path 8 is the path of material mastery, authority, and karmic balance. You are here to learn the responsible use of power — financial, professional, and personal. You have a natural understanding of the material world and an instinct for turning ideas into profitable, impactful ventures. Success isn\'t just something you dream about; it\'s something you build with strategic vision and relentless execution. You understand money as a tool and a form of energy, and you know how to make it work for you. Your ambition is backed by genuine competence, which is why you often rise to positions of leadership and influence. However, the Life Path 8 comes with the lesson of karmic balance: what you put out comes back to you magnified. If you use your power ethically and generously, abundance flows easily. If you become greedy, manipulative, or ruthless, the karmic consequences are equally amplified. You may struggle with workaholism, defining your worth by your net worth, or becoming obsessed with status. The key lesson is that true power comes from integrity, generosity, and the ability to lift others as you climb.',
    traits: ['Ambitious', 'Authoritative', 'Strategic', 'Disciplined', 'Resourceful'],
    careers: ['CEO', 'Financial Advisor', 'Investor', 'Attorney', 'Real Estate Developer'],
    compatibility: [2, 4, 6],
    celebrities: ['Nelson Mandela', 'Sandra Bullock', 'Jason Statham', 'Halle Berry', 'Pablo Picasso'],
    challenges: 'Workaholism, materialism, control issues, and the tendency to measure personal worth by professional achievement. Remember that your legacy is defined by how you treat people, not how much you accumulate.',
    strengths: 'Visionary business sense, natural authority, ability to manifest goals in the material world, and remarkable resilience under pressure.',
    isMaster: false,
  },
  {
    number: 9,
    name: 'The Humanitarian',
    meaning: 'Life Path 9 is the path of compassion, wisdom, and universal love. You are an old soul with a deep understanding of the human condition. Where others see strangers, you see fellow travelers on the journey of life. Your empathy extends beyond personal relationships to encompass communities, causes, and humanity as a whole. You are drawn to creative expression, spirituality, and any endeavor that allows you to make a meaningful difference in the world. There is a generosity in your spirit that inspires others — you give freely of your time, talents, and resources, often without expecting anything in return. You have likely experienced significant challenges in your life, and these experiences have given you a depth of compassion and wisdom that few can match. However, you may struggle with letting go of the past, being overly idealistic, or becoming resentful when your generosity isn\'t reciprocated. As the highest single-digit number, 9 carries the energy of completion and release. Your key lesson is learning to let go gracefully — of relationships, chapters, and expectations — trusting that endings create space for new beginnings.',
    traits: ['Compassionate', 'Wise', 'Creative', 'Generous', 'Idealistic'],
    careers: ['Nonprofit Director', 'Artist', 'Healer', 'Diplomat', 'Environmental Activist'],
    compatibility: [3, 6, 7],
    celebrities: ['Mahatma Gandhi', 'Mother Teresa', 'Elvis Presley', 'Morgan Freeman', 'Jimi Hendrix'],
    challenges: 'Difficulty letting go, resentment when generosity isn\'t returned, idealism that leads to disappointment, and tendency to martyr yourself for causes. Practice healthy detachment and remember that you can\'t save everyone.',
    strengths: 'Extraordinary empathy, creative brilliance, natural wisdom beyond your years, and the ability to inspire transformative change in others.',
    isMaster: false,
  },
  {
    number: 11,
    name: 'The Intuitive Visionary',
    meaning: 'Life Path 11 is the first of the Master Numbers — a powerful and rare vibration that combines the sensitivity of 2 with the amplified spiritual awareness of 11. You are a natural channel for higher wisdom, and your intuition often feels like a sixth sense. You can perceive things that others miss — underlying emotions, future trends, hidden truths. This gift makes you an extraordinary leader, teacher, and healer, but it can also feel overwhelming when you haven\'t learned to manage the constant flow of information your intuition provides. You are here to inspire and illuminate, to bring spiritual truths into everyday life in ways that others can understand and apply. Your presence alone can shift the energy of a room. However, Master Number 11 carries a heavy responsibility and an intense inner life. You may experience anxiety, nervous energy, or periods of self-doubt that seem disproportionate to your external success. The pressure to live up to your potential can be paralyzing. Your key lesson is learning to trust your intuition without being consumed by it — to be a channel for wisdom while staying grounded in practical reality.',
    traits: ['Highly Intuitive', 'Visionary', 'Inspiring', 'Sensitive', 'Charismatic'],
    careers: ['Spiritual Teacher', 'Inventor', 'Life Coach', 'Film Director', 'Inspirational Speaker'],
    compatibility: [2, 4, 6],
    celebrities: ['Michelle Obama', 'Prince William', 'Orlando Bloom', 'David Beckham', 'Wolfgang Amadeus Mozart'],
    challenges: 'Anxiety, nervous energy, self-doubt despite obvious talent, and difficulty staying grounded. The intensity of your intuition can feel like a burden. Practice meditation and grounding techniques daily.',
    strengths: 'Extraordinary intuition, ability to inspire large groups, visionary thinking, and a natural capacity to channel higher wisdom into practical guidance.',
    isMaster: true,
  },
  {
    number: 22,
    name: 'The Master Builder',
    meaning: 'Life Path 22 is the most powerful of all the Master Numbers — known as the Master Builder for your ability to turn the grandest dreams into concrete reality. You combine the practical, disciplined energy of 4 with the visionary, intuitive energy of 22, creating a vibration that can literally reshape the world. You think in systems and structures, but on a massive scale. Where others see problems, you see blueprints for solutions that could benefit millions. Your ambitions aren\'t just personal — they extend to humanity. You are drawn to large-scale projects, institutions, and movements that create lasting change. You have the rare combination of vision AND execution ability, making you one of the most effective life paths when you are operating at your full potential. However, the weight of this potential can feel crushing. You may struggle with impostor syndrome, fear of failure, or the pressure of knowing you are capable of so much. There is a constant tension between the comfort of the ordinary and the calling of the extraordinary. Your key lesson is learning to embrace your enormous potential without being paralyzed by it — to take the first step, even when the vision feels impossibly large.',
    traits: ['Visionary', 'Practical', 'Disciplined', 'Ambitious', 'Systematic'],
    careers: ['Architect', 'Politician', 'International NGO Leader', 'Urban Planner', 'Technology Pioneer'],
    compatibility: [4, 6, 8],
    celebrities: ['Paul McCartney', 'Will Smith', 'Demi Moore', 'Richard Branson', 'Mark Zuckerberg'],
    challenges: 'Overwhelming pressure from enormous potential, fear of failure, impostor syndrome, and tendency to overwork. Remember that Rome wasn\'t built in a day — give yourself permission to build your vision one brick at a time.',
    strengths: 'Unparalleled ability to manifest large-scale visions, practical genius, natural leadership, and the rare talent for turning dreams into institutions.',
    isMaster: true,
  },
  {
    number: 33,
    name: 'The Master Teacher',
    meaning: 'Life Path 33 is the rarest and most spiritually evolved of all the Master Numbers — known as the Master Teacher. This vibration combines the nurturing energy of 6 with the doubled power of 3, creating a life path devoted to uplifting humanity through love, compassion, and selfless service. You are here to teach by example, showing others what is possible when you lead with unconditional love. Your empathy is extraordinary — you feel the joys and sorrows of others as if they were your own. This makes you a natural healer, counselor, and guide. People are drawn to your warmth and wisdom, often seeking you out for comfort and guidance during their darkest moments. You have the ability to see the divine spark in every person, even when they cannot see it themselves. However, the 33 path demands enormous personal sacrifice and emotional strength. You may take on the suffering of others, neglect your own needs, or set impossibly high standards for yourself. There is a constant pull between serving others and maintaining your own wellbeing. Your key lesson is perhaps the most profound of all life paths: learning that the greatest act of service is being fully, authentically, joyfully yourself.',
    traits: ['Compassionate', 'Selfless', 'Wise', 'Healing', 'Inspirational'],
    careers: ['Humanitarian Leader', 'Spiritual Healer', 'Therapist', 'Educator', 'Philanthropist'],
    compatibility: [6, 9, 11],
    celebrities: ['Albert Einstein', 'Stephen King', 'Thomas Edison', 'Francis Ford Coppola', 'Meryl Streep'],
    challenges: 'Taking on others\' suffering, extreme self-sacrifice, setting impossibly high personal standards, and burnout from giving too much. You must learn that self-care is not selfish — it\'s the foundation of sustainable service.',
    strengths: 'The deepest compassion of any life path, ability to heal through presence alone, wisdom that transcends personal experience, and the rare gift of unconditional love.',
    isMaster: true,
  },
];

export function calculateLifePath(year: number, month: number, day: number): number {
  // Reduce each component separately, then add and reduce again
  // This is the standard Pythagorean method that preserves Master Numbers

  function reduceToDigit(n: number): number {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return n;
  }

  const monthReduced = reduceToDigit(month);
  const dayReduced = reduceToDigit(day);
  const yearReduced = reduceToDigit(
    String(year).split('').reduce((sum, d) => sum + parseInt(d), 0)
  );

  const total = monthReduced + dayReduced + yearReduced;
  return reduceToDigit(total);
}

export function getLifePathNumber(num: number): LifePathNumber | undefined {
  return lifePathNumbers.find(lp => lp.number === num);
}

export function getAllLifePathNumbers(): LifePathNumber[] {
  return lifePathNumbers;
}
