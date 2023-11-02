import React from "react";

type BasePageProps = {
  children: React.ReactNode;
};

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return <div className='p-14'>{children}</div>;
};

export default BasePage;
