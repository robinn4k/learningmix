import { initFirebase, signInWithGoogle, signInAsGuest, signOutUser, restoreSession, getCurrentUser, updateGuestName } from './auth.js';
import { startRound, answerQuestion, abortRound, getRounds } from './quiz.js';
import { saveScore, fetchLeaderboard, getUserStats } from './leaderboard.js';
import { getLearnStats, getLevelInfo, getLearnRounds, startLesson, answerLesson, advanceLesson, abortLesson } from './learn.js';

// ─── DOM helpers ─────────────────────────────────────────────
const $ = id => document.getElementById(id);
const showView = id => {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $(id).classList.add('active');
};
const setLoading = show => $('loading').classList.toggle('hidden', !show);
const toast = (msg, type = 'info') => {
  const el = $('toast');
  el.textContent = msg;
  el.className = `toast toast-${type} show`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
};

// ─── INIT ─────────────────────────────────────────────────────
async function init() {
  setLoading(true);
  await initFirebase();
  const user = restoreSession();
  if (user) {
    await goToDashboard();
  } else {
    showView('view-login');
  }
  setLoading(false);
  bindEvents();
}

// ─── LOGIN VIEW ───────────────────────────────────────────────
function bindLoginEvents() {
  $('btn-google-login').addEventListener('click', async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      await goToDashboard();
    } catch (e) {
      const msg = e?.code === 'auth/unauthorized-domain'
        ? 'Dominio no autorizado en Firebase. Añade robinn4k.github.io en Authentication → Settings → Authorized domains.'
        : e?.code === 'auth/popup-blocked'
        ? 'El navegador bloqueó el popup. Permite popups para este sitio.'
        : 'Error al iniciar sesión con Google. Usa el modo invitado.';
      toast(msg, 'error');
    } finally {
      setLoading(false);
    }
  });

  $('btn-guest-login').addEventListener('click', () => {
    signInAsGuest();
    goToDashboard();
  });
}

// ─── DASHBOARD ────────────────────────────────────────────────
async function goToDashboard() {
  const user = getCurrentUser();
  if (!user) { showView('view-login'); return; }

  // Header user info
  $('user-name').textContent = user.name;
  $('user-avatar').textContent = user.isGuest ? '👤' : '🍸';

  // Load stats
  const stats = await getUserStats();
  const games = stats?.games || 0;
  const best = stats?.best || 0;
  const avg = games > 0 ? Math.round((stats?.total || 0) / games) : 0;
  const completedRounds = stats?.rounds ? Object.keys(stats.rounds).length : 0;

  $('stat-games').textContent = games;
  $('stat-best').textContent = best;
  $('stat-avg').textContent = avg;
  $('stat-rounds').textContent = completedRounds;
  $('user-best').textContent = `Mejor: ${best} pts`;

  // Update learn banner streak
  const { streak } = getLearnStats();
  $('banner-streak').textContent = `🔥 ${streak}`;

  // Render round cards
  renderRoundCards(stats);
  showView('view-dashboard');
}

function renderRoundCards(stats) {
  const grid = $('rounds-grid');
  grid.innerHTML = '';
  const rounds = getRounds();
  rounds.forEach(r => {
    const best = stats?.rounds?.[r.id] || 0;
    const stars = scoreToStars(best);
    const card = document.createElement('div');
    card.className = 'round-card';
    card.dataset.roundId = r.id;
    card.style.setProperty('--round-color', r.color);
    card.innerHTML = `
      <div class="round-icon">${r.icon}</div>
      <div class="round-info">
        <div class="round-title">${r.title}</div>
        <div class="round-subtitle">${r.subtitle}</div>
        <div class="round-stars">${stars}</div>
        ${best > 0 ? `<div class="round-best">Mejor: ${best} pts</div>` : '<div class="round-best">¡Sin jugar!</div>'}
      </div>
      <div class="round-arrow">→</div>
    `;
    card.addEventListener('click', () => startQuiz(r.id));
    grid.appendChild(card);
  });
}

function scoreToStars(score) {
  if (score === 0) return '☆☆☆';
  if (score < 500) return '★☆☆';
  if (score < 800) return '★★☆';
  return '★★★';
}

// ─── QUIZ ─────────────────────────────────────────────────────
let currentRoundId = null;

function startQuiz(roundId) {
  currentRoundId = roundId;
  showView('view-quiz');

  startRound(roundId, {
    onQuestion: renderQuestion,
    onTick: updateTimer,
    onAnswer: handleAnswer,
    onComplete: handleRoundComplete
  });
}

