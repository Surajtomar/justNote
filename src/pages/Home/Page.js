import React from 'react';
import SideCard from '../../Components/SideCard';

const Page = () => {
  return (
    <div>
      <SideCard isActive={false} title="C" />
      <SideCard isActive={false} title="CPP" />
      <SideCard isActive={true} />
      <SideCard isActive={false} />
    </div>
  );
};

export default Page;
