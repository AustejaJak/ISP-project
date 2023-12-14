import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { ordersApi } from "../../clients/api/backoffice/ordersApi";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";

const statTitlesEnum = {
  PROFIT: t("OrdersStatistics.ProfitTitle"),
  AVERAGE_ORDER_PRICE: t("OrdersStatistics.AverageOrderPriceTitle"),
  PRODUCTS_QUANTITY: t("OrdersStatistics.ProductsQuantityTitle"),
};

type statTitlesEnumKey = keyof typeof statTitlesEnum;

const stats = [
  { name: "Pelnas", stat: "71,897" },
  { name: "Vidutinė užsakymo kaina", stat: "20.25" },
  { name: "Produktų kiekis", stat: "45" },
];

export const Stats = () => {
  const { setMessage } = useSnackbarContext();

  const {
    data: statistics,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_STATISTICS],
    queryFn: ordersApi.getCompanyOrdersStatistics,
  });

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>
        {t("BackofficeBasePage.StatisticLast30Days")}
      </h3>
      {!isLoading && !error ? (
        <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {statistics.map((item: { name: string; stat: string }) => (
            <div
              key={item.name}
              className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6'
            >
              <dt className='truncate text-sm font-medium text-gray-500'>
                {statTitlesEnum[item.name as statTitlesEnumKey]}
              </dt>
              <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className='flex justify-center w-full'>
          {!error ? (
            <Loader isLoading={isLoading} />
          ) : (
            <p>{t("Errors.NetworkError")}</p>
          )}
        </div>
      )}
    </div>
  );
};
