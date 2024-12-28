import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import firebaseApp from "./config";

const db = getFirestore(firebaseApp);

export * from "./api";

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export default db;
