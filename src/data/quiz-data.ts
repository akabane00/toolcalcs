// =============================================================================
// Personality Quiz Data — 6 Comprehensive Personality Tests
// =============================================================================

// =============================================================================
// SHARED INTERFACES
// =============================================================================

/** MBTI forced-choice question */
export interface MBTIQuestion {
  id: number;
  dichotomy: 'EI' | 'SN' | 'TF' | 'JP';
  text: string;
  optionA: { label: string; value: string };
  optionB: { label: string; value: string };
}

/** MBTI result type */
export interface MBTIResult {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famousPeople: string[];
  compatibleTypes: string[];
}

/** Love Language forced-choice question */
export interface LoveLanguageQuestion {
  id: number;
  scenario: string;
  optionA: { label: string; language: 'words' | 'time' | 'gifts' | 'service' | 'touch' };
  optionB: { label: string; language: 'words' | 'time' | 'gifts' | 'service' | 'touch' };
}

/** Love Language result */
export interface LoveLanguageResult {
  language: 'words' | 'time' | 'gifts' | 'service' | 'touch';
  name: string;
  description: string;
  examples: string[];
  tips: string[];
}

/** Enneagram Likert-scale question */
export interface EnneagramQuestion {
  id: number;
  type: number; // 1-9
  text: string;
}

/** Enneagram result type */
export interface EnneagramResult {
  number: number;
  name: string;
  description: string;
  desire: string;
  fear: string;
  growth: number;
  stress: number;
  wings: [number, number];
}

/** Big Five Likert-scale question */
export interface BigFiveQuestion {
  id: number;
  dimension: 'O' | 'C' | 'E' | 'A' | 'N';
  text: string;
  reversed: boolean;
}

/** Big Five dimension result */
export interface BigFiveDimension {
  name: string;
  shortName: 'O' | 'C' | 'E' | 'A' | 'N';
  description: string;
  highDescription: string;
  lowDescription: string;
}

/** Attachment Style question with 4 options */
export interface AttachmentQuestion {
  id: number;
  scenario: string;
  options: {
    label: string;
    style: 'secure' | 'anxious' | 'dismissive' | 'fearful';
  }[];
}

/** Attachment Style result */
export interface AttachmentResult {
  style: 'secure' | 'anxious' | 'dismissive' | 'fearful';
  name: string;
  description: string;
  traits: string[];
  tips: string[];
  percentage: number;
}

/** EQ scenario question scored 1-4 */
export interface EQQuestion {
  id: number;
  domain: 'self-awareness' | 'self-management' | 'social-awareness' | 'relationship-management';
  scenario: string;
  options: { label: string; score: number }[];
}

/** EQ domain description */
export interface EQDomain {
  domain: 'self-awareness' | 'self-management' | 'social-awareness' | 'relationship-management';
  name: string;
  description: string;
  highLabel: string;
  lowLabel: string;
}


// =============================================================================
// 1. MBTI / 16 PERSONALITIES TEST
// =============================================================================

export const mbtiQuestions: MBTIQuestion[] = [
  // --- E/I Dichotomy (10 questions) ---
  { id: 1, dichotomy: 'EI', text: 'At a party with mostly strangers, you typically:', optionA: { label: 'Mingle with many people, including newcomers', value: 'E' }, optionB: { label: 'Stick with the few people you already know', value: 'I' } },
  { id: 2, dichotomy: 'EI', text: 'After a long and demanding week, you recharge by:', optionA: { label: 'Going out with friends to a lively venue', value: 'E' }, optionB: { label: 'Spending a quiet evening alone or with one close person', value: 'I' } },
  { id: 3, dichotomy: 'EI', text: 'When working on an important project, you prefer to:', optionA: { label: 'Brainstorm out loud with a group of colleagues', value: 'E' }, optionB: { label: 'Think it through on your own before sharing ideas', value: 'I' } },
  { id: 4, dichotomy: 'EI', text: 'In meetings, you tend to:', optionA: { label: 'Speak up early and think as you talk', value: 'E' }, optionB: { label: 'Listen carefully first and contribute after reflecting', value: 'I' } },
  { id: 5, dichotomy: 'EI', text: 'Your ideal vacation looks more like:', optionA: { label: 'A group tour packed with social activities', value: 'E' }, optionB: { label: 'A secluded retreat with plenty of solitude', value: 'I' } },
  { id: 6, dichotomy: 'EI', text: 'When you have exciting news, your first instinct is to:', optionA: { label: 'Call or text several people right away', value: 'E' }, optionB: { label: 'Savor it internally before deciding who to tell', value: 'I' } },
  { id: 7, dichotomy: 'EI', text: 'You find your energy level rises when you:', optionA: { label: 'Engage in animated conversation with a group', value: 'E' }, optionB: { label: 'Read, reflect, or pursue a solo hobby', value: 'I' } },
  { id: 8, dichotomy: 'EI', text: 'If you moved to a new city, you would most likely:', optionA: { label: 'Join clubs and attend events to meet people quickly', value: 'E' }, optionB: { label: 'Gradually build a small circle of close friends over time', value: 'I' } },
  { id: 9, dichotomy: 'EI', text: 'When learning something new, you prefer:', optionA: { label: 'Interactive workshops with group discussion', value: 'E' }, optionB: { label: 'Self-paced study with books or online resources', value: 'I' } },
  { id: 10, dichotomy: 'EI', text: 'People who know you well would describe you as:', optionA: { label: 'Outgoing, talkative, and easy to approach', value: 'E' }, optionB: { label: 'Reserved, thoughtful, and selectively social', value: 'I' } },

  // --- S/N Dichotomy (10 questions) ---
  { id: 11, dichotomy: 'SN', text: 'When reading a news article, you focus more on:', optionA: { label: 'The specific facts, data, and concrete details', value: 'S' }, optionB: { label: 'The broader implications and underlying patterns', value: 'N' } },
  { id: 12, dichotomy: 'SN', text: 'If someone asks you to describe a memorable trip, you:', optionA: { label: 'Recall vivid sensory details like sights and tastes', value: 'S' }, optionB: { label: 'Describe the overall feeling and what it meant to you', value: 'N' } },
  { id: 13, dichotomy: 'SN', text: 'When assembling furniture, you prefer to:', optionA: { label: 'Follow the step-by-step instructions exactly', value: 'S' }, optionB: { label: 'Glance at the picture and figure it out intuitively', value: 'N' } },
  { id: 14, dichotomy: 'SN', text: 'In a conversation, you are drawn more to:', optionA: { label: 'Practical, real-world topics and experiences', value: 'S' }, optionB: { label: 'Theoretical concepts and imaginative possibilities', value: 'N' } },
  { id: 15, dichotomy: 'SN', text: 'You are more comfortable working with:', optionA: { label: 'Established methods that have a proven track record', value: 'S' }, optionB: { label: 'Novel approaches that have never been tried before', value: 'N' } },
  { id: 16, dichotomy: 'SN', text: 'When planning a meal, you tend to:', optionA: { label: 'Use a tested recipe and measure ingredients carefully', value: 'S' }, optionB: { label: 'Improvise based on what inspires you in the moment', value: 'N' } },
  { id: 17, dichotomy: 'SN', text: 'You would rather be known as someone who is:', optionA: { label: 'Observant and realistic', value: 'S' }, optionB: { label: 'Imaginative and visionary', value: 'N' } },
  { id: 18, dichotomy: 'SN', text: 'When solving a problem, your first move is to:', optionA: { label: 'Gather all available facts and data', value: 'S' }, optionB: { label: 'Look for patterns and connections between ideas', value: 'N' } },
  { id: 19, dichotomy: 'SN', text: 'In your daily life, you pay more attention to:', optionA: { label: 'What is happening right now in front of you', value: 'S' }, optionB: { label: 'What could happen in the future and the possibilities ahead', value: 'N' } },
  { id: 20, dichotomy: 'SN', text: 'You find more satisfaction in:', optionA: { label: 'Perfecting a well-understood skill through practice', value: 'S' }, optionB: { label: 'Exploring a brand-new subject you know nothing about', value: 'N' } },

  // --- T/F Dichotomy (10 questions) ---
  { id: 21, dichotomy: 'TF', text: 'When a friend asks for advice on a tough decision, you:', optionA: { label: 'Help them list pros and cons objectively', value: 'T' }, optionB: { label: 'Focus on how each option would make them feel', value: 'F' } },
  { id: 22, dichotomy: 'TF', text: 'In a heated debate, you are more concerned with:', optionA: { label: 'Being logically correct and consistent', value: 'T' }, optionB: { label: 'Maintaining harmony and not hurting feelings', value: 'F' } },
  { id: 23, dichotomy: 'TF', text: 'When evaluating a job candidate, you weigh more heavily:', optionA: { label: 'Their skills, qualifications, and measurable results', value: 'T' }, optionB: { label: 'Their character, team fit, and interpersonal warmth', value: 'F' } },
  { id: 24, dichotomy: 'TF', text: 'Which compliment would mean more to you?', optionA: { label: '"You always think so clearly and logically"', value: 'T' }, optionB: { label: '"You are so caring and understanding with people"', value: 'F' } },
  { id: 25, dichotomy: 'TF', text: 'When you see someone struggling, your first response is to:', optionA: { label: 'Offer a practical solution to fix the problem', value: 'T' }, optionB: { label: 'Offer emotional support and a listening ear', value: 'F' } },
  { id: 26, dichotomy: 'TF', text: 'You believe decisions should primarily be based on:', optionA: { label: 'Objective analysis and logical reasoning', value: 'T' }, optionB: { label: 'Personal values and the impact on people involved', value: 'F' } },
  { id: 27, dichotomy: 'TF', text: 'When giving critical feedback, you tend to:', optionA: { label: 'Be direct and straightforward, even if it stings', value: 'T' }, optionB: { label: 'Soften the message and emphasize the positives first', value: 'F' } },
  { id: 28, dichotomy: 'TF', text: 'In a group project, you naturally gravitate toward:', optionA: { label: 'Analyzing the strategy and optimizing the plan', value: 'T' }, optionB: { label: 'Making sure everyone feels included and motivated', value: 'F' } },
  { id: 29, dichotomy: 'TF', text: 'When watching a movie, you are more drawn to stories that:', optionA: { label: 'Feature clever plot twists and intellectual challenges', value: 'T' }, optionB: { label: 'Explore deep emotional journeys and human relationships', value: 'F' } },
  { id: 30, dichotomy: 'TF', text: 'If two friends are in conflict, you would rather:', optionA: { label: 'Help them identify the root cause and a fair resolution', value: 'T' }, optionB: { label: 'Mediate with empathy and help them reconnect emotionally', value: 'F' } },

  // --- J/P Dichotomy (10 questions) ---
  { id: 31, dichotomy: 'JP', text: 'When you have a free weekend coming up, you prefer to:', optionA: { label: 'Plan activities and outings in advance', value: 'J' }, optionB: { label: 'Keep it open and decide in the moment', value: 'P' } },
  { id: 32, dichotomy: 'JP', text: 'Your workspace tends to be:', optionA: { label: 'Neat, organized, and everything in its place', value: 'J' }, optionB: { label: 'A bit messy, but you know where things are', value: 'P' } },
  { id: 33, dichotomy: 'JP', text: 'When a deadline is approaching, you typically:', optionA: { label: 'Have the work finished well ahead of time', value: 'J' }, optionB: { label: 'Do your best work in a last-minute burst of energy', value: 'P' } },
  { id: 34, dichotomy: 'JP', text: 'You feel more comfortable when:', optionA: { label: 'A clear plan is in place and decisions are settled', value: 'J' }, optionB: { label: 'Options are still open and things can change', value: 'P' } },
  { id: 35, dichotomy: 'JP', text: 'When packing for a trip, you:', optionA: { label: 'Make a checklist and pack days ahead', value: 'J' }, optionB: { label: 'Throw things together the night before or morning of', value: 'P' } },
  { id: 36, dichotomy: 'JP', text: 'At a restaurant, you tend to:', optionA: { label: 'Decide quickly and feel satisfied with your choice', value: 'J' }, optionB: { label: 'Browse the entire menu and maybe change your mind', value: 'P' } },
  { id: 37, dichotomy: 'JP', text: 'When starting a new project, you prefer to:', optionA: { label: 'Create a detailed outline or plan before beginning', value: 'J' }, optionB: { label: 'Dive in and let the project evolve organically', value: 'P' } },
  { id: 38, dichotomy: 'JP', text: 'How do you feel about routines?', optionA: { label: 'Routines give me stability and help me stay productive', value: 'J' }, optionB: { label: 'Routines feel stifling; I prefer variety and spontaneity', value: 'P' } },
  { id: 39, dichotomy: 'JP', text: 'When making a major purchase, you:', optionA: { label: 'Research thoroughly, compare options, then commit', value: 'J' }, optionB: { label: 'Go with your gut when something feels right', value: 'P' } },
  { id: 40, dichotomy: 'JP', text: 'Your daily to-do list is:', optionA: { label: 'Detailed, prioritized, and something you rely on', value: 'J' }, optionB: { label: 'Loose or nonexistent; you prefer going with the flow', value: 'P' } },
];

