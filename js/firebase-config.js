/**
 * FIREBASE CONFIGURATION
 * =====================
 * Para activar Firebase (guardado en la nube + ranking global):
 *
 * 1. Ve a https://console.firebase.google.com y crea un proyecto
 * 2. En "Authentication" → "Sign-in method" → activa "Apple"
 *    (necesitarás una cuenta de Apple Developer para configurarlo)
 * 3. En "Firestore Database" → crea la base de datos en modo producción
 * 4. En "Configuración del proyecto" → "Tus apps" → "Web" → copia la config
 * 5. Reemplaza los valores de placeholder a continuación
 * 6. En Firestore, añade estas reglas de seguridad:
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
 *
 * APPLE SIGN IN:
 * Para Sign in with Apple necesitas:
 * - Apple Developer Program membership ($99/año)
 * - Crear un Service ID en developer.apple.com
 * - Registrar el dominio de tu app en Apple
 * - Firebase te proporciona la redirect URL que debes añadir en Apple
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
