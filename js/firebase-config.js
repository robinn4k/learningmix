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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Cambiar a true cuando hayas configurado Firebase
export const FIREBASE_ENABLED = false;
