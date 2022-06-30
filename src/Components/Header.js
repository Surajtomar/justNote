import React, { useContext } from 'react';
import { fireSignOut } from '../myfirebase/auth';
import { userContext } from '../context/store';
import { Logout } from '@styled-icons/material';
const Header = () => {
  const { state, dispatch } = useContext(userContext);

  console.log('state', state);
  return (
    <div
      style={{ height: '60px' }}
      className="pt-2 border-bottom  border-light d-flex justify-content-between"
    >
      <h3>JUST NOTE</h3>
      <div>
        <img
          src={state.user.profilePic}
          className="rounded-circle"
          width="auto"
          height="40px"
        />
        <span className="px-3">{state.user.name}</span>
        <Logout
          size={36}
          title="Log out"
          style={{ color: 'red', paddingLeft: '5px' }}
          onClick={fireSignOut}
        />
      </div>
    </div>
  );
};

export default Header;
