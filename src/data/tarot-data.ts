// =============================================================================
// Tarot Card Data — Complete 78-card deck
// =============================================================================

export interface TarotCard {
  name: string;
  number: number;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  yesOrNo: 'yes' | 'no' | 'maybe';
  element?: string;
  cardSymbol: string;
}

export interface SpreadType {
  name: string;
  slug: string;
  positions: { label: string; description: string }[];
}

// =============================================================================
// Major Arcana (22 cards, numbered 0–21)
// =============================================================================

export const majorArcana: TarotCard[] = [
  {
    name: 'The Fool',
    number: 0,
    arcana: 'major',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    uprightMeaning:
      'The Fool invites you to take a leap of faith and embrace a fresh start with an open heart. This card suggests that new adventures and possibilities are on the horizon, encouraging you to trust the journey even when the path is unclear. You may find that letting go of overthinking allows wonderful surprises to unfold.',
    reversedMeaning:
      'When reversed, The Fool suggests you may be holding back due to fear or recklessness pulling you in unwise directions. This is an invitation to pause and consider whether caution is protecting you or simply keeping you stuck. Trust your inner wisdom to find the balance between spontaneity and prudence.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '🃏',
  },
  {
    name: 'The Magician',
    number: 1,
    arcana: 'major',
    keywords: ['manifestation', 'willpower', 'resourcefulness', 'skill'],
    uprightMeaning:
      'The Magician reminds you that you already possess all the tools and talents needed to create the life you desire. This card suggests a time of powerful manifestation — your intentions, focus, and actions are aligning beautifully. Channel your energy with clarity and confidence, and watch your vision take shape.',
    reversedMeaning:
      'Reversed, The Magician may indicate untapped potential or scattered energy that prevents you from bringing ideas to life. You might be second-guessing your abilities or struggling to focus on what truly matters. Consider grounding yourself and reconnecting with your core intentions before moving forward.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '✦',
  },
  {
    name: 'The High Priestess',
    number: 2,
    arcana: 'major',
    keywords: ['intuition', 'mystery', 'inner knowledge', 'subconscious'],
    uprightMeaning:
      'The High Priestess encourages you to trust your intuition and look beneath the surface for deeper truths. This card suggests that the answers you seek are already within you, waiting to be acknowledged. Take time for quiet reflection and let your inner voice guide you toward clarity.',
    reversedMeaning:
      'Reversed, The High Priestess may point to a disconnection from your inner wisdom or ignoring gut feelings that deserve attention. You might be overwhelmed by external noise, making it difficult to hear your own truth. Creating space for stillness and introspection can help you reconnect with your deeper knowing.',
    yesOrNo: 'maybe',
    element: 'Water',
    cardSymbol: '☽',
  },
  {
    name: 'The Empress',
    number: 3,
    arcana: 'major',
    keywords: ['abundance', 'nurturing', 'fertility', 'nature', 'creativity'],
    uprightMeaning:
      'The Empress signals a period of growth, abundance, and creative flourishing in your life. This card suggests that nurturing yourself and others will lead to beautiful outcomes, much like a garden tended with love. Embrace sensuality, comfort, and the natural flow of creative energy around you.',
    reversedMeaning:
      'Reversed, The Empress may indicate a need to refocus on self-care or address creative blocks that have been building. You might be giving too much to others while neglecting your own well-being. This is a gentle reminder to nourish yourself first so you can share your gifts from a place of fullness.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '♀',
  },
  {
    name: 'The Emperor',
    number: 4,
    arcana: 'major',
    keywords: ['authority', 'structure', 'stability', 'leadership'],
    uprightMeaning:
      'The Emperor represents solid foundations, clear boundaries, and the strength that comes from disciplined action. This card suggests that structure and organization will serve you well right now, helping you build something lasting. You may find that stepping into a leadership role brings both responsibility and deep satisfaction.',
    reversedMeaning:
      'Reversed, The Emperor may suggest rigidity, an overemphasis on control, or authority being exercised without compassion. You might be struggling with power dynamics or feeling confined by too many rules. Consider where flexibility and empathy could strengthen rather than weaken the structures in your life.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '♔',
  },
  {
    name: 'The Hierophant',
    number: 5,
    arcana: 'major',
    keywords: ['tradition', 'wisdom', 'guidance', 'conformity', 'education'],
    uprightMeaning:
      'The Hierophant points to the value of tradition, mentorship, and established systems of knowledge. This card suggests that learning from those who have walked the path before you can offer profound insights. You may find comfort and growth in spiritual practices, formal education, or community rituals.',
    reversedMeaning:
      'Reversed, The Hierophant may indicate a desire to break free from convention or question beliefs that no longer serve your growth. You might be feeling constrained by tradition or seeking a more personal, unconventional path to wisdom. Trust that forging your own spiritual or philosophical way is a valid and powerful choice.',
    yesOrNo: 'maybe',
    element: 'Earth',
    cardSymbol: '⛪',
  },
  {
    name: 'The Lovers',
    number: 6,
    arcana: 'major',
    keywords: ['love', 'harmony', 'choices', 'alignment', 'relationships'],
    uprightMeaning:
      'The Lovers speaks to deep connections, meaningful choices, and the harmony that comes from aligning your heart with your actions. This card suggests a significant relationship or decision that asks you to honor your authentic values. You may find that love, in all its forms, is guiding you toward wholeness.',
    reversedMeaning:
      'Reversed, The Lovers may point to inner conflict, misaligned values, or difficulty making a heartfelt choice. You might be avoiding a decision or experiencing disharmony in an important relationship. This card invites you to reconnect with what truly matters to you and let that clarity guide your next step.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '♥',
  },
  {
    name: 'The Chariot',
    number: 7,
    arcana: 'major',
    keywords: ['determination', 'victory', 'willpower', 'momentum'],
    uprightMeaning:
      'The Chariot heralds a time of forward movement, triumph over obstacles, and the focused determination to reach your goals. This card suggests that combining willpower with emotional intelligence will carry you to success. You may find that channeling opposing forces into a unified direction creates unstoppable momentum.',
    reversedMeaning:
      'Reversed, The Chariot may suggest a loss of direction, feeling pulled in too many directions, or aggression overriding strategy. You might be forcing outcomes rather than flowing with natural momentum. Pausing to realign your intentions and release the need for total control can restore your forward progress.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '⚡',
  },
  {
    name: 'Strength',
    number: 8,
    arcana: 'major',
    keywords: ['courage', 'patience', 'compassion', 'inner strength'],
    uprightMeaning:
      'Strength reminds you that true power comes from gentleness, patience, and compassion rather than brute force. This card suggests you have the inner fortitude to face challenges with grace and quiet confidence. You may find that approaching difficulties with a calm heart yields far better results than fighting them head-on.',
    reversedMeaning:
      'Reversed, Strength may indicate self-doubt, feeling overwhelmed, or struggling to find your inner resilience. You might be experiencing moments where your confidence wavers or raw emotions feel difficult to manage. This card gently encourages you to be patient with yourself and remember that vulnerability is also a form of courage.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '∞',
  },
  {
    name: 'The Hermit',
    number: 9,
    arcana: 'major',
    keywords: ['solitude', 'reflection', 'wisdom', 'inner guidance'],
    uprightMeaning:
      'The Hermit invites you to step away from the noise and turn inward for the answers you seek. This card suggests that a period of quiet contemplation and soul-searching will illuminate your path forward. You may find that the wisdom you discover in solitude becomes a guiding light for yourself and others.',
    reversedMeaning:
      'Reversed, The Hermit may suggest excessive isolation, loneliness, or avoidance of necessary self-reflection. You might be withdrawing too much from the world or, conversely, refusing to take the quiet time you need. Finding the healthy balance between solitude and connection will help restore your inner compass.',
    yesOrNo: 'maybe',
    element: 'Earth',
    cardSymbol: '🏔',
  },
  {
    name: 'Wheel of Fortune',
    number: 10,
    arcana: 'major',
    keywords: ['cycles', 'destiny', 'change', 'luck', 'turning point'],
    uprightMeaning:
      'The Wheel of Fortune signals that the tides are turning in your favor, bringing new opportunities and fortunate developments. This card suggests that life is moving through a natural cycle of change, and embracing it will serve you well. You may find that doors open in unexpected places when you stay open to the flow of destiny.',
    reversedMeaning:
      'Reversed, the Wheel of Fortune may indicate resistance to change or a feeling that circumstances are beyond your control. You might be experiencing a downturn that feels frustrating, but remember that all cycles eventually shift. This is an invitation to find your center amid change and trust that better times are turning toward you.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '☸',
  },
  {
    name: 'Justice',
    number: 11,
    arcana: 'major',
    keywords: ['fairness', 'truth', 'accountability', 'balance'],
    uprightMeaning:
      'Justice calls you to act with integrity, seek truth, and trust that fairness will prevail in your situation. This card suggests that decisions made now carry significant weight and that honest, balanced action will lead to the best outcome. You may find that taking responsibility and being transparent creates harmony in your life.',
    reversedMeaning:
      'Reversed, Justice may point to dishonesty, imbalance, or avoiding accountability for your actions or choices. You might feel that a situation is unfair or that important truths are being hidden. This card encourages you to examine where you can restore balance and align your actions with your deepest sense of what is right.',
    yesOrNo: 'maybe',
    element: 'Air',
    cardSymbol: '⚖',
  },
  {
    name: 'The Hanged Man',
    number: 12,
    arcana: 'major',
    keywords: ['surrender', 'new perspective', 'pause', 'letting go'],
    uprightMeaning:
      'The Hanged Man invites you to pause, shift your perspective, and find wisdom in stillness rather than action. This card suggests that what feels like a delay or sacrifice is actually creating space for a powerful breakthrough. You may find that surrendering your need to control the outcome reveals insights you could never have forced.',
    reversedMeaning:
      'Reversed, The Hanged Man may indicate stalling, unnecessary martyrdom, or resisting the pause that growth requires. You might be delaying important decisions or clinging to a perspective that no longer serves you. This card gently nudges you to either commit to the pause wholeheartedly or release what is holding you in limbo.',
    yesOrNo: 'maybe',
    element: 'Water',
    cardSymbol: '⊥',
  },
  {
    name: 'Death',
    number: 13,
    arcana: 'major',
    keywords: ['transformation', 'endings', 'renewal', 'transition'],
    uprightMeaning:
      'Death represents profound transformation — the ending of one chapter so that a new and more aligned one can begin. This card suggests that releasing what no longer serves you, though sometimes uncomfortable, is essential for your growth. You may find that what feels like an ending is actually the doorway to a beautiful new beginning.',
    reversedMeaning:
      'Reversed, Death may indicate resistance to necessary change or clinging to situations, habits, or identities that have run their course. You might be afraid of the unknown that lies beyond a major transition. This card encourages you to trust the process and remember that transformation, though challenging, always leads to renewal.',
    yesOrNo: 'no',
    element: 'Water',
    cardSymbol: '☥',
  },
  {
    name: 'Temperance',
    number: 14,
    arcana: 'major',
    keywords: ['balance', 'moderation', 'patience', 'harmony', 'healing'],
    uprightMeaning:
      'Temperance encourages you to find the middle path, blending different aspects of your life into a harmonious whole. This card suggests that patience, moderation, and a calm approach will produce the most fulfilling results. You may find that healing and integration happen naturally when you allow things to unfold at their own pace.',
    reversedMeaning:
      'Reversed, Temperance may indicate imbalance, excess, or impatience disrupting the harmony you seek. You might be pushing too hard in one direction or neglecting an important area of your life. This card invites you to step back, reassess your priorities, and gently restore equilibrium to your daily rhythm.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '△',
  },
  {
    name: 'The Devil',
    number: 15,
    arcana: 'major',
    keywords: ['shadow self', 'attachment', 'illusion', 'materialism'],
    uprightMeaning:
      'The Devil illuminates the attachments, habits, or fears that may be limiting your freedom and authentic expression. This card suggests that awareness is the first step to liberation — recognizing where you feel trapped empowers you to make different choices. You may find that what binds you is more illusion than reality, and that freedom is closer than you think.',
    reversedMeaning:
      'Reversed, The Devil signals a powerful moment of breaking free from limiting patterns, addictions, or toxic dynamics. You might be in the process of reclaiming your power and releasing what once held you captive. This card celebrates your courage to face your shadows and step into greater personal freedom.',
    yesOrNo: 'no',
    element: 'Earth',
    cardSymbol: '⛓',
  },
  {
    name: 'The Tower',
    number: 16,
    arcana: 'major',
    keywords: ['upheaval', 'revelation', 'awakening', 'sudden change'],
    uprightMeaning:
      'The Tower signals a sudden shift or revelation that, while startling, clears away what was built on unstable foundations. This card suggests that breakdowns often precede breakthroughs, making room for something more authentic and resilient. You may find that what initially feels like disruption is actually a liberation that redirects you toward your true path.',
    reversedMeaning:
      'Reversed, The Tower may indicate an internal transformation or a delayed upheaval that you sense is coming. You might be resisting a necessary change or trying to hold together something that needs to be released. This card encourages you to let go gracefully rather than waiting for external forces to make the shift for you.',
    yesOrNo: 'no',
    element: 'Fire',
    cardSymbol: '↯',
  },
  {
    name: 'The Star',
    number: 17,
    arcana: 'major',
    keywords: ['hope', 'inspiration', 'renewal', 'serenity', 'faith'],
    uprightMeaning:
      'The Star shines as a beacon of hope, healing, and renewed faith after a period of difficulty or uncertainty. This card suggests that you are entering a time of peace, inspiration, and gentle recovery. You may find that reconnecting with your dreams and trusting in the universe restores your sense of purpose and optimism.',
    reversedMeaning:
      'Reversed, The Star may indicate a temporary loss of hope, disconnection from your inspiration, or difficulty seeing the light ahead. You might be feeling discouraged or questioning whether your dreams are truly possible. This card gently reminds you that even when the stars seem hidden, they are always there — your faith will return.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '★',
  },
  {
    name: 'The Moon',
    number: 18,
    arcana: 'major',
    keywords: ['illusion', 'intuition', 'subconscious', 'anxiety', 'dreams'],
    uprightMeaning:
      'The Moon invites you to navigate the realm of emotions, dreams, and intuition with courage and openness. This card suggests that not everything is as it appears, and trusting your instincts will help you find your way through uncertainty. You may find that honoring your emotional depth and paying attention to dreams reveals important truths.',
    reversedMeaning:
      'Reversed, The Moon may indicate that confusion is lifting and clarity is beginning to emerge from a murky situation. You might be releasing fears, anxieties, or illusions that have clouded your judgment. This card signals a welcome shift toward understanding and the courage to face what was once hidden in shadow.',
    yesOrNo: 'maybe',
    element: 'Water',
    cardSymbol: '☾',
  },
  {
    name: 'The Sun',
    number: 19,
    arcana: 'major',
    keywords: ['joy', 'success', 'vitality', 'positivity', 'confidence'],
    uprightMeaning:
      'The Sun radiates warmth, joy, and the assurance that brighter days are here or fast approaching. This card suggests a time of success, vitality, and the kind of happiness that comes from living authentically. You may find that optimism and confidence light the way to wonderful experiences and heartfelt connections.',
    reversedMeaning:
      'Reversed, The Sun may indicate that your inner light is temporarily dimmed by self-doubt or external circumstances. You might be struggling to feel the joy and confidence that are your birthright. This card encourages you to seek out what brings you genuine happiness and trust that your radiance will shine through again soon.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '☀',
  },
  {
    name: 'Judgement',
    number: 20,
    arcana: 'major',
    keywords: ['reflection', 'reckoning', 'awakening', 'purpose', 'calling'],
    uprightMeaning:
      'Judgement signals a profound moment of self-evaluation, awakening, and answering a higher calling in your life. This card suggests that you are being invited to reflect on your journey and rise to a new level of purpose and authenticity. You may find that embracing this moment of reckoning leads to powerful personal transformation and renewal.',
    reversedMeaning:
      'Reversed, Judgement may indicate self-doubt, avoidance of an important inner reckoning, or difficulty hearing your true calling. You might be harshly judging yourself or ignoring the lessons your experiences have offered. This card encourages compassionate self-reflection and the willingness to forgive yourself as part of your growth.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '⚜',
  },
  {
    name: 'The World',
    number: 21,
    arcana: 'major',
    keywords: ['completion', 'fulfillment', 'wholeness', 'accomplishment'],
    uprightMeaning:
      'The World celebrates the successful completion of a major cycle, bringing a deep sense of fulfillment and wholeness. This card suggests that you have integrated important lessons and are ready to enjoy the rewards of your journey. You may find that this moment of accomplishment opens the door to an exciting new chapter.',
    reversedMeaning:
      'Reversed, The World may indicate that a project or life phase feels incomplete, or that you are struggling to find closure. You might be so close to finishing something important but feel held back by lingering loose ends. This card encourages you to address what remains unfinished so you can fully step into the next stage of your journey.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⊕',
  },
];

