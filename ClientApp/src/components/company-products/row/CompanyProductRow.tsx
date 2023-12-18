import React from "react";
import editIcon from "../../../images/edit.svg";
import { ProductProp } from "../../../pages/client/product/ProductPage";

type CompanyProductRowProps = {
  setModalOpen: (id: string) => void;
  product: ProductProp;
};

const CompanyProductRow: React.FC<CompanyProductRowProps> = ({
  product,
  setModalOpen,
}) => {
  const { sku, pictureUrl, name, description } = product;
  return (
    <>
      <img src={pictureUrl} alt='' className='w-24 h-24' />
      <div>{name}</div>
      <div>{description}</div>
      <img
        className='cursor-pointer'
        onClick={() => setModalOpen(sku)}
        src={editIcon}
        alt='edit icon'
      />
    </>
  );
};

export default CompanyProductRow;
