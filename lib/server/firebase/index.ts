import { getFirestore } from "firebase/firestore";
import firebaseApp from "./config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export default db;
