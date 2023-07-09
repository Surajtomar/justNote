import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { UPDATE_USER_PROFILE } from "../context/action.type";

export const fireSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

export const fireUpdateUserProfile = ({
  name,
  profilePic,
  dispatch,
  profileUpdated,
}) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: profilePic,
  })
    .then(() => {
      dispatch({ type: UPDATE_USER_PROFILE, payload: { name, profilePic } });
      if (profileUpdated) profileUpdated();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
export const fireSignUp = ({ email, password, dispatch, name }) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed Up
      const user = userCredential.user;
      console.log("User: ", user);
      fireUpdateUserProfile({
        name,
        profilePic: null,
        dispatch,
        profileUpdated: null,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorCode, errorMessage);
    });
};
export const fireSignIn = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Sucessfully signed");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorCode, errorMessage);
    });
};

export const fireSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign Out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
    });
};

export const fireSendVerificationMail = () => {
  sendEmailVerification(auth.currentUser);
};