function renderQuestion({ index, total, question, answers, score }) {
  $('quiz-round-title').textContent = getRounds().find(r => r.id === currentRoundId)?.title || '';
  $('quiz-q-current').textContent = index + 1;
  $('quiz-score').textContent = score;
  $('question-text').textContent = question;
  $('quiz-progress-fill').style.width = `${((index + 1) / total) * 100}%`;

  const grid = $('answers-grid');
  grid.innerHTML = '';
  answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.index = i;
    btn.innerHTML = `<span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${ans}</span>`;
    btn.addEventListener('click', () => {
      answerQuestion(i, {
        onQuestion: renderQuestion,
        onTick: updateTimer,
        onAnswer: handleAnswer,
        onComplete: handleRoundComplete
      });
    });
    grid.appendChild(btn);
  });

  resetTimerUI(20);
}

function updateTimer(timeLeft) {
  $('quiz-timer').textContent = timeLeft;
  const pct = (timeLeft / 20) * 100;
  const fill = $('timer-circle-fill');
  const dasharray = 100;
  const dashoffset = dasharray - (pct / 100) * dasharray;
  fill.style.strokeDashoffset = dashoffset;
  fill.style.stroke = timeLeft <= 5 ? '#e74c3c' : timeLeft <= 10 ? '#f39c12' : '#27ae60';
}

function resetTimerUI(time) {
  $('quiz-timer').textContent = time;
  const fill = $('timer-circle-fill');
  fill.style.strokeDashoffset = 0;
  fill.style.stroke = '#27ae60';
}

function handleAnswer({ correct, correctIndex, selectedIndex, timeLeft, score, bonus, explanation }) {
  const btns = document.querySelectorAll('.answer-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add('correct');
    else if (i === selectedIndex && !correct) btn.classList.add('wrong');
  });

  if (score !== undefined) $('quiz-score').textContent = score;

  // Show explanation tooltip briefly
  const questionEl = $('question-text');
  if (explanation) {
    const tip = document.createElement('div');
    tip.className = 'explanation-tip ' + (correct ? 'tip-correct' : 'tip-wrong');
    tip.textContent = explanation;
    questionEl.parentNode.insertBefore(tip, questionEl.nextSibling);
    setTimeout(() => tip.remove(), 1800);
  }
}

// ─── RESULTS ─────────────────────────────────────────────────
async function handleRoundComplete({ round, score, timeBonus, corrects, wrongs, answers, questions }) {
  // Save score
  setLoading(true);
  try {
    await saveScore({ roundId: round.id, roundTitle: round.title, score, corrects, wrongs });
  } catch (e) {
    console.warn('Error guardando puntuación:', e);
  }
  setLoading(false);

  // Render results
  const pct = Math.round((corrects / 10) * 100);
  let emoji = '😢', title = '¡Sigue practicando!';
  if (pct >= 90) { emoji = '🏆'; title = '¡Maestro Bartender!'; }
  else if (pct >= 70) { emoji = '🎉'; title = '¡Muy bien!'; }
  else if (pct >= 50) { emoji = '👍'; title = '¡Buen intento!'; }

  $('results-emoji').textContent = emoji;
  $('results-title').textContent = title;
  $('results-score-value').textContent = score;
  $('results-correct').textContent = corrects;
  $('results-wrong').textContent = wrongs;
  $('results-time-bonus').textContent = timeBonus;

  // Breakdown
  const bd = $('results-breakdown');
  bd.innerHTML = '<h3 class="breakdown-title">Detalle de preguntas</h3>';
  answers.forEach((ans, i) => {
    const item = document.createElement('div');
    item.className = 'breakdown-item ' + (ans.correct ? 'breakdown-correct' : 'breakdown-wrong');
    item.innerHTML = `
      <span class="breakdown-num">${i + 1}</span>
      <span class="breakdown-icon">${ans.correct ? '✅' : '❌'}</span>
      <span class="breakdown-q">${questions[i].question}</span>
      ${ans.correct ? `<span class="breakdown-bonus">+${ans.timeLeft * 5} bonus</span>` : ''}
    `;
    bd.appendChild(item);
  });

  showView('view-results');
}

