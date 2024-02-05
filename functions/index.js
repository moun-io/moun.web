
import {auth, config} from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
// import { db } from "../../firebase/firebase";
import {getFirestore} from "firebase-admin/firestore";
initializeApp(config().firebase);

export const onCreateUser = auth.user().onCreate(async (user) => {
  console.log(`User created: ${user.uid}`);

  await getFirestore().collection("artists").doc(user.uid).set({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
  console.log("Item created");
});


export const onUpdateUser = auth.user().onUpdate(async (user) => {
  console.log(`User updated: ${user.uid}`);
  await getFirestore().collection("artists").doc(user.uid).update({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
  console.log("Item updated");
});
