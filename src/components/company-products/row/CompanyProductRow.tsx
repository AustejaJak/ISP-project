import React from "react";
import editIcon from "../../../images/edit.svg";

type CompanyProductRowProps = {
  setModalOpen: (id: string) => void;
  product: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  };
};

const CompanyProductRow: React.FC<CompanyProductRowProps> = ({
  product,
  setModalOpen,
}) => {
  const { id, imageUrl, title, description } = product;
  return (
    <>
      <img src={imageUrl} alt='' className='w-24 h-24' />
      <div>{title}</div>
      <div>{description}</div>
      <img
        className='cursor-pointer'
        onClick={() => setModalOpen(id.toString())}
        src={editIcon}
        alt='edit icon'
      />
    </>
  );
};

export default CompanyProductRow;