export const mbtiResults: MBTIResult[] = [
  {
    code: 'INTJ',
    name: 'The Architect',
    description: 'INTJs are strategic masterminds who see the world as a giant chess board. They possess a rare combination of imagination and reliability, using their intellect to devise innovative solutions to complex problems. Highly independent and confident in their vision, INTJs set long-term goals and pursue them with relentless determination. They value competence and knowledge above all else, constantly seeking to improve systems and processes. While they may seem reserved or even aloof to those who do not know them well, INTJs have a rich inner world and form deep connections with those who share their intellectual curiosity. They trust logic and reason over emotion, which makes them exceptional planners and strategists but sometimes challenges their interpersonal relationships.',
    strengths: ['Strategic and long-range thinking', 'Highly independent and self-motivated', 'Insightful understanding of complex systems', 'Determined and decisive under pressure', 'High standards for themselves and others'],
    weaknesses: ['Can appear arrogant or dismissive of emotions', 'Overly critical of inefficiency in others', 'Struggle with expressing feelings openly', 'May be inflexible when they believe they are right', 'Impatient with people who do not meet their standards'],
    careers: ['Strategic Consultant', 'Software Architect', 'Scientific Researcher', 'Investment Analyst', 'University Professor', 'Systems Engineer'],
    famousPeople: ['Elon Musk', 'Isaac Newton', 'Michelle Obama', 'Friedrich Nietzsche'],
    compatibleTypes: ['ENFP', 'ENTP', 'INFJ', 'ENTJ'],
  },
  {
    code: 'INTP',
    name: 'The Logician',
    description: 'INTPs are philosophical inventors who are fascinated by logical analysis, systems, and design. They live inside their heads, constantly generating new theories and ideas about how the world works. Quietly brilliant and intellectually curious, INTPs are among the most creative of all personality types when it comes to abstract problem-solving. They value precision in thought and language, and they can spend hours dissecting a single concept to understand it from every angle. Social conventions and small talk feel draining to them; they would much rather engage in a deep conversation about quantum physics or the nature of consciousness. Their greatest strength is their ability to think outside the box, but they sometimes struggle to bring their ideas into practical reality.',
    strengths: ['Exceptional analytical and abstract thinking', 'Creative problem-solver with original ideas', 'Open-minded and intellectually honest', 'Objective and fair in evaluating arguments', 'Adaptable when presented with new information'],
    weaknesses: ['Can be absent-minded about practical details', 'Tendency to overthink and delay action', 'Difficulty with emotional expression and empathy', 'May seem condescending when explaining ideas', 'Struggle to finish projects once the intellectual challenge fades'],
    careers: ['Software Developer', 'Mathematician', 'Philosopher', 'Data Scientist', 'Forensic Analyst', 'Technical Writer'],
    famousPeople: ['Albert Einstein', 'Bill Gates', 'Marie Curie', 'Charles Darwin'],
    compatibleTypes: ['ENTJ', 'ENFJ', 'INFJ', 'ESTJ'],
  },
  {
    code: 'ENTJ',
    name: 'The Commander',
    description: 'ENTJs are bold, imaginative, and strong-willed leaders who always find a way or make one. They are natural-born leaders who project authority and confidence, rallying others around a shared vision. ENTJs thrive on challenge and are energized by turning ambitious ideas into concrete realities. They are strategic thinkers who can see inefficiencies in systems and quickly devise plans to improve them. Their communication style is direct and decisive, which inspires trust but can sometimes come across as domineering. ENTJs value competence and efficiency highly, and they expect the same level of dedication from those around them. In their personal lives, they bring the same energy and determination, often taking charge of planning and long-term goals for their families.',
    strengths: ['Natural leadership and strategic vision', 'Highly efficient and organized', 'Confident and decisive in high-pressure situations', 'Excellent at long-term planning', 'Energetic and driven to achieve ambitious goals'],
    weaknesses: ['Can be overly dominant and controlling', 'Impatient with emotional or sentimental reasoning', 'May steamroll others\' opinions', 'Struggle to relax and be present in the moment', 'Can be insensitive when focused on results'],
    careers: ['Chief Executive Officer', 'Management Consultant', 'Entrepreneur', 'Attorney', 'Political Strategist', 'University Administrator'],
    famousPeople: ['Steve Jobs', 'Margaret Thatcher', 'Napoleon Bonaparte', 'Gordon Ramsay'],
    compatibleTypes: ['INTP', 'INFP', 'ENFP', 'INTJ'],
  },
  {
    code: 'ENTP',
    name: 'The Debater',
    description: 'ENTPs are smart, curious thinkers who cannot resist an intellectual challenge. They are the ultimate devil\'s advocates, thriving on the process of shredding arguments and beliefs and letting the ribbons drift in the wind for everyone to see. ENTPs are energized by spirited conversation and brainstorming, approaching each new idea with enthusiasm and a fearless willingness to question assumptions. They are quick-witted and resourceful, often juggling multiple projects and interests simultaneously. ENTPs are natural entrepreneurs and innovators, seeing possibilities where others see obstacles. Their charm and confidence make them compelling communicators, though their love of debate can sometimes exhaust those around them. They value freedom and intellectual stimulation above routine and predictability.',
    strengths: ['Quick-witted and intellectually agile', 'Excellent brainstormer who generates many ideas', 'Charismatic and persuasive communicator', 'Fearless in challenging the status quo', 'Adaptable and resourceful in new situations'],
    weaknesses: ['Can be argumentative for sport', 'Difficulty following through on projects', 'May neglect practical and routine responsibilities', 'Can be insensitive to others\' feelings during debates', 'Easily bored by repetitive tasks'],
    careers: ['Entrepreneur', 'Marketing Director', 'Political Analyst', 'Venture Capitalist', 'Stand-Up Comedian', 'Trial Lawyer'],
    famousPeople: ['Thomas Edison', 'Mark Twain', 'Celine Dion', 'Benjamin Franklin'],
    compatibleTypes: ['INTJ', 'INFJ', 'ENFJ', 'ISTJ'],
  },
  {
    code: 'INFJ',
    name: 'The Advocate',
    description: 'INFJs are quiet visionaries who possess an uncanny ability to understand people and situations at a deep level. Often described as the rarest personality type, INFJs combine a rich inner life with a genuine concern for others. They are idealists who strive to make the world a better place, guided by strong personal values and a sense of moral purpose. INFJs have an almost mystical ability to read between the lines, sensing emotions and motivations that others miss entirely. They are deeply creative and often express themselves through writing, art, or counseling. While they appear calm and composed on the surface, INFJs feel things intensely and can become overwhelmed when they take on too much of others\' emotional burdens. They seek deep, meaningful connections rather than superficial interactions.',
    strengths: ['Profound empathy and understanding of others', 'Strong personal integrity and moral compass', 'Creative and insightful thinker', 'Dedicated to helping others grow and thrive', 'Articulate in expressing complex ideas'],
    weaknesses: ['Prone to burnout from absorbing others\' emotions', 'Can be overly idealistic and perfectionistic', 'Difficulty setting boundaries with people in need', 'May become withdrawn when overwhelmed', 'Sensitive to criticism, even when it is constructive'],
    careers: ['Counselor or Psychologist', 'Nonprofit Director', 'Author or Poet', 'Human Resources Manager', 'Social Worker', 'Religious Leader'],
    famousPeople: ['Martin Luther King Jr.', 'Mother Teresa', 'Nelson Mandela', 'Lady Gaga'],
    compatibleTypes: ['ENTP', 'ENFP', 'INTJ', 'INFP'],
  },
  {
    code: 'INFP',
    name: 'The Mediator',
    description: 'INFPs are gentle, caring souls who are driven by deep personal values and a desire to find meaning in everything they do. They navigate the world through the lens of their feelings and ideals, constantly searching for the deeper purpose behind events and relationships. INFPs have a rich imagination and a talent for creative expression, whether through writing, music, art, or simply the way they live their lives. They are deeply empathetic and can sense the emotional undercurrents in a room before anyone speaks a word. While they are quiet and reserved on the outside, their inner emotional landscape is vivid and intense. INFPs are at their best when they can align their work and relationships with their core values, and they struggle when forced into roles that feel inauthentic.',
    strengths: ['Deep empathy and compassion for all living things', 'Highly creative and imaginative', 'Open-minded and nonjudgmental', 'Passionate about causes they believe in', 'Loyal and devoted in close relationships'],
    weaknesses: ['Overly idealistic and easily disappointed by reality', 'Tendency to take things too personally', 'Can be impractical and avoid mundane tasks', 'Difficulty making decisions when values conflict', 'May isolate themselves when feeling misunderstood'],
    careers: ['Writer or Journalist', 'Graphic Designer', 'Art Therapist', 'Librarian', 'Environmental Scientist', 'Musician'],
    famousPeople: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana', 'Kurt Cobain'],
    compatibleTypes: ['ENFJ', 'ENTJ', 'INFJ', 'ISFJ'],
  },
  {
    code: 'ENFJ',
    name: 'The Protagonist',
    description: 'ENFJs are charismatic leaders who inspire others through their warmth, vision, and genuine care for people. They possess a rare ability to see the potential in everyone they meet and dedicate themselves to helping others realize that potential. ENFJs are natural teachers, mentors, and organizers who thrive when they are making a positive impact on their community. Their strong intuition allows them to read social dynamics effortlessly, making them skilled diplomats and mediators. ENFJs take their responsibilities seriously and often go above and beyond for the people they care about. They are expressive, articulate, and persuasive, able to rally groups toward a common goal with apparent ease. However, their deep investment in others can lead to overcommitment and neglect of their own needs.',
    strengths: ['Inspiring and charismatic leader', 'Deeply empathetic and emotionally perceptive', 'Excellent communicator and motivator', 'Strong organizational and planning skills', 'Genuinely invested in others\' well-being'],
    weaknesses: ['Can be overly self-sacrificing and neglect own needs', 'May become manipulative when stressed', 'Tendency to take on too many responsibilities', 'Overly sensitive to conflict and criticism', 'Can idealize people and be disappointed when they fall short'],
    careers: ['Teacher or Professor', 'Corporate Trainer', 'Diplomat or Ambassador', 'Public Relations Director', 'Life Coach', 'Healthcare Administrator'],
    famousPeople: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.', 'Jennifer Lawrence'],
    compatibleTypes: ['INFP', 'INTP', 'ISFP', 'ENFP'],
  },
  {
    code: 'ENFP',
    name: 'The Campaigner',
    description: 'ENFPs are enthusiastic, creative, and sociable free spirits who always manage to find a reason to smile. They have a contagious energy that lights up every room they enter and a genuine curiosity about the people and world around them. ENFPs see life as a rich tapestry of possibilities and are constantly exploring new ideas, relationships, and experiences. They are deeply emotional and empathetic, connecting with others on a heartfelt level that goes beyond surface pleasantries. ENFPs are independent thinkers who resist being boxed in by rules and conventions, preferring instead to forge their own path. Their creativity and people skills make them natural communicators and storytellers. While their enthusiasm is inspiring, they can sometimes spread themselves too thin, chasing too many interests at once.',
    strengths: ['Enthusiastic and inspiring to be around', 'Highly creative and original thinker', 'Excellent people skills and emotional intelligence', 'Flexible and adaptable to new situations', 'Warm, caring, and genuinely interested in others'],
    weaknesses: ['Can be disorganized and unfocused', 'Tendency to overcommit and spread too thin', 'Difficulty with routine and follow-through', 'May be overly emotional under stress', 'Struggles with practical details and planning'],
    careers: ['Journalist or Reporter', 'Creative Director', 'Event Planner', 'Startup Founder', 'Actor or Performer', 'Public Speaker'],
    famousPeople: ['Robin Williams', 'Robert Downey Jr.', 'Walt Disney', 'Ellen DeGeneres'],
    compatibleTypes: ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
  },
  {
    code: 'ISTJ',
    name: 'The Logistician',
    description: 'ISTJs are dependable, thorough, and responsible individuals who form the backbone of many organizations and families. They have a deep respect for tradition, rules, and established procedures, and they take their commitments extremely seriously. ISTJs work methodically and patiently, ensuring that every detail is accounted for and every task is completed to the highest standard. They are practical and realistic, preferring to deal with concrete facts rather than abstract theories. ISTJs may not be the most expressive people, but their loyalty and reliability speak volumes. They value honesty, integrity, and hard work, and they expect the same from others. In times of crisis, ISTJs are the steady hand that keeps everything running smoothly, drawing on their extensive knowledge of how things have been done in the past.',
    strengths: ['Extremely reliable and responsible', 'Detail-oriented and thorough in all tasks', 'Strong sense of duty and commitment', 'Practical and grounded in reality', 'Patient and persistent in pursuing goals'],
    weaknesses: ['Can be inflexible and resistant to change', 'May come across as cold or detached', 'Tendency to be judgmental of unconventional approaches', 'Difficulty expressing emotions openly', 'Can be stubborn when they believe they are right'],
    careers: ['Accountant or Auditor', 'Military Officer', 'Civil Engineer', 'Logistics Manager', 'Judge or Magistrate', 'Database Administrator'],
    famousPeople: ['George Washington', 'Queen Elizabeth II', 'Warren Buffett', 'Angela Merkel'],
    compatibleTypes: ['ESFP', 'ESTP', 'ISFJ', 'ENTP'],
  },
  {
    code: 'ISFJ',
    name: 'The Defender',
    description: 'ISFJs are warm, considerate, and devoted individuals who quietly go about making the world a better place one person at a time. They are the unsung heroes of every community, dedicating their energy to caring for the needs of others without seeking recognition or praise. ISFJs have an exceptional memory for details, especially those related to the people they care about, remembering birthdays, preferences, and personal stories with remarkable accuracy. They are traditional and value stability, creating warm, harmonious environments wherever they go. ISFJs take their responsibilities very seriously and can always be counted on to follow through. While they may appear reserved, they feel deeply and are sensitive to the moods and needs of those around them.',
    strengths: ['Exceptionally loyal and supportive', 'Observant and attentive to details about people', 'Patient, reliable, and hardworking', 'Skilled at creating warmth and harmony', 'Generous with time and energy for loved ones'],
    weaknesses: ['Tendency to neglect their own needs', 'Difficulty saying no or setting boundaries', 'Can be overly resistant to change', 'May repress negative emotions until they explode', 'Too humble and reluctant to take credit for their work'],
    careers: ['Nurse or Healthcare Worker', 'Elementary School Teacher', 'Social Worker', 'Interior Designer', 'Administrative Assistant', 'Veterinarian'],
    famousPeople: ['Queen Elizabeth II', 'Mother Teresa', 'Beyonce', 'Kate Middleton'],
    compatibleTypes: ['ESFP', 'ESTP', 'ISTJ', 'INFP'],
  },
  {
    code: 'ESTJ',
    name: 'The Executive',
    description: 'ESTJs are strong-willed, organized leaders who believe in order, tradition, and getting things done the right way. They are the community pillars who thrive on responsibility and take charge in situations that need structure and direction. ESTJs have a clear sense of right and wrong, and they are not afraid to voice their opinions or make tough decisions. They are practical, realistic, and results-oriented, with a natural talent for managing people, resources, and projects. ESTJs value honesty, dedication, and hard work, and they lead by example, always willing to put in the effort they expect from others. Their organizational skills are second to none, and they excel at creating efficient systems and processes. While their directness can sometimes be perceived as blunt, it comes from a genuine desire to help and improve.',
    strengths: ['Excellent organizer and planner', 'Dedicated and strong sense of responsibility', 'Direct and honest communicator', 'Good at creating order out of chaos', 'Loyal and committed to their community'],
    weaknesses: ['Can be inflexible and too rigid about rules', 'Difficulty accepting alternative viewpoints', 'May be too focused on social status and appearances', 'Can be overly controlling or bossy', 'Uncomfortable with emotional vulnerability'],
    careers: ['Business Manager', 'School Principal', 'Financial Advisor', 'Project Manager', 'Police Officer', 'Real Estate Agent'],
    famousPeople: ['Sonia Sotomayor', 'Judge Judy', 'Henry Ford', 'Lyndon B. Johnson'],
    compatibleTypes: ['ISFP', 'ISTP', 'INTP', 'ESFJ'],
  },
  {
    code: 'ESFJ',
    name: 'The Consul',
    description: 'ESFJs are caring, sociable, and community-minded individuals who thrive on creating harmony and making others feel welcome. They are often the social glue that holds groups together, remembering names, organizing gatherings, and ensuring that everyone feels included. ESFJs are deeply attuned to the emotional needs of those around them and go out of their way to provide practical support and comfort. They value tradition, loyalty, and social responsibility, and they take their roles within their families and communities very seriously. ESFJs are at their best when they are helping others, and they derive genuine satisfaction from making a tangible difference in people\'s lives. Their warmth and generosity make them beloved by many, though they can sometimes be too concerned with others\' opinions.',
    strengths: ['Warm, generous, and genuinely caring', 'Highly attuned to the needs and feelings of others', 'Excellent at building and maintaining social networks', 'Responsible, loyal, and dependable', 'Skilled at creating welcoming, harmonious environments'],
    weaknesses: ['Can be overly concerned with social approval', 'Difficulty handling criticism, even when constructive', 'May be inflexible about traditions and expectations', 'Tendency to be controlling in the name of helping', 'Can neglect their own emotional needs for others'],
    careers: ['Event Coordinator', 'Elementary Teacher', 'Registered Nurse', 'Public Relations Specialist', 'Hotel Manager', 'Dental Hygienist'],
    famousPeople: ['Taylor Swift', 'Bill Clinton', 'Jennifer Garner', 'Ed Sheeran'],
    compatibleTypes: ['ISFP', 'ISTP', 'ESTJ', 'INFP'],
  },
  {
    code: 'ISTP',
    name: 'The Virtuoso',
    description: 'ISTPs are practical, observant, and analytical individuals who love to understand how things work. They approach the world with a cool, detached curiosity, taking things apart both literally and figuratively to see what makes them tick. ISTPs are hands-on problem-solvers who thrive in situations that require quick thinking and physical dexterity. They are fiercely independent and value their freedom above almost everything else, resisting attempts to control or schedule their lives. ISTPs live in the present moment, responding to challenges with a calm, rational composure that others find reassuring. They are people of few words, preferring to communicate through action rather than lengthy discussion. Their ability to stay calm in a crisis makes them natural first responders and troubleshooters.',
    strengths: ['Highly practical and hands-on problem-solver', 'Cool under pressure in crisis situations', 'Observant and detail-oriented', 'Flexible and adaptable to changing circumstances', 'Independent and self-reliant'],
    weaknesses: ['Can be emotionally detached and hard to read', 'Difficulty with long-term planning and commitment', 'May be insensitive to others\' emotional states', 'Tendency toward risk-taking and thrill-seeking', 'Resistant to rules, schedules, and authority'],
    careers: ['Mechanic or Engineer', 'Forensic Scientist', 'Pilot', 'Emergency Medical Technician', 'Carpenter or Craftsman', 'Software Troubleshooter'],
    famousPeople: ['Clint Eastwood', 'Bruce Lee', 'Amelia Earhart', 'Michael Jordan'],
    compatibleTypes: ['ESTJ', 'ESFJ', 'ISFJ', 'ENTJ'],
  },
  {
    code: 'ISFP',
    name: 'The Adventurer',
    description: 'ISFPs are gentle, sensitive, and artistic souls who live fully in the present moment, experiencing life through their senses with a depth and richness that others often envy. They are quietly passionate individuals who express themselves through action and creative endeavors rather than words. ISFPs have a strong aesthetic sense and are drawn to beauty in all its forms, whether in nature, art, music, or human connection. They are deeply caring and empathetic, but they show their love through quiet acts of kindness rather than grand declarations. ISFPs value their freedom and autonomy intensely, and they resist being categorized or constrained by expectations. They are spontaneous, curious, and open to new experiences, approaching each day as an opportunity to discover something new about themselves and the world.',
    strengths: ['Deeply in tune with aesthetics and sensory experience', 'Warm, empathetic, and genuinely kind', 'Flexible and open to new experiences', 'Strong personal values and authenticity', 'Talented in artistic and creative expression'],
    weaknesses: ['Can be overly sensitive to criticism', 'Difficulty planning ahead and setting long-term goals', 'May avoid conflict to the point of being passive', 'Tendency to undervalue their own contributions', 'Can be unpredictable and hard to pin down'],
    careers: ['Graphic Designer', 'Musician or Composer', 'Veterinary Technician', 'Fashion Designer', 'Chef', 'Physical Therapist'],
    famousPeople: ['Bob Dylan', 'Frida Kahlo', 'Lana Del Rey', 'David Bowie'],
    compatibleTypes: ['ENFJ', 'ESFJ', 'ESTJ', 'ENTJ'],
  },
  {
    code: 'ESTP',
    name: 'The Entrepreneur',
    description: 'ESTPs are energetic, action-oriented thrill-seekers who live life at full speed. They are the ultimate doers, preferring to learn by diving headfirst into new experiences rather than reading about them. ESTPs have a magnetic, larger-than-life presence that draws people in, and they are skilled at reading social situations and adapting on the fly. They are practical and pragmatic, focusing on what works right now rather than theoretical possibilities. ESTPs are natural negotiators and salespeople who can think on their feet and turn any situation to their advantage. They thrive on excitement and variety, quickly becoming restless when things are too predictable. Their directness and confidence make them effective leaders in fast-paced environments, though their impatience with slower-moving people can sometimes cause friction.',
    strengths: ['Bold, energetic, and action-oriented', 'Excellent at reading people and social dynamics', 'Practical and focused on immediate results', 'Adaptable and quick-thinking under pressure', 'Charismatic and naturally persuasive'],
    weaknesses: ['Can be impulsive and reckless', 'Difficulty with long-term planning and patience', 'May be insensitive to others\' deeper feelings', 'Tendency to ignore rules and consequences', 'Easily bored by routine and theoretical discussion'],
    careers: ['Sales Manager', 'Stockbroker', 'Paramedic', 'Professional Athlete', 'Restaurateur', 'Marketing Executive'],
    famousPeople: ['Ernest Hemingway', 'Madonna', 'Donald Trump', 'Eddie Murphy'],
    compatibleTypes: ['ISTJ', 'ISFJ', 'INTJ', 'INFJ'],
  },
  {
    code: 'ESFP',
    name: 'The Entertainer',
    description: 'ESFPs are vibrant, fun-loving, and spontaneous individuals who bring joy and energy to every situation they encounter. They are natural performers who love being in the spotlight and have an innate ability to make others feel happy and included. ESFPs live fully in the present moment, savoring sensory experiences and finding pleasure in the everyday beauty of life. They are warm, generous, and endlessly sociable, with a gift for making even strangers feel like old friends. ESFPs are practical and grounded, preferring to deal with real, tangible things rather than abstract theories. They have a keen eye for aesthetics and often express themselves through fashion, decorating, cooking, or performance. While their spontaneity makes them exciting to be around, it can sometimes lead to difficulty with planning and long-term commitment.',
    strengths: ['Magnetic personality and natural entertainer', 'Genuinely warm, generous, and inclusive', 'Observant and practical in dealing with the real world', 'Flexible and spontaneous, making the best of any situation', 'Great at bringing people together and lifting spirits'],
    weaknesses: ['Difficulty with long-term planning and discipline', 'Can be easily distracted and avoid serious topics', 'May be overly sensitive to criticism', 'Tendency to seek constant stimulation and novelty', 'Can struggle with commitment when things become routine'],
    careers: ['Event Planner', 'Tour Guide', 'Flight Attendant', 'Fitness Instructor', 'Interior Decorator', 'Television Host'],
    famousPeople: ['Marilyn Monroe', 'Elton John', 'Jamie Oliver', 'Adele'],
    compatibleTypes: ['ISTJ', 'ISFJ', 'INTJ', 'INTP'],
  },
];


