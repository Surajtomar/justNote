import React from 'react';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from '../../myfirebase/auth';

const Auth = () => {
  return (
    <div
      className="d-flex  justify-content-center  align-items-center flex-column"
      style={{ height: '100vh' }}
    >
      <h1 className="text-white m-5">Sign In To use Application</h1>
      <GoogleButton type="dark" onClick={signInWithGoogle}>
        Google
      </GoogleButton>
    </div>
  );
};

export default Auth;
