import { auth } from "@/lib/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const Credential = await signInWithPopup(auth, provider);
  console.log(Credential);
}
export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
