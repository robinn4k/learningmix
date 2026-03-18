import { initFirebase, signInWithGoogle, signInAsGuest, signOutUser, restoreSession, getCurrentUser, updateGuestName } from './auth.js';
import { startRound, startCustomRound, answerQuestion, abortRound, getRounds } from './quiz.js';
import { saveScore, fetchLeaderboard, getUserStats } from './leaderboard.js';
import { getLearnStats, getLevelInfo, getLearnRounds, startLesson, answerLesson, advanceLesson, abortLesson } from './learn.js';
import { getDailyStatus, getDailyQuestions, saveDailyResult } from './daily.js';
import { startSpeed, startSpeedTimer, answerSpeed, abortSpeed } from './speed.js';
import { getAchievements, checkAchievements, updateStats, getStats } from './achievements.js';
import { fichas } from './fichas.js';
import { startConstructor, answerConstructor, abortConstructor } from './constructor.js';
import { startBlind, answerBlind, revealNextClue, abortBlind } from './blind.js';
import { getLang, setLang, t, translateHTML } from './lang.js';

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
  document.documentElement.lang = getLang();
  translateHTML();
  updateLangToggle();
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

function updateLangToggle() {
  const btn = $('btn-lang-toggle');
  if (btn) btn.textContent = getLang().toUpperCase();
}

function toggleLanguage() {
  const newLang = getLang() === 'es' ? 'en' : 'es';
  setLang(newLang);
  translateHTML();
  updateLangToggle();
  // Re-render current view if on dashboard
  const dashboard = $('view-dashboard');
  if (dashboard && dashboard.classList.contains('active')) {
    goToDashboard();
  }
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
        ? t('error.unauthorized_domain')
        : e?.code === 'auth/popup-blocked'
        ? t('error.popup_blocked')
        : t('error.google_signin');
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
  $('user-best').textContent = t('dashboard.best', { n: best });

  // Update learn banner streak
  const { streak } = getLearnStats();
  $('banner-streak').textContent = `🔥 ${streak}`;

  // Daily challenge badge
  const dailyStatus = getDailyStatus();
  const dailyBadge = $('qm-daily-badge');
  if (dailyStatus.played) {
    dailyBadge.textContent = '✓';
    dailyBadge.classList.add('show');
    dailyBadge.style.background = 'var(--green)';
  } else {
    dailyBadge.classList.remove('show');
  }

  // Achievement badge (unlocked count)
  const achList = getAchievements();
  const achUnlocked = achList.filter(a => a.unlocked).length;
  const achBadge = $('qm-ach-badge');
  achBadge.textContent = achUnlocked;
  achBadge.classList.toggle('show', achUnlocked > 0);
  achBadge.style.background = 'var(--gold)';
  achBadge.style.color = '#0d0508';

  // Render round cards
  renderRoundCards(stats);
  translateHTML();
  updateLangToggle();
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
        ${best > 0 ? `<div class="round-best">${t('dashboard.best', { n: best })}</div>` : `<div class="round-best">${t('dashboard.no_play')}</div>`}
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

  // Check achievements for quiz completion
  if (!isDailyMode) {
    const stats = getStats();
    const roundsPlayed = (stats.roundsPlayed || 0) + 1;
    const newly = checkAchievements({
      totalGames: (stats.totalGames || 0) + 1,
      perfectQuiz: corrects === 10 ? true : stats.perfectQuiz,
      roundsPlayed,
    });
    showNewAchievements(newly);
  }
  isDailyMode = false;

  // Render results
  const pct = Math.round((corrects / 10) * 100);
  let emoji = '😢', title = t('results.keep_practicing');
  if (pct >= 90) { emoji = '🏆'; title = t('results.master_bartender'); }
  else if (pct >= 70) { emoji = '🎉'; title = t('results.very_good'); }
  else if (pct >= 50) { emoji = '👍'; title = t('results.good_try'); }

  $('results-emoji').textContent = emoji;
  $('results-title').textContent = title;
  $('results-score-value').textContent = score;
  $('results-correct').textContent = corrects;
  $('results-wrong').textContent = wrongs;
  $('results-time-bonus').textContent = timeBonus;

  // Breakdown
  const bd = $('results-breakdown');
  bd.innerHTML = `<h3 class="breakdown-title">${t('results.breakdown_title')}</h3>`;
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

  translateHTML();
  showView('view-results');
}

