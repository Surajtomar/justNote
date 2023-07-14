import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home";
import CustomHeader from "./Layout/CustomHeader";
import SignUp from "./Pages/Auth/SignUp";
import SingIn from "./Pages/Auth/SingIn";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { userContext } from "./context/store";
import { SET_USER, SIGNOUT_USER } from "./context/action.type";
import VerifyEmail from "./Components/VerifyEmail";
import Loading from "./Components/Loading";
import { ToastContainer } from "react-toastify";

function App() {
  const { state, dispatch } = useContext(userContext);
  const { isLoading } = state;

  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const authSusbcriber = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetail = auth.currentUser;
        if (userDetail !== null) {
          const displayName = userDetail.displayName;
          const email = userDetail.email;
          const profilePic = userDetail.photoURL;
          const emailVerified = userDetail.emailVerified;
          dispatch({
            type: SET_USER,
            payload: {
              uid: user.uid,
              displayName,
              email,
              profilePic,
              emailVerified,
              isSignedIn: true,
            },
          });
        }
      } else {
        dispatch({ type: SIGNOUT_USER });
      }
    });
  };

  useEffect(() => {
    authSusbcriber();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {state.isSignedIn ? (
        <>
          <CustomHeader /> <Home />
        </>
      ) : isLoginScreen ? (
        <SingIn setIsLogin={setIsLoginScreen} />
      ) : (
        <SignUp setIsLogin={setIsLoginScreen} />
      )}

      {state.isSignedIn === true && state.isEmailVerified === false ? (
        <VerifyEmail />
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default App;
