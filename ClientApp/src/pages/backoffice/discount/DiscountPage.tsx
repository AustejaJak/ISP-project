import { t } from "i18next";
import { useState } from "react";
import { useSnackbarContext } from "../../../context/snackbarContext";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { discountApi } from "../../../clients/api/backoffice/discountApi";

export const DiscountPage = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [discountCodeId, setDiscountCodeId] = useState<number | undefined>(
    undefined
  );
  const { setMessage } = useSnackbarContext();

  const {
    data: inventoryOrders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.GET_DISCOUNT_LIST],
    queryFn: discountApi.getDiscountList,
  });

  const createDiscountCode = useMutation({
    mutationKey: [QueryKey.GET_DISCOUNT_CODE],
    mutationFn: discountApi.createDiscountCode,
  });

  const editDiscountCode = useMutation({
    mutationKey: [QueryKey.EDIT_DISCOUNT_CODE],
    mutationFn: discountApi.editDiscountCode,
  });

  const processForm = (data: any) => {
    if (!discountCodeId) {
      createDiscountCode.mutate(data, {
        onSuccess: (res) => {
          setMessage("Nuolaidos kodas sukurtas sėkmingai.");
          setIsProductModalOpen(false);
          refetch();
        },
        onError: (err) => {
          setMessage(err.message);
        },
      });
    }
    if (discountCodeId) {
      editDiscountCode.mutate(
        {
          discountId: discountCodeId,
          discountData: { ...data, isConfirmed: data.isConfirmed },
        },
        {
          onSuccess: (res) => {
            setMessage("Produkto informacija pakeista.");
            setIsProductModalOpen(false);
            refetch();
          },
          onError: (err) => {
            setMessage(err.message);
          },
        }
      );
    }
  };

  const handleProductEdit = (id?: string) => {
    setDiscountCodeId(id);
    setIsProductModalOpen(true);
  };
  const handleModalClose = () => {
    setDiscountCodeId(undefined);
    setIsProductModalOpen(false);
  };

  const handleListRefetch = () => refetch();

  const handleDeleteProduct = (id: string) => {
    deleteProduct.mutate(
      { productId: id },
      {
        onSuccess: () => {
          setMessage("Produktas sėkmingai pašalintas.");
          refetch();
        },
        onError: () => {
          setMessage("Įvyko klaida, bandykite dar kartą.");
        },
      }
    );
  };

  return (
    <>
      <div className='min-h-full'>
        <div className='bg-gray-800 pb-32'>
          <header className='py-10'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                {t("BackofficeInventoryPage.TitleText")}
              </h1>
            </div>
          </header>
        </div>

        <main className='-mt-32'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
            <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
              <ProductList
                handleDeleteProduct={handleDeleteProduct}
                error={error}
                isLoading={isLoading}
                products={inventoryOrders || []}
                setModalOpen={handleProductEdit}
              />
            </div>
          </div>
        </main>
      </div>
      <ProductModal
        buttonTitle={
          productId ? t("ProductModal.Save") : t("ProductModal.Create")
        }
        refetch={handleListRefetch}
        isBackoffice={true}
        approveAbility={!!productId}
        productId={productId}
        closeModal={handleModalClose}
        processSubmit={(data) => processForm(data)}
        headerTitle={
          productId
            ? t("ProductModal.EditProduct")
            : t("ProductModal.CreateProduct")
        }
        open={isProductModalOpen}
      />
    </>
  );
};
