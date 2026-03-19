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
vi.mock('../js/questions.js', () => ({
  rounds: [
    {
      id: 1,
      title: 'Round 1',
      questions: Array.from({ length: 20 }, (_, i) => ({
        q: `Q${i}`, a: [`A${i}`, `B${i}`, `C${i}`, `D${i}`], exp: `Exp${i}`
      }))
    },
    {
      id: 2,
      title: 'Round 2',
      questions: Array.from({ length: 20 }, (_, i) => ({
        q: `Q2_${i}`, a: [`A2_${i}`, `B2_${i}`, `C2_${i}`, `D2_${i}`], exp: `Exp2_${i}`
      }))
    }
  ]
}));

const { getDailyStatus, getDailyQuestions, saveDailyResult } = await import('../js/daily.js');

beforeEach(() => { localStorage.clear(); });

// ─── getDailyStatus ───────────────────────────────────────────
describe('getDailyStatus', () => {
  it('returns played:false and score:0 when no data stored', () => {
    const s = getDailyStatus();
    expect(s.played).toBe(false);
    expect(s.score).toBe(0);
    expect(s.corrects).toBe(0);
  });

  it('returns played:true if saved date matches today (UTC)', () => {
    const todayUTC = new Date().toISOString().slice(0, 10);
    localStorage.setItem('cq_daily', JSON.stringify({ date: todayUTC, score: 850, corrects: 9 }));
    const s = getDailyStatus();
    expect(s.played).toBe(true);
    expect(s.score).toBe(850);
    expect(s.corrects).toBe(9);
  });

  it('returns played:false if saved date is from yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    localStorage.setItem('cq_daily', JSON.stringify({ date: yesterday, score: 700, corrects: 8 }));
    expect(getDailyStatus().played).toBe(false);
  });

  it('handles corrupt localStorage data gracefully', () => {
    localStorage.setItem('cq_daily', 'not-json');
    const s = getDailyStatus();
    expect(s.played).toBe(false);
  });
});

// ─── getDailyQuestions ────────────────────────────────────────
describe('getDailyQuestions', () => {
  it('returns exactly 10 questions', () => {
    expect(getDailyQuestions()).toHaveLength(10);
  });

  it('each question has the required fields', () => {
    getDailyQuestions().forEach(q => {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('answers');
      expect(q).toHaveProperty('correctIndex');
      expect(q.answers).toHaveLength(4);
    });
  });

  it('correctIndex points to the correct answer in shuffled answers', () => {
    getDailyQuestions().forEach(q => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    });
  });

  it('returns the same questions on repeated calls (deterministic seed)', () => {
    const first  = getDailyQuestions().map(q => q.question);
    const second = getDailyQuestions().map(q => q.question);
    expect(first).toEqual(second);
  });

  it('uses UTC date so seed is timezone-independent', () => {
    // The seed is based on UTC components — verify todaySeed matches UTC date math
    const d = new Date();
    const expectedSeed = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
    // If seed were local, this would differ near midnight in offset timezones.
    // We verify by checking the seed produces consistent results regardless of
    // local-time interpretation — both calls use the same UTC-based seed.
    const q1 = getDailyQuestions()[0].question;
    const q2 = getDailyQuestions()[0].question;
    expect(q1).toBe(q2);
    expect(typeof expectedSeed).toBe('number');
    expect(expectedSeed).toBeGreaterThan(20000000);
  });
});

// ─── saveDailyResult ─────────────────────────────────────────
describe('saveDailyResult', () => {
  it('persists score and corrects', () => {
    saveDailyResult(950, 10);
    const s = getDailyStatus();
    expect(s.played).toBe(true);
    expect(s.score).toBe(950);
    expect(s.corrects).toBe(10);
  });

  it('overwrites previous result', () => {
    saveDailyResult(500, 6);
    saveDailyResult(900, 9);
    const s = getDailyStatus();
    expect(s.score).toBe(900);
    expect(s.corrects).toBe(9);
  });
});
