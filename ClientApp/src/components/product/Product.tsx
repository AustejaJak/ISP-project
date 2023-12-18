import React from "react";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { ProductProp } from "../../pages/client/product/ProductPage";
import { Loader } from "../Loader/Loader";
import { t } from "i18next";
import { useCartContext } from "../../context/cartContext";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type ProductProps = {
  product: ProductProp;
  isLoading: boolean;
};

const Product: React.FC<ProductProps> = ({ product, isLoading }) => {
  const { AddItemToCart } = useCartContext();
  if (isLoading)
    return (
      <div className='w-full'>
        <Loader isLoading={isLoading} />
      </div>
    );
  if (!isLoading && Object.keys(product).length === 0)
    return (
      <p className='my-12 text-slate-500 text-center'>
        {t("Errors.ProductNotExist")}
      </p>
    );

  const handleItemAdd = (e: any) => {
    e.preventDefault();
    AddItemToCart(product);
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            {/* Image selector */}
            <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
              <Tab.List className='grid grid-cols-4 gap-6'>
                <Tab
                  key={product.pictureUrl}
                  className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
                >
                  {({ selected }) => (
                    <>
                      <span className='absolute inset-0 overflow-hidden rounded-md'>
                        <img
                          src={product.pictureUrl}
                          alt=''
                          className='h-full w-full object-cover object-center'
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels className='aspect-w-1 aspect-h-1 w-full'>
              <Tab.Panel key={product.pictureUrl}>
                <img
                  src={product.pictureUrl}
                  alt={""}
                  className='h-full w-full object-cover object-center sm:rounded-lg'
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {product.cost}
              </p>
            </div>

            {/* Reviews */}
            <div className='mt-3'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-indigo-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='sr-only'>{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <div
                className='space-y-6 text-base text-gray-700'
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>

            <form className='mt-6' onSubmit={handleItemAdd}>
              <div className='sm:flex-col1 mt-10 flex'>
                <button
                  type='submit'
                  className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
                >
                  {t("Product.AddToCart")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