// ─── ACHIEVEMENTS helper ──────────────────────────────────────
function showNewAchievements(list) {
  if (!list.length) return;
  list.forEach((a, i) => {
    setTimeout(() => toast(t('achievements.unlocked', { icon: a.icon, title: a.title }), 'success'), i * 1500);
  });
}

// ─── DAILY CHALLENGE ─────────────────────────────────────────
let isDailyMode = false;

function startDailyChallenge() {
  const status = getDailyStatus();
  if (status.played) {
    toast(t('daily.already_played', { corrects: status.corrects, score: status.score }), 'info');
    return;
  }

  isDailyMode = true;
  currentRoundId = 'daily';
  showView('view-quiz');

  const questions = getDailyQuestions();
  const roundData = { id: 'daily', title: t('daily.title'), questions };
  startCustomRound(roundData, {
    onQuestion: (q) => { renderQuestion({ ...q, _daily: true }); },
    onTick: updateTimer,
    onAnswer: handleAnswer,
    onComplete: async (result) => {
      saveDailyResult(result.score, result.corrects);
      const newly = checkAchievements({
        dailyPlayed: (getStats().dailyPlayed || 0) + 1,
        dailyPerfect: result.corrects === 10 ? true : getStats().dailyPerfect,
        totalGames: (getStats().totalGames || 0) + 1,
      });
      showNewAchievements(newly);
      await handleRoundComplete(result);
    }
  });
}

// ─── SPEED MODE ───────────────────────────────────────────────
let speedAnswered = false;

function goToSpeedMode() {
  speedAnswered = false;
  const q = startSpeed();
  showView('view-speed');
  translateHTML();
  renderSpeedQuestion(q);
  startSpeedTimer(
    (sec) => {
      $('speed-timer').textContent = sec;
      $('speed-timer').classList.toggle('urgent', sec <= 10);
    },
    (result) => {
      const newly = checkAchievements({
        speedMax: Math.max(getStats().speedMax || 0, result.answered),
      });
      showNewAchievements(newly);
      showExtraResult({
        emoji: result.answered >= 20 ? '⚡' : '🏁',
        title: result.answered >= 20 ? t('speed.speedster') : t('speed.time_up'),
        correct: result.correct,
        correctLbl: t('speed.correct_label'),
        score: result.score,
        scoreLbl: t('speed.points_label'),
        extra: result.answered,
        extraLbl: t('speed.answered_label'),
        mode: 'speed',
      });
    }
  );
}

