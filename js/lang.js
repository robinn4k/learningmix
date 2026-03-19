// ─── Language Management Module ──────────────────────────────
const STORAGE_KEY = 'stirio_lang';
const DEFAULT_LANG = 'es';

const translations = {
  es: {
    // Login view
    'login.tagline': 'Domina el arte del cóctel',
    'login.sub': 'Aprende · Pon a prueba tus conocimientos · Ranking global',
    'login.google': 'Iniciar sesión con Google',
    'login.guest': 'Continuar como invitado',
    'login.note': 'Inicia sesión con Google para guardar tus puntuaciones y aparecer en el ranking global',

    // Login errors
    'error.unauthorized_domain': 'Dominio no autorizado en Firebase. Añade robinn4k.github.io en Authentication → Settings → Authorized domains.',
    'error.popup_blocked': 'El navegador bloqueó el popup. Permite popups para este sitio.',
    'error.google_signin': 'Error al iniciar sesión con Google. Usa el modo invitado.',

    // Dashboard
    'dashboard.best': 'Mejor: {n} pts',
    'dashboard.no_play': '¡Sin jugar!',
    'dashboard.games': 'Partidas',
    'dashboard.best_label': 'Mejor',
    'dashboard.avg': 'Media',
    'dashboard.rounds': 'Rondas',
    'dashboard.game_modes': 'Modos de juego',
    'dashboard.daily': 'Reto Diario',
    'dashboard.speed': 'Velocidad',
    'dashboard.constructor': 'Constructor',
    'dashboard.blind': 'Blind Tasting',
    'dashboard.fichas': 'Fichas IBA',
    'dashboard.achievements': 'Logros',
    'dashboard.select_round': 'Selecciona una Ronda',
    'dashboard.learn_mode': 'Modo Aprendizaje',
    'dashboard.learn_sub': 'Aprende paso a paso · 3 vidas por lección',

    // Daily challenge
    'daily.title': '📅 Reto del Día',
    'daily.already_played': 'Ya jugaste hoy: {corrects}/10 · {score} pts',

    // Results
    'results.keep_practicing': '¡Sigue practicando!',
    'results.master_bartender': '¡Maestro Bartender!',
    'results.very_good': '¡Muy bien!',
    'results.good_try': '¡Buen intento!',
    'results.breakdown_title': 'Detalle de preguntas',
    'results.points': 'puntos',
    'results.correct': 'Correctas',
    'results.incorrect': 'Incorrectas',
    'results.bonus': 'Bonus',
    'results.play_again': '🔄 Jugar de nuevo',
    'results.view_ranking': '🏆 Ver Ranking',
    'results.home': '← Inicio',
    'results.share': '📤 Compartir',
    'results.share_text': '¡Conseguí {score} pts ({corrects}/10) en Stirio 🍸 ¿Puedes superarlo?',

    // Achievements
    'achievements.unlocked': '🏆 Logro desbloqueado: {icon} {title}',
    'achievements.title': '🏆 Logros',

    // Speed mode
    'speed.title': '⚡ Modo Velocidad',
    'speed.speedster': '¡Velocista!',
    'speed.time_up': '¡Tiempo!',
    'speed.correct_label': '✅ Correctas',
    'speed.points_label': '⭐ Puntos',
    'speed.answered_label': '📊 Respondidas',
    'speed.seconds': 'segundos',

    // Constructor mode
    'constructor.title': '🍹 Constructor',
    'constructor.question': '¿Qué cóctel tiene estos ingredientes?',
    'constructor.correct': '¡Correcto!',
    'constructor.was': 'Era: {name}',
    'constructor.master': '¡Maestro Constructor!',
    'constructor.completed': '¡Completado!',
    'constructor.correct_label': '✅ Correctas',
    'constructor.xp_label': '⭐ XP',
    'constructor.result_label': '📊 Resultado',
    'constructor.continue': 'Continuar',

    // Blind tasting
    'blind.title': '👃 Blind Tasting',
    'blind.identify': 'Identifica el destilado por sus aromas y sabores:',
    'blind.reveal': '+ Revelar pista',
    'blind.correct': '¡Correcto!',
    'blind.incorrect': '¡Incorrecto!',
    'blind.golden_nose': '¡Nariz de Oro!',
    'blind.completed': '¡Completado!',
    'blind.identified_label': '✅ Identificados',
    'blind.xp_label': '⭐ XP',
    'blind.result_label': '📊 Resultado',
    'blind.continue': 'Continuar',

    // Fichas
    'fichas.title': '📖 Fichas IBA',
    'fichas.search': 'Buscar cóctel...',
    'fichas.glass': '🥃 Vaso',
    'fichas.method': '🔀 Método',
    'fichas.garnish': '🌿 Garnish',
    'fichas.ingredients': 'Ingredientes',
    'fichas.history': 'Historia',

    // Leaderboard
    'leaderboard.title': '🏆 Ranking Global',
    'leaderboard.all': 'Todas',
    'leaderboard.empty': 'No hay puntuaciones todavía.<br>¡Sé el primero!',
    'leaderboard.you': '(Tú)',

    // Learn hub
    'learn.title': '📚 Aprendizaje',
    'learn.streak': '🔥 Racha',
    'learn.level': 'Nv. {n}',
    'learn.choose_lesson': 'Elige una lección',
    'learn.mastered': '★ Dominado',
    'learn.times_completed': '{n}× completada',
    'learn.not_completed': 'Sin completar',
    'learn.max_level': '⭐ Nivel máximo',

    // Lesson
    'lesson.correct': '¡Correcto!',
    'lesson.incorrect': '¡Incorrecto!',
    'lesson.continue': 'Continuar',
    'lesson.completed': '¡Lección completada!',
    'lesson.no_lives': '¡Sin vidas! Inténtalo de nuevo',
    'lesson.next': 'Siguiente lección',
    'lesson.retry': 'Repetir lección',
    'lesson.home': '← Inicio',
    'lesson.correct_label': '✅ Correctas',
    'lesson.xp_earned': '⭐ XP ganado',
    'lesson.lives_remaining': 'Vidas restantes',

    // Confirm dialogs
    'confirm.quit_game': '¿Abandonar la partida?',
    'confirm.quit': '¿Abandonar?',
    'confirm.quit_lesson': '¿Abandonar la lección?',
    'confirm.sign_out': '¿Cerrar sesión?',

    // Loading
    'loading.text': 'Preparando cócteles...',

    // Service worker
    'sw.update': 'Nueva versión disponible — toca para actualizar',

    // Connectivity
    'offline.message': '📶 Sin conexión — modo offline',
    'online.message': '✅ Conexión restaurada',
  },
  en: {
    // Login view
    'login.tagline': 'Master the art of cocktails',
    'login.sub': 'Learn · Test your knowledge · Global ranking',
    'login.google': 'Sign in with Google',
    'login.guest': 'Continue as guest',
    'login.note': 'Sign in with Google to save your scores and appear on the global ranking',

    // Login errors
    'error.unauthorized_domain': 'Unauthorized domain in Firebase. Add robinn4k.github.io in Authentication → Settings → Authorized domains.',
    'error.popup_blocked': 'Browser blocked the popup. Allow popups for this site.',
    'error.google_signin': 'Error signing in with Google. Use guest mode.',

    // Dashboard
    'dashboard.best': 'Best: {n} pts',
    'dashboard.no_play': 'Not played!',
    'dashboard.games': 'Games',
    'dashboard.best_label': 'Best',
    'dashboard.avg': 'Average',
    'dashboard.rounds': 'Rounds',
    'dashboard.game_modes': 'Game modes',
    'dashboard.daily': 'Daily Challenge',
    'dashboard.speed': 'Speed',
    'dashboard.constructor': 'Builder',
    'dashboard.blind': 'Blind Tasting',
    'dashboard.fichas': 'IBA Cards',
    'dashboard.achievements': 'Achievements',
    'dashboard.select_round': 'Select a Round',
    'dashboard.learn_mode': 'Learning Mode',
    'dashboard.learn_sub': 'Learn step by step · 3 lives per lesson',

    // Daily challenge
    'daily.title': '📅 Daily Challenge',
    'daily.already_played': 'Already played today: {corrects}/10 · {score} pts',

    // Results
    'results.keep_practicing': 'Keep practicing!',
    'results.master_bartender': 'Master Bartender!',
    'results.very_good': 'Very good!',
    'results.good_try': 'Good try!',
    'results.breakdown_title': 'Question details',
    'results.points': 'points',
    'results.correct': 'Correct',
    'results.incorrect': 'Incorrect',
    'results.bonus': 'Bonus',
    'results.play_again': '🔄 Play again',
    'results.view_ranking': '🏆 View Ranking',
    'results.home': '← Home',
    'results.share': '📤 Share',
    'results.share_text': 'I got {score} pts ({corrects}/10) on Stirio 🍸 Can you beat it?',

    // Achievements
    'achievements.unlocked': '🏆 Achievement unlocked: {icon} {title}',
    'achievements.title': '🏆 Achievements',

    // Speed mode
    'speed.title': '⚡ Speed Mode',
    'speed.speedster': 'Speedster!',
    'speed.time_up': 'Time!',
    'speed.correct_label': '✅ Correct',
    'speed.points_label': '⭐ Points',
    'speed.answered_label': '📊 Answered',
    'speed.seconds': 'seconds',

    // Constructor mode
    'constructor.title': '🍹 Builder',
    'constructor.question': 'Which cocktail has these ingredients?',
    'constructor.correct': 'Correct!',
    'constructor.was': 'It was: {name}',
    'constructor.master': 'Master Builder!',
    'constructor.completed': 'Completed!',
    'constructor.correct_label': '✅ Correct',
    'constructor.xp_label': '⭐ XP',
    'constructor.result_label': '📊 Result',
    'constructor.continue': 'Continue',

    // Blind tasting
    'blind.title': '👃 Blind Tasting',
    'blind.identify': 'Identify the spirit by its aromas and flavors:',
    'blind.reveal': '+ Reveal clue',
    'blind.correct': 'Correct!',
    'blind.incorrect': 'Incorrect!',
    'blind.golden_nose': 'Golden Nose!',
    'blind.completed': 'Completed!',
    'blind.identified_label': '✅ Identified',
    'blind.xp_label': '⭐ XP',
    'blind.result_label': '📊 Result',
    'blind.continue': 'Continue',

    // Fichas
    'fichas.title': '📖 IBA Cards',
    'fichas.search': 'Search cocktail...',
    'fichas.glass': '🥃 Glass',
    'fichas.method': '🔀 Method',
    'fichas.garnish': '🌿 Garnish',
    'fichas.ingredients': 'Ingredients',
    'fichas.history': 'History',

    // Leaderboard
    'leaderboard.title': '🏆 Global Ranking',
    'leaderboard.all': 'All',
    'leaderboard.empty': 'No scores yet.<br>Be the first!',
    'leaderboard.you': '(You)',

    // Learn hub
    'learn.title': '📚 Learning',
    'learn.streak': '🔥 Streak',
    'learn.level': 'Lv. {n}',
    'learn.choose_lesson': 'Choose a lesson',
    'learn.mastered': '★ Mastered',
    'learn.times_completed': '{n}× completed',
    'learn.not_completed': 'Not completed',
    'learn.max_level': '⭐ Max level',

    // Lesson
    'lesson.correct': 'Correct!',
    'lesson.incorrect': 'Incorrect!',
    'lesson.continue': 'Continue',
    'lesson.completed': 'Lesson completed!',
    'lesson.no_lives': 'No lives! Try again',
    'lesson.next': 'Next lesson',
    'lesson.retry': 'Repeat lesson',
    'lesson.home': '← Home',
    'lesson.correct_label': '✅ Correct',
    'lesson.xp_earned': '⭐ XP earned',
    'lesson.lives_remaining': 'Lives remaining',

    // Confirm dialogs
    'confirm.quit_game': 'Quit the game?',
    'confirm.quit': 'Quit?',
    'confirm.quit_lesson': 'Quit the lesson?',
    'confirm.sign_out': 'Sign out?',

    // Loading
    'loading.text': 'Preparing cocktails...',

    // Service worker
    'sw.update': 'New version available — tap to update',

    // Connectivity
    'offline.message': '📶 No connection — offline mode',
    'online.message': '✅ Connection restored',
  }
};

/** Get current language */
export function getLang() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
}

/** Set language and persist */
export function setLang(lang) {
  if (lang !== 'es' && lang !== 'en') return;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

/**
 * Translate a key. Supports simple placeholder replacement:
 *   t('dashboard.best', { n: 100 })  →  "Mejor: 100 pts"
 */
export function t(key, params) {
  const lang = getLang();
  let str = translations[lang]?.[key] ?? translations[DEFAULT_LANG]?.[key] ?? key;
  if (params) {
    Object.keys(params).forEach(k => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
    });
  }
  return str;
}

/**
 * Translate all elements with [data-i18n] attribute in the document.
 * data-i18n="key" sets textContent
 * data-i18n-placeholder="key" sets placeholder
 * data-i18n-html="key" sets innerHTML
 */
export function translateHTML() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.documentElement.lang = getLang();
}
