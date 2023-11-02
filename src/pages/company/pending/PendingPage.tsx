import React from "react";
import CompanyProductsList from "../../../components/company-products/list/CompanyProductsList";
import BasePage from "../../../components/base-page/BasePage";
import { useTranslation } from "react-i18next";

const PendingPage = () => {
  const { t } = useTranslation();
  return (
    <BasePage>
      <CompanyProductsList title={t("PageTitle.PendingProducts")} />
    </BasePage>
  );
};

export default PendingPage;