// =============================================================================
// 2. LOVE LANGUAGE TEST
// =============================================================================

export const loveLanguageQuestions: LoveLanguageQuestion[] = [
  { id: 1, scenario: 'After a long day, what would make you feel most loved?', optionA: { label: 'Your partner tells you how much they appreciate everything you do', language: 'words' }, optionB: { label: 'Your partner puts away their phone and gives you their full attention', language: 'time' } },
  { id: 2, scenario: 'For your birthday, you would prefer:', optionA: { label: 'A thoughtfully chosen gift that shows they know you well', language: 'gifts' }, optionB: { label: 'Your partner handles all the chores so you can relax', language: 'service' } },
  { id: 3, scenario: 'When you are feeling down, you most appreciate when someone:', optionA: { label: 'Gives you a warm, long hug without needing words', language: 'touch' }, optionB: { label: 'Writes you a heartfelt note or message of encouragement', language: 'words' } },
  { id: 4, scenario: 'On a weekend together, you feel most connected when:', optionA: { label: 'You spend the whole day doing activities together, no distractions', language: 'time' }, optionB: { label: 'Your partner surprises you with something you have been wanting', language: 'gifts' } },
  { id: 5, scenario: 'Which gesture means more to you from a close friend?', optionA: { label: 'They help you move to a new apartment without being asked', language: 'service' }, optionB: { label: 'They hold your hand or pat your back when you are stressed', language: 'touch' } },
  { id: 6, scenario: 'You feel most appreciated at work when your colleague:', optionA: { label: 'Publicly praises your contribution in a meeting', language: 'words' }, optionB: { label: 'Offers to take over a task when they see you are overwhelmed', language: 'service' } },
  { id: 7, scenario: 'In a relationship, you would value more:', optionA: { label: 'A partner who plans regular date nights just for the two of you', language: 'time' }, optionB: { label: 'A partner who is physically affectionate throughout the day', language: 'touch' } },
  { id: 8, scenario: 'When returning from a trip, you would feel most loved if your partner:', optionA: { label: 'Brought you a small souvenir that reminded them of you', language: 'gifts' }, optionB: { label: 'Told you how much they missed you and why you mean so much', language: 'words' } },
  { id: 9, scenario: 'Which would make an ordinary Tuesday special?', optionA: { label: 'Coming home to find your partner already cooked dinner', language: 'service' }, optionB: { label: 'Your partner suggests a spontaneous walk together after dinner', language: 'time' } },
  { id: 10, scenario: 'When watching a movie at home, what matters more?', optionA: { label: 'Cuddling together on the couch the entire time', language: 'touch' }, optionB: { label: 'Your partner picked a movie they knew you would love as a surprise', language: 'gifts' } },
  { id: 11, scenario: 'After achieving something important, you want your partner to:', optionA: { label: 'Tell you how proud they are with specific things they admire', language: 'words' }, optionB: { label: 'Fix your car issue or run errands so you can celebrate freely', language: 'service' } },
  { id: 12, scenario: 'What would make a vacation more meaningful?', optionA: { label: 'Exploring new places together with no schedule or agenda', language: 'time' }, optionB: { label: 'Your partner linking arms or holding hands as you walk together', language: 'touch' } },
  { id: 13, scenario: 'You feel most cherished when someone:', optionA: { label: 'Remembers a passing comment you made and buys you that exact thing', language: 'gifts' }, optionB: { label: 'Sends you a long message explaining what you mean to them', language: 'words' } },
  { id: 14, scenario: 'During a stressful week, the best support would be:', optionA: { label: 'Your partner taking over household duties without being asked', language: 'service' }, optionB: { label: 'Your partner setting aside an evening just to be with you', language: 'time' } },
  { id: 15, scenario: 'What makes you feel closest to someone?', optionA: { label: 'A reassuring touch on the shoulder or gentle back rub', language: 'touch' }, optionB: { label: 'Receiving a meaningful memento or keepsake from them', language: 'gifts' } },
  { id: 16, scenario: 'When you are sick, you most want your partner to:', optionA: { label: 'Say comforting, encouraging words and check on you frequently', language: 'words' }, optionB: { label: 'Make you soup, bring medicine, and take care of everything', language: 'service' } },
  { id: 17, scenario: 'A perfect anniversary would include:', optionA: { label: 'An uninterrupted day together doing your favorite things', language: 'time' }, optionB: { label: 'Lots of closeness, slow dancing, and physical affection', language: 'touch' } },
  { id: 18, scenario: 'What would brighten a bad morning?', optionA: { label: 'Finding a surprise gift on your nightstand', language: 'gifts' }, optionB: { label: 'A sincere text saying they believe in you and listing your strengths', language: 'words' } },
  { id: 19, scenario: 'You feel most loved when your partner:', optionA: { label: 'Fills up your gas tank and packs your lunch for the next day', language: 'service' }, optionB: { label: 'Sits next to you and asks about your day with genuine interest', language: 'time' } },
  { id: 20, scenario: 'After an argument, reconciliation feels complete when:', optionA: { label: 'You share a long, heartfelt embrace', language: 'touch' }, optionB: { label: 'Your partner does something practical to make your life easier', language: 'service' } },
  { id: 21, scenario: 'Which daily habit would mean more to you?', optionA: { label: 'Your partner leaving little love notes in your bag or on the mirror', language: 'words' }, optionB: { label: 'Your partner always greeting and parting with a kiss', language: 'touch' } },
  { id: 22, scenario: 'For a holiday, you prefer:', optionA: { label: 'Planning a getaway where you share new experiences together', language: 'time' }, optionB: { label: 'Exchanging carefully chosen, personalized gifts', language: 'gifts' } },
  { id: 23, scenario: 'You feel most supported during a hard time when someone:', optionA: { label: 'Helps you with practical tasks like groceries or cleaning', language: 'service' }, optionB: { label: 'Verbally reassures you that things will be okay and that you are strong', language: 'words' } },
  { id: 24, scenario: 'In your ideal relationship, evenings would involve:', optionA: { label: 'Snuggling together and physical closeness', language: 'touch' }, optionB: { label: 'Deep one-on-one conversations about life and dreams', language: 'time' } },
  { id: 25, scenario: 'What makes a gift special to you?', optionA: { label: 'The thoughtfulness and personal meaning behind it', language: 'gifts' }, optionB: { label: 'You actually prefer helpful actions over physical gifts', language: 'service' } },
  { id: 26, scenario: 'At a family gathering, you feel happiest when:', optionA: { label: 'Relatives tell you how well you are doing and express pride in you', language: 'words' }, optionB: { label: 'A family member sits down with you for a long, personal chat', language: 'time' } },
  { id: 27, scenario: 'When your partner comes home, you prefer them to:', optionA: { label: 'Bring you flowers or a small treat just because', language: 'gifts' }, optionB: { label: 'Wrap you in a big hug before doing anything else', language: 'touch' } },
  { id: 28, scenario: 'You know a friend truly cares when they:', optionA: { label: 'Drop everything to help you when you need it', language: 'service' }, optionB: { label: 'Make time to see you regularly despite their busy schedule', language: 'time' } },
  { id: 29, scenario: 'Which would make you feel more treasured?', optionA: { label: 'A heartfelt letter describing what they love about you', language: 'words' }, optionB: { label: 'A surprise piece of jewelry or item you had admired', language: 'gifts' } },
  { id: 30, scenario: 'What is the strongest indicator that someone loves you?', optionA: { label: 'They consistently comfort you with physical closeness and warmth', language: 'touch' }, optionB: { label: 'They go out of their way to make your life easier and less stressful', language: 'service' } },
];

