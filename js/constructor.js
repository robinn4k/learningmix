import { fichas } from './fichas.js';

// Generate questions: show ingredients → pick the cocktail name
function buildQuestions() {
  const names = fichas.map(f => f.name);

  return fichas.map(f => {
    // Wrong options: 3 other cocktail names
    const others = names.filter(n => n !== f.name).sort(() => Math.random() - 0.5).slice(0, 3);
    const answers = [f.name, ...others].sort(() => Math.random() - 0.5);
    return {
      ingredients: f.ingredients,
      glass: f.glass,
      method: f.method,
      correctName: f.name,
      answers,
      correctIndex: answers.indexOf(f.name),
    };
  }).sort(() => Math.random() - 0.5);
}

let cs = null;

export function startConstructor() {
  const questions = buildQuestions();
  cs = { questions, index: 0, correct: 0, answered: 0 };
  return _payload();
}

function _payload() {
  const q = cs.questions[cs.index];
  return { ...q, index: cs.index, total: cs.questions.length, correct: cs.correct };
}

export function answerConstructor(selectedIndex) {
  if (!cs) return null;
  const q = cs.questions[cs.index];
  const ok = selectedIndex === q.correctIndex;
  if (ok) cs.correct++;
  cs.answered++;
  cs.index++;
  const done = cs.index >= cs.questions.length;
  return { correct: ok, correctIndex: q.correctIndex, selectedIndex, done, result: done ? { correct: cs.correct, total: cs.questions.length } : null, next: done ? null : _payload() };
}

export function abortConstructor() { cs = null; }
