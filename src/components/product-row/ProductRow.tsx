import React from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../order-history-ui/OrderHistoryUI";
import Anchor from "../anchor/Anchor";
import Routes from "../../routes/routes";

type ProductRowProps = {
  product: Product;
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const { t } = useTranslation();
  return (
    <tr key={product.id}>
      <td className='py-6 pr-8'>
        <div className='flex items-center'>
          <img
            src={product.imageSrc}
            alt={""}
            className='mr-6 h-16 w-16 rounded object-cover object-center'
          />
          <div>
            <div className='font-medium text-gray-900'>{product.name}</div>
            <div className='mt-1 sm:hidden'>{product.price}</div>
          </div>
        </div>
      </td>
      <td className='hidden py-6 pr-8 sm:table-cell'>{product.price}</td>
      <td className='whitespace-nowrap py-6 text-right font-medium'>
        <Anchor href={`/product/${product.id}`} className='text-indigo-600'>
          {t("ProductRow.ViewProductText")}
        </Anchor>
      </td>
    </tr>
  );
};

export default ProductRow;
