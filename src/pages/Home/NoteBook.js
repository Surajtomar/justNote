import React, { Fragment, useContext, useEffect, useState } from 'react';
import SideCard from '../../Components/SideCard';
import { SET_ACTIVE_NOTEBOOK } from '../../context/action.type';
import { userContext } from '../../context/store';
import { Add } from '@styled-icons/material';
import styles from './NoteBook.module.css';
import {
  addNewNotebook,
  deleteNoteBook,
  getNoteBooks,
} from '../../myfirebase/notebook';

const NoteBook = () => {
  const { state, dispatch } = useContext(userContext);
  const [addNoteBookStatus, setAddNoteBookStatus] = useState(false);
  const [newNoteBookName, setNewNoteBookName] = useState('');
  const { notebooks } = state;

  useEffect(() => {
    getNoteBooks(state.user.uid, dispatch);
  }, []);
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <p>MY Notebooks</p>
        <Add
          size={40}
          className={styles.addButton}
          onClick={() => setAddNoteBookStatus(true)}
        />
      </span>
      {addNoteBookStatus ? (
        <input
          maxlength="50"
          className={styles.inputbox}
          value={newNoteBookName}
          placeholder={'Enter Notebook Name'}
          onChange={(e) => setNewNoteBookName(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addNewNotebook(newNoteBookName, state.user.uid, dispatch);
              setAddNoteBookStatus(false);
              setNewNoteBookName('');
            }
          }}
        />
      ) : null}
      {notebooks.map((notebook, index) => (
        <div
          key={index}
          onClick={() =>
            dispatch({ type: SET_ACTIVE_NOTEBOOK, payload: notebook })
          }
        >
          <SideCard
            isActive={notebook[1] === state.activeNoteBook[1] ? true : false}
            title={notebook[0]}
            id={notebook[1]}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteBook;
