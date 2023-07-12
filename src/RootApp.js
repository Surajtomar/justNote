import React, { useReducer } from "react";
import App from "./App";
import reducer from "./context/reducer";
import { userContext } from "./context/store";

const initialState = {
  user: {
    email: "",
    name: "",
    photoURL: "",
  },
  isSignedIn: false,
  isLoading: true,
  notes: {},
  isEmailVerified: "",
  activeNote: { isEmpty: true },
  uid: "",
};
export default function RootApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state: state, dispatch }}>
      <App />
    </userContext.Provider>
  );
}
