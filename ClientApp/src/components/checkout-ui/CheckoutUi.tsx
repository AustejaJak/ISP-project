import { Disclosure } from "@headlessui/react";
import BaseInput from "../input/Input";
import {
  CheckoutFormField,
  checkoutDefaultValues,
  checkoutModel,
} from "./model";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useMemo } from "react";
import { BasketProduct } from "../../types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { basketApi } from "../../clients/api/basketApi";
import { Payment } from "../Payment/Payment";
import { paymentsApi } from "../../clients/api/paymentApi";
import { ordersApi } from "../../clients/api/ordersApi";

const discount = { code: "CHEAPSKATE", amount: 0.0 };

type CheckoutUiProps = {
  products?: BasketProduct[];
  total: number;
  handleRefetch: () => void;
};

export const CheckoutUi: React.FC<CheckoutUiProps> = ({
  products,
  total,
  handleRefetch,
}) => {
  const { data: paymentIntent } = useQuery({
    queryKey: [QueryKey.GET_PAYMENT_INTENT],
    queryFn: paymentsApi.getPaymentIntent,
  });

  const clientSecret = useMemo(() => paymentIntent, [paymentIntent]);

  console.log(clientSecret);

  const totalAfterDiscounts = useMemo(
    () => (total / 100 - Number(discount.amount / 100)).toFixed(2),
    [total, discount]
  );

  const applyDiscount = useMutation({
    mutationKey: [QueryKey.APPLY_DISCOUNT],
    mutationFn: basketApi.applyDiscount,
  });

  const methods = useForm({
    resolver: zodResolver(checkoutModel),
    defaultValues: checkoutDefaultValues,
  });

  const createOrder = useMutation({
    mutationKey: [QueryKey.ADD_ORDER],
    mutationFn: ordersApi.createOrder,
  });

  // {
  //   "address": "string",
  //   "attachedDocuments": "string",
  //   "shopId": 0,
  //   "discountId": 0,
  //   "saveAddress": true
  // }

  const clearBasket = useMutation({
    mutationKey: [QueryKey.CLEAR_BASKET],
    mutationFn: basketApi.clearBasket,
  });

  const handleOrderCreation = () => {
    createOrder.mutate(
      {
        orderData: {
          address: "Babtiejaus g.3",
          attachedDocuments: "",
          shopId: 1,
          saveAddress: true,
        },
      },
      {
        onSuccess: () => {
          clearBasket.mutate();
        },
      }
    );
  };

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = checkoutModel.parse(getValues());
  };

  const removeProductByQuantity = useMutation({
    mutationKey: [QueryKey.ADD_FROM_BASKET],
    mutationFn: basketApi.removeItemFromBasket,
  });

  const handleDiscountCodeActivation = () => {
    const code = getValues("discount");
    applyDiscount.mutate(code);
  };

  const handleProductRemove = (productId: string) => {
    removeProductByQuantity.mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          handleRefetch();
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <main className='lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden'>
        <h1 className='sr-only'>Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby='order-heading'
          className='bg-gray-50 px-4 py-6 sm:px-6 lg:hidden'
        >
          <Disclosure as='div' className='mx-auto max-w-lg'>
            {({ open }) => (
              <>
                <div className='flex items-center justify-between'>
                  <h2
                    id='order-heading'
                    className='text-lg font-medium text-gray-900'
                  >
                    Jūsų užsakymas
                  </h2>
                  <Disclosure.Button className='font-medium text-indigo-600 hover:text-indigo-500'>
                    {open ? (
                      <span>Hide full summary</span>
                    ) : (
                      <span>Show full summary</span>
                    )}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul
                    role='list'
                    className='divide-y divide-gray-200 border-b border-gray-200'
                  >
                    {products &&
                      products.map((product) => (
                        <li
                          key={product.productSKU}
                          className='flex space-x-6 py-6'
                        >
                          <img
                            src={product.pictureUrl}
                            alt=''
                            className='h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center'
                          />
                          <div className='flex flex-col justify-between space-y-4'>
                            <div className='space-y-1 text-sm font-medium'>
                              <h3 className='text-gray-900'>{product.name}</h3>
                              <p className='text-gray-900'>{product.cost}$</p>
                              <p className='text-gray-900'>
                                {product.quantity}
                              </p>
                            </div>
                            <div className='flex space-x-4'>
                              <div className='flex border-gray-300'>
                                <button
                                  onClick={() =>
                                    handleProductRemove(product.productSKU)
                                  }
                                  type='button'
                                  className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                  Panaikinti
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <form className='mt-10' onSubmit={handleSubmit(processForm)}>
                    <div className='mt-1 flex space-x-4'>
                      <BaseInput
                        formField={CheckoutFormField.DISCOUNT}
                        label={t("Checkout.DiscoundCode")}
                      />
                      <button
                        onClick={handleDiscountCodeActivation}
                        type='submit'
                        className='rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                      >
                        Aktyvuoti
                      </button>
                    </div>
                  </form>

                  <dl className='mt-10 space-y-6 text-sm font-medium text-gray-500'>
                    <div className='flex justify-between'>
                      <dt>{t("Checkout.Total")}</dt>
                      <dd className='text-gray-900'>{total}</dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='flex'>
                        {t("Checkout.Discount")}
                        <span className='ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs tracking-wide text-gray-600'>
                          {discount.code}
                        </span>
                      </dt>
                      <dd className='text-gray-900'>
                        -{(discount.amount / 100).toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </Disclosure.Panel>

                <p className='mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900'>
                  <span className='text-base'>Total</span>
                  <span className='text-base'>{total}</span>
                </p>
              </>
            )}
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby='summary-heading'
          className='hidden w-full max-w-md flex-col bg-gray-50 lg:flex'
        >
          <h2 id='summary-heading' className='sr-only'>
            Order summary
          </h2>

          <ul
            role='list'
            className='flex-auto divide-y divide-gray-200 overflow-y-auto px-6'
          >
            {products &&
              products.map((product) => (
                <li key={product.productSKU} className='flex space-x-6 py-6'>
                  <img
                    src={product.pictureUrl}
                    alt=''
                    className='h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center'
                  />
                  <div className='flex flex-col justify-between space-y-4'>
                    <div className='space-y-1 text-sm font-medium'>
                      <h3 className='text-gray-900'>{product.name}</h3>
                      <p className='text-gray-900'>{product.cost}$</p>
                      <p className='text-gray-900'>{product.quantity}</p>
                    </div>
                    <div className='flex space-x-4'>
                      <div className='flex border-gray-300'>
                        <button
                          onClick={() =>
                            handleProductRemove(product.productSKU)
                          }
                          type='button'
                          className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          Panaikinti
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>

          <div className='sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6'>
            <form onSubmit={handleSubmit(processForm)}>
              <div className='mt-1 flex items-end space-x-5'>
                <BaseInput
                  formField={CheckoutFormField.DISCOUNT}
                  label={t("Checkout.DiscoundCode")}
                />
                <button
                  onClick={handleDiscountCodeActivation}
                  type='submit'
                  className='h-9 rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Aktyvuoti
                </button>
              </div>
            </form>

            <dl className='mt-10 space-y-6 text-sm font-medium text-gray-500'>
              <div className='flex justify-between'>
                <dt>{t("Checkout.Total")}</dt>
                <dd className='text-gray-900'>{total.toFixed(2)}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='flex'>
                  {t("Checkout.Discount")}
                  <span className='ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs tracking-wide text-gray-600'>
                    {discount.code}
                  </span>
                </dt>
                <dd className='text-gray-900'>-{discount.amount.toFixed(2)}</dd>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                <dt className='text-base'>{t("Checkout.Total")}</dt>
                <dd className='text-base'>{totalAfterDiscounts}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        {clientSecret && (
          <Payment
            handleOrder={handleOrderCreation}
            clientSecret={clientSecret.clientSecret}
          />
        )}
      </main>
    </FormProvider>
  );
};
