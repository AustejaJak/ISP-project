import React from "react";
import editIcon from "../../../images/edit.svg";
import { useNavigate } from "react-router";
import Routes from "../../../routes/routes";

type CompanyProductRowProps = {
  product: {
    imageUrl: string;
    title: string;
    description: string;
  };
};

const CompanyProductRow: React.FC<CompanyProductRowProps> = ({ product }) => {
  const { imageUrl, title, description } = product;
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`${Routes.company.prefix}/product/${10}/edit`);
  };

  return (
    <>
      <img src={imageUrl} alt='' className='w-24 h-24' />
      <div>{title}</div>
      <div>{description}</div>
      <img
        className='cursor-pointer'
        src={editIcon}
        alt='edit icon'
        onClick={handleRedirect}
      />
    </>
  );
};

export default CompanyProductRow;
