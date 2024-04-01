'use client';

import BarLoader from 'react-spinners/BarLoader';
const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <BarLoader />
    </div>
  );
};

export default Loading;
