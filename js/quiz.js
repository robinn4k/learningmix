import { rounds } from './questions.js';

const QUESTIONS_PER_ROUND = 10;
const POINTS_PER_CORRECT = 100;
const TIME_BONUS_PER_SECOND = 5;
const DEFAULT_TIME = 20;

let state = {
  round: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  timeBonus: 0,
  corrects: 0,
  wrongs: 0,
  answers: [],       // { correct: bool, timeLeft: number, explanation: string }
  timer: null,
  timeLeft: DEFAULT_TIME,
  answered: false,
  running: false
};

let onComplete = null;

// Baraja un array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Prepara las preguntas de una ronda, barajando opciones
function prepareQuestions(roundData) {
  return shuffle(roundData.questions).slice(0, QUESTIONS_PER_ROUND).map(q => {
    const correctAnswer = q.a[0];
    const shuffledAnswers = shuffle(q.a);
    return {
      question: q.q,
      answers: shuffledAnswers,
      correctIndex: shuffledAnswers.indexOf(correctAnswer),
      explanation: q.exp
    };
  });
}

function startRound(roundId, callbacks) {
  const roundData = rounds.find(r => r.id === roundId);
  if (!roundData) throw new Error('Ronda no encontrada: ' + roundId);

  state = {
    round: roundData,
    questions: prepareQuestions(roundData),
    currentIndex: 0,
    score: 0,
    timeBonus: 0,
    corrects: 0,
    wrongs: 0,
    answers: [],
    timer: null,
    timeLeft: DEFAULT_TIME,
    answered: false,
    running: true
  };
  onComplete = callbacks.onComplete;

  renderQuestion(callbacks);
}

function renderQuestion(callbacks) {
  if (!state.running) return;
  const q = state.questions[state.currentIndex];
  state.answered = false;
  state.timeLeft = DEFAULT_TIME;

  callbacks.onQuestion({
    index: state.currentIndex,
    total: QUESTIONS_PER_ROUND,
    question: q.question,
    answers: q.answers,
    score: state.score,
    timeLeft: state.timeLeft
  });

  startTimer(callbacks);
}

function startTimer(callbacks) {
  clearTimer();
  state.timer = setInterval(() => {
    state.timeLeft--;
    callbacks.onTick(state.timeLeft);
    if (state.timeLeft <= 0) {
      clearTimer();
      if (!state.answered) {
        handleTimeout(callbacks);
      }
    }
  }, 1000);
}

function handleTimeout(callbacks) {
  state.answered = true;
  state.wrongs++;
  const q = state.questions[state.currentIndex];
  state.answers.push({ correct: false, timeLeft: 0, explanation: q.explanation });
  callbacks.onAnswer({ correct: false, correctIndex: q.correctIndex, selectedIndex: -1, timeLeft: 0, explanation: q.explanation });
  scheduleNext(callbacks);
}

function answerQuestion(selectedIndex, callbacks) {
  if (state.answered) return;
  clearTimer();
  state.answered = true;

  const q = state.questions[state.currentIndex];
  const correct = selectedIndex === q.correctIndex;
  const bonus = correct ? state.timeLeft * TIME_BONUS_PER_SECOND : 0;

  if (correct) {
    state.corrects++;
    state.score += POINTS_PER_CORRECT + bonus;
    state.timeBonus += bonus;
  } else {
    state.wrongs++;
  }

  state.answers.push({ correct, timeLeft: state.timeLeft, explanation: q.explanation });
  callbacks.onAnswer({
    correct,
    correctIndex: q.correctIndex,
    selectedIndex,
    timeLeft: state.timeLeft,
    score: state.score,
    bonus,
    explanation: q.explanation
  });
  scheduleNext(callbacks);
}

function scheduleNext(callbacks) {
  setTimeout(() => {
    state.currentIndex++;
    if (state.currentIndex >= QUESTIONS_PER_ROUND) {
      finishRound();
    } else {
      renderQuestion(callbacks);
    }
  }, 1800);
}

function finishRound() {
  clearTimer();
  state.running = false;
  if (onComplete) {
    onComplete({
      round: state.round,
      score: state.score,
      timeBonus: state.timeBonus,
      corrects: state.corrects,
      wrongs: state.wrongs,
      answers: state.answers,
      questions: state.questions
    });
  }
}

function clearTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function abortRound() {
  clearTimer();
  state.running = false;
}

function getRounds() {
  return rounds;
}

function getState() {
  return { ...state };
}

// Starts a round with pre-prepared questions (e.g. daily challenge)
function startCustomRound(roundData, callbacks) {
  state = {
    round: roundData,
    questions: roundData.questions, // already prepared
    currentIndex: 0,
    score: 0,
    timeBonus: 0,
    corrects: 0,
    wrongs: 0,
    answers: [],
    timer: null,
    timeLeft: DEFAULT_TIME,
    answered: false,
    running: true
  };
  onComplete = callbacks.onComplete;
  renderQuestion(callbacks);
}

export { startRound, startCustomRound, answerQuestion, abortRound, getRounds, getState };
