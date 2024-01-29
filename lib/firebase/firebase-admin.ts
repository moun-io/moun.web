import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    // credential: cert({
    //   projectId: "moun-df9ff",
    //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //   privateKey: process.env.FIREBASE_PRIVATE_KEY,
    // }),
    credential: applicationDefault(),
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  });
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
