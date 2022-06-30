import { DeleteForever } from '@styled-icons/material';
import React from 'react';

const SideCard = ({ isActive, title = 'SIDE CARD', handleDelete, id }) => {
  return (
    <div
      className={`${
        isActive ? 'activeNoteBookCard' : 'inActiveNoteBookCard'
      } d-flex justify-content-between`}
    >
      <h6> {title} </h6>

      <DeleteForever
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
        className="text-danger"
      />
    </div>
  );
};

export default SideCard;
