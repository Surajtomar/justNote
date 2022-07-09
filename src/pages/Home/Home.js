import React, { useContext } from 'react';
import Header from '../../Components/Header';
import TextEditor from '../../Components/TextEditor';
import { userContext } from '../../context/store';

import NoteBook from './NoteBook';
import Page from './Page';
import styles from './Home.module.css';
const Home = () => {
  const { state, dispatch } = useContext(userContext);

  return (
    <div className={styles.homeContainer}>
      <Header />

      <div className={styles.mainBody}>
        <NoteBook />
        <Page />
        <TextEditor />
      </div>
    </div>
  );
};

export default Home;
