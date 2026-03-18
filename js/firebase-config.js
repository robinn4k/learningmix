/**
 * FIREBASE CONFIGURATION
 * =====================
 * Para activar Firebase (guardado en la nube + ranking global):
 *
 * 1. Ve a https://console.firebase.google.com y crea un proyecto
 * 2. En "Authentication" → "Sign-in method" → activa "Google" (es gratis)
 * 3. En "Firestore Database" → crea la base de datos en modo producción
 * 4. En "Configuración del proyecto" (icono ⚙️) → "Tus apps" → botón "</>  Web"
 *    → ponle un nombre → verás un bloque de código con firebaseConfig → copia
 *    los valores y pégalos abajo reemplazando los YOUR_...
 * 5. Cambia FIREBASE_ENABLED = false  →  FIREBASE_ENABLED = true
 * 6. En Firestore → "Reglas" → pega esto y publica:
 *
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /scores/{scoreId} {
 *          allow read: if true;
 *          allow write: if request.auth != null;
 *        }
 *        match /users/{userId} {
 *          allow read, write: if request.auth != null && request.auth.uid == userId;
 *        }
 *      }
 *    }
 */

export const firebaseConfig = {
  apiKey: "AIzaSyDgbIK3WTkUI2Yo0FiMAv3nEYAvj6L25ow",
  authDomain: "dblearn-45fcc.firebaseapp.com",
  projectId: "dblearn-45fcc",
  storageBucket: "dblearn-45fcc.firebasestorage.app",
  messagingSenderId: "111717730902",
  appId: "1:111717730902:web:28987b3af458093eb849f7",
  measurementId: "G-Y8K9C8RKPM"
};

export const FIREBASE_ENABLED = true;
