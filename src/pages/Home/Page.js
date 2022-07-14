import React, { useContext, useEffect, useState } from 'react';
import SideCard from '../../Components/SideCard';
import { SET_ACTIVE_PAGE } from '../../context/action.type';
import { userContext } from '../../context/store';
import { addNewPage, deletePage, getPages } from '../../myfirebase/page';
import { deleteNoteBook } from '../../myfirebase/notebook';
import { Add, DeleteForever } from '@styled-icons/material';
import styles from './NoteBook.module.css';

const Page = () => {
  const { state, dispatch } = useContext(userContext);
  const [newPageStatus, setNewPageStatus] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  const handleDelete = (pageId) => {
    deletePage(state.activeNoteBook[1], pageId, dispatch);
  };

  useEffect(() => {
    getPages(state.activeNoteBook[1], dispatch);
  }, [state.activeNoteBook]);

  return state.activeNoteBook ? (
    <div className={styles.container}>
      <span className={styles.title}>
        <p
          style={{
            width: '3vw',
            overflow: 'hidden',
          }}
        >
          {state.activeNoteBook[0]}
        </p>
        <p>Pages </p>
        <span>
          <Add
            size={40}
            className={styles.addButton}
            onClick={() => setNewPageStatus(true)}
          />
          <DeleteForever
            size={24}
            onClick={() => {
              deleteNoteBook(state.activeNoteBook[1], dispatch);
            }}
            className={styles.deleteButton}
          />
        </span>
      </span>

      {newPageStatus ? (
        <input
          maxlength="50"
          className={styles.inputbox}
          value={newPageName}
          placeholder={'Enter New Page Name'}
          onChange={(e) => setNewPageName(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addNewPage(
                newPageName,
                state.user.uid,
                state.activeNoteBook[1],
                dispatch
              );
              setNewPageStatus(false);
              setNewPageName('');
            }
          }}
        />
      ) : null}
      {state.pages.map((page, index) => (
        <div
          key={index}
          onClick={() => dispatch({ type: SET_ACTIVE_PAGE, payload: page })}
        >
          <SideCard
            isActive={page.pageId === state.activePage.pageId ? true : false}
            title={page.name}
            id={page.pageId}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Page;
