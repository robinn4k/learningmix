/**
 * Cookie Consent Manager
 * Manages GDPR cookie consent for EU compliance.
 * Analytics (Firebase / Google Analytics) only loads after explicit accept.
 */

const CONSENT_KEY = 'stirio_cookie_consent';

export function getConsent() {
  return localStorage.getItem(CONSENT_KEY); // 'accepted' | 'rejected' | null
}

export function hasConsent() {
  return getConsent() === 'accepted';
}

function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
}

function hideBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
}

function initBanner() {
  const existing = getConsent();
  if (existing) return; // already decided

  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  banner.classList.remove('hidden');

  document.getElementById('cookie-accept').addEventListener('click', () => {
    setConsent('accepted');
    hideBanner();
    loadAnalytics();
  });

  document.getElementById('cookie-reject').addEventListener('click', () => {
    setConsent('rejected');
    hideBanner();
  });
}

async function loadAnalytics() {
  // Only load Firebase Analytics when user has accepted cookies
  try {
    const { firebaseConfig, FIREBASE_ENABLED } = await import('./firebase-config.js');
    if (!FIREBASE_ENABLED || !firebaseConfig.measurementId) return;

    const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js');

    // Reuse existing Firebase app if already initialized
    const app = getApps().length
      ? getApps()[0]
      : initializeApp(firebaseConfig);

    getAnalytics(app);
  } catch (e) {
    // Analytics not critical — fail silently
  }
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBanner);
} else {
  initBanner();
}

// If consent was already accepted on a previous visit, load analytics now
if (hasConsent()) {
  loadAnalytics();
}
