import React, { useReducer } from 'react';
import App from './App';
import reducer from './context/reduce';
import { userContext } from './context/store';
const initialState = {
  user: {
    email: '',
    uid: '',
    name: '',
    profilePic: '',
  },
  isSignedIn: false,
  isLoading: false,
  notebooks: [],
  activeNoteBook: '',
};
export default function RootApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state: state, dispatch }}>
      <App />
    </userContext.Provider>
  );
}
