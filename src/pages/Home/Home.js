import React, { useContext } from 'react';
import Header from '../../Components/Header';
import TextEditor from '../../Components/TextEditor';
import { userContext } from '../../context/store';
import { fireSignOut } from '../../myfirebase/auth';
import NoteBook from './NoteBook';
import Page from './Page';

const Home = () => {
  const { state, dispatch } = useContext(userContext);

  return (
    <div className="container-fluid text-white">
      <div className="row">
        <Header />
      </div>
      <div className="row pt-2">
        <div className="col-2   border-end  border-light border-1">
          <NoteBook />
        </div>
        <div className="col-2  ">
          <Page />
        </div>
        <div className="col-8 ">
          <p>
            <span className="text-warning">Currently Active: </span>
            {state.activeNoteBook[0]} / {state.activePage.name}
          </p>
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default Home;
