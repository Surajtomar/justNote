import React, { useState } from "react";
import sty from "./VerifyEmail.module.css";
import Confirmed from "../assets/Confirmed.gif";
import { fireSendVerificationMail } from "../firebase/auth";
const VerifyEmail = () => {
  const [isMailSend, setIsMailSend] = useState(false);
  const handleClick = () => {
    fireSendVerificationMail();
    setIsMailSend(true);
  };
  const handeVerifiedClick = () => {
    window.location.reload(true);
  };
  return (
    <div className={sty.container}>
      <div className={sty.body + " shadow-lg"}>
        <img src={Confirmed} alt="Not" className={sty.emilgif} />
        <h1>Please confirm your email address</h1>
        <hr />
        <h3>Thanks for signing up to Justnote, . We're happy to have you.</h3>
        <p>
          Please take a second to make sure we have your correct email address.
        </p>

        <div className={sty.buttonContainer}>
          <div>
            <p className={sty.notReciveText}>
              {isMailSend ? "Did't recive a mail." : " "}
            </p>
            <button className="shadow-md" onClick={handleClick}>
              {isMailSend ? "Resed mail" : "Confirm your email address"}
            </button>
          </div>

          <button className="shadow-md" onClick={handeVerifiedClick}>
            Verified
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