export const loveLanguageResults: LoveLanguageResult[] = [
  {
    language: 'words',
    name: 'Words of Affirmation',
    description: 'Your primary love language is Words of Affirmation. You feel most loved and valued when people express their feelings through spoken or written words. Compliments, verbal encouragement, frequent expressions of appreciation, and hearing "I love you" or "I am proud of you" fill your emotional tank like nothing else. Conversely, harsh words, criticism, or a lack of verbal acknowledgment can wound you deeply. You thrive in relationships where communication is open, genuine, and emotionally expressive. For you, the pen truly is mightier than the sword, and a single heartfelt sentence can brighten your entire week.',
    examples: [
      'Receiving a heartfelt text message in the middle of the day',
      'Hearing your partner say specifically what they appreciate about you',
      'A handwritten love letter or note left where you will find it',
      'Verbal encouragement before a big event or challenge',
      'Public acknowledgment of your efforts in front of others',
    ],
    tips: [
      'Tell your loved ones explicitly what you need to hear — they may not know',
      'Keep a collection of meaningful messages to read when you feel low',
      'Practice giving words of affirmation to others to model what you need',
      'Be patient with partners whose natural style is less verbal',
    ],
  },
  {
    language: 'time',
    name: 'Quality Time',
    description: 'Your primary love language is Quality Time. You feel most loved when someone gives you their undivided attention, not just being in the same room, but being truly present and engaged. Shared experiences, deep conversations, and focused togetherness are what fill your emotional cup. Distractions like phones, television, or multitasking during your time together feel like a rejection to you, even if unintentional. You treasure the moments when someone chooses to set everything aside and simply be with you. Whether it is a long walk, a quiet dinner, or working on a project together, the activity itself matters less than the quality of presence and connection you share.',
    examples: [
      'A partner who puts away their phone during meals together',
      'Long, uninterrupted conversations about meaningful topics',
      'Doing hobbies or activities together, like hiking or cooking',
      'Dedicated date nights that are protected from distractions',
      'Someone making time for you despite their busy schedule',
    ],
    tips: [
      'Communicate that distraction-free presence matters more than grand gestures',
      'Schedule regular one-on-one time with the people who matter most',
      'Be specific about what quality time looks like for you',
      'Understand that some people show love differently and may need guidance',
    ],
  },
  {
    language: 'gifts',
    name: 'Receiving Gifts',
    description: 'Your primary love language is Receiving Gifts. For you, a thoughtful gift is a tangible symbol that someone was thinking of you, that they took the time to choose something meaningful, and that you matter to them. It is not about materialism or the price tag; the most powerful gifts are often small, inexpensive items that carry deep personal significance. A gift that shows the giver truly knows you, your interests, your wishes, and your personality makes you feel profoundly understood and cherished. The absence of gifts on special occasions, or gifts that feel careless and generic, can leave you feeling overlooked. You are likely someone who puts great thought into the gifts you give others, because you understand the emotional weight they carry.',
    examples: [
      'A small souvenir from someone\'s trip that reminded them of you',
      'Receiving flowers or your favorite snack on an ordinary day',
      'A carefully chosen birthday gift that reflects your personality',
      'A handmade item that someone spent time creating for you',
      'A surprise delivery when you are having a difficult day',
    ],
    tips: [
      'Share wish lists or point out things you like so others can give meaningfully',
      'Remember that not everyone thinks of gift-giving naturally — gentle hints help',
      'Express appreciation openly when you receive a gift to reinforce the behavior',
      'Focus on the thought and symbolism behind gifts rather than monetary value',
    ],
  },
  {
    language: 'service',
    name: 'Acts of Service',
    description: 'Your primary love language is Acts of Service. You feel most loved when someone takes action to make your life easier, not because you are incapable, but because their willingness to help communicates care, respect, and partnership. When a partner cooks a meal, fixes something around the house, runs an errand, or takes over a task you are dreading, it speaks volumes to you. These practical gestures show that your well-being matters and that someone is willing to invest their time and energy for your sake. Conversely, laziness, broken commitments, or the expectation that you handle everything alone can make you feel unappreciated and unsupported.',
    examples: [
      'Your partner doing the dishes without being asked after you cooked',
      'Someone filling your car with gas or handling a repair for you',
      'A friend helping you move or assemble furniture',
      'Your partner taking over childcare so you can rest',
      'A colleague volunteering to handle a task when they see you are overwhelmed',
    ],
    tips: [
      'Be specific about which acts of service matter most to you',
      'Avoid keeping score — focus on the intention behind the help',
      'Recognize that some partners show love in other ways and may need coaching',
      'Express gratitude when someone serves you, even for small things',
    ],
  },
  {
    language: 'touch',
    name: 'Physical Touch',
    description: 'Your primary love language is Physical Touch. You feel most connected, secure, and loved through physical closeness and affectionate contact. Hugs, hand-holding, a gentle touch on the arm, cuddling, and other forms of physical affection communicate love to you in a way that words and gifts cannot match. Physical touch is your emotional anchor: a reassuring hand on your back when you are nervous or a long embrace after a difficult day can instantly make everything feel better. The absence of physical affection in a relationship can leave you feeling disconnected and unloved, even if your partner is showing care in other ways. For you, physical presence and closeness are the most direct path to emotional intimacy.',
    examples: [
      'A long, warm hug when greeting or saying goodbye',
      'Holding hands while walking together',
      'A partner who sits close and maintains physical contact',
      'A comforting back rub or shoulder massage after a long day',
      'Playful physical affection like a nudge, hair tousle, or gentle pat',
    ],
    tips: [
      'Let your partner know that physical affection is essential to your happiness',
      'Initiate touch to model the kind of affection you crave',
      'Be understanding that some people are not naturally physically expressive',
      'Remember that this love language is about warmth and connection, not just intimacy',
    ],
  },
];


// =============================================================================
// 3. ENNEAGRAM TEST
// =============================================================================

export const enneagramQuestions: EnneagramQuestion[] = [
  // --- Type 1: The Reformer (4 statements) ---
  { id: 1, type: 1, text: 'I have a strong inner critic that constantly pushes me to improve and do things the right way.' },
  { id: 2, type: 1, text: 'I get frustrated when people cut corners or ignore established rules and standards.' },
  { id: 3, type: 1, text: 'I spend a lot of time comparing things to how they should be, rather than accepting how they are.' },
  { id: 4, type: 1, text: 'I feel a deep sense of responsibility to correct injustice and make the world a better place.' },

  // --- Type 2: The Helper (4 statements) ---
  { id: 5, type: 2, text: 'I often sense what others need before they even ask, and I feel compelled to help.' },
  { id: 6, type: 2, text: 'I feel most fulfilled when I know that my support has made a real difference in someone\'s life.' },
  { id: 7, type: 2, text: 'I sometimes struggle to say no to requests, even when I am already overwhelmed.' },
  { id: 8, type: 2, text: 'I feel hurt when my efforts to help others go unappreciated or unnoticed.' },

  // --- Type 3: The Achiever (4 statements) ---
  { id: 9, type: 3, text: 'I am very conscious of how others perceive me and often adjust my behavior to make a good impression.' },
  { id: 10, type: 3, text: 'Setting and reaching goals gives me a rush of energy that few other things can match.' },
  { id: 11, type: 3, text: 'I feel uncomfortable when I am not being productive or making progress on something.' },
  { id: 12, type: 3, text: 'I tend to measure my self-worth by my achievements and the recognition I receive.' },

  // --- Type 4: The Individualist (4 statements) ---
  { id: 13, type: 4, text: 'I often feel that something essential is missing from my life that others seem to have naturally.' },
  { id: 14, type: 4, text: 'I am drawn to deep emotions and find beauty even in melancholy and sadness.' },
  { id: 15, type: 4, text: 'Being authentic and true to my unique identity matters more to me than fitting in.' },
  { id: 16, type: 4, text: 'I sometimes envy others who seem to live effortlessly happy lives without the emotional depth I experience.' },

  // --- Type 5: The Investigator (4 statements) ---
  { id: 17, type: 5, text: 'I need a lot of private time to think, recharge, and process my experiences before engaging with the world.' },
  { id: 18, type: 5, text: 'I would rather observe and understand a situation thoroughly before getting involved.' },
  { id: 19, type: 5, text: 'I feel drained when people make too many demands on my time and emotional energy.' },
  { id: 20, type: 5, text: 'I tend to accumulate knowledge and information as a way of feeling prepared and capable.' },

  // --- Type 6: The Loyalist (4 statements) ---
  { id: 21, type: 6, text: 'I frequently anticipate what could go wrong and prepare contingency plans just in case.' },
  { id: 22, type: 6, text: 'I value loyalty and dependability above almost everything in my relationships.' },
  { id: 23, type: 6, text: 'I sometimes question my own decisions repeatedly, seeking reassurance from trusted people.' },
  { id: 24, type: 6, text: 'I feel most secure when I am part of a group or system that I can rely on and trust.' },

  // --- Type 7: The Enthusiast (4 statements) ---
  { id: 25, type: 7, text: 'I keep myself busy with exciting plans and activities to avoid feeling bored or trapped.' },
  { id: 26, type: 7, text: 'When something painful happens, I tend to quickly reframe it positively or move on to something new.' },
  { id: 27, type: 7, text: 'I love having many options open and resist any situation that limits my freedom or choices.' },
  { id: 28, type: 7, text: 'I am often the one generating enthusiasm and new ideas in a group setting.' },

  // --- Type 8: The Challenger (4 statements) ---
  { id: 29, type: 8, text: 'I speak my mind directly and do not shy away from confrontation when I believe I am right.' },
  { id: 30, type: 8, text: 'I instinctively take charge in situations where leadership is lacking or things are not moving.' },
  { id: 31, type: 8, text: 'I have a strong protective instinct and feel compelled to stand up for the vulnerable.' },
  { id: 32, type: 8, text: 'I am uncomfortable with showing vulnerability and prefer to project strength at all times.' },

  // --- Type 9: The Peacemaker (4 statements) ---
  { id: 33, type: 9, text: 'I tend to go along with what others want to keep the peace, even if I have a different preference.' },
  { id: 34, type: 9, text: 'I find it hard to identify and assert my own priorities because everyone else\'s needs seem just as valid.' },
  { id: 35, type: 9, text: 'I avoid conflict whenever possible and feel deeply uncomfortable when people around me are arguing.' },
  { id: 36, type: 9, text: 'I sometimes lose myself in routine activities or distractions to numb out uncomfortable feelings.' },
];

