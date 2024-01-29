import { auth } from "@/lib/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const Credential = await signInWithPopup(auth, provider);
  // console.log(Credential);
}
