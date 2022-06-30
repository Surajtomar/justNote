import { async } from '@firebase/util';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  ADD_NOTEBOOK,
  ADD_PAGE,
  DELETE_PAGE,
  SET_PAGE,
} from '../context/action.type';
import { db } from './myfirebase';

// Add NEW Page
export const addNewPage = async (name, uid, notebook, dispatch) => {
  try {
    // Add a new document with a generated id
    const docRef = doc(collection(db, 'notebook', notebook, 'pages'));

    await setDoc(docRef, {
      name,
      createdAt: Timestamp.now(),
      uid,
      noteBookID: notebook,
      pageId: docRef.id,
      editorState: 'TYPE HERE',
    }).then(() => {
      dispatch({
        type: ADD_PAGE,
        payload: { name, noteBookID: notebook, pageId: docRef.id },
      });
      console.log('Document written with ID: ', docRef.id);
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  console.log('FUN PAGE END');
};

// to fetch Pages
export const getPages = async (notebook, dispatch) => {
  const notebooks = query(collection(db, 'notebook', notebook, 'pages'));

  const querySnapshot = await getDocs(notebooks);
  const tempWorkspaces = [];
  querySnapshot.forEach((doc) => {
    tempWorkspaces.push(doc.data());
  });

  dispatch({ type: SET_PAGE, payload: tempWorkspaces });
};

// to Delete Page
export const deletePage = async (notebookId, pageId, dispatch) => {
  deleteDoc(doc(db, 'notebook', notebookId, 'pages', pageId))
    .then(() => {
      dispatch({ type: DELETE_PAGE, payload: pageId });
      console.log('COL DLE');
    })
    .catch((error) => console.log('Error', error));
};

// update Editor state of Page
export const updatePageEditorState = async (
  noteBookID,
  pageId,
  editorState,
  dispatch
) => {
  updateDoc(doc(db, 'notebook', noteBookID, 'pages', pageId), {
    editorState,
  })
    .then(() => {
      console.log('UPDATED');
      getPages(noteBookID, dispatch);
    })
    .catch((error) => console.log('Error', error));
};
