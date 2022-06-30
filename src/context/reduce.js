import {
  ADD_NOTEBOOK,
  ADD_PAGE,
  DELETE_NOTEBOOK,
  DELETE_PAGE,
  SET_ACTIVE_NOTEBOOK,
  SET_ACTIVE_PAGE,
  SET_IS_SIGNEDIN,
  SET_NOTEBOOKS,
  SET_PAGE,
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

    case ADD_NOTEBOOK:
      const notebooks = state.notebooks;
      notebooks.push(action.payload);
      return { ...state, notebooks: notebooks, activeNoteBook: action.payload };
    case DELETE_NOTEBOOK:
      const notebooks1 = state.notebooks.filter(
        (notebook) => !notebook.includes(action.payload)
      );
      const activeNoteBook = notebooks1.length > 0 ? notebooks1[0] : ['', ''];
      return { ...state, notebooks: notebooks1, activeNoteBook };
    case SET_PAGE:
      return { ...state, pages: action.payload };
    case ADD_PAGE:
      const pages = state.pages;
      pages.push(action.payload);
      return { ...state, pages: pages, activePage: action.payload };
    case DELETE_PAGE:
      const pages1 = state.pages.filter(
        (page) => page.pageId !== action.payload
      );
      console.log('action.payload', action.payload);
      const activePage = pages1.length > 0 ? pages1[0] : { name: '' };
      return { ...state, pages: pages1, activePage };
    case SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};
