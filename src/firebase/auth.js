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
import { toast } from "react-toastify";

export const fireSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() =>
      successTost("Thank you for signing in. We're glad to have you back.")
    )
    .catch((error) => errorTost(error.code));
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
      successTost("Your profile has been updated successfully.");
    })
    .catch((error) => errorTost(error.code));
};
export const fireSignUp = ({ email, password, dispatch, name }) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed Up
      fireUpdateUserProfile({
        name,
        profilePic: null,
        dispatch,
        profileUpdated: null,
      }).catch((error) => errorTost(error.code));
      successTost("Thank you for signing up. We're glad to have you on board.");
    })
    .catch((error) => errorTost(error.code));
};
export const fireSignIn = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Sucessfully signed");
      successTost("Thank you for signing in. We're glad to have you back.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorCode, errorMessage);
      errorTost(errorCode);
    });
};

export const fireSignOut = () => {
  signOut(auth)
    .then(() => {
      successTost(
        "You have been successfully signed out. Thank you for using our app. We look forward to seeing you again soon!"
      );
    })
    .catch((error) => errorTost(error.code));
};

export const fireSendVerificationMail = () => {
  sendEmailVerification(auth.currentUser)
    .then(() =>
      successTost(
        "Great news! An email for verification has been sent to your email address. Please check your inbox and follow the instructions provided to complete the verification process."
      )
    )
    .catch((error) => errorTost(error.code));
};

const fireAuthErrorMessage = {
  "auth/email-already-in-use":
    "Sorry, this email address is already registered. Please try using a different email or log in with your existing account.",
  "internal-error":
    "Apologies, an internal error has occurred. Please try again later or contact our support team for assistance.",
  "already-exists":
    "Sorry, the requested entity already exists in our system. Please choose a different name or identifier to ensure uniqueness.",
  "user-disabled":
    "We're sorry, but your account has been disabled. Please contact our support team for further assistance.",
  "auth/invalid-email":
    "Oops! The email address you entered is not valid. Please make sure you enter a valid email address (e.g., example@example.com) and try again.",
  "auth/weak-password":
    "Uh-oh! The password you entered is invalid. Please make sure your password is a string with at least six characters.",
  "auth/invalid-photo-url":
    "We're sorry, but the provided photo URL is invalid. Please make sure it is a valid string URL.",
  "auth/uid-already-exists":
    "We apologize for the inconvenience. The provided user ID is already in use by another user. Please choose a different user ID to ensure uniqueness.",
  "auth/user-not-found":
    "We couldn't find a user with the provided credentials. Please check your email and password and try again. If you haven't registered yet, please sign up to create a new account.",
  default:
    "Oops! An error occurred while processing your request. Please try again later or contact our support team for assistance.",
};

function successTost(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
function errorTost(code) {
  const message = fireAuthErrorMessage[code]
    ? fireAuthErrorMessage[code]
    : fireAuthErrorMessage["default"];

  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
