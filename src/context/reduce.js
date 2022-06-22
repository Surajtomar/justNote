import { SET_IS_SIGNEDIN, SET_USER } from './action.type';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_SIGNEDIN:
      return { ...state, isSignedIn: action.payload };

    default:
      return state;
  }
};
