"use client";
// Import the functions you need from the SDKs you need

import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHJAqKM4Yma6lRCmAH_jrW_hi6rjRLihk",
  // authDomain: "moun-df9ff.firebaseapp.com",
  authDomain: "moun-next.vercel.app",
  projectId: "moun-df9ff",
  storageBucket: "moun-df9ff.appspot.com",
  messagingSenderId: "1027016143349",
  appId: "1:1027016143349:web:b03d40814156c2ee72f0bc",
  measurementId: "G-08XQ21PZM5",
};

const currentApps = getApps();
// const app =
//   currentApps.length === 0 ? initializeApp(firebaseConfig) : currentApps[0];
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// const analytics = getAnalytics(app);

let db: Firestore, auth: Auth, storage;
if (currentApps.length === 0) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { db, auth, storage };
