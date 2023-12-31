import React, { useState } from "react";
import CompanyProductsList from "../../../components/company-products/list/CompanyProductsList";
import BasePage from "../../../components/base-page/BasePage";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { productApi } from "../../../clients/api/productApi";
import { ProductModal } from "../../../components/product-modal/ProductModal";
import { useSnackbarContext } from "../../../context/snackbarContext";

const ActivePage = () => {
  const { t } = useTranslation();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const { setMessage } = useSnackbarContext();

  const { data: products, isLoading } = useQuery({
    queryKey: [QueryKey.GET_COMPANY_ACTIVE_PRODUCTS],
    queryFn: () => productApi.getCompanyActiveProducts(),
  });

  const editProduct = useMutation({
    mutationKey: [QueryKey.EDIT_PRODUCT],
    mutationFn: productApi.editProduct,
  });

  const processForm = (data: any) => {
    editProduct.mutate(data, {
      onSuccess: (res) => {
        setMessage("Produkto informacija pakeista.");
        setIsProductModalOpen(false);
      },
      onError: (err) => {
        setMessage(err.message);
      },
    });
  };

  const handleProductEdit = (id: string) => {
    setProductId(id);
    setIsProductModalOpen(true);
  };
  const handleModalClose = () => {
    setProductId(undefined);
    setIsProductModalOpen(false);
  };

  return (
    <BasePage isLoading={isLoading}>
      <CompanyProductsList
        setModalOpen={handleProductEdit}
        items={products || []}
        title={t("PageTitle.ActiveProducts")}
      />
      <ProductModal
        buttonTitle={t("ProductModal.Save")}
        productId={productId}
        closeModal={handleModalClose}
        processSubmit={(data) => processForm(data)}
        headerTitle={t("ProductModal.EditProduct")}
        open={isProductModalOpen}
      />
    </BasePage>
  );
};

export default ActivePage;