function renderSpeedQuestion({ question, answers, index, total, correct, score }) {
  $('speed-counter').textContent = `${correct}/${index}`;
  $('speed-score').textContent = `${score} pts`;
  $('speed-question').textContent = question;
  const grid = $('speed-answers');
  grid.innerHTML = '';
  answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${ans}</span>`;
    btn.addEventListener('click', () => {
      if (speedAnswered) return;
      speedAnswered = true;
      const res = answerSpeed(i);
      if (!res) return;
      // Flash feedback
      document.querySelectorAll('#speed-answers .answer-btn').forEach((b, j) => {
        b.disabled = true;
        if (j === res.correctIndex) b.classList.add('correct');
        else if (j === i && !res.correct) b.classList.add('wrong');
      });
      setTimeout(() => {
        if (res.done) return; // timer will handle
        speedAnswered = false;
        renderSpeedQuestion(res.next);
      }, 400);
    });
    grid.appendChild(btn);
  });
  speedAnswered = false;
}

// ─── CONSTRUCTOR MODE ─────────────────────────────────────────
let conAnswered = false;

function goToConstructorMode() {
  const q = startConstructor();
  conAnswered = false;
  showView('view-constructor');
  translateHTML();
  renderConstructorQuestion(q);
}

function renderConstructorQuestion({ ingredients, glass, method, answers, correctIndex, index, total }) {
  $('con-q-num').textContent = index + 1;
  const totalEl = document.querySelector('#view-constructor .quiz-q-total');
  if (totalEl) totalEl.textContent = `/${total}`;
  $('con-progress').style.width = `${((index + 1) / total) * 100}%`;
  $('con-meta').innerHTML = `<span>🥃 ${glass}</span><span>🔀 ${method}</span>`;
  const ul = $('con-ingredients');
  ul.innerHTML = '';
  ingredients.forEach(ing => { const li = document.createElement('li'); li.textContent = ing; ul.appendChild(li); });

  const grid = $('con-answers');
  grid.innerHTML = '';
  const fb = $('con-feedback');
  fb.className = 'lesson-feedback';
  conAnswered = false;

  answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${ans}</span>`;
    btn.addEventListener('click', () => {
      if (conAnswered) return;
      conAnswered = true;
      const res = answerConstructor(i);
      document.querySelectorAll('#con-answers .answer-btn').forEach((b, j) => {
        b.disabled = true;
        if (j === res.correctIndex) b.classList.add('correct');
        else if (j === i && !res.correct) b.classList.add('wrong');
      });
      $('con-fb-icon').textContent = res.correct ? '✅' : '❌';
      $('con-fb-label').textContent = res.correct ? t('constructor.correct') : t('constructor.was', { name: answers[res.correctIndex] });
      fb.className = `lesson-feedback show ${res.correct ? 'fb-correct' : 'fb-wrong'}`;
      const continueBtn = $('btn-con-continue');
      continueBtn.dataset.done = res.done ? '1' : '';
      if (res.done) {
        continueBtn.dataset.correct = res.result.correct;
        continueBtn.dataset.total = res.result.total;
      } else {
        continueBtn.dataset.next = JSON.stringify(res.next);
      }
    });
    grid.appendChild(btn);
  });
}

function handleConstructorContinue() {
  const btn = $('btn-con-continue');
  if (btn.dataset.done === '1') {
    const correct = parseInt(btn.dataset.correct);
    const total = parseInt(btn.dataset.total);
    showExtraResult({
      emoji: correct >= total * 0.8 ? '🍹' : '📝',
      title: correct >= total * 0.8 ? t('constructor.master') : t('constructor.completed'),
      correct, correctLbl: t('constructor.correct_label'),
      score: correct * 10, scoreLbl: t('constructor.xp_label'),
      extra: `${correct}/${total}`, extraLbl: t('constructor.result_label'),
      mode: 'constructor',
    });
    btn.dataset.done = '';
  } else {
    const nextData = btn.dataset.next ? JSON.parse(btn.dataset.next) : null;
    if (nextData) renderConstructorQuestion(nextData);
  }
}

// ─── BLIND TASTING ────────────────────────────────────────────
let blindAnswered = false;
let blindCurrentPayload = null;

function goToBlindMode() {
  const q = startBlind();
  blindCurrentPayload = q;
  blindAnswered = false;
  showView('view-blind');
  translateHTML();
  renderBlindQuestion(q);
}

