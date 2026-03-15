import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

export const isFirebaseConfigured = requiredKeys.every((value) => Boolean(value));

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const analyticsPromise = app && typeof window !== "undefined" && firebaseConfig.measurementId
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
  : Promise.resolve(null);

// If your Firestore database has a custom ID (not "(default)"), set VITE_FIREBASE_FIRESTORE_ID in .env
const firestoreId = import.meta.env.VITE_FIREBASE_FIRESTORE_ID;
export const db = app ? (firestoreId ? getFirestore(app, firestoreId) : getFirestore(app)) : null;
export const storage = app ? getStorage(app) : null;
export const auth = app ? getAuth(app) : null;

export function assertFirebaseConfigured() {
  if (!app || !db || !storage) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values to your .env file.");
  }

  return { app, db, storage, auth };
}
