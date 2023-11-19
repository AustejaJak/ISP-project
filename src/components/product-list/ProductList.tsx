import { t } from "i18next";
import Routes from "../../routes/routes";
import Anchor from "../anchor/Anchor";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { inventoryApi } from "../../clients/api/backoffice/inventoryApi";
import { Loader } from "../Loader/Loader";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useEffect } from "react";

const products = [
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    status: "ACTIVE",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    status: "ACTIVE",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    status: "PENDING",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    status: "ACTIVE",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    status: "PENDING",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    category: "Men",
    quantity: 21,
    status: "PENDING",
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Produktas",
    sku: "L1542",
    status: "ACTIVE",
    category: "Men",
    quantity: 21,
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const statusEnum = {
  ACTIVE: t("BackofficeInventoryPage.TableRow.Active"),
  PENDING: t("BackofficeInventoryPage.TableRow.Pending"),
};

type statusEnumKey = keyof typeof statusEnum;

export const ProductList = () => {
  const { setMessage } = useSnackbarContext();
  const {
    data: inventoryOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_STATISTICS],
    queryFn: inventoryApi.getCompanyInventory,
  });

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>
            Daiktai esantys svetainėje
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <Anchor
            href={`${Routes.backoffice.prefix}${Routes.backoffice.productsAdd}`}
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
          >
            Pridėti produktą
          </Anchor>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              {!isLoading && !error ? (
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        {t("BackofficeInventoryPage.TableHeader.Title")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeInventoryPage.TableHeader.Category")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeInventoryPage.TableHeader.Status")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeInventoryPage.TableHeader.Quantity")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeInventoryPage.TableHeader.Price")}
                      </th>
                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                      >
                        <span className='sr-only'>
                          {t("BackofficeInventoryPage.TableHeader.Edit")}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {inventoryOrders.map(
                      (product: {
                        name: string;
                        image: string;
                        sku: string;
                        category: string;
                        status: statusEnumKey;
                        quantity: string;
                        price: string;
                      }) => (
                        <tr key={product.name}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                  className='h-10 w-10'
                                  src={product.image}
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {product.name}
                                </div>
                                <div className='text-gray-500'>
                                  {product.sku}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <div className='text-gray-900'>
                              {product.category}
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                              {statusEnum[product.status]}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {product.quantity}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {product.price}
                          </td>
                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                            <Anchor
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              {t("BackofficeInventoryPage.TableHeader.Edit")}
                              <span className='sr-only'>, {product.name}</span>
                            </Anchor>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <div className='flex w-full justify-center'>
                  <Loader isLoading={isLoading} />
                  {error && <p className='my-4'>{t("Errors.NetworkError")}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
