import React from "react";
import { useTranslation } from "react-i18next";
import CompanyProductRow from "../row/CompanyProductRow";
import { ProductProp } from "../../../pages/client/product/ProductPage";

type CompanyProductsListProps = {
  title?: string;
  items: ProductProp[];
  setModalOpen: (id: string) => void;
};

const CompanyProductsList: React.FC<CompanyProductsListProps> = ({
  title,
  items,
  setModalOpen,
}) => {
  const { t } = useTranslation();
  console.log(items);
  return (
    <>
      {title && (
        <div className='flex flex-row items-center justify-between mb-6'>
          <h2 className='text-[28px] font-bold'>{title}</h2>
        </div>
      )}
      <div className='flex flex-col'>
        <div className='grid grid-cols-4 border-2'>
          <p className='font-bold'>{t("Product.Image")}</p>
          <p className='font-bold'>{t("Product.Title")}</p>
          <p className='font-bold'>{t("Product.Description")}</p>
          <p className='font-bold'></p>
        </div>
        {items.map((product) => (
          <div className='grid grid-cols-4 py-2 border-b-2 border-slate-200'>
            <CompanyProductRow setModalOpen={setModalOpen} product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyProductsList;
