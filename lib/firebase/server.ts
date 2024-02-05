import serviceAccount from "@/moun-service-account.json";
import {
  ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Storage, getStorage } from "firebase-admin/storage";

const currentApps = getApps();

// const app =
//   currentApps.length === 0
//     ? initializeApp({
//         credential: cert(serviceAccount as ServiceAccount),
//       })
//     : currentApps[0];

// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);

let db: Firestore, auth: Auth, storage: Storage;
if (currentApps.length === 0) {
  const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
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
