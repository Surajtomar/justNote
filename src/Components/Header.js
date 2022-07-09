import React, { useContext } from 'react';
import { fireSignOut } from '../myfirebase/auth';
import { userContext } from '../context/store';
import { Logout } from '@styled-icons/material';
import styles from './Header.module.css';
const Header = () => {
  const { state, dispatch } = useContext(userContext);

  console.log('state', state);
  return (
    <div className={styles.container}>
      <h2>JUST NOTE</h2>
      <div className={styles.profile}>
        <img
          src={state.user.profilePic}
          className={styles.profilePic}
          width="auto"
        />
        <span className={styles.profileName}>{state.user.name}</span>
        <Logout
          size={36}
          title="Log out"
          className={styles.logout}
          onClick={fireSignOut}
        />
      </div>
    </div>
  );
};

export default Header;
