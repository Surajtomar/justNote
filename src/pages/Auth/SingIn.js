import React, { useState } from "react";
import sty from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  fireForgotPassword,
  fireSignIn,
  fireSignInWithGoogle,
  fireSignUp,
} from "../../firebase/auth";
import { useRef } from "react";

const handleSignInWithGoogle = () => {
  fireSignInWithGoogle();
};

const SingIn = ({ setIsLogin }) => {
  const email = useRef(null);
  const password = useRef(null);
  const [isForgotPass, setIsForgotPass] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isForgotPass) fireForgotPassword(email.current.value);
    else
      fireSignIn({
        email: email.current.value,
        password: password.current.value,
      });

    email.current.value = "";
    password.current.value = "";
  };

  return (
    <div className={sty.container}>
      <div className={sty.bigContainer}>
        <h1>Login to Your Account</h1>
        <div
          className={sty.loginWithGoogleContainer + " border-primary"}
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size="36" />
          <p>Login with Google</p>
        </div>
        <p>or use your email to register</p>
        {isForgotPass
          ? forgotPassForm({ email, handleFormSubmit })
          : signInForm({ email, password, handleFormSubmit })}

        <div className={sty.forgotPassButtonWrapper}>
          <button
            type="button"
            onClick={() => setIsForgotPass((current) => !current)}
          >
            {isForgotPass ? "Go back" : "Forgot your password?"}
          </button>
        </div>
      </div>
      <div className={sty.smallContainer}>
        <h1>New Here?</h1>
        <p>Sign up and discover a great product.</p>

        <button type="button" onClick={() => setIsLogin(false)}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

const signInForm = ({ email, password, handleFormSubmit }) => (
  <form action="" className={sty.form} onSubmit={handleFormSubmit}>
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

    <button type="submit" className="shadow-lg">
      Sign In
    </button>
  </form>
);

const forgotPassForm = ({ email, handleFormSubmit }) => (
  <form action="" className={sty.form} onSubmit={handleFormSubmit}>
    <label htmlFor="email">Enter your registered Email ID</label>
    <input
      type="email"
      name="email"
      placeholder="Enter your registered Email ID"
      ref={email}
    />

    <button type="submit" className="shadow-lg">
      Reset Password
    </button>
  </form>
);

export default SingIn;
