import { getLocalizedRounds } from './questions.js';
import { getLang } from './lang.js';

const KEY = 'cq_daily';

// Deterministic PRNG seeded by date integer (YYYYMMDD)
function seededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
}

function todaySeed() {
  const d = new Date();
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC-consistent
}

export function getDailyStatus() {
  const today = todayUTC();
  try {
    const data = JSON.parse(localStorage.getItem(KEY)) || {};
    return { played: data.date === today, score: data.score || 0, corrects: data.corrects || 0 };
  } catch { return { played: false, score: 0, corrects: 0 }; }
}

export function getDailyQuestions() {
  const rng = seededRng(todaySeed());
  const all = getLocalizedRounds(getLang()).flatMap(r => r.questions);

  // Seeded shuffle
  const pool = [...all];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, 10).map(q => {
    const correct = q.a[0];
    const answers = [...q.a];
    // Seeded answer shuffle
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return { question: q.q, answers, correctIndex: answers.indexOf(correct), explanation: q.exp };
  });
}

export function saveDailyResult(score, corrects) {
  localStorage.setItem(KEY, JSON.stringify({ date: todayUTC(), score, corrects }));
}
