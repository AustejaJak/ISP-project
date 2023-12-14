import React from "react";
import HashLoader from "react-spinners/HashLoader";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return isLoading ? (
    <div className='w-full my-12 flex justify-center items-center'>
      <HashLoader color='#4F45E4' />
    </div>
  ) : null;
};