// =============================================================================
// Minor Arcana — Wands (Fire)
// =============================================================================

const wands: TarotCard[] = [
  {
    name: 'Ace of Wands',
    number: 1,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['inspiration', 'new venture', 'spark', 'potential'],
    uprightMeaning:
      'A powerful spark of creative inspiration is lighting the way to a bold new venture. This card suggests seizing the moment and channeling your passion into action.',
    reversedMeaning:
      'You may feel creatively blocked or hesitant to pursue an exciting idea. Consider what is dampening your spark and take small steps to reignite your enthusiasm.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🪄',
  },
  {
    name: 'Two of Wands',
    number: 2,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['planning', 'vision', 'decisions', 'discovery'],
    uprightMeaning:
      'You stand at a crossroads with exciting possibilities stretching before you. This card suggests taking time to plan your next move and envisioning the bigger picture.',
    reversedMeaning:
      'You may be struggling with indecision or fear of stepping outside your comfort zone. Trust your vision and allow yourself to explore uncharted territory.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Three of Wands',
    number: 3,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['expansion', 'foresight', 'progress', 'growth'],
    uprightMeaning:
      'Your plans are taking shape and early efforts are beginning to bear fruit. This card suggests that expanding your horizons and thinking long-term will pay off.',
    reversedMeaning:
      'Delays or obstacles may be testing your patience with a project or plan. Revisit your strategy and stay committed — the momentum will return.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Four of Wands',
    number: 4,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['celebration', 'harmony', 'homecoming', 'milestones'],
    uprightMeaning:
      'A time of joyful celebration, stability, and shared happiness is upon you. This card suggests honoring your achievements and enjoying the warmth of community.',
    reversedMeaning:
      'You may feel a lack of harmony at home or be struggling to celebrate your progress. Reconnect with what makes you feel secure and appreciated.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Five of Wands',
    number: 5,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['competition', 'conflict', 'tension', 'diversity'],
    uprightMeaning:
      'Healthy competition or differing opinions may be creating dynamic tension around you. This card suggests that constructive debate can lead to stronger outcomes.',
    reversedMeaning:
      'Internal conflict or avoidance of necessary confrontation may be draining your energy. Finding common ground or releasing the need to compete can restore your peace.',
    yesOrNo: 'no',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Six of Wands',
    number: 6,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['victory', 'recognition', 'success', 'confidence'],
    uprightMeaning:
      'You are being recognized for your efforts and riding a wave of well-earned success. This card suggests embracing the spotlight and letting your achievements inspire others.',
    reversedMeaning:
      'You may be seeking external validation or feeling overlooked despite your hard work. Remember that true confidence comes from within, regardless of outside applause.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Seven of Wands',
    number: 7,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['perseverance', 'defense', 'standing ground', 'courage'],
    uprightMeaning:
      'You are being called to stand your ground and defend your position with conviction. This card suggests that perseverance and courage will see you through current challenges.',
    reversedMeaning:
      'You may feel overwhelmed by opposition or tempted to give up on something important. Consider whether this battle is truly yours to fight or whether strategic retreat is wiser.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Eight of Wands',
    number: 8,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['speed', 'momentum', 'progress', 'action'],
    uprightMeaning:
      'Things are moving quickly and exciting developments are unfolding at a rapid pace. This card suggests riding the wave of momentum and staying open to swift opportunities.',
    reversedMeaning:
      'Delays, miscommunications, or a feeling of stagnation may be frustrating you. Patience is key — the pace will pick up again when the timing is right.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Nine of Wands',
    number: 9,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['resilience', 'persistence', 'boundaries', 'endurance'],
    uprightMeaning:
      'You have been through a lot and your resilience is truly remarkable. This card suggests that you are close to the finish line — keep going and protect your boundaries.',
    reversedMeaning:
      'Exhaustion or stubbornness may be preventing you from seeing that it is safe to let your guard down. Rest and recovery are not signs of weakness but of wisdom.',
    yesOrNo: 'maybe',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Ten of Wands',
    number: 10,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['burden', 'responsibility', 'hard work', 'overwhelm'],
    uprightMeaning:
      'You may be carrying a heavy load of responsibilities that is weighing you down. This card suggests delegating, prioritizing, or releasing tasks that are no longer essential.',
    reversedMeaning:
      'You are beginning to release burdens and lighten your load, finding relief from overcommitment. Allow yourself to let go of obligations that drain rather than fulfill you.',
    yesOrNo: 'no',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Page of Wands',
    number: 11,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['enthusiasm', 'exploration', 'curiosity', 'free spirit'],
    uprightMeaning:
      'A burst of youthful enthusiasm and curiosity is inspiring you to explore new ideas and adventures. This card suggests saying yes to opportunities that excite your spirit.',
    reversedMeaning:
      'You may feel directionless or hesitant to pursue a creative calling. Reconnect with what genuinely excites you and take that first small, playful step.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Knight of Wands',
    number: 12,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['adventure', 'energy', 'passion', 'impulsiveness'],
    uprightMeaning:
      'Bold energy and passionate action are driving you forward toward an exciting goal. This card suggests channeling your adventurous spirit with just enough focus to reach your destination.',
    reversedMeaning:
      'Impulsiveness or scattered energy may be undermining your progress. Slow down enough to set clear intentions before charging ahead.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'Queen of Wands',
    number: 13,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['confidence', 'warmth', 'determination', 'vibrancy'],
    uprightMeaning:
      'You are embodying radiant confidence, warmth, and magnetic charisma. This card suggests leading with your heart, inspiring others, and trusting your creative vision.',
    reversedMeaning:
      'You may be feeling insecure or struggling to express your vibrant nature. Reconnect with your inner fire and remember the powerful, inspiring person you truly are.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
  {
    name: 'King of Wands',
    number: 14,
    arcana: 'minor',
    suit: 'wands',
    keywords: ['leadership', 'vision', 'boldness', 'entrepreneurship'],
    uprightMeaning:
      'You are stepping into a role of visionary leadership, inspiring others with your boldness and creative direction. This card suggests trusting your ability to lead with integrity and passion.',
    reversedMeaning:
      'You may be acting too forcefully or struggling with the responsibilities of leadership. Consider leading through inspiration and collaboration rather than dominance.',
    yesOrNo: 'yes',
    element: 'Fire',
    cardSymbol: '🔥',
  },
];

// =============================================================================
// Minor Arcana — Cups (Water)
// =============================================================================

const cups: TarotCard[] = [
  {
    name: 'Ace of Cups',
    number: 1,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['love', 'new feelings', 'emotional awakening', 'compassion'],
    uprightMeaning:
      'A beautiful new emotional beginning is flowing into your life, bringing love, compassion, and deep connection. This card suggests opening your heart and welcoming the feelings that arise.',
    reversedMeaning:
      'You may be blocking emotional flow or struggling to accept love and vulnerability. Gently allow yourself to feel and trust that opening up is safe.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '🏆',
  },
  {
    name: 'Two of Cups',
    number: 2,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['partnership', 'connection', 'mutual respect', 'unity'],
    uprightMeaning:
      'A meaningful partnership or deep mutual connection is forming, built on respect and genuine affection. This card suggests nurturing this bond with honesty and care.',
    reversedMeaning:
      'An imbalance or miscommunication may be affecting an important relationship. Open and honest dialogue can help restore harmony and understanding.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Three of Cups',
    number: 3,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['friendship', 'celebration', 'community', 'joy'],
    uprightMeaning:
      'Joyful gatherings, meaningful friendships, and shared celebrations are filling your life with warmth. This card suggests embracing community and the happiness found in togetherness.',
    reversedMeaning:
      'You may be feeling socially isolated or experiencing tension within a friend group. Reaching out and being vulnerable can help rebuild those important connections.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Four of Cups',
    number: 4,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['contemplation', 'apathy', 'reevaluation', 'meditation'],
    uprightMeaning:
      'You may be feeling emotionally withdrawn or disconnected from opportunities right in front of you. This card suggests pausing for contemplation while remaining open to unexpected gifts.',
    reversedMeaning:
      'A renewed sense of motivation and appreciation is emerging after a period of emotional stagnation. You are ready to reengage with life and embrace new possibilities.',
    yesOrNo: 'no',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Five of Cups',
    number: 5,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['grief', 'loss', 'regret', 'healing'],
    uprightMeaning:
      'You may be processing feelings of loss, disappointment, or regret that deserve to be honored. This card gently reminds you that while grief is natural, there is still much to be grateful for and hope to be found.',
    reversedMeaning:
      'Healing is beginning as you shift your focus from what was lost to what remains and what is possible. You are finding the strength to move forward with renewed perspective.',
    yesOrNo: 'no',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Six of Cups',
    number: 6,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['nostalgia', 'innocence', 'memories', 'kindness'],
    uprightMeaning:
      'Sweet memories, nostalgia, and the innocent joy of simpler times are calling to you. This card suggests reconnecting with your inner child and the people and places that shaped you.',
    reversedMeaning:
      'You may be living in the past or clinging to memories at the expense of present growth. Honoring the past while embracing the present allows you to move forward freely.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Seven of Cups',
    number: 7,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['choices', 'fantasy', 'illusion', 'imagination'],
    uprightMeaning:
      'Many enticing options and possibilities are presenting themselves, some realistic and some illusory. This card suggests using discernment to distinguish genuine opportunities from wishful thinking.',
    reversedMeaning:
      'Clarity is emerging from confusion as you narrow your focus and commit to what is real. You are grounding your dreams in practical, achievable steps.',
    yesOrNo: 'maybe',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Eight of Cups',
    number: 8,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['departure', 'seeking', 'courage', 'letting go'],
    uprightMeaning:
      'You are being called to walk away from something that no longer fulfills you in search of deeper meaning. This card suggests that the courage to leave behind the familiar leads to profound personal growth.',
    reversedMeaning:
      'You may be afraid to leave a comfortable but unfulfilling situation, or you are returning to complete unfinished emotional business. Listen to your heart about what truly nourishes you.',
    yesOrNo: 'no',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Nine of Cups',
    number: 9,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['contentment', 'satisfaction', 'wishes fulfilled', 'gratitude'],
    uprightMeaning:
      'Your emotional wishes are coming true and a deep sense of contentment and satisfaction fills your heart. This card suggests savoring this beautiful moment and sharing your joy with others.',
    reversedMeaning:
      'You may be seeking happiness in external things or feeling that something is missing despite apparent success. True fulfillment comes from aligning with your authentic desires.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Ten of Cups',
    number: 10,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['harmony', 'family', 'happiness', 'emotional fulfillment'],
    uprightMeaning:
      'Deep emotional fulfillment, family harmony, and lasting happiness are blessing your life. This card suggests that you are experiencing or approaching the kind of joy that comes from loving relationships and inner peace.',
    reversedMeaning:
      'Family tensions or unrealistic expectations about what happiness should look like may be causing disappointment. Focus on building genuine connections rather than chasing an idealized vision.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Page of Cups',
    number: 11,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['creativity', 'sensitivity', 'wonder', 'new emotions'],
    uprightMeaning:
      'A tender new emotional experience or creative inspiration is emerging, inviting you to explore with childlike wonder. This card suggests staying open to messages from your heart and imagination.',
    reversedMeaning:
      'You may be suppressing your creative or emotional side, or feeling overly sensitive. Allow yourself to feel without judgment and express your inner world gently.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Knight of Cups',
    number: 12,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['romance', 'charm', 'idealism', 'following the heart'],
    uprightMeaning:
      'A romantic, charming energy is entering your life, encouraging you to follow your heart and pursue your dreams. This card suggests leading with emotion and trusting the beauty of your ideals.',
    reversedMeaning:
      'Unrealistic expectations or moodiness may be clouding your emotional judgment. Balance your idealism with practical awareness to avoid disappointment.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'Queen of Cups',
    number: 13,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['compassion', 'intuition', 'emotional depth', 'nurturing'],
    uprightMeaning:
      'You are radiating deep compassion, intuitive wisdom, and emotional intelligence. This card suggests trusting your feelings and offering your nurturing presence to yourself and others.',
    reversedMeaning:
      'You may be emotionally overwhelmed or giving too much of yourself at the expense of your own well-being. Set healthy emotional boundaries and prioritize your own inner peace.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
  {
    name: 'King of Cups',
    number: 14,
    arcana: 'minor',
    suit: 'cups',
    keywords: ['emotional maturity', 'diplomacy', 'calm', 'wisdom'],
    uprightMeaning:
      'You are mastering the balance between heart and mind, leading with emotional maturity and calm composure. This card suggests that your ability to remain centered amid turbulence is a gift to those around you.',
    reversedMeaning:
      'Emotional suppression or manipulation may be undermining your relationships. Allow yourself to feel authentically and communicate your needs with openness and honesty.',
    yesOrNo: 'yes',
    element: 'Water',
    cardSymbol: '💧',
  },
];

// =============================================================================
// Minor Arcana — Swords (Air)
// =============================================================================

const swords: TarotCard[] = [
  {
    name: 'Ace of Swords',
    number: 1,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['clarity', 'truth', 'breakthrough', 'new idea'],
    uprightMeaning:
      'A powerful moment of mental clarity and truth is cutting through confusion and revealing the way forward. This card suggests embracing new ideas and communicating with honesty and precision.',
    reversedMeaning:
      'Clouded thinking or miscommunication may be preventing a breakthrough. Take time to gather your thoughts and seek the truth before making important decisions.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Two of Swords',
    number: 2,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['indecision', 'stalemate', 'difficult choices', 'avoidance'],
    uprightMeaning:
      'You are facing a difficult decision that requires balancing logic and intuition. This card suggests that avoiding the choice will not make it disappear — trust yourself to decide.',
    reversedMeaning:
      'The mental stalemate is beginning to break as new information or inner clarity comes to light. You are ready to face the truth and make a thoughtful choice.',
    yesOrNo: 'maybe',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Three of Swords',
    number: 3,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['heartbreak', 'grief', 'sorrow', 'painful truth'],
    uprightMeaning:
      'Emotional pain or a difficult truth may be weighing on your heart right now. This card acknowledges your suffering and reminds you that processing grief is an essential part of healing and growth.',
    reversedMeaning:
      'You are beginning to heal from a painful experience and finding the strength to release old sorrows. Recovery takes time — be patient and compassionate with yourself.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Four of Swords',
    number: 4,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['rest', 'recovery', 'contemplation', 'retreat'],
    uprightMeaning:
      'Your mind and body are calling for rest, recovery, and quiet contemplation. This card suggests stepping back from the demands of daily life to recharge and restore your mental clarity.',
    reversedMeaning:
      'You may be resisting the rest you need or feeling restless during a necessary recovery period. Honor your need for downtime — it is not laziness, it is wisdom.',
    yesOrNo: 'maybe',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Five of Swords',
    number: 5,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['conflict', 'defeat', 'ego', 'choosing battles'],
    uprightMeaning:
      'A conflict or power struggle may be leaving everyone feeling depleted rather than victorious. This card suggests choosing your battles wisely and considering whether winning is worth the cost.',
    reversedMeaning:
      'You may be ready to move past a conflict, seek reconciliation, or release the need to be right. Letting go of ego-driven battles opens the door to genuine peace.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Six of Swords',
    number: 6,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['transition', 'moving on', 'recovery', 'calmer waters'],
    uprightMeaning:
      'You are leaving behind a difficult situation and moving toward calmer, more peaceful waters. This card suggests that though the journey may feel bittersweet, brighter horizons await.',
    reversedMeaning:
      'You may be struggling to let go of the past or finding it hard to move forward from a painful situation. Give yourself permission to grieve while gently steering toward healing.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Seven of Swords',
    number: 7,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['strategy', 'stealth', 'cunning', 'resourcefulness'],
    uprightMeaning:
      'A situation calls for strategic thinking, discretion, and a clever approach rather than direct confrontation. This card suggests using your wits and being mindful of who you trust.',
    reversedMeaning:
      'Deception may be coming to light, or you may be ready to drop a facade and approach a situation with full honesty. Authenticity and transparency will serve you far better than cunning.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Eight of Swords',
    number: 8,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['restriction', 'self-imposed limits', 'trapped', 'victim mentality'],
    uprightMeaning:
      'You may feel trapped or restricted, but this card suggests that many of these limitations are self-imposed. Shifting your perspective and challenging negative thought patterns can reveal the freedom that already surrounds you.',
    reversedMeaning:
      'You are breaking free from mental restrictions and reclaiming your power to choose. The blindfold is lifting and you can see that the path forward is more open than you believed.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Nine of Swords',
    number: 9,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['anxiety', 'worry', 'fear', 'nightmares'],
    uprightMeaning:
      'Anxiety, worry, or sleepless nights may be weighing heavily on your mind. This card acknowledges your distress and gently suggests that many of your fears are larger in your mind than in reality.',
    reversedMeaning:
      'The worst of your worry is beginning to pass as you find healthier ways to cope with anxiety. Reaching out for support and practicing self-compassion are powerful steps toward peace of mind.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Ten of Swords',
    number: 10,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['ending', 'rock bottom', 'release', 'new dawn'],
    uprightMeaning:
      'A painful ending or the lowest point of a difficult cycle has been reached, but the only way from here is up. This card suggests that releasing what has run its course makes space for a powerful new beginning.',
    reversedMeaning:
      'Recovery and renewal are underway as you rise from a challenging period with hard-won wisdom. You are learning that even the most difficult endings carry the seeds of new beginnings.',
    yesOrNo: 'no',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Page of Swords',
    number: 11,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['curiosity', 'wit', 'communication', 'vigilance'],
    uprightMeaning:
      'A sharp, curious mind is eager to learn, communicate, and explore new ideas. This card suggests staying alert, asking questions, and pursuing knowledge with youthful enthusiasm.',
    reversedMeaning:
      'You may be using words carelessly or letting gossip and overthinking cloud your clarity. Channel your mental energy into constructive communication and meaningful inquiry.',
    yesOrNo: 'maybe',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Knight of Swords',
    number: 12,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['ambition', 'action', 'drive', 'assertiveness'],
    uprightMeaning:
      'Bold, decisive energy is propelling you toward your goals with speed and determination. This card suggests taking action with conviction while remaining mindful of how your words and deeds affect others.',
    reversedMeaning:
      'Reckless haste or harsh communication may be creating unintended consequences. Slow down and ensure your drive is tempered with empathy and consideration.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'Queen of Swords',
    number: 13,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['clarity', 'independence', 'perception', 'honest communication'],
    uprightMeaning:
      'You are thinking and communicating with remarkable clarity, independence, and perceptiveness. This card suggests trusting your sharp intellect and speaking your truth with grace.',
    reversedMeaning:
      'You may be coming across as overly critical or emotionally guarded. Balancing your keen intellect with warmth and empathy will strengthen your connections with others.',
    yesOrNo: 'yes',
    element: 'Air',
    cardSymbol: '⚔',
  },
  {
    name: 'King of Swords',
    number: 14,
    arcana: 'minor',
    suit: 'swords',
    keywords: ['intellect', 'authority', 'truth', 'ethical leadership'],
    uprightMeaning:
      'You are embodying intellectual authority, clear judgment, and ethical leadership. This card suggests making decisions based on logic and fairness while upholding your principles.',
    reversedMeaning:
      'You may be wielding intellectual power without compassion or using logic to justify unkind behavior. True wisdom includes both sharp thinking and a caring heart.',
    yesOrNo: 'maybe',
    element: 'Air',
    cardSymbol: '⚔',
  },
];

// =============================================================================
// Minor Arcana — Pentacles (Earth)
// =============================================================================

const pentacles: TarotCard[] = [
  {
    name: 'Ace of Pentacles',
    number: 1,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['opportunity', 'prosperity', 'new venture', 'abundance'],
    uprightMeaning:
      'A wonderful new opportunity for financial growth, stability, or material abundance is presenting itself. This card suggests planting seeds for long-term prosperity and making the most of this promising beginning.',
    reversedMeaning:
      'A financial opportunity may be slipping away or you may be struggling to get a new venture off the ground. Reassess your approach and ensure your foundations are solid before investing further.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Two of Pentacles',
    number: 2,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['balance', 'adaptability', 'juggling', 'flexibility'],
    uprightMeaning:
      'You are skillfully juggling multiple responsibilities, finances, or priorities with grace and adaptability. This card suggests staying flexible and trusting your ability to manage the balancing act.',
    reversedMeaning:
      'You may be overwhelmed by too many demands or struggling to find equilibrium in your commitments. Prioritize what matters most and let go of what you cannot sustain.',
    yesOrNo: 'maybe',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Three of Pentacles',
    number: 3,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['teamwork', 'collaboration', 'craftsmanship', 'learning'],
    uprightMeaning:
      'Collaboration, skilled work, and shared effort are producing excellent results. This card suggests that working with others and valuing each person\'s expertise will elevate the quality of your endeavors.',
    reversedMeaning:
      'Poor teamwork, miscommunication, or lack of recognition for your contributions may be causing frustration. Address these issues openly and ensure everyone is aligned on goals and roles.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Four of Pentacles',
    number: 4,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['security', 'control', 'conservation', 'stability'],
    uprightMeaning:
      'You are focused on building security and protecting what you have worked hard to earn. This card suggests that while saving and stability are important, holding on too tightly can prevent growth.',
    reversedMeaning:
      'You may be ready to loosen your grip on material security and share your resources more freely. Generosity and openness can bring unexpected abundance and deeper fulfillment.',
    yesOrNo: 'maybe',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Five of Pentacles',
    number: 5,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['hardship', 'insecurity', 'worry', 'recovery'],
    uprightMeaning:
      'You may be experiencing financial difficulty, insecurity, or a sense of being left out in the cold. This card reminds you that help and warmth are closer than they appear — do not be afraid to ask for support.',
    reversedMeaning:
      'Recovery from a period of hardship is beginning and the light at the end of the tunnel is growing brighter. You are finding your way back to stability and regaining confidence in your ability to provide for yourself.',
    yesOrNo: 'no',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Six of Pentacles',
    number: 6,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['generosity', 'giving', 'receiving', 'sharing', 'charity'],
    uprightMeaning:
      'A beautiful flow of generosity is moving through your life, whether you are giving or receiving. This card suggests that sharing resources, time, and kindness creates a cycle of abundance for everyone involved.',
    reversedMeaning:
      'Imbalance in giving and receiving may be creating tension or resentment. Consider whether generosity is flowing both ways and whether you are honoring your own needs alongside those of others.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Seven of Pentacles',
    number: 7,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['patience', 'investment', 'evaluation', 'long-term vision'],
    uprightMeaning:
      'Your patient efforts and investments are beginning to show results, though the full harvest has not yet arrived. This card suggests continuing to nurture your goals while taking stock of your progress.',
    reversedMeaning:
      'Frustration with slow progress or doubts about your long-term investments may be testing your patience. Reassess your strategy and make sure you are cultivating the right seeds for your desired future.',
    yesOrNo: 'maybe',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Eight of Pentacles',
    number: 8,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['skill', 'mastery', 'diligence', 'craftsmanship'],
    uprightMeaning:
      'Dedicated practice, attention to detail, and a commitment to mastery are leading to impressive growth. This card suggests continuing to hone your skills and take pride in the quality of your work.',
    reversedMeaning:
      'Perfectionism, boredom, or a lack of motivation may be interfering with your progress. Consider whether your current path still inspires you or if it is time to explore new skills.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Nine of Pentacles',
    number: 9,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['luxury', 'self-sufficiency', 'achievement', 'refinement'],
    uprightMeaning:
      'You have reached a place of comfortable self-sufficiency, enjoying the rewards of your hard work and discipline. This card suggests savoring the finer things in life and appreciating how far you have come.',
    reversedMeaning:
      'You may be overworking yourself or feeling that material success has not brought the fulfillment you expected. Consider what true abundance means to you beyond financial measures.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Ten of Pentacles',
    number: 10,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['wealth', 'legacy', 'family', 'long-term success'],
    uprightMeaning:
      'Lasting wealth, a strong family foundation, and a meaningful legacy are themes in your life right now. This card suggests building something that will endure and benefit generations to come.',
    reversedMeaning:
      'Family financial tensions or concerns about long-term security may be weighing on your mind. Focus on what truly creates lasting value — relationships, shared purpose, and thoughtful planning.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Page of Pentacles',
    number: 11,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['ambition', 'studiousness', 'new opportunity', 'practicality'],
    uprightMeaning:
      'A fresh opportunity for learning, growth, or financial improvement is catching your attention. This card suggests approaching it with diligence, curiosity, and a practical mindset.',
    reversedMeaning:
      'You may be procrastinating on an important opportunity or struggling to follow through on practical goals. Small, consistent actions will build the momentum you need.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Knight of Pentacles',
    number: 12,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['reliability', 'hard work', 'routine', 'dedication'],
    uprightMeaning:
      'Steady, methodical effort and unwavering dedication are carrying you toward your practical goals. This card suggests that reliability and patience are your greatest assets right now.',
    reversedMeaning:
      'You may be stuck in a rut or taking a overly cautious approach that is slowing your progress. Consider where a little more flexibility or risk-taking could reinvigorate your journey.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'Queen of Pentacles',
    number: 13,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['nurturing', 'abundance', 'practicality', 'comfort'],
    uprightMeaning:
      'You are creating a warm, abundant, and well-organized life through practical wisdom and genuine care for others. This card suggests balancing material comfort with heartfelt generosity.',
    reversedMeaning:
      'You may be neglecting self-care while taking care of everyone else, or feeling disconnected from your sense of abundance. Nurture yourself with the same devotion you give to others.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
  {
    name: 'King of Pentacles',
    number: 14,
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['wealth', 'business', 'leadership', 'discipline', 'abundance'],
    uprightMeaning:
      'You are embodying financial mastery, practical leadership, and the steady hand of someone who builds lasting prosperity. This card suggests leading by example and sharing your material wisdom generously.',
    reversedMeaning:
      'Materialism, stubbornness, or an overly controlling approach to finances may be limiting your fulfillment. Remember that true wealth includes health, relationships, and peace of mind.',
    yesOrNo: 'yes',
    element: 'Earth',
    cardSymbol: '⬠',
  },
];

// =============================================================================
// Combined Minor Arcana
// =============================================================================

export const minorArcana: TarotCard[] = [...wands, ...cups, ...swords, ...pentacles];

// =============================================================================
// All Cards Combined
// =============================================================================

export const allCards: TarotCard[] = [...majorArcana, ...minorArcana];

// =============================================================================
// Spread Types
// =============================================================================

export const spreadTypes: SpreadType[] = [
  {
    name: 'Single Card',
    slug: 'single',
    positions: [
      {
        label: 'Daily Guidance',
        description:
          'This single card offers insight, advice, or a theme for your day. Let its message guide your focus and intentions.',
      },
    ],
  },
  {
    name: 'Three-Card Spread',
    slug: 'three-card',
    positions: [
      {
        label: 'Past',
        description:
          'This card reflects the energies, events, or influences from your past that are shaping your current situation.',
      },
      {
        label: 'Present',
        description:
          'This card illuminates your current circumstances, challenges, and the energy that surrounds you right now.',
      },
      {
        label: 'Future',
        description:
          'This card reveals the likely direction or outcome based on the current path, offering guidance for what lies ahead.',
      },
    ],
  },
  {
    name: 'Five-Card Spread',
    slug: 'five-card',
    positions: [
      {
        label: 'Situation',
        description:
          'This card describes the core of your current situation and the primary energy at play.',
      },
      {
        label: 'Challenge',
        description:
          'This card highlights the main obstacle, difficulty, or area of tension you are navigating.',
      },
      {
        label: 'Advice',
        description:
          'This card offers guidance and practical wisdom for how to approach your situation most effectively.',
      },
      {
        label: 'Outcome',
        description:
          'This card suggests the most likely result based on the current trajectory and the choices available to you.',
      },
      {
        label: 'Theme',
        description:
          'This card captures the overarching theme or deeper lesson that ties the entire reading together.',
      },
    ],
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Randomly draw a specified number of cards from the full 78-card deck.
 * Each drawn card is assigned a random upright or reversed orientation.
 * Cards are drawn without replacement (no duplicates).
 */
export function drawCards(
  count: number
): { card: TarotCard; reversed: boolean }[] {
  if (count < 1) return [];
  const clampedCount = Math.min(count, allCards.length);

  // Fisher-Yates shuffle on a copy of the indices
  const indices = allCards.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, clampedCount).map((idx) => ({
    card: allCards[idx],
    reversed: Math.random() < 0.5,
  }));
}

/**
 * Find a card by its name (case-insensitive).
 */
export function getCardByName(name: string): TarotCard | undefined {
  const lower = name.toLowerCase().trim();
  return allCards.find((card) => card.name.toLowerCase() === lower);
}

/**
 * Get all cards belonging to a specific suit.
 */
export function getSuitCards(suit: string): TarotCard[] {
  const lower = suit.toLowerCase().trim();
  return minorArcana.filter((card) => card.suit === lower);
}

/**
 * Get all 22 Major Arcana cards.
 */
export function getMajorArcana(): TarotCard[] {
  return majorArcana;
}
