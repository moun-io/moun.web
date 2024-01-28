// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHJAqKM4Yma6lRCmAH_jrW_hi6rjRLihk",
  authDomain: "moun-df9ff.firebaseapp.com",
  projectId: "moun-df9ff",
  storageBucket: "moun-df9ff.appspot.com",
  messagingSenderId: "1027016143349",
  appId: "1:1027016143349:web:b03d40814156c2ee72f0bc",
  measurementId: "G-08XQ21PZM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
