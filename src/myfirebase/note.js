import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import {
  ADD_NOTEBOOK,
  DELETE_NOTEBOOK,
  SET_NOTEBOOKS,
} from '../context/action.type';
import { db } from './myfirebase';

// Add New NoteBook
export const addNewNotebook = async (name, uid, dispatch) => {
  try {
    // Add a new document with a generated id
    const docRef = doc(collection(db, 'notebook'));

    await setDoc(docRef, {
      name,
      createdAt: Timestamp.now(),
      uid,
      noteBookID: docRef.id,
    }).then(() => {
      dispatch({ type: ADD_NOTEBOOK, payload: [name, docRef.id] });
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  console.log('FUN END');
};

export const getNoteBooks = async (uid, dispatch) => {
  const notebooks = query(collection(db, 'notebook'), where('uid', '==', uid));

  const querySnapshot = await getDocs(notebooks);
  const tempWorkspaces = [];
  querySnapshot.forEach((doc) => {
    tempWorkspaces.push([doc.data().name, doc.data().noteBookID]);
  });

  dispatch({ type: SET_NOTEBOOKS, payload: tempWorkspaces });
};
export const deleteNoteBook = async (notebookId, dispatch) => {
  deleteDoc(doc(db, 'notebook', notebookId))
    .then(() => {
      dispatch({ type: DELETE_NOTEBOOK, payload: notebookId });
      console.log('COL DLE');
    })
    .catch((error) => console.log('Error', error));
};
