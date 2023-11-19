import React, { useState } from "react";
import Anchor from "../../../components/anchor/Anchor";
import Routes from "../../../routes/routes";
import BasePage from "../../../components/base-page/BasePage";
import { ProductModal } from "../../../components/product-modal/ProductModal";
import { useSnackbarContext } from "../../../context/snackbarContext";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { productApi } from "../../../clients/api/productApi";
import { t } from "i18next";

const IndexPage = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { setMessage } = useSnackbarContext();

  const createProduct = useMutation({
    mutationKey: [QueryKey.EDIT_PRODUCT],
    mutationFn: productApi.createProduct,
  });

  const processForm = (data: any) => {
    createProduct.mutate(data, {
      onSuccess: (res) => {
        setMessage("Produktas sėkmingai sukurtas.");
        setIsProductModalOpen(false);
      },
      onError: (err) => {
        setMessage(err.message);
      },
    });
  };

  return (
    <BasePage>
      <div className='flex flex-row w-full justify-end'>
        <button
          onClick={() => setIsProductModalOpen(true)}
          className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Pridėti prekę
        </button>
      </div>
      <div className='flex flex-row w-full h-[550px] items-center justify-center gap-5'>
        <Anchor href={`${Routes.company.prefix}${Routes.company.active}`}>
          <div className='border-slate-400 w-[250px] h-[250px] border-2 rounded-lg hover:bg-sky-100'>
            <div className='p-3 flex flex-row items-center justify-center h-full'>
              <h2 className='text-lg font-bold'>Aktyvios prekės</h2>
            </div>
          </div>
        </Anchor>

        <Anchor href={`${Routes.company.prefix}${Routes.company.pending}`}>
          <div className='border-slate-400 w-[250px] h-[250px] border-2 rounded-lg hover:bg-sky-100'>
            <div className='p-3 flex flex-row items-center justify-center h-full'>
              <h2 className='text-lg font-bold'>
                Laukiančios patvirtinimo prekės
              </h2>
            </div>
          </div>
        </Anchor>
      </div>
      <ProductModal
        buttonTitle={t("ProductModal.Create")}
        closeModal={() => setIsProductModalOpen(false)}
        processSubmit={(data) => processForm(data)}
        headerTitle={t("ProductModal.EditProduct")}
        open={isProductModalOpen}
      />
    </BasePage>
  );
};

export default IndexPage;
