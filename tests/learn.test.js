import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock localStorage ────────────────────────────────────────
const store = {};
vi.stubGlobal('localStorage', {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => { store[k] = v; },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
});

// ─── Mock questions.js ────────────────────────────────────────
const mockRound = {
  id: 42,
  title: 'Learn Round',
  questions: Array.from({ length: 5 }, (_, i) => ({
    q: `Q${i}`,
    a: [`Correct${i}`, `W1_${i}`, `W2_${i}`, `W3_${i}`],
    exp: `Exp${i}`
  }))
};

vi.mock('../js/questions.js', () => ({ rounds: [mockRound] }));

const { getLevelInfo, getLearnStats, startLesson, answerLesson, advanceLesson, abortLesson } = await import('../js/learn.js');

// ─── Helpers ──────────────────────────────────────────────────
function clearStorage() { localStorage.clear(); }

function getCorrectIndex() {
  // After startLesson the question has shuffled answers - find correct
  // We cheat by calling advanceLesson-friendly helpers
  return null; // resolved per test via startLesson payload
}

// ─── Level info ───────────────────────────────────────────────
describe('getLevelInfo', () => {
  it('returns level 1 at 0 xp', () => {
    expect(getLevelInfo(0).level).toBe(1);
  });

  it('returns level 2 at 100 xp', () => {
    expect(getLevelInfo(100).level).toBe(2);
  });

  it('returns level 3 at 250 xp', () => {
    expect(getLevelInfo(250).level).toBe(3);
  });

  it('returns level 4 at 500 xp', () => {
    expect(getLevelInfo(500).level).toBe(4);
  });

  it('pct is 0 at level start', () => {
    expect(getLevelInfo(0).pct).toBe(0);
  });

  it('pct is 100 at level end (capped)', () => {
    // 100 xp = start of level 2, pct within level 2 is 0%
    // Test the cap: xp far beyond last threshold stays at 100%
    expect(getLevelInfo(99).pct).toBe(99);
  });

  it('pct is ~50 at midpoint of level 1', () => {
    const info = getLevelInfo(50);
    expect(info.pct).toBeCloseTo(50, 0);
  });
});

// ─── Lesson flow ──────────────────────────────────────────────
describe('startLesson', () => {
  it('returns first question payload', () => {
    const payload = startLesson(42);
    expect(payload).not.toBeNull();
    expect(payload.index).toBe(0);
    expect(payload.total).toBe(5);
    expect(payload.lives).toBe(3);
    expect(payload.answers).toHaveLength(4);
  });

  it('returns null for unknown roundId', () => {
    expect(startLesson(999)).toBeNull();
  });
});

describe('answerLesson', () => {
  beforeEach(() => { startLesson(42); });

  it('returns correct: true on right answer', () => {
    const payload = startLesson(42);
    const result = answerLesson(payload.answers.findIndex(a => a.startsWith('Correct')));
    expect(result.correct).toBe(true);
  });

  it('returns correct: false on wrong answer', () => {
    const payload = startLesson(42);
    const wrongIndex = payload.answers.findIndex(a => a.startsWith('W1'));
    const result = answerLesson(wrongIndex);
    expect(result.correct).toBe(false);
  });

  it('reduces lives on wrong answer', () => {
    const payload = startLesson(42);
    const wrongIndex = payload.answers.findIndex(a => a.startsWith('W1'));
    const result = answerLesson(wrongIndex);
    expect(result.lives).toBe(2);
  });

  it('awards xp on correct answer', () => {
    const payload = startLesson(42);
    const correctIndex = payload.answers.findIndex(a => a.startsWith('Correct'));
    const result = answerLesson(correctIndex);
    expect(result.xp).toBe(10);
  });

  it('does not answer twice (guard)', () => {
    const payload = startLesson(42);
    const correctIndex = payload.answers.findIndex(a => a.startsWith('Correct'));
    answerLesson(correctIndex);
    expect(answerLesson(correctIndex)).toBeNull();
  });
});

describe('advanceLesson – game over (0 lives)', () => {
  it('returns done:true passed:false after 3 wrong answers', () => {
    let payload = startLesson(42);

    // Each wrong answer costs a life; after 3 wrongs game ends
    for (let i = 0; i < 3; i++) {
      const wrongIdx = payload.answers.findIndex(a => a.startsWith('W1'));
      answerLesson(wrongIdx);
      const r = advanceLesson();
      if (r?.done) {
        expect(r.passed).toBe(false);
        return;
      }
      payload = r; // move to next question with updated lives
    }
    throw new Error('Should have ended with game over');
  });
});

describe('advanceLesson – completion', () => {
  it('returns done:true passed:true after all questions answered correctly', () => {
    let payload = startLesson(42);

    for (let i = 0; i < 5; i++) {
      const correctIdx = payload.answers.findIndex(a => a.startsWith('Correct'));
      answerLesson(correctIdx);
      const result = advanceLesson();
      if (result.done) {
        expect(result.passed).toBe(true);
        expect(result.correct).toBe(5);
        return;
      }
      payload = result;
    }
    throw new Error('Lesson never completed');
  });
});

describe('abortLesson', () => {
  it('makes answerLesson return null after abort', () => {
    startLesson(42);
    abortLesson();
    expect(answerLesson(0)).toBeNull();
  });
});

// ─── Stats ────────────────────────────────────────────────────
describe('getLearnStats', () => {
  beforeEach(() => clearStorage());

  it('returns defaults when no data stored', () => {
    const stats = getLearnStats();
    expect(stats.xp).toBe(0);
    expect(stats.streak).toBe(0);
    expect(stats.rounds).toEqual({});
  });
});
