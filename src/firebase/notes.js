import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import {
  ADD_NEW_NOTE,
  DELETE_NOTE,
  SET_NOTES,
  UPDATE_NOTE_BODY,
  UPDATE_NOTE_NAME,
  UPDATE_NOTE_TAG,
} from "../context/action.type";

export const fireCreateNewNote = ({ name, tag, uid, onAdded, dispatch }) => {
  try {
    const nameArray = name.split(" ").map((w) => w.toLowerCase());
    addDoc(collection(db, "notes"), {
      name,
      tag,
      owner: uid,
      hasAcess: [uid],
      body: "",
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
      searchTag: tag.toLowerCase(),
      searchArray: [name.toLowerCase(), tag.toLowerCase(), ...nameArray],
    }).then((doc) => {
      onAdded({ status: "created", id: doc.id });
      dispatch({
        type: ADD_NEW_NOTE,
        payload: {
          id: doc.id,
          value: {
            name,
            tag,
            owner: uid,
            hasAcess: [uid],
            body: "",
            id: doc.id,
          },
        },
      });
    });
  } catch (error) {
    console.log("fireCreateNewNote");
    console.log(error);
  }
};

export const fireUpdateNoteName = ({ id, newName, dispatch, tag }) => {
  try {
    const noteRef = doc(db, "notes", id);
    const nameArray = newName.split(" ").map((w) => w.toLowerCase());
    updateDoc(noteRef, {
      name: newName,
      modifiedAt: serverTimestamp(),
      searchArray: [newName.toLowerCase(), tag.toLowerCase(), ...nameArray],
    }).then(() => {
      dispatch({ type: UPDATE_NOTE_NAME, payload: { id, newName } });
    });
  } catch (error) {
    console.log("fireUpdateNoteName");
    console.log(error);
  }
};
export const fireUpdateNoteTag = ({ id, newTag, dispatch, newName }) => {
  try {
    const noteRef = doc(db, "notes", id);
    const nameArray = newName.split(" ").map((w) => w.toLowerCase());
    updateDoc(noteRef, {
      tag: newTag,
      modifiedAt: serverTimestamp(),
      searchArray: [newName.toLowerCase(), newTag.toLowerCase(), ...nameArray],
    }).then(() => {
      dispatch({ type: UPDATE_NOTE_TAG, payload: { id, newTag } });
    });
  } catch (error) {
    console.log("fireUpdateNoteTag");
    console.log(error);
  }
};

export const fireUpdateNoteBody = ({ id, newBody, dispatch }) => {
  try {
    const noteRef = doc(db, "notes", id);
    updateDoc(noteRef, {
      body: newBody,
      modifiedAt: serverTimestamp(),
    }).then(() => {
      dispatch({ type: UPDATE_NOTE_BODY, payload: { id, newBody } });
    });
  } catch (error) {
    console.log("fireUpdateNoteBody");
    console.log(error);
  }
};

export const fireDeleteNote = ({ id, dispatch }) => {
  try {
    deleteDoc(doc(db, "notes", id)).then(() => {
      dispatch({ type: DELETE_NOTE, payload: { id } });
    });
  } catch (error) {
    console.log(error);
    console.log("fireDeleteNote");
  }
};

export const fireGetNotes = async ({ uid, dispatch, sortBy }) => {
  try {
    const q = query(
      collection(db, "notes"),
      where("owner", "==", uid),
      orderBy(sortBy)
    );

    const querySnapshot = await getDocs(q);
    const docCollection = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      docCollection[doc.id] = { ...doc.data(), id: doc.id };
    });
    dispatch({ type: SET_NOTES, payload: docCollection });
  } catch (error) {
    console.log("fireGetNotes");
    console.log(error);
  }
};

export const fireGetNotesBytag = async ({ uid, dispatch, searchTag }) => {
  try {
    const q = query(
      collection(db, "notes"),
      where("owner", "==", uid),
      where("searchTag", "==", searchTag.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
    const docCollection = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      docCollection[doc.id] = { ...doc.data(), id: doc.id };
    });
    dispatch({ type: SET_NOTES, payload: docCollection });
  } catch (error) {
    console.log("fireGetNotesBytag");
    console.log(error);
  }
};
export const fireGetNoteSearch = async ({ uid, dispatch, search }) => {
  try {
    const searchArray = search.split(" ").map((w) => w.toLowerCase());
    const q = query(
      collection(db, "notes"),
      where("owner", "==", uid),
      where("searchArray", "array-contains-any", searchArray)
    );

    const querySnapshot = await getDocs(q);
    const docCollection = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      docCollection[doc.id] = { ...doc.data(), id: doc.id };
    });
    dispatch({ type: SET_NOTES, payload: docCollection });
  } catch (error) {
    console.log("fireGetNoteSearch");
    console.log(error);
  }
};
