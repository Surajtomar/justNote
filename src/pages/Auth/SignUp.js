import React, { useContext, useRef } from "react";
import sty from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
import { fireSignInWithGoogle, fireSignUp } from "../../firebase/auth";
import { userContext } from "../../context/store";
import { toast } from "react-toastify";
const handleSignInWithGoogle = () => {
  fireSignInWithGoogle();
};
const SignUp = ({ setIsLogin }) => {
  const { dispatch } = useContext(userContext);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  return (
    <div className={sty.container}>
      <div className={sty.smallContainer}>
        <h1>Welcome Back</h1>
        <p>To keep connected with us please login with your personal info.</p>
        <button type="button" onClick={() => setIsLogin(true)}>
          SIGN IN
        </button>
      </div>
      <div className={sty.bigContainer}>
        <h1>Create Account</h1>
        <div
          className={sty.loginWithGoogleContainer + " border-primary"}
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size="36" />
          <p>Sign up with Google</p>
        </div>
        <p>or use your email to register</p>

        {signupForm({
          name,
          email,
          password,
          confirmPassword,
          dispatch,
        })}
      </div>
    </div>
  );
};

export default SignUp;

const signupForm = ({ name, email, password, confirmPassword, dispatch }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      name.current.value === "" ||
      email.current.value === "" ||
      confirmPassword.current.value === "" ||
      confirmPassword.current.value === ""
    )
      warningToast("Please fill in all the required fields before proceeding.");
    else if (confirmPassword.current.value === password.current.value)
      fireSignUp({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        dispatch,
      });
    else
      warningToast(
        "The password and confirm password do not match. Please make sure both fields have the same password entered."
      );
  };
  return (
    <form action="" className={sty.form} onSubmit={handleFormSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name here."
        ref={name}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your Email."
        ref={email}
      />
      <label htmlFor="password">Passwoard</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password."
        ref={password}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Enter Confirm Password."
        ref={confirmPassword}
      />
      <button type="submit" className="shadow-lg">
        Sign Up
      </button>
    </form>
  );
};

const warningToast = (message) =>
  toast.warning(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
