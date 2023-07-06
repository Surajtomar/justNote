import React from "react";
import sty from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
const SignUp = ({ setIsLogin }) => {
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
        <div className={sty.loginWithGoogleContainer + " border-primary"}>
          <FcGoogle size="36" />
          <p>Sign up with Google</p>
        </div>
        <p>or use your email to register</p>
        <form action="" className={sty.form}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your name here." />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your Email." />
          <label htmlFor="password">Passwoard</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password."
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password."
          />
          <button type="submit" className="shadow-lg">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
