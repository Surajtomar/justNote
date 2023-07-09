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
  UPDATE_NOTE_NAME,
  UPDATE_NOTE_TAG,
} from "../context/action.type";

export const fireCreateNewNote = ({ name, tag, uid, onAdded, dispatch }) => {
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
};

export const fireUpdateNoteName = ({ id, newName, dispatch }) => {
  const noteRef = doc(db, "notes", id);
  updateDoc(noteRef, {
    name: newName,
    modifiedAt: serverTimestamp(),
  }).then(() => {
    dispatch({ type: UPDATE_NOTE_NAME, payload: { id, newName } });
  });
};
export const fireUpdateNoteTag = ({ id, newTag, dispatch }) => {
  const noteRef = doc(db, "notes", id);
  updateDoc(noteRef, {
    tag: newTag,
    modifiedAt: serverTimestamp(),
  }).then(() => {
    dispatch({ type: UPDATE_NOTE_TAG, payload: { id, newTag } });
  });
};

export const fireDeleteNote = ({ id, dispatch }) => {
  deleteDoc(doc(db, "notes", id)).then(() => {
    dispatch({ type: DELETE_NOTE, payload: { id } });
  });
};

export const fireGetNotes = async ({ uid, dispatch, sortBy }) => {
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
};

export const fireNotesBytag = async ({ uid, dispatch, searchTag }) => {
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
};
export const fireNoteSearch = async ({ uid, dispatch, search }) => {
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
};