export const enneagramResults: EnneagramResult[] = [
  {
    number: 1,
    name: 'The Reformer',
    description: 'Type Ones are principled, purposeful, and self-controlled individuals who have a deep sense of right and wrong. They are driven by an internal standard of perfection and strive to improve themselves and the world around them. Ones are conscientious, ethical, and reliable, often serving as the moral compass for their communities. They have a strong inner critic that both motivates them and causes them distress, constantly evaluating whether they are living up to their own high standards. When healthy, Ones channel their perfectionism into meaningful reform and constructive action. They are fair, wise, and deeply principled leaders who inspire others through their integrity. When stressed, they can become rigid, judgmental, and resentful of those who seem to ignore the rules they hold so dear.',
    desire: 'To be good, ethical, and have integrity in all things',
    fear: 'Being corrupt, evil, or morally flawed',
    growth: 7,
    stress: 4,
    wings: [9, 2],
  },
  {
    number: 2,
    name: 'The Helper',
    description: 'Type Twos are warm, generous, and empathetic individuals whose deepest desire is to be loved and needed. They have an extraordinary ability to sense the emotions and needs of others, often before those people are even aware themselves. Twos pour their energy into caring for others, offering support, encouragement, and practical assistance with genuine warmth. They are the friends who remember your preferences, show up with soup when you are sick, and celebrate your victories as if they were their own. However, their generosity can mask an underlying need for appreciation and reciprocity. When healthy, Twos give freely without strings attached and maintain their own identity alongside their caring nature. When less balanced, they may become people-pleasers who suppress their own needs and eventually feel resentful when their efforts are not returned.',
    desire: 'To feel loved, appreciated, and genuinely needed',
    fear: 'Being unwanted, unloved, or dispensable',
    growth: 4,
    stress: 8,
    wings: [1, 3],
  },
  {
    number: 3,
    name: 'The Achiever',
    description: 'Type Threes are ambitious, adaptable, and image-conscious individuals who are driven to succeed and be recognized for their accomplishments. They are the natural performers of the Enneagram, possessing an uncanny ability to read a room and become whoever they need to be to win approval and admiration. Threes are energetic, efficient, and goal-oriented, often excelling in competitive environments where their drive and charisma set them apart. They are masters of productivity and often serve as role models for others aspiring to success. However, their deep connection between self-worth and achievement can lead them to prioritize image over authenticity. When healthy, Threes use their drive to inspire others and pursue goals that are genuinely meaningful. When unbalanced, they may become workaholics who have lost touch with their true feelings and identity beneath the polished exterior.',
    desire: 'To feel valuable, admired, and worthwhile through accomplishments',
    fear: 'Being worthless, unsuccessful, or exposed as a fraud',
    growth: 6,
    stress: 9,
    wings: [2, 4],
  },
  {
    number: 4,
    name: 'The Individualist',
    description: 'Type Fours are sensitive, creative, and introspective individuals who are on a lifelong quest to understand their own identity and find meaning in the human experience. They have a rich inner emotional landscape that fuels their creativity and gives them a unique perspective on the world. Fours are drawn to authenticity and depth, and they resist anything that feels ordinary, superficial, or mass-produced. They have a remarkable ability to sit with difficult emotions and transform suffering into art, insight, or personal growth. Fours often feel fundamentally different from others, as though they were born missing something that everyone else received. When healthy, they channel their emotional depth into profound creative expression and form deep, transformative connections. When struggling, they may become moody, withdrawn, and consumed by envy of those who seem to navigate life more easily.',
    desire: 'To find their true identity and express their unique significance',
    fear: 'Having no personal identity or individual significance',
    growth: 1,
    stress: 2,
    wings: [3, 5],
  },
  {
    number: 5,
    name: 'The Investigator',
    description: 'Type Fives are perceptive, cerebral, and intensely curious individuals who seek to understand the world through observation and analysis. They are the true intellectuals of the Enneagram, driven by a need to accumulate knowledge and competence in order to feel capable of navigating the world. Fives are independent and self-sufficient, often preferring to work alone where they can think deeply without interruption. They conserve their energy carefully, feeling that they have limited resources to share with the outside world. Fives have an extraordinary ability to concentrate, analyze complex systems, and see things that others overlook entirely. When healthy, they become visionary pioneers who share their discoveries generously with the world. When under stress, they may become increasingly isolated, detached, and unwilling to engage with the demands of everyday life and relationships.',
    desire: 'To be knowledgeable, competent, and capable of handling the world',
    fear: 'Being helpless, incompetent, or overwhelmed by the world\'s demands',
    growth: 8,
    stress: 7,
    wings: [4, 6],
  },
  {
    number: 6,
    name: 'The Loyalist',
    description: 'Type Sixes are committed, responsible, and security-oriented individuals who are driven by a deep need for safety, support, and belonging. They are the most loyal and reliable members of any group, dedicating themselves to the people, organizations, and beliefs they trust. Sixes have an exceptional ability to foresee problems and prepare for contingencies, making them invaluable in crisis situations. They are hardworking, trustworthy, and deeply caring, often forming the backbone of their communities. However, their vigilance can tip into anxiety and self-doubt, causing them to question their own decisions and seek constant reassurance. When healthy, Sixes develop deep inner courage and become steady, self-reliant leaders who inspire trust. When stressed, they may become indecisive, suspicious, and reactive, oscillating between seeking authority figures and rebelling against them.',
    desire: 'To feel secure, supported, and have guidance they can trust',
    fear: 'Being without support, guidance, or a stable foundation',
    growth: 9,
    stress: 3,
    wings: [5, 7],
  },
  {
    number: 7,
    name: 'The Enthusiast',
    description: 'Type Sevens are extroverted, optimistic, and versatile individuals who approach life as an adventure filled with exciting possibilities. They are the most energetic and fun-loving type on the Enneagram, constantly seeking new experiences, ideas, and stimulation. Sevens have a remarkable ability to see the positive side of any situation and to generate enthusiasm in those around them. They are quick-minded, creative, and naturally gifted at brainstorming and synthesizing ideas from diverse sources. Their zest for life is infectious, and they often serve as the spark that ignites excitement in groups. However, their restless pursuit of pleasure can be a strategy to avoid pain, discomfort, and difficult emotions. When healthy, Sevens learn to be present, find depth in commitment, and discover that true happiness comes from within rather than from the next adventure.',
    desire: 'To be satisfied, fulfilled, and free from pain and limitation',
    fear: 'Being trapped in emotional pain, deprivation, or boredom',
    growth: 5,
    stress: 1,
    wings: [6, 8],
  },
  {
    number: 8,
    name: 'The Challenger',
    description: 'Type Eights are powerful, decisive, and self-confident individuals who approach the world with intensity, directness, and a commanding presence. They are natural leaders who are driven by a desire to be strong, in control, and to protect the people and causes they care about. Eights have a larger-than-life energy that can fill a room, and they are willing to confront injustice head-on, regardless of the consequences. They value honesty, authenticity, and strength, and they have little patience for manipulation, weakness, or dishonesty. Eights are fiercely protective of their inner circle and will go to great lengths to defend the vulnerable. When healthy, they use their power to champion others and create positive change with magnanimous generosity. When unbalanced, they can become domineering, confrontational, and unwilling to show the vulnerability that lies beneath their tough exterior.',
    desire: 'To be strong, self-reliant, and in control of their own destiny',
    fear: 'Being controlled, manipulated, or harmed by others',
    growth: 2,
    stress: 5,
    wings: [7, 9],
  },
  {
    number: 9,
    name: 'The Peacemaker',
    description: 'Type Nines are easygoing, accepting, and patient individuals who seek inner and outer peace above all else. They have a remarkable ability to see all sides of a situation and understand multiple perspectives, making them natural mediators and peacemakers. Nines are genuinely accepting of others and create a calm, welcoming presence that puts people at ease. They value harmony and stability, often going to great lengths to avoid conflict and maintain the status quo. Nines have a gentle strength and an ability to bring people together that is often underestimated. However, their desire for peace can lead them to suppress their own opinions, desires, and anger, merging with the agendas of others instead of asserting their own. When healthy, Nines develop a strong sense of self and become dynamic, engaged leaders who unite diverse groups. When struggling, they may become passive, disengaged, and stubborn in their refusal to be moved.',
    desire: 'To have inner peace, harmony, and stability in their world',
    fear: 'Conflict, disconnection, and loss of harmony',
    growth: 3,
    stress: 6,
    wings: [8, 1],
  },
];


// =============================================================================
// 4. BIG FIVE (OCEAN) PERSONALITY TEST
// =============================================================================

export const bigFiveQuestions: BigFiveQuestion[] = [
  // --- Openness (10 questions) ---
  { id: 1, dimension: 'O', text: 'I enjoy thinking about abstract concepts and philosophical questions.', reversed: false },
  { id: 2, dimension: 'O', text: 'I prefer sticking to familiar routines rather than trying new approaches.', reversed: true },
  { id: 3, dimension: 'O', text: 'I am deeply moved by art, music, or literature.', reversed: false },
  { id: 4, dimension: 'O', text: 'I have little interest in exploring unfamiliar cultures or traditions.', reversed: true },
  { id: 5, dimension: 'O', text: 'I love playing with ideas and imagining creative possibilities.', reversed: false },
  { id: 6, dimension: 'O', text: 'I tend to see things in black and white rather than shades of gray.', reversed: true },
  { id: 7, dimension: 'O', text: 'I am curious about many different topics, even ones outside my field.', reversed: false },
  { id: 8, dimension: 'O', text: 'I would describe my imagination as vivid and active.', reversed: false },
  { id: 9, dimension: 'O', text: 'I prefer practical, straightforward solutions over creative experimentation.', reversed: true },
  { id: 10, dimension: 'O', text: 'I enjoy challenging conventional ideas and looking at problems from new angles.', reversed: false },

  // --- Conscientiousness (10 questions) ---
  { id: 11, dimension: 'C', text: 'I keep my belongings organized and my living space tidy.', reversed: false },
  { id: 12, dimension: 'C', text: 'I often leave tasks unfinished when something more interesting comes along.', reversed: true },
  { id: 13, dimension: 'C', text: 'I follow through on my commitments and promises reliably.', reversed: false },
  { id: 14, dimension: 'C', text: 'I tend to procrastinate on important tasks until the last minute.', reversed: true },
  { id: 15, dimension: 'C', text: 'I set clear goals for myself and work systematically to achieve them.', reversed: false },
  { id: 16, dimension: 'C', text: 'I sometimes make impulsive decisions without fully thinking them through.', reversed: true },
  { id: 17, dimension: 'C', text: 'I pay close attention to detail and strive for accuracy in my work.', reversed: false },
  { id: 18, dimension: 'C', text: 'I have a hard time sticking to a schedule or daily routine.', reversed: true },
  { id: 19, dimension: 'C', text: 'I am disciplined and can resist temptations that might distract me from my goals.', reversed: false },
  { id: 20, dimension: 'C', text: 'I prefer to plan ahead rather than act spontaneously.', reversed: false },

  // --- Extraversion (10 questions) ---
  { id: 21, dimension: 'E', text: 'I feel energized after spending time with a large group of people.', reversed: false },
  { id: 22, dimension: 'E', text: 'I prefer quiet evenings at home to lively social gatherings.', reversed: true },
  { id: 23, dimension: 'E', text: 'I am usually the one to start conversations with strangers.', reversed: false },
  { id: 24, dimension: 'E', text: 'I find small talk draining and avoid it when possible.', reversed: true },
  { id: 25, dimension: 'E', text: 'I am comfortable being the center of attention in social situations.', reversed: false },
  { id: 26, dimension: 'E', text: 'I need plenty of alone time to feel balanced and recharged.', reversed: true },
  { id: 27, dimension: 'E', text: 'I enjoy meeting new people and building a wide social network.', reversed: false },
  { id: 28, dimension: 'E', text: 'I tend to think before speaking, often keeping my thoughts to myself.', reversed: true },
  { id: 29, dimension: 'E', text: 'I bring enthusiasm and positive energy to group activities.', reversed: false },
  { id: 30, dimension: 'E', text: 'I would describe myself as talkative and outgoing.', reversed: false },

  // --- Agreeableness (10 questions) ---
  { id: 31, dimension: 'A', text: 'I generally trust that people have good intentions until proven otherwise.', reversed: false },
  { id: 32, dimension: 'A', text: 'I tend to be skeptical of other people\'s motives.', reversed: true },
  { id: 33, dimension: 'A', text: 'I go out of my way to be kind and considerate toward others.', reversed: false },
  { id: 34, dimension: 'A', text: 'I have no problem telling someone bluntly that they are wrong.', reversed: true },
  { id: 35, dimension: 'A', text: 'I enjoy cooperating with others more than competing against them.', reversed: false },
  { id: 36, dimension: 'A', text: 'I sometimes find it satisfying to challenge or provoke people in debates.', reversed: true },
  { id: 37, dimension: 'A', text: 'I feel genuine concern when I see someone else struggling or in pain.', reversed: false },
  { id: 38, dimension: 'A', text: 'I prioritize getting what I want even if it means stepping on toes.', reversed: true },
  { id: 39, dimension: 'A', text: 'I make a conscious effort to be patient and forgiving with others.', reversed: false },
  { id: 40, dimension: 'A', text: 'I am willing to compromise to maintain harmony in a relationship.', reversed: false },

  // --- Neuroticism (10 questions) ---
  { id: 41, dimension: 'N', text: 'I frequently worry about things that might go wrong in the future.', reversed: false },
  { id: 42, dimension: 'N', text: 'I remain calm and composed even in stressful or chaotic situations.', reversed: true },
  { id: 43, dimension: 'N', text: 'My mood can shift dramatically from one hour to the next.', reversed: false },
  { id: 44, dimension: 'N', text: 'I rarely feel anxious or nervous, even before important events.', reversed: true },
  { id: 45, dimension: 'N', text: 'I tend to dwell on past mistakes and replay them in my mind.', reversed: false },
  { id: 46, dimension: 'N', text: 'I bounce back quickly after experiencing disappointment or setbacks.', reversed: true },
  { id: 47, dimension: 'N', text: 'I often feel overwhelmed by my emotions and find it hard to manage them.', reversed: false },
  { id: 48, dimension: 'N', text: 'Small inconveniences can put me in a bad mood for a surprisingly long time.', reversed: false },
  { id: 49, dimension: 'N', text: 'I feel secure in who I am and do not let criticism shake my self-confidence.', reversed: true },
  { id: 50, dimension: 'N', text: 'I experience self-doubt more often than most people around me seem to.', reversed: false },
];

