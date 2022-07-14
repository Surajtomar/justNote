import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {} from 'firebase/firestore';
import { firebaseConfig } from './config';

const fireApp = initializeApp(firebaseConfig);

export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
