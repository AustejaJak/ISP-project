import { useState } from "react";

import { useTranslation } from "react-i18next";
import ProductRow from "../product-row/ProductRow";
import Anchor from "../anchor/Anchor";
import HashLoader from "react-spinners/HashLoader";
import { useReturnContext } from "../../context/returnContext";
import { format } from "date-fns";
import { ProductProp } from "../../pages/client/product/ProductPage";
import { ChangeOrderInformationModal } from "../changeOrderInformation/changeOrderInformation";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { ordersApi } from "../../clients/api/ordersApi";

interface OrdersHistoryProps {
  orders: OrderProps[];
  isLoading: boolean;
}

export interface OrderProps {
  orderId: number;
  orderDate: string;
  orderCost: number;
  status: number;
  attachedDocuments: string;
  deliveryAddress: string;
  clientId: string;
  basketId: number;
  orderItems: OrderProductProps[];
  shopId: number;
  discountId: number;
}

export type OrderProductProps = Omit<ProductProp, "sku"> & {
  productSKU: string;
};

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
  const [isChangeOrderInformationOpen, setIsChangeOrderInformationOpen] =
    useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const chandeOrderInformation = useMutation({
    mutationKey: [QueryKey.CHANGE_ORDER_INFORMATION],
    mutationFn: ordersApi.changeOrderInformation,
  });

  console.log(orders, "dkaskdaskodakosdkoasd");

  const processForm = (data: any) => {
    const { deliveryAddress, attachedDocuments } = data;
    chandeOrderInformation.mutate({
      orderId: selectedOrderId!,
      orderData: { deliveryAddress, attachedDocuments },
    });
  };

  const handleChangeInformationOpen = (id: any) => {
    setIsChangeOrderInformationOpen(true);

    setSelectedOrderId(id);
  };

  console.log(selectedOrderId);

  const handleChangeInformationClose = () => {
    setIsChangeOrderInformationOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className='bg-white'>
      <ChangeOrderInformationModal
        open={isChangeOrderInformationOpen}
        headerTitle={t("ChangeOrderInformationModal.Title")}
        buttonTitle='Pakeisti'
        closeModal={handleChangeInformationClose}
        processSubmit={(data) => processForm(data)}
        orderId={selectedOrderId!}
      />
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
              <div key={order.orderId}>
                <h3 className='sr-only'>
                  Order placed on
                  <time>{format(new Date(order.orderDate), "yyyy-MM-dd")}</time>
                </h3>

                <div className='rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8'>
                  <dl className='flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8'>
                    <div className='flex justify-between sm:block'>
                      <dt className='font-medium text-gray-900'>
                        {t("Order.DatePlaceText")}
                      </dt>
                      <dd className='sm:mt-1'>
                        <time>
                          {format(new Date(order.orderDate), "yyyy-MM-dd")}
                        </time>
                      </dd>
                    </div>
                    <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                      <dt className='font-medium text-gray-900'>
                        {t("Order.OrderNumberText")}
                      </dt>
                      <dd className='sm:mt-1'>{order.orderId}</dd>
                    </div>
                    <div className='flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0'>
                      <dt>{t("Order.TotalPriceText")}</dt>
                      <dd className='sm:mt-1'>{order.orderCost}</dd>
                    </div>
                  </dl>
                  <div className='flex flex-row gap-2'>
                    <button
                      onClick={() => handleChangeInformationOpen(order.orderId)}
                      className='flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Pakeisti Užsakymo adresą
                    </button>
                    <Anchor
                      onClick={() => setOrderInformation(order)}
                      href={`${order.orderId}/return`}
                      className='mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto'
                    >
                      {t("Order.ReturnButtonText")}
                      <span className='sr-only'>for order {order.orderId}</span>
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
                    {order.orderItems.map((product) => (
                      <ProductRow key={product.productSKU} product={product} />
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