export const bigFiveDimensions: BigFiveDimension[] = [
  {
    name: 'Openness to Experience',
    shortName: 'O',
    description: 'Openness to Experience reflects the degree to which a person is curious, imaginative, and willing to engage with novel ideas, experiences, and unconventional perspectives. This dimension captures the breadth of a person\'s interests, the depth of their imagination, and their tolerance for ambiguity. People scoring high on openness tend to be intellectually curious, artistically sensitive, and open to revisiting their values. Those scoring low tend to be practical, conventional, and prefer the familiar.',
    highDescription: 'You have a vivid imagination, a deep appreciation for art and beauty, and an insatiable curiosity about the world. You are drawn to novel ideas, unconventional perspectives, and creative exploration. You may enjoy philosophy, abstract thinking, and experiences that challenge your existing worldview. Your openness makes you adaptable and innovative, though you may sometimes struggle with practical, routine tasks that feel unstimulating.',
    lowDescription: 'You are practical, grounded, and prefer the tried-and-true over the experimental. You value clarity, consistency, and concrete results. You may be skeptical of abstract theories and prefer working with established methods. Your down-to-earth approach makes you reliable and efficient, though you may occasionally miss opportunities for creative growth or resist changes that could be beneficial.',
  },
  {
    name: 'Conscientiousness',
    shortName: 'C',
    description: 'Conscientiousness reflects the degree to which a person is organized, dependable, disciplined, and goal-directed. This dimension captures how much a person plans ahead, controls impulses, and follows through on commitments. Highly conscientious individuals are methodical, responsible, and persistent. Those lower in conscientiousness tend to be more spontaneous, flexible, and sometimes careless about details and deadlines.',
    highDescription: 'You are organized, disciplined, and driven to achieve your goals. You plan ahead, follow through on your commitments, and take your responsibilities seriously. Others can count on you to deliver reliable, high-quality work. Your self-discipline and persistence help you succeed in structured environments. However, you may sometimes be perceived as rigid, overly cautious, or a perfectionist who struggles to relax.',
    lowDescription: 'You are spontaneous, flexible, and comfortable with ambiguity. You prefer to keep your options open rather than lock yourself into rigid plans. While this makes you adaptable and easygoing, you may struggle with procrastination, disorganization, or difficulty following through on tasks that require sustained effort. Building small habits and routines could help you channel your natural creativity more effectively.',
  },
  {
    name: 'Extraversion',
    shortName: 'E',
    description: 'Extraversion reflects the degree to which a person is outgoing, energetic, talkative, and drawn to social interaction. This dimension captures a person\'s orientation toward the outer world of people and activity versus the inner world of solitude and reflection. Extraverts tend to be assertive, enthusiastic, and action-oriented. Introverts tend to be reflective, reserved, and gain energy from quieter, more solitary activities.',
    highDescription: 'You are sociable, energetic, and thrive in the company of others. You are comfortable taking the lead in social situations and enjoy meeting new people, attending events, and being part of group activities. Your enthusiasm and positive energy make you a natural connector and motivator. However, you may occasionally overwhelm quieter individuals or struggle with tasks that require prolonged solitude and deep concentration.',
    lowDescription: 'You are reflective, reserved, and gain energy from spending time alone or in small, intimate settings. You prefer deep, one-on-one conversations to large group interactions and may need significant downtime after social events. Your thoughtfulness and observational skills are strengths in situations requiring careful listening and independent work. However, you may sometimes be perceived as distant or miss out on opportunities that require assertive self-promotion.',
  },
  {
    name: 'Agreeableness',
    shortName: 'A',
    description: 'Agreeableness reflects the degree to which a person is compassionate, cooperative, trusting, and motivated to maintain positive relationships with others. This dimension captures how a person balances their own needs with the needs of those around them. Highly agreeable individuals are empathetic, helpful, and conflict-averse. Those lower in agreeableness tend to be more competitive, skeptical, and willing to prioritize their own interests.',
    highDescription: 'You are warm, empathetic, and genuinely concerned with the well-being of others. You value cooperation over competition and go out of your way to be helpful, supportive, and considerate. People trust you and feel comfortable confiding in you. Your kind nature makes you an excellent team player and peacemaker. However, you may sometimes sacrifice your own needs to please others or avoid necessary conflict, which can lead to resentment over time.',
    lowDescription: 'You are direct, analytical, and willing to prioritize your own interests when needed. You can be skeptical of others\' intentions and are not afraid to challenge ideas or stand firm in disagreements. Your independent thinking and willingness to push back make you effective in competitive environments and roles that require tough decisions. However, you may sometimes come across as insensitive or dismissive, and investing in empathy could strengthen your relationships.',
  },
  {
    name: 'Neuroticism',
    shortName: 'N',
    description: 'Neuroticism reflects the degree to which a person experiences negative emotions such as anxiety, sadness, irritability, and emotional instability. This dimension captures emotional reactivity and vulnerability to stress. People scoring high on neuroticism tend to experience frequent mood swings, worry, and self-doubt. Those scoring low tend to be emotionally stable, calm, and resilient in the face of adversity.',
    highDescription: 'You experience emotions with considerable intensity and are highly attuned to potential threats and stressors. You may frequently worry, feel anxious, or have mood fluctuations that affect your daily life. Your emotional sensitivity gives you the ability to empathize deeply with others and anticipate problems. However, managing stress and developing coping strategies is important for your well-being, as chronic anxiety and self-doubt can undermine your confidence and productivity.',
    lowDescription: 'You are emotionally stable, calm, and resilient under pressure. You tend not to worry excessively and can handle stressful situations without becoming overwhelmed. Your steady temperament makes you a reliable, reassuring presence for those around you. However, your emotional evenness may sometimes cause you to underestimate the emotional impact of events on others or to dismiss feelings that deserve attention.',
  },
];


// =============================================================================
// 5. ATTACHMENT STYLE QUIZ
// =============================================================================

export const attachmentQuestions: AttachmentQuestion[] = [
  {
    id: 1,
    scenario: 'Your partner has been working late every night this week and you have barely seen them. You:',
    options: [
      { label: 'Trust they are busy and plan a nice evening together when they are free', style: 'secure' },
      { label: 'Feel anxious and call them frequently to check in and feel connected', style: 'anxious' },
      { label: 'Use the extra time for yourself and feel fine being independent', style: 'dismissive' },
      { label: 'Worry they might be pulling away, but avoid bringing it up out of fear', style: 'fearful' },
    ],
  },
  {
    id: 2,
    scenario: 'A new romantic interest tells you they really like you after just two dates. You:',
    options: [
      { label: 'Feel pleased and reciprocate with genuine warmth', style: 'secure' },
      { label: 'Feel thrilled and immediately want to spend all your time with them', style: 'anxious' },
      { label: 'Feel slightly uncomfortable, as if things are moving too fast', style: 'dismissive' },
      { label: 'Feel a mix of excitement and fear that you will eventually be hurt', style: 'fearful' },
    ],
  },
  {
    id: 3,
    scenario: 'During an argument with your partner, you are most likely to:',
    options: [
      { label: 'Stay calm, express your feelings, and work toward a resolution together', style: 'secure' },
      { label: 'Become emotionally intense and fear the argument means the relationship is failing', style: 'anxious' },
      { label: 'Shut down emotionally and want to be left alone until it blows over', style: 'dismissive' },
      { label: 'Feel overwhelmed by conflicting urges to reach out and to withdraw', style: 'fearful' },
    ],
  },
  {
    id: 4,
    scenario: 'Your close friend cancels plans with you at the last minute. You:',
    options: [
      { label: 'Feel disappointed but understand that things come up', style: 'secure' },
      { label: 'Wonder if they are avoiding you and replay recent interactions for clues', style: 'anxious' },
      { label: 'Shrug it off easily and find something else to do', style: 'dismissive' },
      { label: 'Feel hurt but pretend you do not care because showing it feels too vulnerable', style: 'fearful' },
    ],
  },
  {
    id: 5,
    scenario: 'You are going through a difficult time. When it comes to seeking support, you:',
    options: [
      { label: 'Reach out to trusted people and feel comfortable being vulnerable', style: 'secure' },
      { label: 'Desperately need reassurance and may call multiple people for comfort', style: 'anxious' },
      { label: 'Prefer to handle things on your own and avoid burdening anyone', style: 'dismissive' },
      { label: 'Want support but feel afraid of being judged or rejected if you ask', style: 'fearful' },
    ],
  },
  {
    id: 6,
    scenario: 'Your partner does not respond to your text for several hours. You:',
    options: [
      { label: 'Assume they are busy and go about your day without worrying', style: 'secure' },
      { label: 'Check your phone repeatedly and feel uneasy until they reply', style: 'anxious' },
      { label: 'Barely notice because you are focused on your own activities', style: 'dismissive' },
      { label: 'Feel abandoned but convince yourself you should not be this affected', style: 'fearful' },
    ],
  },
  {
    id: 7,
    scenario: 'When a relationship starts getting more serious and committed, you typically:',
    options: [
      { label: 'Welcome the deeper connection and invest more in the relationship', style: 'secure' },
      { label: 'Feel relieved and want to accelerate the commitment even further', style: 'anxious' },
      { label: 'Start feeling constrained and need to reassert your independence', style: 'dismissive' },
      { label: 'Feel torn between wanting closeness and fearing you will lose yourself', style: 'fearful' },
    ],
  },
  {
    id: 8,
    scenario: 'Your partner expresses a need for more space in the relationship. You:',
    options: [
      { label: 'Respect their need and use the time to nurture your own interests', style: 'secure' },
      { label: 'Panic and interpret it as a sign they are losing interest in you', style: 'anxious' },
      { label: 'Feel relieved because you also value your personal space', style: 'dismissive' },
      { label: 'Agree outwardly but internally spiral with fear of abandonment', style: 'fearful' },
    ],
  },
  {
    id: 9,
    scenario: 'When you think about being truly vulnerable with someone, you feel:',
    options: [
      { label: 'Comfortable and believe vulnerability strengthens intimacy', style: 'secure' },
      { label: 'Eager to open up, hoping it will create a stronger bond', style: 'anxious' },
      { label: 'Resistant, as vulnerability feels unnecessary and risky', style: 'dismissive' },
      { label: 'Deeply conflicted, craving intimacy but terrified of being hurt', style: 'fearful' },
    ],
  },
  {
    id: 10,
    scenario: 'After a breakup, your typical coping pattern is:',
    options: [
      { label: 'Grieve healthily, reflect on lessons learned, and eventually move forward', style: 'secure' },
      { label: 'Feel devastated and have difficulty functioning; may try to win them back', style: 'anxious' },
      { label: 'Move on quickly and focus on being self-sufficient again', style: 'dismissive' },
      { label: 'Feel both relief and deep pain, oscillating between missing them and feeling free', style: 'fearful' },
    ],
  },
  {
    id: 11,
    scenario: 'Your partner wants to introduce you to their family. You:',
    options: [
      { label: 'Feel happy about this milestone and look forward to meeting them', style: 'secure' },
      { label: 'Overanalyze what to wear and say, anxious about making a perfect impression', style: 'anxious' },
      { label: 'Feel it is too soon and prefer to keep that part of life separate', style: 'dismissive' },
      { label: 'Want to go but fear being scrutinized and found lacking', style: 'fearful' },
    ],
  },
  {
    id: 12,
    scenario: 'When you notice your partner is in a bad mood, you:',
    options: [
      { label: 'Gently check in and offer support without taking it personally', style: 'secure' },
      { label: 'Immediately assume you did something wrong and try to fix it', style: 'anxious' },
      { label: 'Give them space and wait for them to sort it out independently', style: 'dismissive' },
      { label: 'Notice it but avoid asking, afraid the answer involves you', style: 'fearful' },
    ],
  },
  {
    id: 13,
    scenario: 'How do you feel about depending on your partner for emotional support?',
    options: [
      { label: 'Comfortable and natural; mutual support is what partnerships are about', style: 'secure' },
      { label: 'You depend on them heavily and need frequent validation from them', style: 'anxious' },
      { label: 'Uncomfortable; you prefer to be emotionally self-sufficient', style: 'dismissive' },
      { label: 'You want to depend on them but worry they will not be there for you', style: 'fearful' },
    ],
  },
  {
    id: 14,
    scenario: 'Your partner compliments another person\'s attractiveness in front of you. You:',
    options: [
      { label: 'Feel secure; acknowledging someone is attractive is harmless', style: 'secure' },
      { label: 'Feel a spike of jealousy and need reassurance about your relationship', style: 'anxious' },
      { label: 'Do not really care and may even agree with the observation', style: 'dismissive' },
      { label: 'Feel stung but mask it, not wanting to appear insecure', style: 'fearful' },
    ],
  },
  {
    id: 15,
    scenario: 'When sharing your deepest fears with someone you trust, you:',
    options: [
      { label: 'Feel closer to them afterward and appreciate the trust you share', style: 'secure' },
      { label: 'Feel relieved but then worry they might use this knowledge against you', style: 'anxious' },
      { label: 'Rarely do this because you consider it unnecessary self-exposure', style: 'dismissive' },
      { label: 'Regret it afterward and feel exposed and anxious for days', style: 'fearful' },
    ],
  },
  {
    id: 16,
    scenario: 'Your partner surprises you with an unexpected gesture of affection. You:',
    options: [
      { label: 'Feel loved and reciprocate warmly', style: 'secure' },
      { label: 'Feel elated but then worry about when the next gesture will come', style: 'anxious' },
      { label: 'Feel slightly awkward and unsure how to respond', style: 'dismissive' },
      { label: 'Feel happy but also suspicious about what prompted it', style: 'fearful' },
    ],
  },
  {
    id: 17,
    scenario: 'You and your partner have different opinions on something important. You:',
    options: [
      { label: 'Discuss it openly, knowing disagreements do not threaten the relationship', style: 'secure' },
      { label: 'Worry the disagreement could escalate and damage the relationship', style: 'anxious' },
      { label: 'State your opinion firmly and do not feel the need to reach consensus', style: 'dismissive' },
      { label: 'Avoid voicing your opinion to prevent potential conflict or rejection', style: 'fearful' },
    ],
  },
  {
    id: 18,
    scenario: 'When your partner is away on a trip for a week, you:',
    options: [
      { label: 'Miss them but enjoy the time to do your own things as well', style: 'secure' },
      { label: 'Count the days and need frequent calls or texts to feel connected', style: 'anxious' },
      { label: 'Appreciate the solitude and might even feel more relaxed alone', style: 'dismissive' },
      { label: 'Alternate between missing them intensely and convincing yourself you do not need them', style: 'fearful' },
    ],
  },
  {
    id: 19,
    scenario: 'A coworker you respect offers constructive criticism about your work. You:',
    options: [
      { label: 'Listen objectively and consider how to improve', style: 'secure' },
      { label: 'Feel hurt and need reassurance that you are still valued', style: 'anxious' },
      { label: 'Evaluate the feedback logically and dismiss what you disagree with', style: 'dismissive' },
      { label: 'Take it very personally but hide your reaction to avoid appearing weak', style: 'fearful' },
    ],
  },
  {
    id: 20,
    scenario: 'How would you describe your view of relationships in general?',
    options: [
      { label: 'Relationships are rewarding and worth the effort to maintain', style: 'secure' },
      { label: 'Relationships are essential but also a major source of anxiety for me', style: 'anxious' },
      { label: 'Relationships are fine but independence is more important', style: 'dismissive' },
      { label: 'I want close relationships but they always seem to involve pain', style: 'fearful' },
    ],
  },
  {
    id: 21,
    scenario: 'Your partner forgets an important anniversary. You:',
    options: [
      { label: 'Mention it lightheartedly and plan something together', style: 'secure' },
      { label: 'Feel deeply wounded and question whether they truly care', style: 'anxious' },
      { label: 'Do not place much importance on dates and do not bring it up', style: 'dismissive' },
      { label: 'Feel hurt but say nothing, convinced that speaking up would cause conflict', style: 'fearful' },
    ],
  },
  {
    id: 22,
    scenario: 'When entering a new social group, you tend to:',
    options: [
      { label: 'Feel confident and gradually build genuine connections', style: 'secure' },
      { label: 'Try hard to be liked and worry about being accepted by everyone', style: 'anxious' },
      { label: 'Stay on the periphery and only engage on your own terms', style: 'dismissive' },
      { label: 'Want to connect but hold back, afraid of being judged or rejected', style: 'fearful' },
    ],
  },
  {
    id: 23,
    scenario: 'Your best friend starts spending more time with a new friend. You:',
    options: [
      { label: 'Feel happy they have another close friend and invite the new person along', style: 'secure' },
      { label: 'Feel replaced and worry your friendship is no longer a priority', style: 'anxious' },
      { label: 'Do not mind; you value having your own independent friendships too', style: 'dismissive' },
      { label: 'Feel jealous but withdraw instead of expressing your feelings', style: 'fearful' },
    ],
  },
  {
    id: 24,
    scenario: 'When you imagine your ideal long-term relationship, it involves:',
    options: [
      { label: 'Deep trust, open communication, and mutual support with healthy independence', style: 'secure' },
      { label: 'Intense emotional connection with constant togetherness and reassurance', style: 'anxious' },
      { label: 'A partnership that respects personal freedom and does not feel suffocating', style: 'dismissive' },
      { label: 'A safe haven where you can be vulnerable, though you doubt it truly exists', style: 'fearful' },
    ],
  },
  {
    id: 25,
    scenario: 'Your partner tells you they love you for the first time. You:',
    options: [
      { label: 'Feel warmth and joy, and say it back when you are genuinely ready', style: 'secure' },
      { label: 'Feel immense relief and have been wanting to hear this for a while', style: 'anxious' },
      { label: 'Feel pressured and uncertain about how to respond', style: 'dismissive' },
      { label: 'Feel elated but immediately worry about whether they truly mean it', style: 'fearful' },
    ],
  },
];

