const {auth, config} = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
initializeApp(config().firebase);

exports.onCreateUser = auth.user().onCreate(async (user) => {
  console.log(`User created: ${user.uid}`);

  await getFirestore().collection("artists").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: Date.now(),
  });
  console.log("Item created");
});
exports.onDeleteUser = auth.user().onDelete(async (user) => {
  console.log(`User deleted: ${user.uid}`);
  await getFirestore().collection("artists").doc(user.uid).delete();
  console.log("Item deleted");
});


// exports.onUpdateUser = auth.user().on(async (user) => {
//   console.log(`User updated: ${user.uid}`);
//   await getFirestore().collection("artists").doc(user.uid).update({
//     name: user.displayName,
//     email: user.email,
//     photoURL: user.photoURL,
//   });
//   console.log("Item updated");
// });


