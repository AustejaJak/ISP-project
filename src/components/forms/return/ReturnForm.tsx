import React from "react";
import { useTranslation } from "react-i18next";
import ProductRow from "../../product-row/ProductRow";

const orders = [
  {
    number: "WU88191111",
    date: "January 22, 2021",
    datetime: "2021-01-22",
    invoiceHref: "#",
    total: "$104.00",
    products: [
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        status: "Delivered Jan 25, 2021",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        status: "Delivered Jan 25, 2021",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
      // More products...
    ],
  },
  {
    number: "WU88191111",
    date: "January 22, 2021",
    datetime: "2021-01-22",
    invoiceHref: "#",
    total: "$104.00",
    products: [
      {
        id: 1,
        name: "Men's 3D Glasses Artwork Tee",
        href: "#",
        price: "$36.00",
        status: "Delivered Jan 25, 2021",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg",
        imageAlt:
          "Black tee with intersecting red, white, and green curved lines on front.",
      },
      // More products...
    ],
  },
  // More orders...
];

const ReturnForm = () => {
  const { t } = useTranslation();

  return (
    <div>
      {orders[0].products.map((product) => (
        <div className='flex items-center gap-3'>
          <input type='checkbox' />
          <ProductRow product={product} />
        </div>
      ))}
      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          {t("Return.ReturnButtonText")}
        </button>
      </div>
    </div>
  );
};

export default ReturnForm;