export const attachmentResults: AttachmentResult[] = [
  {
    style: 'secure',
    name: 'Secure Attachment',
    description: 'You have a secure attachment style, which means you are comfortable with both intimacy and independence in your relationships. You trust your partners, communicate openly about your needs and feelings, and do not fear abandonment or suffocation. When conflicts arise, you approach them with a calm, solution-oriented mindset rather than reacting from a place of fear or defensiveness. You believe that healthy relationships are built on mutual respect, trust, and honest communication. You are able to set appropriate boundaries while still being emotionally available and supportive. People with secure attachment often had caregivers who were consistently responsive to their emotional needs, creating a stable internal model of relationships that carries into adulthood.',
    traits: [
      'Comfortable with emotional intimacy and closeness',
      'Able to communicate needs and boundaries clearly',
      'Trusting of partners without excessive jealousy or suspicion',
      'Resilient during relationship challenges and conflicts',
      'Balanced between independence and togetherness',
    ],
    tips: [
      'Continue to maintain open and honest communication with your partner',
      'Be patient and understanding with partners who may have less secure attachment styles',
      'Model healthy relationship behaviors for those around you',
    ],
    percentage: 56,
  },
  {
    style: 'anxious',
    name: 'Anxious-Preoccupied Attachment',
    description: 'You have an anxious-preoccupied attachment style, which means you deeply crave closeness and emotional reassurance in your relationships but often fear that your partner does not feel as strongly as you do. You are highly attuned to shifts in your partner\'s mood and behavior, and you may interpret ambiguous signals as signs of rejection or disinterest. When you feel insecure, you tend to seek proximity and reassurance, sometimes intensely. Your relationships may feel like an emotional rollercoaster, with highs of connection and lows of anxiety. This pattern often stems from inconsistent caregiving in early life, where love and attention were unpredictable. The good news is that awareness of this pattern is the first step toward building more secure, balanced connections.',
    traits: [
      'Strong desire for closeness and emotional validation',
      'Heightened sensitivity to perceived rejection or withdrawal',
      'Tendency to overthink and analyze relationship dynamics',
      'May sacrifice personal needs to maintain the relationship',
      'Experiences intense emotions in romantic contexts',
    ],
    tips: [
      'Practice self-soothing techniques before reacting to perceived threats in relationships',
      'Communicate your needs directly rather than testing your partner for proof of love',
      'Develop a strong sense of self-worth independent of your relationship status',
      'Consider therapy to explore early attachment patterns and build security from within',
    ],
    percentage: 20,
  },
  {
    style: 'dismissive',
    name: 'Dismissive-Avoidant Attachment',
    description: 'You have a dismissive-avoidant attachment style, which means you value self-sufficiency and independence highly, sometimes at the expense of emotional intimacy. You may feel uncomfortable when partners become too dependent or emotionally demanding, and you cope with this discomfort by creating distance. You pride yourself on not needing others and may view emotional vulnerability as a weakness. While you are capable of maintaining relationships, you tend to keep a certain emotional distance and may downplay the importance of close connections. This pattern often develops when caregivers were emotionally unavailable, teaching you early on that your best strategy is to rely only on yourself. Understanding this pattern can help you gradually open up to the rich rewards of deeper connection.',
    traits: [
      'Highly independent and self-reliant',
      'Uncomfortable with emotional vulnerability and dependency',
      'Tendency to downplay the importance of relationships',
      'May idealize freedom and autonomy over intimacy',
      'Difficulty recognizing and expressing emotional needs',
    ],
    tips: [
      'Practice identifying and naming your emotions, even when they feel uncomfortable',
      'Challenge the belief that needing others is a weakness',
      'Take small, gradual steps toward vulnerability with trusted people',
      'Recognize that emotional intimacy enhances rather than threatens your independence',
    ],
    percentage: 15,
  },
  {
    style: 'fearful',
    name: 'Fearful-Avoidant Attachment',
    description: 'You have a fearful-avoidant attachment style, also known as disorganized attachment. This means you deeply desire close, intimate relationships but simultaneously fear the vulnerability they require. You may find yourself caught in a push-pull dynamic, drawing close to people only to withdraw when intimacy feels too threatening. Your relationships may be marked by emotional intensity and unpredictability, as you oscillate between longing for connection and protecting yourself from potential pain. This pattern often arises from early experiences where caregivers were both a source of comfort and a source of fear, creating conflicting internal signals about the safety of closeness. With self-awareness and supportive relationships or therapy, you can learn to tolerate vulnerability and build the secure connections you truly desire.',
    traits: [
      'Intense desire for intimacy coupled with deep fear of rejection',
      'Push-pull behavior in relationships, alternating between closeness and distance',
      'Difficulty trusting others despite wanting to',
      'Heightened emotional reactivity and difficulty with emotional regulation',
      'May have unpredictable responses to intimacy and commitment',
    ],
    tips: [
      'Seek therapy, particularly approaches like EMDR or attachment-focused therapy',
      'Practice grounding techniques when you feel the urge to push people away or cling too tightly',
      'Build a safety net of trusted relationships where you can practice vulnerability gradually',
      'Be compassionate with yourself when you notice the push-pull pattern emerging',
    ],
    percentage: 9,
  },
];


// =============================================================================
// 6. EMOTIONAL INTELLIGENCE (EQ) TEST
// =============================================================================

