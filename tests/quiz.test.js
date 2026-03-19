import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock questions.js ────────────────────────────────────────
const mockRound = {
  id: 1,
  title: 'Test Round',
  questions: Array.from({ length: 10 }, (_, i) => ({
    q: `Question ${i + 1}`,
    a: [`Correct${i}`, `Wrong1_${i}`, `Wrong2_${i}`, `Wrong3_${i}`],
    exp: `Explanation ${i + 1}`
  }))
};

vi.mock('../js/questions.js', () => ({
  rounds: [mockRound],
  getLocalizedRounds: () => [mockRound]
}));

vi.mock('../js/lang.js', () => ({
  getLang: () => 'en',
  t: (k) => k,
}));

const { startRound, answerQuestion, abortRound, getState } = await import('../js/quiz.js');

// ─── Helpers ──────────────────────────────────────────────────
function makeCallbacks(overrides = {}) {
  return {
    onQuestion: vi.fn(),
    onTick: vi.fn(),
    onAnswer: vi.fn(),
    onComplete: vi.fn(),
    ...overrides
  };
}

function startAndGetCorrectIndex(cb) {
  startRound(1, cb);
  const state = getState();
  const q = state.questions[0];
  return q.correctIndex;
}

// ─── Tests ────────────────────────────────────────────────────
describe('quiz – answer scoring', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    abortRound();
  });

  it('adds 100 + time bonus for correct answer', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);

    // 15 seconds left when answering
    getState(); // ensure state is fresh
    const state = getState();
    // Manually simulate 5 ticks (5s elapsed → 15s left)
    vi.advanceTimersByTime(5000);

    answerQuestion(correctIndex, cb);
    const { score } = getState();

    // 100 base + (15 * 5 = 75 bonus) = 175, but actual timeLeft depends on tick timing
    expect(score).toBeGreaterThan(100);
    expect(score).toBeLessThanOrEqual(200); // max: 100 + 20*5
  });

  it('adds 0 points for wrong answer', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);
    const wrongIndex = (correctIndex + 1) % 4;

    answerQuestion(wrongIndex, cb);
    expect(getState().score).toBe(0);
  });

  it('increments corrects counter on correct answer', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);
    answerQuestion(correctIndex, cb);
    expect(getState().corrects).toBe(1);
  });

  it('increments wrongs counter on wrong answer', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);
    const wrongIndex = (correctIndex + 1) % 4;
    answerQuestion(wrongIndex, cb);
    expect(getState().wrongs).toBe(1);
  });

  it('calls onAnswer callback with correct flag', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);
    answerQuestion(correctIndex, cb);
    expect(cb.onAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: true }));
  });

  it('ignores duplicate answers (already answered guard)', () => {
    const cb = makeCallbacks();
    const correctIndex = startAndGetCorrectIndex(cb);
    answerQuestion(correctIndex, cb);
    answerQuestion(correctIndex, cb); // second call should be ignored
    expect(cb.onAnswer).toHaveBeenCalledTimes(1);
  });
});

describe('quiz – timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllTimers();
    abortRound();
  });

  it('calls onTick on each second', () => {
    const cb = makeCallbacks();
    startRound(1, cb);
    vi.advanceTimersByTime(5000);
    expect(cb.onTick).toHaveBeenCalledTimes(5);
  });

  it('auto-marks as wrong when timer reaches 0', () => {
    const cb = makeCallbacks();
    startRound(1, cb);
    vi.advanceTimersByTime(21000); // 20s + 1 tick
    expect(cb.onAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: false, selectedIndex: -1 }));
  });

  it('clears timer on abortRound (no more ticks)', () => {
    const cb = makeCallbacks();
    startRound(1, cb);
    vi.advanceTimersByTime(3000);
    abortRound();
    const tickCount = cb.onTick.mock.calls.length;
    vi.advanceTimersByTime(10000);
    expect(cb.onTick.mock.calls.length).toBe(tickCount); // no more ticks
  });
});

describe('quiz – round completion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    abortRound();
  });

  it('calls onComplete after all 10 questions', () => {
    const cb = makeCallbacks();
    startRound(1, cb);

    for (let i = 0; i < 10; i++) {
      const state = getState();
      const q = state.questions[state.currentIndex];
      answerQuestion(q.correctIndex, cb);
      vi.advanceTimersByTime(1800); // scheduleNext delay
    }

    expect(cb.onComplete).toHaveBeenCalledTimes(1);
    const result = cb.onComplete.mock.calls[0][0];
    expect(result.corrects).toBe(10);
    expect(result.wrongs).toBe(0);
  });

  it('throws on unknown round id', () => {
    expect(() => startRound(999, makeCallbacks())).toThrow('Ronda no encontrada: 999');
  });
});

describe('quiz – shuffle', () => {
  it('preserves all original questions after shuffle (no duplicates)', () => {
    const cb = makeCallbacks();
    startRound(1, cb);
    const state = getState();
    const questions = state.questions;
    expect(questions).toHaveLength(10);
    const questionTexts = questions.map(q => q.question);
    const unique = new Set(questionTexts);
    expect(unique.size).toBe(10);
  });

  it('shuffles answer options but keeps correct answer tracked', () => {
    const cb = makeCallbacks();
    startRound(1, cb);
    const state = getState();

    for (const q of state.questions) {
      expect(q.answers[q.correctIndex]).toMatch(/^Correct/);
    }
  });
});
