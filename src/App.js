import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import CustomHeader from "./Layout/CustomHeader";
import SignUp from "./Pages/Auth/SignUp";
import SingIn from "./Pages/Auth/SingIn";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="app">
      {isLogin ? (
        <SingIn setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
      {/* <CustomHeader /> <Home /> */}
    </div>
  );
}

export default App;
