import {
  ADD_NOTEBOOK,
  DELETE_NOTEBOOK,
  SET_ACTIVE_NOTEBOOK,
  SET_IS_SIGNEDIN,
  SET_NOTEBOOKS,
  SET_USER,
} from './action.type';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_SIGNEDIN:
      return { ...state, isSignedIn: action.payload };
    case SET_NOTEBOOKS:
      return { ...state, notebooks: action.payload };
    case SET_ACTIVE_NOTEBOOK:
      return { ...state, activeNoteBook: action.payload };
    case DELETE_NOTEBOOK:
      const notebooks = state.notebooks.filter(
        (notebook) => !notebook.includes(action.payload)
      );
      return { ...state, notebooks };
    case ADD_NOTEBOOK:
      const notebooks1 = state.notebooks;
      notebooks1.push(action.payload);
      return { ...state, notebooks: notebooks1 };
    default:
      return state;
  }
};
