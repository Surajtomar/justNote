import React, { useContext, useState } from "react";
import sty from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
import { fireSignInWithGoogle, fireSignUp } from "../../firebase/auth";
import { userContext } from "../../context/store";
const handleSignInWithGoogle = () => {
  fireSignInWithGoogle();
};
const SignUp = ({ setIsLogin }) => {
  const { dispatch } = useContext(userContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("HansleSubmit");
    if (password !== "" && password === confirmPassword)
      fireSignUp({ name, email, password, dispatch });
  };
  console.log("ss", password !== confirmPassword || password === "");
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
        <form action="" className={sty.form} onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name here."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Passwoard</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="shadow-lg">
            {password === confirmPassword
              ? "Sign Up"
              : "Password and Confirm Passwoard must be same."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
