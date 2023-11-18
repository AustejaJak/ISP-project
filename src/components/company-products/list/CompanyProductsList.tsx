import React from "react";
import { useTranslation } from "react-i18next";
import CompanyProductRow from "../row/CompanyProductRow";
import { ProductProp } from "../../../pages/client/product/ProductPage";

const products = [
  {
    id: 1,
    title: "First",
    description: "Desc1",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/d2281c60714041a2b49b4928b02f62da/85a2b4d922f94e8a84091e745a25a593.jpg?imwidth=1800",
  },
  {
    id: 2,
    title: "Second",
    description: "Desc2",
    imageUrl:
      "https://img01.ztat.net/article/spp-media-p1/d2281c60714041a2b49b4928b02f62da/85a2b4d922f94e8a84091e745a25a593.jpg?imwidth=1800",
  },
];

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
        {products.map((product) => (
          <div className='grid grid-cols-4 py-2 border-b-2 border-slate-200'>
            <CompanyProductRow setModalOpen={setModalOpen} product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyProductsList;
