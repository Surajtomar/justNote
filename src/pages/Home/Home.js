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
      <div className="row pt-2">
        <div className="col-2  sidebar">
          <div className="mb-4">
            <img
              src={state.user.profilePic}
              className="rounded-circle"
              width="auto"
              height="40px"
            />
            <span className="px-3">{state.user.name}</span>
          </div>

          <NoteBook />
          <button
            onClick={fireSignOut}
            className="position-absolute bottom-0 btn btn-success "
          >
            LOGOUT
          </button>
        </div>
        <div className="col-2 bg-success sidebar">
          <Page />
        </div>
        <div className="col-8 ">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default Home;