// ─── LEARN HUB ───────────────────────────────────────────────
function goToLearnHub() {
  const { xp, streak } = getLearnStats();
  const lvl = getLevelInfo(xp);

  $('learn-streak-val').textContent = streak;
  $('learn-xp-val').textContent = xp;
  $('learn-level-badge').textContent = `Nv. ${lvl.level}`;
  $('learn-xp-fill').style.width = `${lvl.pct}%`;
  $('learn-xp-text').textContent = `${lvl.cur} / ${lvl.need} XP`;

  const container = $('learn-lessons');
  container.innerHTML = '';
  getLearnRounds().forEach(r => {
    const { completed, mastered } = r.progress;
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.style.setProperty('--round-color', r.color);
    const progressPct = Math.min(100, completed * 10);
    card.innerHTML = `
      ${mastered ? '<div class="lesson-card-badge">★ Dominado</div>' : ''}
      <div class="lesson-card-icon">${r.icon}</div>
      <div class="lesson-card-info">
        <div class="lesson-card-title">${r.title}</div>
        <div class="lesson-card-sub">${r.subtitle}</div>
        <div class="lesson-card-progress">
          <div class="lesson-card-bar"><div class="lesson-card-bar-fill" style="width:${progressPct}%"></div></div>
          <div class="lesson-card-count">${completed > 0 ? `${completed}× completada` : 'Sin completar'}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => beginLesson(r.id));
    container.appendChild(card);
  });

  showView('view-learn-hub');
}

// ─── LESSON ───────────────────────────────────────────────────
let currentLessonRoundId = null;

function beginLesson(roundId) {
  currentLessonRoundId = roundId;
  const q = startLesson(roundId);
  if (!q) return;
  showView('view-lesson');
  renderLessonQuestion(q);
}

function renderLessonQuestion({ index, total, question, answers, lives, maxLives }) {
  $('lesson-q-counter').textContent = `${index + 1} / ${total}`;
  $('lesson-question').textContent = question;
  $('lesson-progress-fill').style.width = `${((index + 1) / total) * 100}%`;

  // Lives
  $('lesson-lives').innerHTML = Array.from({ length: maxLives }, (_, i) =>
    `<span>${i < lives ? '❤️' : '🖤'}</span>`
  ).join('');

  // Answers
  const grid = $('lesson-answers');
  grid.innerHTML = '';
  answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.index = i;
    btn.innerHTML = `<span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${ans}</span>`;
    btn.addEventListener('click', () => handleLessonAnswer(i));
    grid.appendChild(btn);
  });

  // Hide feedback panel
  const fb = $('lesson-feedback');
  fb.className = 'lesson-feedback';
}

function handleLessonAnswer(selectedIndex) {
  const result = answerLesson(selectedIndex);
  if (!result) return;

  const { correct, correctIndex, selectedIndex: si, explanation, lives, maxLives } = result;

  // Mark buttons
  document.querySelectorAll('#lesson-answers .answer-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add('correct');
    else if (i === si && !correct) btn.classList.add('wrong');
  });

  // Update lives display
  const lv = $('lesson-lives');
  if (lv) {
    const icons = lv.querySelectorAll('span');
    icons.forEach((sp, i) => { sp.textContent = i < lives ? '❤️' : '🖤'; });
  }

  // Show feedback panel
  const fb = $('lesson-feedback');
  $('lesson-feedback-icon').textContent = correct ? '✅' : '❌';
  $('lesson-feedback-label').textContent = correct ? '¡Correcto!' : '¡Incorrecto!';
  $('lesson-feedback-exp').textContent = explanation || '';
  fb.className = `lesson-feedback show ${correct ? 'fb-correct' : 'fb-wrong'}`;
}

function handleLessonContinue() {
  const result = advanceLesson();
  if (!result) return;

  if (result.done) {
    showLessonResult(result);
  } else {
    renderLessonQuestion(result);
  }
}

function showLessonResult({ passed, correct, total, xp, lives, round }) {
  $('lr-emoji').textContent = passed ? (correct === total ? '🏆' : '🎉') : '💔';
  $('lr-title').textContent = passed ? '¡Lección completada!' : '¡Sin vidas! Inténtalo de nuevo';
  $('lr-correct').textContent = `${correct}/${total}`;
  $('lr-xp').textContent = passed ? `+${xp}` : '+0';
  $('lr-lives').textContent = passed ? Array.from({ length: lives || 0 }, () => '❤️').join('') || '—' : '💀';

  // Store round id for retry/next
  $('btn-lr-retry').dataset.roundId = currentLessonRoundId;
  $('btn-lr-continue').dataset.roundId = currentLessonRoundId;

  // Update banner streak on dashboard
  const { streak } = getLearnStats();
  const bannerStreak = $('banner-streak');
  if (bannerStreak) bannerStreak.textContent = `🔥 ${streak}`;

  showView('view-lesson-result');
}

// ─── LEADERBOARD ─────────────────────────────────────────────
let currentFilter = null;

async function goToLeaderboard(fromView) {
  $('btn-back-leaderboard').dataset.from = fromView || 'view-dashboard';
  setLoading(true);
  await renderLeaderboard(null);
  buildLeaderboardFilters();
  showView('view-leaderboard');
  setLoading(false);
}

function buildLeaderboardFilters() {
  const bar = $('leaderboard-filters');
  bar.innerHTML = '<button class="filter-btn active" data-filter="all">Todas</button>';
  const rounds = getRounds();
  rounds.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = r.id;
    btn.textContent = r.icon + ' ' + r.title;
    bar.appendChild(btn);
  });
  bar.addEventListener('click', async e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter === 'all' ? null : parseInt(btn.dataset.filter);
    currentFilter = filter;
    setLoading(true);
    await renderLeaderboard(filter);
    setLoading(false);
  });
}

async function renderLeaderboard(roundId) {
  const scores = await fetchLeaderboard(roundId);
  const user = getCurrentUser();
  const list = $('leaderboard-list');
  list.innerHTML = '';

  if (scores.length === 0) {
    list.innerHTML = '<div class="leaderboard-empty">No hay puntuaciones todavía.<br>¡Sé el primero!</div>';
    return;
  }

  scores.forEach((entry, i) => {
    const isMe = user && entry.uid === user.uid;
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
    const date = new Date(entry.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    const item = document.createElement('div');
    item.className = 'leaderboard-entry' + (isMe ? ' leaderboard-me' : '');
    item.innerHTML = `
      <div class="lb-rank">${medal}</div>
      <div class="lb-info">
        <div class="lb-name">${entry.name}${isMe ? ' <span class="lb-you">(Tú)</span>' : ''}</div>
        <div class="lb-meta">${entry.roundTitle} · ${date}</div>
      </div>
      <div class="lb-score">${entry.score} pts</div>
    `;
    list.appendChild(item);
  });
}

// ─── EVENT BINDING ────────────────────────────────────────────
function bindEvents() {
  bindLoginEvents();

  // Dashboard header
  $('btn-leaderboard-header').addEventListener('click', () => goToLeaderboard('view-dashboard'));
  $('btn-logout').addEventListener('click', async () => {
    const user = getCurrentUser();
    if (user?.isGuest) {
      showView('view-login');
      return;
    }
    if (confirm('¿Cerrar sesión?')) {
      await signOutUser();
      showView('view-login');
    }
  });

  // Quiz controls
  $('btn-quit-quiz').addEventListener('click', () => {
    if (confirm('¿Abandonar la partida?')) {
      abortRound();
      goToDashboard();
    }
  });

  // Results buttons
  $('btn-play-again').addEventListener('click', () => startQuiz(currentRoundId));
  $('btn-leaderboard-results').addEventListener('click', () => goToLeaderboard('view-results'));
  $('btn-home-results').addEventListener('click', () => goToDashboard());

  // Learning mode
  $('btn-go-learn').addEventListener('click', () => goToLearnHub());
  $('btn-back-learn').addEventListener('click', () => goToDashboard());
  $('btn-quit-lesson').addEventListener('click', () => {
    if (confirm('¿Abandonar la lección?')) { abortLesson(); goToLearnHub(); }
  });
  $('btn-lesson-continue').addEventListener('click', () => handleLessonContinue());
  $('btn-lr-retry').addEventListener('click', () => beginLesson(currentLessonRoundId));
  $('btn-lr-continue').addEventListener('click', () => {
    const rounds = getLearnRounds();
    const idx = rounds.findIndex(r => r.id === currentLessonRoundId);
    const next = rounds[idx + 1];
    if (next) beginLesson(next.id); else goToLearnHub();
  });
  $('btn-lr-home').addEventListener('click', () => goToLearnHub());

  // Leaderboard back
  $('btn-back-leaderboard').addEventListener('click', () => {
    const from = $('btn-back-leaderboard').dataset.from || 'view-dashboard';
    if (from === 'view-results') showView('view-results');
    else goToDashboard();
  });
}

// ─── SERVICE WORKER ───────────────────────────────────────────
function registerSW() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('sw.js').then(reg => {
    // New SW waiting → show update toast
    const promptUpdate = () => {
      const el = $('toast');
      el.textContent = 'Nueva versión disponible — toca para actualizar';
      el.className = 'toast toast-update show';
      clearTimeout(el._t);
      el._ut = () => {
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
        }
      };
      el.addEventListener('click', el._ut, { once: true });
    };

    if (reg.waiting) {
      promptUpdate();
    }

    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          promptUpdate();
        }
      });
    });
  }).catch(err => console.warn('SW registration failed:', err));
}

// ─── START ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { init(); registerSW(); });
