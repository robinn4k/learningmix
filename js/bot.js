/**
 * bot.js — Local AI bot opponent for 1v1 Duel mode
 * No Firebase needed — all logic runs client-side.
 */

export const BOT_NAMES = ['Barbot 🤖', 'ShakerAI 🍸', 'CocktailBot 🍹', 'MixMaster 🤖'];

export const DIFFICULTIES = {
  easy:   { labelKey: 'duel.easy',   accuracy: 0.30, minTime: 12, maxTime: 19 },
  medium: { labelKey: 'duel.medium', accuracy: 0.60, minTime: 6,  maxTime: 15 },
  hard:   { labelKey: 'duel.hard',   accuracy: 0.85, minTime: 2,  maxTime: 10 },
};

/** Pick a random bot display name */
export function getBotName() {
  return BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
}

/**
 * Pre-compute bot's answer for a question before rendering.
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 * @returns {{ correct: boolean, answerTime: number }} answerTime in seconds (within 20s)
 */
export function scheduleBotAnswer(difficulty) {
  const d = DIFFICULTIES[difficulty] || DIFFICULTIES.medium;
  return {
    correct: Math.random() < d.accuracy,
    answerTime: d.minTime + Math.random() * (d.maxTime - d.minTime),
  };
}
