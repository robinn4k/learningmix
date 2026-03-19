import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock questions.js ────────────────────────────────────────
const speedMockRounds = [
  {
    id: 1,
    title: 'Speed Round',
    questions: Array.from({ length: 20 }, (_, i) => ({
      q: `SpeedQ${i}`,
      a: [`Correct${i}`, `W1_${i}`, `W2_${i}`, `W3_${i}`],
      exp: ''
    }))
  }
];

vi.mock('../js/questions.js', () => ({
  rounds: speedMockRounds,
  getLocalizedRounds: () => speedMockRounds
}));

vi.mock('../js/lang.js', () => ({
  getLang: () => 'en',
  t: (k) => k,
}));

const { startSpeed, startSpeedTimer, answerSpeed, abortSpeed, getSpeedResult } = await import('../js/speed.js');

// ─── Tests ────────────────────────────────────────────────────
// answerSpeed requires ss.running=true (set by startSpeedTimer)
function startAndActivate() {
  const p = startSpeed();
  startSpeedTimer(vi.fn(), vi.fn()); // activates ss.running
  return p;
}

describe('speed – scoring', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllTimers();
    abortSpeed();
  });

  it('startSpeed returns first question payload', () => {
    const p = startSpeed();
    expect(p).toMatchObject({ timeLeft: 60, correct: 0, score: 0 });
    expect(p.answers).toHaveLength(4);
  });

  it('correct answer adds 50 points', () => {
    const p = startAndActivate();
    const result = answerSpeed(p.correctIndex);
    expect(result.correct).toBe(true);
    expect(getSpeedResult().score).toBe(50);
  });

  it('wrong answer adds 0 points', () => {
    const p = startAndActivate();
    const wrongIndex = (p.correctIndex + 1) % 4;
    answerSpeed(wrongIndex);
    expect(getSpeedResult().score).toBe(0);
  });

  it('answered counter increments on each answer', () => {
    const p = startAndActivate();
    answerSpeed(p.correctIndex);
    answerSpeed(0);
    expect(getSpeedResult().answered).toBe(2);
  });
});

describe('speed – timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    abortSpeed();
  });

  it('calls onTick each second', () => {
    startSpeed();
    const onTick = vi.fn();
    const onEnd = vi.fn();
    startSpeedTimer(onTick, onEnd);
    vi.advanceTimersByTime(5000);
    expect(onTick).toHaveBeenCalledTimes(5);
  });

  it('calls onEnd when timer hits 0', () => {
    startSpeed();
    const onEnd = vi.fn();
    startSpeedTimer(vi.fn(), onEnd);
    vi.advanceTimersByTime(60000);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnd if aborted before timer ends', () => {
    startSpeed();
    const onEnd = vi.fn();
    startSpeedTimer(vi.fn(), onEnd);
    vi.advanceTimersByTime(10000);
    abortSpeed();
    vi.advanceTimersByTime(60000);
    expect(onEnd).not.toHaveBeenCalled();
  });
});

describe('speed – question cycling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllTimers();
    abortSpeed();
  });

  it('advances to next question after answer', () => {
    const p = startAndActivate();
    const result = answerSpeed(p.correctIndex);
    expect(result.next.question).not.toBeUndefined();
    // Note: next question COULD be same if cycling (known issue)
  });

  it('does not crash after cycling through all questions', () => {
    startAndActivate();
    // Answer 25 questions (more than the 20 available)
    expect(() => {
      for (let i = 0; i < 25; i++) answerSpeed(0);
    }).not.toThrow();
  });
});
