import { useMutation, useQuery } from "@tanstack/react-query";
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
    refetch,
  } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_STATISTICS],
    queryFn: ordersApi.getCompanyOrdersStatistics,
  });

  const generateStatistics = useMutation({
    mutationKey: [QueryKey.GENERATE_COMPANY_STATISTICS],
    mutationFn: ordersApi.generateCompanyOrdersStatistics,
  });

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  const handleStatisticsGenerate = () => {
    generateStatistics.mutate(1, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>
        {t("BackofficeBasePage.StatisticLast30Days")}
      </h3>
      <button
        className='flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={handleStatisticsGenerate}
      >
        Generuoti ataskaitą
      </button>
      {!isLoading && !error ? (
        <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {statistics && statistics.length > 0 && (
            <>
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Vidutinė užsakymo suma
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {statistics[statistics.length - 1].averageSum}
                </dd>
              </div>
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Užsakymų skaičius
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {statistics[statistics.length - 1]?.orders?.length}
                </dd>
              </div>
            </>
          )}
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
