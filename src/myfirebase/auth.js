import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './myfirebase';

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
  // signInWithRedirect(auth, provider);
};

export const fireSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign Out');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    });
};
