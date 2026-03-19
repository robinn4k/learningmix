// ─── Language Management Module ──────────────────────────────
const STORAGE_KEY = 'stirio_lang';
const DEFAULT_LANG = 'es';
const SUPPORTED_LANGS = ['es', 'en', 'fr', 'pt'];

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
  },
  fr: {
    // Login view
    'login.tagline': "Maîtrisez l'art du cocktail",
    'login.sub': 'Apprenez · Testez vos connaissances · Classement mondial',
    'login.google': 'Se connecter avec Google',
    'login.guest': 'Continuer en tant qu\'invité',
    'login.note': 'Connectez-vous avec Google pour sauvegarder vos scores et apparaître dans le classement mondial',

    // Login errors
    'error.unauthorized_domain': 'Domaine non autorisé dans Firebase. Ajoutez robinn4k.github.io dans Authentication → Settings → Authorized domains.',
    'error.popup_blocked': 'Le navigateur a bloqué le popup. Autorisez les popups pour ce site.',
    'error.google_signin': 'Erreur lors de la connexion avec Google. Utilisez le mode invité.',

    // Dashboard
    'dashboard.best': 'Meilleur : {n} pts',
    'dashboard.no_play': 'Non joué !',
    'dashboard.games': 'Parties',
    'dashboard.best_label': 'Meilleur',
    'dashboard.avg': 'Moyenne',
    'dashboard.rounds': 'Manches',
    'dashboard.game_modes': 'Modes de jeu',
    'dashboard.daily': 'Défi du Jour',
    'dashboard.speed': 'Vitesse',
    'dashboard.constructor': 'Constructeur',
    'dashboard.blind': 'Dégustation à l\'Aveugle',
    'dashboard.fichas': 'Fiches IBA',
    'dashboard.achievements': 'Succès',
    'dashboard.select_round': 'Sélectionnez une Manche',
    'dashboard.learn_mode': 'Mode Apprentissage',
    'dashboard.learn_sub': 'Apprenez pas à pas · 3 vies par leçon',

    // Daily challenge
    'daily.title': '📅 Défi du Jour',
    'daily.already_played': 'Déjà joué aujourd\'hui : {corrects}/10 · {score} pts',

    // Results
    'results.keep_practicing': 'Continuez à pratiquer !',
    'results.master_bartender': 'Maître Barman !',
    'results.very_good': 'Très bien !',
    'results.good_try': 'Bon essai !',
    'results.breakdown_title': 'Détail des questions',
    'results.points': 'points',
    'results.correct': 'Correctes',
    'results.incorrect': 'Incorrectes',
    'results.bonus': 'Bonus',
    'results.play_again': '🔄 Rejouer',
    'results.view_ranking': '🏆 Voir le Classement',
    'results.home': '← Accueil',
    'results.share': '📤 Partager',
    'results.share_text': 'J\'ai obtenu {score} pts ({corrects}/10) sur Stirio 🍸 Tu peux faire mieux ?',

    // Achievements
    'achievements.unlocked': '🏆 Succès débloqué : {icon} {title}',
    'achievements.title': '🏆 Succès',

    // Speed mode
    'speed.title': '⚡ Mode Vitesse',
    'speed.speedster': 'Rapide !',
    'speed.time_up': 'Temps écoulé !',
    'speed.correct_label': '✅ Correctes',
    'speed.points_label': '⭐ Points',
    'speed.answered_label': '📊 Répondues',
    'speed.seconds': 'secondes',

    // Constructor mode
    'constructor.title': '🍹 Constructeur',
    'constructor.question': 'Quel cocktail a ces ingrédients ?',
    'constructor.correct': 'Correct !',
    'constructor.was': 'C\'était : {name}',
    'constructor.master': 'Maître Constructeur !',
    'constructor.completed': 'Terminé !',
    'constructor.correct_label': '✅ Correctes',
    'constructor.xp_label': '⭐ XP',
    'constructor.result_label': '📊 Résultat',
    'constructor.continue': 'Continuer',

    // Blind tasting
    'blind.title': '👃 Dégustation à l\'Aveugle',
    'blind.identify': 'Identifiez le spiritueux par ses arômes et saveurs :',
    'blind.reveal': '+ Révéler un indice',
    'blind.correct': 'Correct !',
    'blind.incorrect': 'Incorrect !',
    'blind.golden_nose': 'Nez d\'Or !',
    'blind.completed': 'Terminé !',
    'blind.identified_label': '✅ Identifiés',
    'blind.xp_label': '⭐ XP',
    'blind.result_label': '📊 Résultat',
    'blind.continue': 'Continuer',

    // Fichas
    'fichas.title': '📖 Fiches IBA',
    'fichas.search': 'Rechercher un cocktail...',
    'fichas.glass': '🥃 Verre',
    'fichas.method': '🔀 Méthode',
    'fichas.garnish': '🌿 Garniture',
    'fichas.ingredients': 'Ingrédients',
    'fichas.history': 'Histoire',

    // Leaderboard
    'leaderboard.title': '🏆 Classement Mondial',
    'leaderboard.all': 'Toutes',
    'leaderboard.empty': 'Pas encore de scores.<br>Soyez le premier !',
    'leaderboard.you': '(Vous)',

    // Learn hub
    'learn.title': '📚 Apprentissage',
    'learn.streak': '🔥 Série',
    'learn.level': 'Nv. {n}',
    'learn.choose_lesson': 'Choisissez une leçon',
    'learn.mastered': '★ Maîtrisé',
    'learn.times_completed': '{n}× terminée',
    'learn.not_completed': 'Non terminée',
    'learn.max_level': '⭐ Niveau max',

    // Lesson
    'lesson.correct': 'Correct !',
    'lesson.incorrect': 'Incorrect !',
    'lesson.continue': 'Continuer',
    'lesson.completed': 'Leçon terminée !',
    'lesson.no_lives': 'Plus de vies ! Réessayez',
    'lesson.next': 'Leçon suivante',
    'lesson.retry': 'Refaire la leçon',
    'lesson.home': '← Accueil',
    'lesson.correct_label': '✅ Correctes',
    'lesson.xp_earned': '⭐ XP gagné',
    'lesson.lives_remaining': 'Vies restantes',

    // Confirm dialogs
    'confirm.quit_game': 'Quitter la partie ?',
    'confirm.quit': 'Quitter ?',
    'confirm.quit_lesson': 'Quitter la leçon ?',
    'confirm.sign_out': 'Se déconnecter ?',

    // Loading
    'loading.text': 'Préparation des cocktails...',

    // Service worker
    'sw.update': 'Nouvelle version disponible — touchez pour mettre à jour',

    // Connectivity
    'offline.message': '📶 Hors connexion — mode hors ligne',
    'online.message': '✅ Connexion rétablie',
  },
  pt: {
    // Login view
    'login.tagline': 'Domine a arte do cocktail',
    'login.sub': 'Aprenda · Teste seus conhecimentos · Ranking global',
    'login.google': 'Entrar com Google',
    'login.guest': 'Continuar como convidado',
    'login.note': 'Entre com Google para salvar suas pontuações e aparecer no ranking global',

    // Login errors
    'error.unauthorized_domain': 'Domínio não autorizado no Firebase. Adicione robinn4k.github.io em Authentication → Settings → Authorized domains.',
    'error.popup_blocked': 'O navegador bloqueou o popup. Permita popups para este site.',
    'error.google_signin': 'Erro ao entrar com Google. Use o modo convidado.',

    // Dashboard
    'dashboard.best': 'Melhor: {n} pts',
    'dashboard.no_play': 'Não jogado!',
    'dashboard.games': 'Partidas',
    'dashboard.best_label': 'Melhor',
    'dashboard.avg': 'Média',
    'dashboard.rounds': 'Rodadas',
    'dashboard.game_modes': 'Modos de jogo',
    'dashboard.daily': 'Desafio Diário',
    'dashboard.speed': 'Velocidade',
    'dashboard.constructor': 'Construtor',
    'dashboard.blind': 'Degustação às Cegas',
    'dashboard.fichas': 'Fichas IBA',
    'dashboard.achievements': 'Conquistas',
    'dashboard.select_round': 'Selecione uma Rodada',
    'dashboard.learn_mode': 'Modo Aprendizado',
    'dashboard.learn_sub': 'Aprenda passo a passo · 3 vidas por lição',

    // Daily challenge
    'daily.title': '📅 Desafio do Dia',
    'daily.already_played': 'Já jogou hoje: {corrects}/10 · {score} pts',

    // Results
    'results.keep_practicing': 'Continue praticando!',
    'results.master_bartender': 'Mestre Bartender!',
    'results.very_good': 'Muito bem!',
    'results.good_try': 'Boa tentativa!',
    'results.breakdown_title': 'Detalhe das perguntas',
    'results.points': 'pontos',
    'results.correct': 'Corretas',
    'results.incorrect': 'Incorretas',
    'results.bonus': 'Bônus',
    'results.play_again': '🔄 Jogar novamente',
    'results.view_ranking': '🏆 Ver Ranking',
    'results.home': '← Início',
    'results.share': '📤 Compartilhar',
    'results.share_text': 'Consegui {score} pts ({corrects}/10) no Stirio 🍸 Você consegue superar?',

    // Achievements
    'achievements.unlocked': '🏆 Conquista desbloqueada: {icon} {title}',
    'achievements.title': '🏆 Conquistas',

    // Speed mode
    'speed.title': '⚡ Modo Velocidade',
    'speed.speedster': 'Velocista!',
    'speed.time_up': 'Tempo!',
    'speed.correct_label': '✅ Corretas',
    'speed.points_label': '⭐ Pontos',
    'speed.answered_label': '📊 Respondidas',
    'speed.seconds': 'segundos',

    // Constructor mode
    'constructor.title': '🍹 Construtor',
    'constructor.question': 'Qual cocktail tem estes ingredientes?',
    'constructor.correct': 'Correto!',
    'constructor.was': 'Era: {name}',
    'constructor.master': 'Mestre Construtor!',
    'constructor.completed': 'Concluído!',
    'constructor.correct_label': '✅ Corretas',
    'constructor.xp_label': '⭐ XP',
    'constructor.result_label': '📊 Resultado',
    'constructor.continue': 'Continuar',

    // Blind tasting
    'blind.title': '👃 Degustação às Cegas',
    'blind.identify': 'Identifique o destilado pelos seus aromas e sabores:',
    'blind.reveal': '+ Revelar pista',
    'blind.correct': 'Correto!',
    'blind.incorrect': 'Incorreto!',
    'blind.golden_nose': 'Nariz de Ouro!',
    'blind.completed': 'Concluído!',
    'blind.identified_label': '✅ Identificados',
    'blind.xp_label': '⭐ XP',
    'blind.result_label': '📊 Resultado',
    'blind.continue': 'Continuar',

    // Fichas
    'fichas.title': '📖 Fichas IBA',
    'fichas.search': 'Buscar cocktail...',
    'fichas.glass': '🥃 Copo',
    'fichas.method': '🔀 Método',
    'fichas.garnish': '🌿 Guarnição',
    'fichas.ingredients': 'Ingredientes',
    'fichas.history': 'História',

    // Leaderboard
    'leaderboard.title': '🏆 Ranking Global',
    'leaderboard.all': 'Todas',
    'leaderboard.empty': 'Nenhuma pontuação ainda.<br>Seja o primeiro!',
    'leaderboard.you': '(Você)',

    // Learn hub
    'learn.title': '📚 Aprendizado',
    'learn.streak': '🔥 Sequência',
    'learn.level': 'Nv. {n}',
    'learn.choose_lesson': 'Escolha uma lição',
    'learn.mastered': '★ Dominado',
    'learn.times_completed': '{n}× concluída',
    'learn.not_completed': 'Não concluída',
    'learn.max_level': '⭐ Nível máximo',

    // Lesson
    'lesson.correct': 'Correto!',
    'lesson.incorrect': 'Incorreto!',
    'lesson.continue': 'Continuar',
    'lesson.completed': 'Lição concluída!',
    'lesson.no_lives': 'Sem vidas! Tente novamente',
    'lesson.next': 'Próxima lição',
    'lesson.retry': 'Repetir lição',
    'lesson.home': '← Início',
    'lesson.correct_label': '✅ Corretas',
    'lesson.xp_earned': '⭐ XP ganho',
    'lesson.lives_remaining': 'Vidas restantes',

    // Confirm dialogs
    'confirm.quit_game': 'Abandonar a partida?',
    'confirm.quit': 'Abandonar?',
    'confirm.quit_lesson': 'Abandonar a lição?',
    'confirm.sign_out': 'Sair?',

    // Loading
    'loading.text': 'Preparando cocktails...',

    // Service worker
    'sw.update': 'Nova versão disponível — toque para atualizar',

    // Connectivity
    'offline.message': '📶 Sem conexão — modo offline',
    'online.message': '✅ Conexão restaurada',
  }
};

/** Get current language */
export function getLang() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
}

/** Set language and persist */
export function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

/** Get list of supported languages */
export function getSupportedLangs() {
  return SUPPORTED_LANGS;
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
