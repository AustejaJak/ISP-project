import { useState } from "react";

import { useTranslation } from "react-i18next";
import ProductRow from "../product-row/ProductRow";
import Anchor from "../anchor/Anchor";
import HashLoader from "react-spinners/HashLoader";
import { useReturnContext } from "../../context/returnContext";

interface OrdersHistoryProps {
  orders: OrderProps[];
  isLoading: boolean;
}

export interface OrderProps {
  number: string;
  date: string;
  invoiceHref: string;
  total: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
}

export const OrdersHistory: React.FC<OrdersHistoryProps> = ({
  orders,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { order: returnOrder, setOrderInformation } = useReturnContext();
  const [open, setOpen] = useState(false);
  return (
    <div className='bg-white'>
      <main className='mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24'>
        <div className='max-w-xl'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            {t("Order.PageTitleText")}
          </h1>
          <p className='mt-1 text-sm text-gray-500'>
            {t("Order.PageDescriptionText")}
          </p>
        </div>
        <div className='w-full mt-10 flex justify-center'>
          {isLoading && <HashLoader color='#4F45E4' />}
          <div>
            {!isLoading && orders.length === 0 && (
              <p className='text-slate-500'>{t("Order.NoOrders")}</p>
            )}
          </div>
        </div>

        <section aria-labelledby='recent-heading' className='mt-16'>
          <div className='space-y-20'>
            {orders.map((order) => (
              <div key={order.number}>
                <h3 className='sr-only'>
                  Order placed on <time>{order.date}</time>
                </h3>

                <div className='rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8'>
                  <dl className='flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8'>
                    <div className='flex justify-between sm:block'>
                      <dt className='font-medium text-gray-900'>
                        {t("Order.DatePlaceText")}
                      </dt>
                      <dd className='sm:mt-1'>
                        <time>{order.date}</time>
                      </dd>
                    </div>
                    <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                      <dt className='font-medium text-gray-900'>
                        {t("Order.OrderNumberText")}
                      </dt>
                      <dd className='sm:mt-1'>{order.number}</dd>
                    </div>
                    <div className='flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0'>
                      <dt>{t("Order.TotalPriceText")}</dt>
                      <dd className='sm:mt-1'>{order.total}</dd>
                    </div>
                  </dl>
                  <div className='flex flex-row gap-2'>
                    <Anchor
                      onClick={() => setOrderInformation(order)}
                      href={`${order.number}/return`}
                      className='mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto'
                    >
                      {t("Order.ReturnButtonText")}
                      <span className='sr-only'>for order {order.number}</span>
                    </Anchor>
                    <Anchor
                      href={order.invoiceHref}
                      className='mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto'
                    >
                      View Invoice
                      <span className='sr-only'>for order {order.number}</span>
                    </Anchor>
                  </div>
                </div>

                <table className='mt-4 w-full text-gray-500 sm:mt-6'>
                  <caption className='sr-only'>Products</caption>
                  <thead className='sr-only text-left text-sm text-gray-500 sm:not-sr-only'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3'
                      >
                        {t("Order.ProductColumnText")}
                      </th>
                      <th
                        scope='col'
                        className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                      >
                        {t("Order.PriceColumnText")}
                      </th>
                      <th
                        scope='col'
                        className='w-0 py-3 text-right font-normal'
                      >
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t'>
                    {order.products.map((product) => (
                      <ProductRow key={product.id} product={product} />
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
