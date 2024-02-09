"use client";
import { auth } from "@/lib/firebase/client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailLink,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const Credential = await signInWithPopup(auth, provider);
    return Credential;
  } catch (error) {
    alert(error);
  }
  // console.log(Credential);
}
export async function loginWithEmail(email: string, password: string) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
  } catch (error) {
    console.log(error);

    alert("오류가 발생하였습니다.");
  }
}
