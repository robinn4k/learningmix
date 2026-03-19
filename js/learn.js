import { getLocalizedRounds } from './questions.js';
import { getLang } from './lang.js';

// ─── Storage ──────────────────────────────────────────────────
const KEY = 'cq_learn_data';

function getData() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

function setData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ─── Stats ────────────────────────────────────────────────────
export function getLearnStats() {
  const d = getData();
  return { xp: d.xp || 0, streak: d.streak || 0, rounds: d.rounds || {} };
}

export function getLevelInfo(xp) {
  const steps = [0, 100, 250, 500, 900, 1500, 2500, 4000];
  const maxLevel = steps.length;
  let level = 1;
  for (let i = 1; i < steps.length; i++) {
    if (xp >= steps[i]) level = i + 1; else break;
  }
  if (level >= maxLevel) {
    return { level: maxLevel, cur: steps[maxLevel - 1], need: steps[maxLevel - 1], pct: 100, maxLevel: true };
  }
  const start = steps[level - 1];
  const end   = steps[level];
  const cur   = xp - start;
  const need  = end - start;
  return { level, cur, need, pct: Math.min(100, Math.round((cur / need) * 100)), maxLevel: false };
}

export function getLearnRounds() {
  const { rounds: prog } = getLearnStats();
  return getLocalizedRounds(getLang()).map(r => ({ ...r, progress: prog[r.id] || { completed: 0, mastered: false } }));
}

// ─── Streak ───────────────────────────────────────────────────
function touchStreak() {
  const d = getData();
  const today = new Date().toDateString();
  if (d.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const streak = d.lastDate === yesterday ? (d.streak || 0) + 1 : 1;
  setData({ ...d, streak, lastDate: today });
}

// ─── Lesson state machine ─────────────────────────────────────
let ls = null;

export function startLesson(roundId) {
  const round = getLocalizedRounds(getLang()).find(r => r.id === roundId);
  if (!round) return null;

  const questions = [...round.questions]
    .sort(() => Math.random() - 0.5)
    .map(q => {
      const correct = q.a[0];
      const shuffled = [...q.a].sort(() => Math.random() - 0.5);
      return { question: q.q, answers: shuffled, correctIndex: shuffled.indexOf(correct), explanation: q.exp };
    });

  ls = { round, questions, index: 0, lives: 3, maxLives: 3, xp: 0, correct: 0, answered: false };
  return _payload();
}

function _payload() {
  const q = ls.questions[ls.index];
  return { index: ls.index, total: ls.questions.length, question: q.question, answers: q.answers, lives: ls.lives, maxLives: ls.maxLives, xp: ls.xp, correct: ls.correct };
}

export function answerLesson(selectedIndex) {
  if (!ls || ls.answered) return null;
  ls.answered = true;

  const q = ls.questions[ls.index];
  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) { ls.correct++; ls.xp += 10; }
  else           { ls.lives--; }

  return { correct: isCorrect, correctIndex: q.correctIndex, selectedIndex, explanation: q.explanation, lives: ls.lives, xp: ls.xp };
}

export function advanceLesson() {
  if (!ls) return null;

  if (ls.lives <= 0) {
    const r = { done: true, passed: false, correct: ls.correct, total: ls.questions.length, xp: ls.xp, round: ls.round };
    ls = null;
    return r;
  }

  ls.index++;
  ls.answered = false;

  if (ls.index >= ls.questions.length) {
    const { correct, xp, questions, round } = ls;
    const total = questions.length;
    _saveProgress(round.id, xp, correct, total);
    ls = null;
    return { done: true, passed: true, correct, total, xp, round };
  }

  return { done: false, ..._payload() };
}

function _saveProgress(roundId, xpEarned, correct, total) {
  const d = getData();
  const r = { ...(d.rounds || {}) };
  const prev = r[roundId] || { completed: 0, mastered: false };
  r[roundId] = { completed: prev.completed + 1, mastered: correct >= Math.ceil(total * 0.8) };
  setData({ ...d, xp: (d.xp || 0) + xpEarned, rounds: r });
  touchStreak();
}

export function abortLesson() { ls = null; }