function renderBlindQuestion({ clues, revealedClues, answers, correctIndex, index, total }) {
  blindCurrentPayload = { clues, revealedClues, answers, correctIndex, index, total };
  const totalEl = document.querySelector('#view-blind .quiz-q-total');
  if (totalEl) totalEl.textContent = `/${total}`;
  $('blind-q-num').textContent = index + 1;
  $('blind-progress').style.width = `${((index + 1) / total) * 100}%`;

  const ul = $('blind-clues');
  ul.innerHTML = '';
  clues.slice(0, revealedClues).forEach(c => {
    const li = document.createElement('li'); li.textContent = c; ul.appendChild(li);
  });

  $('btn-blind-reveal').disabled = revealedClues >= clues.length;
  const fb = $('blind-feedback');
  fb.className = 'lesson-feedback';
  blindAnswered = false;

  const grid = $('blind-answers');
  grid.innerHTML = '';
  answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${'ABCD'[i]}</span><span class="answer-text">${ans}</span>`;
    btn.addEventListener('click', () => {
      if (blindAnswered) return;
      blindAnswered = true;
      const res = answerBlind(i);
      document.querySelectorAll('#blind-answers .answer-btn').forEach((b, j) => {
        b.disabled = true;
        if (j === res.correctIndex) b.classList.add('correct');
        else if (j === i && !res.correct) b.classList.add('wrong');
      });
      $('blind-fb-icon').textContent = res.correct ? '✅' : '❌';
      $('blind-fb-label').textContent = res.correct ? t('blind.correct') : t('blind.incorrect');
      $('blind-fb-name').textContent = answers[res.correctIndex];
      fb.className = `lesson-feedback show ${res.correct ? 'fb-correct' : 'fb-wrong'}`;
      $('btn-blind-continue').dataset.done = res.done ? '1' : '';
      if (res.done) {
        $('btn-blind-continue').dataset.correct = res.result.correct;
        $('btn-blind-continue').dataset.total = res.result.total;
      } else {
        $('btn-blind-continue').dataset.next = JSON.stringify(res.next);
      }
    });
    grid.appendChild(btn);
  });
}

function handleBlindContinue() {
  const btn = $('btn-blind-continue');
  if (btn.dataset.done === '1') {
    const correct = parseInt(btn.dataset.correct);
    const total = parseInt(btn.dataset.total);
    showExtraResult({
      emoji: correct >= total * 0.7 ? '👃' : '🍷',
      title: correct >= total * 0.7 ? t('blind.golden_nose') : t('blind.completed'),
      correct, correctLbl: t('blind.identified_label'),
      score: correct * 15, scoreLbl: t('blind.xp_label'),
      extra: `${correct}/${total}`, extraLbl: t('blind.result_label'),
      mode: 'blind',
    });
    btn.dataset.done = '';
  } else {
    const nextData = btn.dataset.next ? JSON.parse(btn.dataset.next) : null;
    if (nextData) renderBlindQuestion(nextData);
  }
}

// ─── FICHAS ───────────────────────────────────────────────────
let fichasOpened = 0;

function goToFichas() {
  showView('view-fichas');
  translateHTML();
  renderFichasGrid(fichas);
}

function renderFichasGrid(list) {
  const grid = $('fichas-grid');
  grid.innerHTML = '';
  list.forEach(f => {
    const card = document.createElement('div');
    card.className = 'ficha-card';
    card.style.setProperty('--ficha-color', f.color);
    card.innerHTML = `<div class="ficha-card-icon">${f.icon}</div><div class="ficha-card-name">${f.name}</div><div class="ficha-card-cat">${f.category}</div>`;
    card.addEventListener('click', () => openFichaDetail(f));
    grid.appendChild(card);
  });
}

function openFichaDetail(f) {
  fichasOpened++;
  const newly = checkAchievements({ fichasOpened: Math.max(getStats().fichasOpened || 0, fichasOpened) });
  showNewAchievements(newly);

  $('ficha-detail-name').textContent = f.name;
  $('ficha-detail-hero').style.background = `linear-gradient(135deg, ${f.color}22, transparent)`;
  $('ficha-detail-icon').textContent = f.icon;
  $('ficha-detail-cat').textContent = f.category;
  $('fd-glass').textContent = f.glass;
  $('fd-method').textContent = f.method;
  $('fd-garnish').textContent = f.garnish;
  const ul = $('fd-ingredients');
  ul.innerHTML = '';
  f.ingredients.forEach(i => { const li = document.createElement('li'); li.textContent = i; ul.appendChild(li); });
  $('fd-story').textContent = f.story;
  showView('view-ficha-detail');
  translateHTML();
}

// ─── ACHIEVEMENTS VIEW ────────────────────────────────────────
function goToAchievements() {
  const list = getAchievements();
  const unlocked = list.filter(a => a.unlocked).length;
  $('ach-count').textContent = `${unlocked}/${list.length}`;
  const grid = $('ach-grid');
  grid.innerHTML = '';
  list.forEach(a => {
    const item = document.createElement('div');
    item.className = `ach-item ${a.unlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `<div class="ach-icon">${a.icon}</div><div class="ach-info"><div class="ach-title">${a.title}</div><div class="ach-desc">${a.desc}</div></div>`;
    grid.appendChild(item);
  });
  showView('view-achievements');
  translateHTML();
}

// ─── EXTRA RESULT ─────────────────────────────────────────────
let extraResultMode = null;

