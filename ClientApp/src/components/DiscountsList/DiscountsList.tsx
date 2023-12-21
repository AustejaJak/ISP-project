import { t } from "i18next";
import { Loader } from "../Loader/Loader";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DiscountCode } from "../../types/types";
import { format, startOfDay } from "date-fns";

interface DiscountListProps {
  discounts: DiscountCode[];
  setModalOpen: (id?: string) => void;
  error: Error | null;
  isLoading: boolean;
  handleDeleteProduct?: (id: string) => void;
}

export const DiscountList: React.FC<DiscountListProps> = ({
  setModalOpen,
  error,
  isLoading,
  discounts,
  handleDeleteProduct,
}) => {
  const { setMessage } = useSnackbarContext();

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  const getIsValid = ({ start, end }: { start: Date; end: Date }) => {
    const today = startOfDay(new Date());
    return startOfDay(start) <= today && today <= startOfDay(end);
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>
            Nuolaidos kodai
          </h1>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <button
            onClick={() => setModalOpen()}
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
          >
            {t("BackofficeDiscountPage.AddDiscount")}
          </button>
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
                        {t("BackofficeDiscountPage.TableHeader.Title")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeDiscountPage.TableHeader.DiscountCoeff")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeDiscountPage.TableHeader.Status")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeDiscountPage.TableHeader.StartingDate")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeDiscountPage.TableHeader.EndingDate")}
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        {t("BackofficeDiscountPage.TableHeader.MinimumSum")}
                      </th>
                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                      >
                        <span className='sr-only'>
                          {t("BackofficeDiscountPage.TableHeader.Edit")}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {discounts?.map((discount: DiscountCode) => (
                      <tr key={discount.code}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                          <div className='flex items-center'>
                            <div className='ml-4 font-medium text-gray-900'>
                              {discount.code}
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          <div className='text-gray-900'>
                            {discount.discountAmount}
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                            {getIsValid({
                              start: new Date(discount.discountStart),
                              end: new Date(discount.discountEnd),
                            })
                              ? t("BackofficeDiscountPage.TableRow.Active")
                              : t("BackofficeDiscountPage.TableRow.NonActive")}
                          </span>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {format(
                            new Date(discount.discountStart),
                            "yyyy-MM-dd"
                          )}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {format(new Date(discount.discountEnd), "yyyy-MM-dd")}
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                          {discount.minimalAmount}
                        </td>
                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                          {/* <DeleteForeverIcon
                            onClick={() => handleDeleteProduct(product.sku)}
                            className='text-red-500 mr-3 cursor-pointer'
                          /> */}
                          <button
                            onClick={() => setModalOpen(discount.code)}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            {t("BackofficeDiscountPage.TableHeader.Edit")}
                            <span className='sr-only'>, {discount.code}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
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
