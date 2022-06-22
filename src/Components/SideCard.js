import React from 'react';

const SideCard = ({ isActive, title = 'SIDE CARD' }) => {
  return (
    <div className={isActive ? 'activeNoteBookCard' : 'inActiveNoteBookCard'}>
      <h4> {title} </h4>
    </div>
  );
};

export default SideCard;
