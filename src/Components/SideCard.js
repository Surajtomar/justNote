import React from 'react';
import { DeleteForever } from '@styled-icons/material';
import styles from './SideCard.module.css';

const SideCard = ({ isActive, title = 'SIDE CARD' }) => {
  return (
    <div
      className={
        isActive ? styles.container + ' ' + styles.selected : styles.container
      }
    >
      <p>{title} </p>
    </div>
  );
};

export default SideCard;
