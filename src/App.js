import React, { useContext, useEffect } from 'react';
import { userContext } from './context/store';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './myfirebase/myfirebase';
import { SET_IS_SIGNEDIN, SET_USER } from './context/action.type';
function App() {
  const { state, dispatch } = useContext(userContext);
  const { user, isSignedIn } = state;

  useEffect(() => {
    console.log('HELLo');
    const susbcriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('usersdsd', user);
        dispatch({
          type: SET_USER,
          payload: {
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            profilePic: user.photoURL,
          },
        });
        dispatch({ type: SET_IS_SIGNEDIN, payload: true });
      } else {
        dispatch({ type: SET_IS_SIGNEDIN, payload: false });
        dispatch({
          type: SET_USER,
          payload: { email: null, uid: null },
        });
      }
    });
    return susbcriber;
  }, []);

  console.log('USER', user);
  return isSignedIn ? <Home /> : <Auth />;
}

export default App;
