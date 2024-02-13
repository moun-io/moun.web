
const functions= require("firebase-functions/v1");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.onCreateUser = functions.region("asia-northeast3")
    .auth.user()
    .onCreate(async (user) => {
      console.log(`User created: ${user.uid}`);
      //* Create a new document in the "artists" collection
      await admin.firestore().collection("artists").doc(user.uid).set({
        displayName: (user.displayName || "음악팔이소녀"),
        email: user.email,
        emailVerified: user.emailVerified, // ! emailAndPassword로 계정생성시 연동이 안됨
        photoURL: user.photoURL,
        createdAt: new Date(Date.now()).toISOString(),
      });
    });
// exports.onUpdateUser = functions.region("asia-northeast3")
//     .auth.user()
//     .onUpdate(async (change) => {
//       logger.log(`User updated: ${user.uid}`);
//       const user = change.after.data(); // 변경된 사용자 데이터
//       const userEmailVerified = user.emailVerified; // 이메일 인증 상태// 사용자 UID
//       if (userEmailVerified) {
//       //* Create a new document in the "artists" collection
//         await admin.firestore().collection("artists").doc(user.uid).set({
//           displayName: (user.displayName || "음악팔이소녀"),
//           email: user.email,
//           photoURL: user.photoURL,
//           createdAt: new Date(Date.now()).toISOString()로
//         });
//       }
//     });

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
      logger.log(`User updated: ${context.params.docId}`);
      const user = await admin.auth().updateUser(context.params.docId, {
        displayName: change.after.data().displayName,
        photoURL: change.after.data().photoURL,
      });
      if (user.emailVerified && !change.after.data().emailVerified) {
        // * 연동이 안된경우 emailVerified 를 업데이트
        change.after.ref.update({
          emailVerified: true,
        });
      }
    });