function showExtraResult({ emoji, title, correct, correctLbl, score, scoreLbl, extra, extraLbl, mode }) {
  extraResultMode = mode;
  $('er-emoji').textContent = emoji;
  $('er-title').textContent = title;
  $('er-correct').textContent = correct;
  $('er-correct-lbl').textContent = correctLbl;
  $('er-score').textContent = score;
  $('er-score-lbl').textContent = scoreLbl;
  $('er-extra').textContent = extra;
  $('er-extra-lbl').textContent = extraLbl;
  showView('view-extra-result');
  translateHTML();
}

// ─── LEARN HUB ───────────────────────────────────────────────
function goToLearnHub() {
  const { xp, streak } = getLearnStats();
  const lvl = getLevelInfo(xp);

  $('learn-streak-val').textContent = streak;
  $('learn-xp-val').textContent = xp;
  $('learn-level-badge').textContent = t('learn.level', { n: lvl.level });
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
      ${mastered ? `<div class="lesson-card-badge">${t('learn.mastered')}</div>` : ''}
      <div class="lesson-card-icon">${r.icon}</div>
      <div class="lesson-card-info">
        <div class="lesson-card-title">${r.title}</div>
        <div class="lesson-card-sub">${r.subtitle}</div>
        <div class="lesson-card-progress">
          <div class="lesson-card-bar"><div class="lesson-card-bar-fill" style="width:${progressPct}%"></div></div>
          <div class="lesson-card-count">${completed > 0 ? t('learn.times_completed', { n: completed }) : t('learn.not_completed')}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => beginLesson(r.id));
    container.appendChild(card);
  });

  showView('view-learn-hub');
  translateHTML();
}

// ─── LESSON ───────────────────────────────────────────────────
let currentLessonRoundId = null;

function beginLesson(roundId) {
  currentLessonRoundId = roundId;
  const q = startLesson(roundId);
  if (!q) return;
  showView('view-lesson');
  translateHTML();
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
  $('lesson-feedback-label').textContent = correct ? t('lesson.correct') : t('lesson.incorrect');
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
  $('lr-title').textContent = passed ? t('lesson.completed') : t('lesson.no_lives');
  $('lr-correct').textContent = `${correct}/${total}`;
  $('lr-xp').textContent = passed ? `+${xp}` : '+0';
  $('lr-lives').textContent = passed ? Array.from({ length: lives || 0 }, () => '❤️').join('') || '—' : '💀';

  // Store round id for retry/next
  $('btn-lr-retry').dataset.roundId = currentLessonRoundId;
  $('btn-lr-continue').dataset.roundId = currentLessonRoundId;

  // Update banner streak on dashboard
  const learnStats = getLearnStats();
  const bannerStreak = $('banner-streak');
  if (bannerStreak) bannerStreak.textContent = `🔥 ${learnStats.streak}`;

  // Check lesson achievements
  if (passed) {
    const stats = getStats();
    const lessonsCompleted = (stats.lessonsCompleted || 0) + 1;
    const newly = checkAchievements({
      lessonsCompleted,
      perfectLesson: lives > 0 && lives === 3 ? true : stats.perfectLesson,
      xp: learnStats.xp,
      streak: learnStats.streak,
    });
    showNewAchievements(newly);
  }

  showView('view-lesson-result');
  translateHTML();
}

// ─── LEADERBOARD ─────────────────────────────────────────────
let currentFilter = null;

async function goToLeaderboard(fromView) {
  $('btn-back-leaderboard').dataset.from = fromView || 'view-dashboard';
  setLoading(true);
  await renderLeaderboard(null);
  buildLeaderboardFilters();
  showView('view-leaderboard');
  translateHTML();
  setLoading(false);
}

