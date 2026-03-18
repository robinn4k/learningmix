import { firebaseConfig, FIREBASE_ENABLED } from './firebase-config.js';

let auth = null;
let db = null;
let currentUser = null;

// Inicializar Firebase si está configurado
async function initFirebase() {
  if (!FIREBASE_ENABLED) return false;
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    return true;
  } catch (e) {
    console.warn('Firebase no disponible, usando modo local:', e);
    return false;
  }
}

// Login con Apple Sign In via Firebase
async function signInWithApple() {
  if (!auth) throw new Error('Firebase no configurado. Configura firebase-config.js primero.');
  const { OAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  currentUser = {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Jugador Apple',
    email: user.email,
    photo: user.photoURL,
    provider: 'apple',
    isGuest: false
  };
  saveUserLocal(currentUser);
  return currentUser;
}

// Login como invitado
function signInAsGuest() {
  const guestId = localStorage.getItem('cq_guest_id') || 'guest_' + Date.now();
  localStorage.setItem('cq_guest_id', guestId);
  currentUser = {
    uid: guestId,
    name: localStorage.getItem('cq_guest_name') || 'Invitado',
    email: null,
    photo: null,
    provider: 'guest',
    isGuest: true
  };
  saveUserLocal(currentUser);
  return currentUser;
}

// Cerrar sesión
async function signOutUser() {
  if (auth) {
    const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    await signOut(auth);
  }
  currentUser = null;
  localStorage.removeItem('cq_current_user');
}

// Guardar usuario en local
function saveUserLocal(user) {
  localStorage.setItem('cq_current_user', JSON.stringify(user));
}

// Recuperar sesión guardada
function restoreSession() {
  const saved = localStorage.getItem('cq_current_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    return currentUser;
  }
  return null;
}

// Actualizar nombre del invitado
function updateGuestName(name) {
  if (currentUser && currentUser.isGuest) {
    currentUser.name = name.trim() || 'Invitado';
    localStorage.setItem('cq_guest_name', currentUser.name);
    saveUserLocal(currentUser);
  }
}

function getDb() { return db; }
function getCurrentUser() { return currentUser; }
function isFirebaseReady() { return !!auth; }

export {
  initFirebase,
  signInWithApple,
  signInAsGuest,
  signOutUser,
  restoreSession,
  updateGuestName,
  getDb,
  getCurrentUser,
  isFirebaseReady
};
