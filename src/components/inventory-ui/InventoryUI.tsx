import { t } from "i18next";
import { ProductList } from "../product-list/ProductList";
import { ProductModal } from "../product-modal/ProductModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useSnackbarContext } from "../../context/snackbarContext";
import { backofficeProductApi } from "../../clients/api/backoffice/productApi";

export const InventoryUI = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const { setMessage } = useSnackbarContext();

  const createProduct = useMutation({
    mutationKey: [QueryKey.CREATE_PRODUCT],
    mutationFn: backofficeProductApi.createProduct,
  });
  const editProduct = useMutation({
    mutationKey: [QueryKey.EDIT_PRODUCT],
    mutationFn: backofficeProductApi.editProduct,
  });

  const processForm = (data: any) => {
    if (productId) {
      createProduct.mutate(data, {
        onSuccess: (res) => {
          setMessage("Produkto informacija pakeista.");
          setIsProductModalOpen(false);
        },
        onError: (err) => {
          setMessage(err.message);
        },
      });
    }
    if (!productId) {
      editProduct.mutate(data, {
        onSuccess: (res) => {
          setMessage("Produkto sukurtas sėkmingai.");
          setIsProductModalOpen(false);
        },
        onError: (err) => {
          setMessage(err.message);
        },
      });
    }
  };

  const handleProductEdit = (id?: string) => {
    setProductId(id);
    setIsProductModalOpen(true);
  };
  const handleModalClose = () => {
    setProductId(undefined);
    setIsProductModalOpen(false);
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
              <ProductList setModalOpen={handleProductEdit} />
            </div>
          </div>
        </main>
      </div>
      <ProductModal
        buttonTitle={
          productId ? t("ProductModal.Save") : t("ProductModal.Create")
        }
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
