import React from 'react';

const SideCard = ({ isActive, title = 'SIDE CARD', handleDelete, id }) => {
  return (
    <div
      className={`${
        isActive ? 'activeNoteBookCard' : 'inActiveNoteBookCard'
      } d-flex justify-content-between`}
    >
      <h5> {title} </h5>
      <p className="text-danger" onClick={() => handleDelete(id)}>
        Del
      </p>
    </div>
  );
};

export default SideCard;
