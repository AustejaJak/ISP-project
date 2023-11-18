import React from "react";
import HashLoader from "react-spinners/HashLoader";

type BasePageProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const BasePage: React.FC<BasePageProps> = ({ children, isLoading }) => {
  if (isLoading)
    return (
      <div className='w-full mt-10 flex justify-center'>
        {isLoading && <HashLoader color='#4F45E4' />}
      </div>
    );
  return <div className='p-14'>{children}</div>;
};

export default BasePage;
