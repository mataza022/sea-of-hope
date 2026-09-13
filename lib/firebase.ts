// lib/firebase.ts
let db: any = null;
let auth: any = null;

try {
  const { initializeApp, getApps, getApp } = require("firebase/app");
  const { getFirestore } = require("firebase/firestore");
  const { getAuth } = require("firebase/auth");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Only initialize Firebase if we have a real API key
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "test") {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
} catch (error) {
  console.warn("Firebase not initialized:", error);
}

export { db, auth };
