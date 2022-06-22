import React from 'react';
import SideCard from '../../Components/SideCard';
import { fireSignOut } from '../../myfirebase/auth';

const NoteBook = () => {
  return (
    <div>
      <SideCard isActive={false} title="MCA" />
      <SideCard isActive={false} />
      <SideCard isActive={true} />
      <SideCard isActive={false} />
    </div>
  );
};

export default NoteBook;
