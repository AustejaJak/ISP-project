import { Disclosure } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useCartContext } from "../../context/cartContext";
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

const discount = { code: "CHEAPSKATE", amount: 0.0 };

export const CheckoutUi = () => {
  const {
    cart: { products, total },
  } = useCartContext();

  console.log(products);

  const totalAfterDiscounts = useMemo(
    () => (total / 100 - Number(discount.amount / 100)).toFixed(2),
    [total, discount]
  );

  const methods = useForm({
    resolver: zodResolver(checkoutModel),
    defaultValues: checkoutDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = checkoutModel.parse(getValues());
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
                    Your Order
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
                    {products.map(({ product }) => (
                      <li key={product.sku} className='flex space-x-6 py-6'>
                        <img
                          src={product.pictureUrl}
                          alt=''
                          className='h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center'
                        />
                        <div className='flex flex-col justify-between space-y-4'>
                          <div className='space-y-1 text-sm font-medium'>
                            <h3 className='text-gray-900'>{product.name}</h3>
                            <p className='text-gray-900'>{product.cost}$</p>
                          </div>
                          <div className='flex space-x-4'>
                            <button
                              type='button'
                              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              Edit
                            </button>
                            <div className='flex border-l border-gray-300 pl-4'>
                              <button
                                type='button'
                                className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                              >
                                Remove
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
                      <dd className='text-gray-900'>{total / 100}</dd>
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
            {products.map(({ product }) => (
              <li key={product.sku} className='flex space-x-6 py-6'>
                <img
                  src={product.pictureUrl}
                  alt=''
                  className='h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center'
                />
                <div className='flex flex-col justify-between space-y-4'>
                  <div className='space-y-1 text-sm font-medium'>
                    <h3 className='text-gray-900'>{product.name}</h3>
                    <p className='text-gray-900'>{product.cost}$</p>
                  </div>
                  <div className='flex space-x-4'>
                    <button
                      type='button'
                      className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Edit
                    </button>
                    <div className='flex border-l border-gray-300 pl-4'>
                      <button
                        type='button'
                        className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Remove
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
                <dd className='text-gray-900'>{(total / 100).toFixed(2)}</dd>
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
              <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                <dt className='text-base'>{t("Checkout.Total")}</dt>
                <dd className='text-base'>{totalAfterDiscounts}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby='payment-heading'
          className='flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24'
        >
          <div className='mx-auto max-w-lg'>
            <div className='hidden pt-10 pb-16 lg:flex'></div>

            <button
              type='button'
              className='flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
            >
              <span className='sr-only'>Pay with Apple Pay</span>
              <svg
                className='h-5 w-auto'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 50 20'
              >
                <path d='M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z' />
              </svg>
            </button>

            <div className='relative mt-8'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center'>
                <span className='bg-white px-4 text-sm font-medium text-gray-500'>
                  or
                </span>
              </div>
            </div>

            <form className='mt-6'>
              <div className='grid grid-cols-12 gap-y-6 gap-x-4'>
                <div className='col-span-full'>
                  <BaseInput
                    formField={CheckoutFormField.EMAIL}
                    label={t("Checkout.EmailAddress")}
                    type='email'
                    autoComplete='email'
                    errorMessage={errors[CheckoutFormField.EMAIL]?.message}
                  />
                </div>

                <div className='col-span-full'>
                  <label
                    htmlFor='name-on-card'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Name on card
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='name-on-card'
                      name='name-on-card'
                      autoComplete='cc-name'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='col-span-full'>
                  <label
                    htmlFor='card-number'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Card number
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='card-number'
                      name='card-number'
                      autoComplete='cc-number'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='col-span-8 sm:col-span-9'>
                  <label
                    htmlFor='expiration-date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='expiration-date'
                      id='expiration-date'
                      autoComplete='cc-exp'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='col-span-4 sm:col-span-3'>
                  <label
                    htmlFor='cvc'
                    className='block text-sm font-medium text-gray-700'
                  >
                    CVC
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='cvc'
                      id='cvc'
                      autoComplete='csc'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='col-span-full'>
                  <BaseInput
                    formField={CheckoutFormField.ADDRESS}
                    label={t("Checkout.Address")}
                    type='text'
                    autoComplete='street-address'
                    errorMessage={errors[CheckoutFormField.ADDRESS]?.message}
                  />
                </div>
              </div>
              <div className='w-full'>
                <button
                  type='submit'
                  className='mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Pay {totalAfterDiscounts}
                </button>
              </div>

              <p className='mt-6 flex justify-center text-sm font-medium text-gray-500'>
                <LockClosedIcon
                  className='mr-1.5 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
      </main>
    </FormProvider>
  );
};
