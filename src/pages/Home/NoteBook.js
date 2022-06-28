import React, { Fragment, useContext, useEffect, useState } from 'react';
import SideCard from '../../Components/SideCard';
import { SET_ACTIVE_NOTEBOOK } from '../../context/action.type';
import { userContext } from '../../context/store';
import {
  addNewNotebook,
  deleteNoteBook,
  getNoteBooks,
} from '../../myfirebase/note';

const NoteBook = () => {
  const { state, dispatch } = useContext(userContext);
  const [addNoteBookStatus, setAddNoteBookStatus] = useState(false);
  const [newNoteBookName, setNewNoteBookName] = useState('');
  const { notebooks } = state;
  const handleDelete = (notebookId) => {
    deleteNoteBook(notebookId, dispatch);
    console.log('DEEE', notebookId);
  };

  useEffect(() => {
    getNoteBooks(state.user.uid, dispatch);
  }, []);
  console.log('Note', notebooks);
  console.log('Active', state.activeNoteBook);
  return (
    <div>
      {addNoteBookStatus ? (
        <input
          class="form-control"
          value={newNoteBookName}
          placeholder={'Enter Workspace Name'}
          onChange={(e) => setNewNoteBookName(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addNewNotebook(newNoteBookName, state.user.uid, dispatch);
              setAddNoteBookStatus(false);
            }
          }}
        />
      ) : (
        <button
          className="btn btn-outline-success w-100 fs-5"
          onClick={() => setAddNoteBookStatus(true)}
        >
          Add New
        </button>
      )}

      {notebooks.map((notebook, index) => (
        <div
          key={index}
          onClick={() =>
            dispatch({ type: SET_ACTIVE_NOTEBOOK, payload: notebook[1] })
          }
        >
          <SideCard
            isActive={notebook[1] === state.activeNoteBook ? true : false}
            title={notebook[0]}
            id={notebook[1]}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteBook;
