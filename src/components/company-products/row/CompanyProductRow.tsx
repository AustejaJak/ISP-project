import React from "react";
import editIcon from "../../../images/edit.svg";

type CompanyProductRowProps = {
  product: {
    imageUrl: string;
    title: string;
    description: string;
  };
};

const CompanyProductRow: React.FC<CompanyProductRowProps> = ({ product }) => {
  const { imageUrl, title, description } = product;
  return (
    <>
      <img src={imageUrl} alt='' className='w-24 h-24' />
      <div>{title}</div>
      <div>{description}</div>
      <img className='cursor-pointer' src={editIcon} alt='edit icon' />
    </>
  );
};

export default CompanyProductRow;