export const eqQuestions: EQQuestion[] = [
  // --- Self-Awareness (8 questions) ---
  {
    id: 1, domain: 'self-awareness',
    scenario: 'You receive unexpectedly harsh feedback on a project you worked hard on. Your immediate internal response is:',
    options: [
      { label: 'Feel a wave of defensiveness but recognize it as hurt pride before reacting', score: 4 },
      { label: 'Feel upset and take a few minutes to process before responding', score: 3 },
      { label: 'Feel angry and want to argue, but manage to hold back', score: 2 },
      { label: 'Immediately feel the feedback is unfair and dismiss it', score: 1 },
    ],
  },
  {
    id: 2, domain: 'self-awareness',
    scenario: 'You notice you have been irritable all day with no obvious cause. You:',
    options: [
      { label: 'Pause to reflect on what might be underlying the irritability, such as stress or lack of sleep', score: 4 },
      { label: 'Recognize you are irritable and try to be extra patient with others', score: 3 },
      { label: 'Push through the day and hope the feeling passes on its own', score: 2 },
      { label: 'Snap at people and only realize afterward that you were in a bad mood', score: 1 },
    ],
  },
  {
    id: 3, domain: 'self-awareness',
    scenario: 'During a discussion, you realize that your strong opinion on a topic may stem from a personal bias. You:',
    options: [
      { label: 'Acknowledge the bias openly and adjust your argument accordingly', score: 4 },
      { label: 'Privately note the bias and try to present a more balanced view', score: 3 },
      { label: 'Feel uncomfortable but continue advocating your position', score: 2 },
      { label: 'Do not consider that bias could be influencing you and argue forcefully', score: 1 },
    ],
  },
  {
    id: 4, domain: 'self-awareness',
    scenario: 'You are about to give a presentation and feel your heart racing and palms sweating. You:',
    options: [
      { label: 'Recognize the physical signs as normal anxiety and reframe the energy as excitement', score: 4 },
      { label: 'Acknowledge you are nervous and use deep breathing to calm yourself', score: 3 },
      { label: 'Try to ignore the physical sensations and just power through', score: 2 },
      { label: 'Feel overwhelmed by the symptoms and consider avoiding the presentation', score: 1 },
    ],
  },
  {
    id: 5, domain: 'self-awareness',
    scenario: 'A colleague receives a promotion you wanted. Your first honest reaction is:',
    options: [
      { label: 'Identify that you feel envious, congratulate them sincerely, and reflect on what you can improve', score: 4 },
      { label: 'Feel disappointed but genuinely congratulate them and move on', score: 3 },
      { label: 'Congratulate them outwardly but stew about it internally for days', score: 2 },
      { label: 'Feel it is unfair and complain about the decision to others', score: 1 },
    ],
  },
  {
    id: 6, domain: 'self-awareness',
    scenario: 'You catch yourself being judgmental about a stranger\'s appearance. You:',
    options: [
      { label: 'Notice the judgment, consider where it comes from, and consciously choose a kinder thought', score: 4 },
      { label: 'Recognize the thought as unfair and redirect your attention', score: 3 },
      { label: 'Feel slightly guilty but do not think much more about it', score: 2 },
      { label: 'Do not notice the judgment as something worth examining', score: 1 },
    ],
  },
  {
    id: 7, domain: 'self-awareness',
    scenario: 'After a social event, you reflect on a joke you made that did not land well. You:',
    options: [
      { label: 'Acknowledge it was awkward, learn from it, and do not let it spiral into excessive self-criticism', score: 4 },
      { label: 'Feel embarrassed but remind yourself that everyone has off moments', score: 3 },
      { label: 'Replay the moment repeatedly and feel anxious about how you were perceived', score: 2 },
      { label: 'Do not remember or reflect on social interactions after they happen', score: 1 },
    ],
  },
  {
    id: 8, domain: 'self-awareness',
    scenario: 'You realize you have been avoiding a difficult conversation with a family member. You:',
    options: [
      { label: 'Identify the specific fear driving the avoidance and create a plan to address it', score: 4 },
      { label: 'Recognize the avoidance pattern and resolve to have the conversation soon', score: 3 },
      { label: 'Know you should talk to them but keep putting it off without examining why', score: 2 },
      { label: 'Continue avoiding it and justify the delay with excuses', score: 1 },
    ],
  },

  // --- Self-Management (7 questions) ---
  {
    id: 9, domain: 'self-management',
    scenario: 'You are stuck in traffic and will be late for an important meeting. You:',
    options: [
      { label: 'Accept the situation, call ahead to inform them, and use the time to mentally prepare', score: 4 },
      { label: 'Feel frustrated but take deep breaths and listen to calming music', score: 3 },
      { label: 'Get increasingly agitated and honk at other drivers', score: 2 },
      { label: 'Become furious and let the anger ruin the rest of your day', score: 1 },
    ],
  },
  {
    id: 10, domain: 'self-management',
    scenario: 'You made a significant mistake at work that your boss has not noticed yet. You:',
    options: [
      { label: 'Proactively report it, suggest a fix, and take responsibility immediately', score: 4 },
      { label: 'Inform your boss and accept the consequences, even though it is uncomfortable', score: 3 },
      { label: 'Try to fix it quietly before anyone notices', score: 2 },
      { label: 'Hope no one finds out and avoid the topic entirely', score: 1 },
    ],
  },
  {
    id: 11, domain: 'self-management',
    scenario: 'You have a major deadline tomorrow but your friends invite you to an exciting event tonight. You:',
    options: [
      { label: 'Decline gracefully, finish your work, and plan to celebrate after the deadline', score: 4 },
      { label: 'Decline but feel some regret, then refocus on the task at hand', score: 3 },
      { label: 'Go to the event telling yourself you will wake up early, then struggle with the deadline', score: 2 },
      { label: 'Go to the event without thinking about consequences and scramble later', score: 1 },
    ],
  },
  {
    id: 12, domain: 'self-management',
    scenario: 'Someone cuts you off in a conversation to take credit for your idea. You:',
    options: [
      { label: 'Wait for an appropriate moment and calmly redirect attention to your original contribution', score: 4 },
      { label: 'Feel annoyed but address it privately with the person after the meeting', score: 3 },
      { label: 'Interrupt them to set the record straight in front of everyone', score: 2 },
      { label: 'Fume silently and bring it up passive-aggressively later', score: 1 },
    ],
  },
  {
    id: 13, domain: 'self-management',
    scenario: 'You receive devastating personal news in the middle of a workday. You:',
    options: [
      { label: 'Allow yourself to feel the emotion, inform a trusted colleague, and take the time you need', score: 4 },
      { label: 'Excuse yourself briefly to process, then return when ready', score: 3 },
      { label: 'Suppress your feelings entirely and force yourself to continue working', score: 2 },
      { label: 'Break down at your desk and are unable to function for the rest of the day', score: 1 },
    ],
  },
  {
    id: 14, domain: 'self-management',
    scenario: 'You have been trying to build a new habit but you slipped up after two weeks of consistency. You:',
    options: [
      { label: 'View it as a normal part of the process, identify the trigger, and resume tomorrow', score: 4 },
      { label: 'Feel disappointed but get back on track the next day', score: 3 },
      { label: 'Beat yourself up and lose motivation for several days', score: 2 },
      { label: 'Give up entirely, concluding you lack the discipline', score: 1 },
    ],
  },
  {
    id: 15, domain: 'self-management',
    scenario: 'During a heated argument with your partner, you feel the urge to say something hurtful. You:',
    options: [
      { label: 'Recognize the impulse, pause, and ask for a short break before continuing calmly', score: 4 },
      { label: 'Bite your tongue and try to steer the conversation in a constructive direction', score: 3 },
      { label: 'Let the comment slip out and immediately regret it', score: 2 },
      { label: 'Say it deliberately to win the argument, regardless of the emotional damage', score: 1 },
    ],
  },

  // --- Social Awareness (8 questions) ---
  {
    id: 16, domain: 'social-awareness',
    scenario: 'During a meeting, you notice a normally outspoken colleague has been unusually quiet. You:',
    options: [
      { label: 'Create an opening for them to contribute and check in privately afterward', score: 4 },
      { label: 'Note the change and ask if everything is okay after the meeting', score: 3 },
      { label: 'Notice but assume they will speak up if they want to', score: 2 },
      { label: 'Do not notice changes in others\' behavior during meetings', score: 1 },
    ],
  },
  {
    id: 17, domain: 'social-awareness',
    scenario: 'You are at a dinner party and realize one guest is being subtly excluded from the conversation. You:',
    options: [
      { label: 'Naturally redirect the conversation to include them by asking for their perspective', score: 4 },
      { label: 'Make eye contact and try to draw them in when you get a chance', score: 3 },
      { label: 'Feel bad for them but are not sure how to help without being awkward', score: 2 },
      { label: 'Focus on the people you are already talking to and do not notice', score: 1 },
    ],
  },
  {
    id: 18, domain: 'social-awareness',
    scenario: 'A friend tells you they are fine, but their body language suggests otherwise. You:',
    options: [
      { label: 'Gently acknowledge the mismatch: "You say you are fine, but you seem a bit off. I am here if you want to talk."', score: 4 },
      { label: 'Respect their words but stay attentive in case they open up later', score: 3 },
      { label: 'Take their word for it and move on to another topic', score: 2 },
      { label: 'Do not pick up on the nonverbal cues at all', score: 1 },
    ],
  },
  {
    id: 19, domain: 'social-awareness',
    scenario: 'You are a manager and notice tension between two team members, though neither has complained. You:',
    options: [
      { label: 'Address it proactively by speaking with each person privately to understand the situation', score: 4 },
      { label: 'Monitor the situation closely and intervene if it affects the team\'s work', score: 3 },
      { label: 'Wait for one of them to bring it up since it is not your place to intervene', score: 2 },
      { label: 'Assume adults can work it out themselves and focus on task management', score: 1 },
    ],
  },
  {
    id: 20, domain: 'social-awareness',
    scenario: 'You are giving a presentation and notice the audience seems disengaged. You:',
    options: [
      { label: 'Adapt in real time by asking a question, sharing a story, or changing your approach', score: 4 },
      { label: 'Pick up the pace and try to regain their attention with more energy', score: 3 },
      { label: 'Notice the disengagement but continue with your prepared material', score: 2 },
      { label: 'Are so focused on your content that you do not notice the audience\'s reaction', score: 1 },
    ],
  },
  {
    id: 21, domain: 'social-awareness',
    scenario: 'A colleague from a different cultural background reacts differently than you expected in a meeting. You:',
    options: [
      { label: 'Consider that cultural differences may be at play and approach the situation with curiosity', score: 4 },
      { label: 'Notice the difference and make a mental note to learn more about their perspective', score: 3 },
      { label: 'Feel confused but do not think to explore cultural factors', score: 2 },
      { label: 'Assume they are being difficult or strange without considering context', score: 1 },
    ],
  },
  {
    id: 22, domain: 'social-awareness',
    scenario: 'You are in a group where someone makes a joke that seems to make another person uncomfortable. You:',
    options: [
      { label: 'Smoothly shift the conversation to a safer topic and check on the uncomfortable person later', score: 4 },
      { label: 'Notice the discomfort and try to change the subject', score: 3 },
      { label: 'Feel the awkwardness but do not know how to intervene', score: 2 },
      { label: 'Laugh along without noticing anyone\'s discomfort', score: 1 },
    ],
  },
  {
    id: 23, domain: 'social-awareness',
    scenario: 'You attend a networking event where you know no one. You:',
    options: [
      { label: 'Read the room, identify approachable groups, and join conversations naturally', score: 4 },
      { label: 'Find someone standing alone and start a friendly conversation', score: 3 },
      { label: 'Hover near the food table and wait for someone to talk to you', score: 2 },
      { label: 'Feel overwhelmed by the social dynamics and leave early', score: 1 },
    ],
  },

  // --- Relationship Management (7 questions) ---
  {
    id: 24, domain: 'relationship-management',
    scenario: 'Two friends come to you separately, each complaining about the other. You:',
    options: [
      { label: 'Listen to both empathetically, avoid taking sides, and encourage them to talk to each other directly', score: 4 },
      { label: 'Validate each person\'s feelings and suggest they work it out together', score: 3 },
      { label: 'Listen to both and inadvertently share one person\'s complaints with the other', score: 2 },
      { label: 'Take the side of whoever you talk to last and get drawn into the drama', score: 1 },
    ],
  },
  {
    id: 25, domain: 'relationship-management',
    scenario: 'You need to give a team member negative feedback about their performance. You:',
    options: [
      { label: 'Prepare specific examples, frame feedback constructively, and collaborate on an improvement plan', score: 4 },
      { label: 'Be honest and direct while showing empathy for their feelings', score: 3 },
      { label: 'Soften the message so much that they may not understand the severity', score: 2 },
      { label: 'Avoid the conversation entirely or deliver it bluntly without regard for their emotions', score: 1 },
    ],
  },
  {
    id: 26, domain: 'relationship-management',
    scenario: 'A family member disagrees strongly with a life choice you have made. You:',
    options: [
      { label: 'Listen to their concerns, validate their feelings, and explain your reasoning with patience', score: 4 },
      { label: 'Hear them out and calmly agree to disagree', score: 3 },
      { label: 'Become defensive and try to convince them you are right', score: 2 },
      { label: 'Cut off the conversation or give them the silent treatment', score: 1 },
    ],
  },
  {
    id: 27, domain: 'relationship-management',
    scenario: 'You are leading a team project and morale is low due to a recent setback. You:',
    options: [
      { label: 'Acknowledge the disappointment openly, reframe the setback as a learning opportunity, and re-energize the team with a revised plan', score: 4 },
      { label: 'Have an honest conversation about the setback and rally the team around next steps', score: 3 },
      { label: 'Ignore the morale issue and push forward with the work', score: 2 },
      { label: 'Blame external factors and express your own frustration to the team', score: 1 },
    ],
  },
  {
    id: 28, domain: 'relationship-management',
    scenario: 'You want to build a stronger relationship with a colleague you do not know well. You:',
    options: [
      { label: 'Find genuine common interests, offer help on a project, and gradually build trust over time', score: 4 },
      { label: 'Invite them for coffee and ask about their interests and background', score: 3 },
      { label: 'Wait for a natural opportunity to interact rather than initiating', score: 2 },
      { label: 'Do not see the value in building workplace relationships beyond what is necessary', score: 1 },
    ],
  },
  {
    id: 29, domain: 'relationship-management',
    scenario: 'You realize you unintentionally hurt a friend\'s feelings with a careless comment. You:',
    options: [
      { label: 'Apologize sincerely, acknowledge the impact without making excuses, and ask how to make it right', score: 4 },
      { label: 'Apologize and explain that you did not mean it the way it sounded', score: 3 },
      { label: 'Feel guilty but avoid bringing it up, hoping they will forget', score: 2 },
      { label: 'Dismiss it as their problem for being too sensitive', score: 1 },
    ],
  },
  {
    id: 30, domain: 'relationship-management',
    scenario: 'You are trying to persuade your team to adopt a new approach, but you face resistance. You:',
    options: [
      { label: 'Listen to their concerns, address each one thoughtfully, and find compromises that honor their input', score: 4 },
      { label: 'Present the benefits clearly and give people time to come around', score: 3 },
      { label: 'Push harder with more data and arguments to overwhelm the resistance', score: 2 },
      { label: 'Become frustrated with the resistance and either give up or force the change through authority', score: 1 },
    ],
  },
];

export const eqDomains: EQDomain[] = [
  {
    domain: 'self-awareness',
    name: 'Self-Awareness',
    description: 'The ability to recognize and understand your own emotions, moods, drives, and their effect on others. Self-aware individuals can accurately assess their strengths and limitations and have a grounded sense of self-confidence. They notice how their feelings influence their thoughts, behavior, and performance.',
    highLabel: 'Highly Self-Aware',
    lowLabel: 'Limited Self-Awareness',
  },
  {
    domain: 'self-management',
    name: 'Self-Management',
    description: 'The ability to regulate your emotions, impulses, and behaviors effectively in different situations. This includes managing stress, controlling impulses, motivating yourself, setting and working toward goals, and adapting to changing circumstances. People with strong self-management can think clearly and stay focused even under pressure.',
    highLabel: 'Excellent Self-Regulation',
    lowLabel: 'Difficulty Managing Emotions',
  },
  {
    domain: 'social-awareness',
    name: 'Social Awareness',
    description: 'The ability to accurately read the emotions, needs, and concerns of other people. This includes picking up on emotional cues, feeling comfortable in social situations, recognizing power dynamics within groups, and understanding different cultural and social norms. Socially aware individuals can sense what others are feeling even when it is unspoken.',
    highLabel: 'Highly Empathetic and Perceptive',
    lowLabel: 'Limited Social Perception',
  },
  {
    domain: 'relationship-management',
    name: 'Relationship Management',
    description: 'The ability to build and maintain healthy relationships, communicate clearly, inspire and influence others, work well in teams, and manage conflict. This is where the other three EQ competencies come together in practice. People skilled in relationship management are effective at building bonds, navigating disagreements, and bringing out the best in others.',
    highLabel: 'Skilled Relationship Builder',
    lowLabel: 'Challenges with Interpersonal Dynamics',
  },
];
