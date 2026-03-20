/**
 * rivals.js — Firebase Realtime Database service for 1v1 Rivals mode
 * Centralizes all real-time multiplayer logic.
 */

const POINTS_PER_CORRECT = 100;
const TIME_BONUS_PER_SECOND = 5;
export const QUESTIONS_PER_DUEL = 10;

let db = null;

// ─── Init ─────────────────────────────────────────────────────

export async function initRivals() {
  try {
    const { getApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    db = getDatabase(getApp());
    return true;
  } catch (e) {
    console.warn('Firebase RTDB no disponible:', e);
    return false;
  }
}

export function isRivalsReady() {
  return !!db;
}

// ─── Anonymous Auth (for guest users) ────────────────────────

export async function ensureAnonymousAuth() {
  try {
    const { getApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getAuth, signInAnonymously } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    const auth = getAuth(getApp());
    if (auth.currentUser) return auth.currentUser.uid;
    const result = await signInAnonymously(auth);
    return result.user.uid;
  } catch (e) {
    console.warn('Anonymous auth failed:', e);
    return null;
  }
}

// ─── Helpers ──────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateRoomId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Prepare questions from a round for a duel.
 * Returns a serializable array (plain strings, no multilingual objects needed
 * since questions.js for es/en returns plain string questions already).
 */
export function prepareDuelQuestions(roundData) {
  return shuffle(roundData.questions).slice(0, QUESTIONS_PER_DUEL).map(q => {
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

export function calcScore(correct, timeLeft) {
  return correct ? POINTS_PER_CORRECT + timeLeft * TIME_BONUS_PER_SECOND : 0;
}

// ─── Presence ─────────────────────────────────────────────────

export async function setPresence(uid, name) {
  if (!db) return;
  const { ref, set, onDisconnect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const presRef = ref(db, `presence/${uid}`);
  await set(presRef, { name, online: true });
  onDisconnect(presRef).remove();
}

export async function removePresence(uid) {
  if (!db) return;
  const { ref, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await remove(ref(db, `presence/${uid}`));
}

export async function listenOnlineCount(cb) {
  if (!db) { cb(0); return () => {}; }
  const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const unsub = onValue(ref(db, 'presence'), snap => {
    cb(snap.exists() ? Object.keys(snap.val()).length : 0);
  });
  return unsub;
}

// ─── Room: Friend Code ────────────────────────────────────────

export async function createFriendRoom(uid, name, questions) {
  if (!db) throw new Error('RTDB no inicializado');
  const { ref, set, onDisconnect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const roomId = generateRoomId();
  const code = generateCode();

  await set(ref(db, `rooms/${roomId}`), {
    code,
    status: 'waiting',
    questions,
    createdAt: Date.now(),
    players: {
      p1: { uid, name, score: 0, currentQ: 0, answers: {}, ready: false }
    }
  });
  // Store code → roomId mapping for lookup
  await set(ref(db, `codes/${code}`), roomId);

  // Register cleanup on disconnect
  onDisconnect(ref(db, `rooms/${roomId}/players/p1`)).update({ disconnected: true });
  onDisconnect(ref(db, `codes/${code}`)).remove();

  return { roomId, code };
}

export async function joinByCode(uid, name, code) {
  if (!db) throw new Error('RTDB no inicializado');
  const { ref, get, set, update, onDisconnect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

  const codeSnap = await get(ref(db, `codes/${code.toUpperCase()}`));
  if (!codeSnap.exists()) return null;

  const roomId = codeSnap.val();
  const roomSnap = await get(ref(db, `rooms/${roomId}`));
  if (!roomSnap.exists()) return null;

  const room = roomSnap.val();
  if (room.players?.p2) return 'full';
  if (room.players?.p1?.uid === uid) return 'self'; // can't join own room

  const p2Ref = ref(db, `rooms/${roomId}/players/p2`);
  await set(p2Ref, { uid, name, score: 0, currentQ: 0, answers: {}, ready: true });
  await update(ref(db, `rooms/${roomId}`), { status: 'ready' });

  onDisconnect(p2Ref).update({ disconnected: true });

  return roomId;
}

// ─── Room: Matchmaking Queue ──────────────────────────────────

export async function joinQueue(uid, name, questions) {
  if (!db) throw new Error('RTDB no inicializado');
  const { ref, get, set, remove, onDisconnect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

  const qSnap = await get(ref(db, 'queue'));
  if (qSnap.exists()) {
    const entries = Object.entries(qSnap.val()).filter(([id]) => id !== uid);
    if (entries.length > 0) {
      const [oppUid, opp] = entries[0];
      // Remove opponent from queue and create room
      await remove(ref(db, `queue/${oppUid}`));
      const roomId = generateRoomId();
      const p2Ref = ref(db, `rooms/${roomId}/players/p2`);

      await set(ref(db, `rooms/${roomId}`), {
        code: null,
        status: 'playing',
        questions,
        createdAt: Date.now(),
        players: {
          p1: { uid: oppUid, name: opp.name, score: 0, currentQ: 0, answers: {}, ready: true },
          p2: { uid, name, score: 0, currentQ: 0, answers: {}, ready: true }
        }
      });
      onDisconnect(p2Ref).update({ disconnected: true });

      // Notify the waiting p1
      await set(ref(db, `matched/${oppUid}`), { roomId });

      return { roomId, slot: 'p2', waiting: false };
    }
  }

  // No match found — add self to queue
  const myRef = ref(db, `queue/${uid}`);
  await set(myRef, { uid, name, joinedAt: Date.now() });
  onDisconnect(myRef).remove();

  return { roomId: null, slot: 'p1', waiting: true };
}

export async function leaveQueue(uid) {
  if (!db) return;
  const { ref, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await remove(ref(db, `queue/${uid}`));
}

/** Listen for a match notification (used by the waiting p1 player) */
export async function listenForMatch(uid, cb) {
  if (!db) return () => {};
  const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const unsub = onValue(ref(db, `matched/${uid}`), snap => {
    if (snap.exists()) cb(snap.val()); // { roomId }
  });
  return unsub;
}

export async function clearMatchNotif(uid) {
  if (!db) return;
  const { ref, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await remove(ref(db, `matched/${uid}`));
}

// ─── In-Room Actions ──────────────────────────────────────────

export async function listenRoom(roomId, cb) {
  if (!db) return () => {};
  const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const unsub = onValue(ref(db, `rooms/${roomId}`), snap => {
    cb(snap.exists() ? snap.val() : null);
  });
  return unsub;
}

export async function startRoom(roomId) {
  if (!db) return;
  const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await update(ref(db, `rooms/${roomId}`), { status: 'playing' });
}

export async function registerPlayerDisconnect(roomId, slot) {
  if (!db) return;
  const { ref, onDisconnect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  onDisconnect(ref(db, `rooms/${roomId}/players/${slot}`)).update({ disconnected: true });
}

/**
 * Submit an answer for a player.
 * @param {string} roomId
 * @param {string} slot - 'p1' or 'p2'
 * @param {number} qIndex - question index (0-based)
 * @param {boolean} correct
 * @param {number} timeLeft - seconds remaining
 * @param {number} newScore - cumulative score after this answer
 */
export async function submitAnswer(roomId, slot, qIndex, correct, timeLeft, newScore) {
  if (!db) return;
  const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const updates = {
    [`rooms/${roomId}/players/${slot}/answers/${qIndex}`]: { correct, timeLeft },
    [`rooms/${roomId}/players/${slot}/currentQ`]: qIndex + 1,
    [`rooms/${roomId}/players/${slot}/score`]: newScore
  };
  await update(ref(db), updates);
}

export async function finishGame(roomId) {
  if (!db) return;
  const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await update(ref(db, `rooms/${roomId}`), { status: 'finished' });
}

export async function leaveRoom(roomId, slot) {
  if (!db) return;
  const { ref, update } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  await update(ref(db, `rooms/${roomId}/players/${slot}`), { disconnected: true });
}