function buildLeaderboardFilters() {
  const bar = $('leaderboard-filters');
  bar.innerHTML = `<button class="filter-btn active" data-filter="all">${t('leaderboard.all')}</button>`;
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
    list.innerHTML = `<div class="leaderboard-empty">${t('leaderboard.empty')}</div>`;
    return;
  }

  scores.forEach((entry, i) => {
    const isMe = user && entry.uid === user.uid;
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
    const dateLang = getLang() === 'en' ? 'en-US' : 'es-ES';
    const date = new Date(entry.date).toLocaleDateString(dateLang, { day: '2-digit', month: 'short' });
    const item = document.createElement('div');
    item.className = 'leaderboard-entry' + (isMe ? ' leaderboard-me' : '');
    item.innerHTML = `
      <div class="lb-rank">${medal}</div>
      <div class="lb-info">
        <div class="lb-name">${entry.name}${isMe ? ` <span class="lb-you">${t('leaderboard.you')}</span>` : ''}</div>
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

  // Language toggle
  $('btn-lang-toggle').addEventListener('click', toggleLanguage);

  // Dashboard header
  $('btn-leaderboard-header').addEventListener('click', () => goToLeaderboard('view-dashboard'));
  $('btn-logout').addEventListener('click', async () => {
    const user = getCurrentUser();
    if (user?.isGuest) {
      showView('view-login');
      return;
    }
    if (confirm(t('confirm.sign_out'))) {
      await signOutUser();
      showView('view-login');
    }
  });

  // Quiz controls
  $('btn-quit-quiz').addEventListener('click', () => {
    if (confirm(t('confirm.quit_game'))) {
      abortRound();
      goToDashboard();
    }
  });

  // Results buttons
  $('btn-play-again').addEventListener('click', () => startQuiz(currentRoundId));
  $('btn-leaderboard-results').addEventListener('click', () => goToLeaderboard('view-results'));
  $('btn-home-results').addEventListener('click', () => goToDashboard());

  // Quick modes dashboard
  $('btn-daily').addEventListener('click', () => startDailyChallenge());
  $('btn-speed').addEventListener('click', () => goToSpeedMode());
  $('btn-constructor').addEventListener('click', () => goToConstructorMode());
  $('btn-blind').addEventListener('click', () => goToBlindMode());
  $('btn-fichas').addEventListener('click', () => goToFichas());
  $('btn-achievements').addEventListener('click', () => goToAchievements());

  // Speed mode
  $('btn-quit-speed').addEventListener('click', () => { if (confirm(t('confirm.quit'))) { abortSpeed(); goToDashboard(); } });

  // Constructor mode
  $('btn-quit-constructor').addEventListener('click', () => { if (confirm(t('confirm.quit'))) { abortConstructor(); goToDashboard(); } });
  $('btn-con-continue').addEventListener('click', handleConstructorContinue);

  // Blind tasting
  $('btn-quit-blind').addEventListener('click', () => { if (confirm(t('confirm.quit'))) { abortBlind(); goToDashboard(); } });
  $('btn-blind-reveal').addEventListener('click', () => {
    const q = revealNextClue();
    if (!q) return;
    blindCurrentPayload = q;
    const ul = $('blind-clues');
    ul.innerHTML = '';
    q.clues.slice(0, q.revealedClues).forEach(c => { const li = document.createElement('li'); li.textContent = c; ul.appendChild(li); });
    $('btn-blind-reveal').disabled = q.revealedClues >= q.clues.length;
  });
  $('btn-blind-continue').addEventListener('click', handleBlindContinue);

  // Fichas
  $('btn-back-fichas').addEventListener('click', () => goToDashboard());
  $('btn-back-ficha-detail').addEventListener('click', () => goToFichas());
  $('fichas-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderFichasGrid(fichas.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)));
  });

  // Achievements
  $('btn-back-achievements').addEventListener('click', () => goToDashboard());

  // Extra result
  $('btn-er-again').addEventListener('click', () => {
    if (extraResultMode === 'speed') goToSpeedMode();
    else if (extraResultMode === 'constructor') goToConstructorMode();
    else if (extraResultMode === 'blind') goToBlindMode();
    else goToDashboard();
  });
  $('btn-er-home').addEventListener('click', () => goToDashboard());

  // Learning mode
  $('btn-go-learn').addEventListener('click', () => goToLearnHub());
  $('btn-back-learn').addEventListener('click', () => goToDashboard());
  $('btn-quit-lesson').addEventListener('click', () => {
    if (confirm(t('confirm.quit_lesson'))) { abortLesson(); goToLearnHub(); }
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
      el.textContent = t('sw.update');
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
