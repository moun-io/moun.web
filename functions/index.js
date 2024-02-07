
const functions= require("firebase-functions/v1");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.onCreateUser = functions.region("asia-northeast3")
    .auth.user()
    .onCreate(async (user) => {
      console.log(`User created: ${user.uid}aut.`);
      await admin.firestore().collection("artists").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(Date.now()).toISOString(),
      });
      console.log("Item created");
    });
exports.onDeleteUser = functions.region("asia-northeast3")
    .auth.user()
    .onDelete(async (user) => {
      logger.log(`User deleted: ${user.uid}`);
      await admin.firestore().collection("artists").doc(user.uid).delete();
      logger.log("Item deleted");
    });
exports.onUpdateArtist = functions.region("asia-northeast3")
    .firestore.document("artists/{docId}")
    .onUpdate(async (change, context) => {
      const res = await admin.auth().updateUser(context.params.docId, {
        displayName: change.after.data().displayName,
        photoURL: change.after.data().photoURL,
      });
      logger.log("User updated", res);
    });

