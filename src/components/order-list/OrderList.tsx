import { t } from "i18next";
import Anchor from "../anchor/Anchor";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { ordersApi } from "../../clients/api/backoffice/ordersApi";
import { Loader } from "../Loader/Loader";

const transactions = [
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
  {
    id: "AAPS0L",
    name: "vardenis",
    surname: "pavardenis",
    email: "vardenis@gmail.com",
    phoneNumber: "+37091261684",
    commission: "+$4.37",
    price: "$3,509.00",
  },
];

export default function OrderList() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_ORDERS],
    queryFn: ordersApi.getCompanyOrdersStatistics,
  });

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      {t("BackofficeBasePage.OrderList.OrderID")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.Name")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.Surname")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.Email")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.TelephoneNumber")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.Tax")}
                    </th>
                    <th
                      scope='col'
                      className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      {t("BackofficeBasePage.OrderList.Price")}
                    </th>
                    <th
                      scope='col'
                      className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6'
                    >
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {!isLoading && !error ? (
                    <>
                      {orders.map(
                        (transaction: {
                          id: string;
                          name: string;
                          surname: string;
                          email: string;
                          phoneNumber: string;
                          commission: string;
                          price: string;
                        }) => (
                          <tr key={transaction.id}>
                            <td className='whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6'>
                              {transaction.id}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900'>
                              {transaction.name}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900'>
                              {transaction.surname}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                              {transaction.email}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                              {transaction.phoneNumber}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                              {transaction.commission}
                            </td>
                            <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                              {transaction.price}
                            </td>
                            <td className='relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                              <Anchor
                                href='#'
                                className='text-indigo-600 hover:text-indigo-900'
                              >
                                {t("BackofficeBasePage.OrderList.ViewOrder")}
                                <span className='sr-only'>
                                  , {transaction.id}
                                </span>
                              </Anchor>
                            </td>
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    <div className='flex w-full justify-center items-center'>
                      {!error ? (
                        <Loader isLoading={isLoading} />
                      ) : (
                        <p className='my-3'>{t("Errors.NetworkError")}</p>
                      )}
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
