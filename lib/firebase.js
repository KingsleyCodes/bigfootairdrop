import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Use initializeFirestore instead of getFirestore to force Long Polling
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// This is the "Magic Fix" for the Offline error
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, 
});

export { db };