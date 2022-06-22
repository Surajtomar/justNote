import React, { useContext } from 'react';
import { fireSignOut } from '../myfirebase/auth';
import { userContext } from '../context/store';
const Header = () => {
  const { state, dispatch } = useContext(userContext);

  console.log('state', state);
  return (
    <div style={{ minHeight: '30px' }} className="pt-2">
      <div className="d-flex float-end">
        <img
          src={state.user.profilePic}
          className="rounded-circle"
          width="auto"
          height="40px"
        />
        <span className="px-3">{state.user.name}</span>
      </div>
    </div>
  );
};

export default Header;
