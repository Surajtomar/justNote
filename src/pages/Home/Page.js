import React from 'react';
import SideCard from '../../Components/SideCard';

const Page = () => {
  return (
    <div>
      <button className="btn btn-outline-success w-100 fs-5">
        Add New Page
      </button>
      <SideCard isActive={false} title="C" />
      <SideCard isActive={false} title="CPP" />
      <SideCard isActive={true} />
      <SideCard isActive={false} />
    </div>
  );
};

export default Page;
