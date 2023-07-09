import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getStorage } from "firebase/storage";

const fireApp = initializeApp(firebaseConfig);

export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
export const storage = getStorage(fireApp);
