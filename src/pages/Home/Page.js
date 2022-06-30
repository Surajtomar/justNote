import React, { useContext, useEffect, useState } from 'react';
import SideCard from '../../Components/SideCard';
import { SET_ACTIVE_PAGE } from '../../context/action.type';
import { userContext } from '../../context/store';
import { addNewPage, deletePage, getPages } from '../../myfirebase/page';
import { Add } from '@styled-icons/material';

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
    <div className="sidebar">
      <span className="d-flex justify-content-between align-items-center border-bottom  border-light mb-3">
        <h5 className="text-warning">{state.activeNoteBook[0]} Pages</h5>
        <Add
          size={40}
          className="text-success"
          onClick={() => setNewPageStatus(true)}
        />
      </span>

      {newPageStatus ? (
        <input
          class="form-control"
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
