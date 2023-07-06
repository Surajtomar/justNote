import React from "react";
import sty from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
const SingIn = ({ setIsLogin }) => {
  return (
    <div className={sty.container}>
      <div className={sty.bigContainer}>
        <h1>Login to Your Account</h1>
        <div className={sty.loginWithGoogleContainer + " border-primary"}>
          <FcGoogle size="36" />
          <p>Login with Google</p>
        </div>
        <p>or use your email to register</p>
        <form action="" className={sty.form}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your Email." />
          <label htmlFor="password">Passwoard</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password."
          />

          <button type="submit" className="shadow-lg">
            Sign up{" "}
          </button>
        </form>
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

export default SingIn;
