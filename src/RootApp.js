import React, { useReducer, useEffect } from 'react';
import App from './App';
import reducer from './context/reduce';
import { userContext } from './context/store';
import { predb } from './myfirebase/myfirebase';

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
  activeNoteBook: ['', ''],
  pages: [],
  activePage: { name: '' },
};
export default function RootApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state: state, dispatch }}>
      <App />
    </userContext.Provider>
  );
}
