import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Client-side Firebase config. These NEXT_PUBLIC_* values are read at build
// time and are safe to expose in the browser (that's how the Firebase web SDK
// works). Put the real values in `.env.local` (git-ignored) — see `.env.example`.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Reuse the existing app during hot-reload / repeated imports instead of
// initializing it more than once.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Cloud Firestore instance.
export const db = getFirestore(app);
