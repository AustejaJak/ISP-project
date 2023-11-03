import React from "react";
import CreateProcuctForm from "../../../components/forms/product/ProcuctForm";
import BasePage from "../../../components/base-page/BasePage";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../images/close.svg";
import { useNavigate } from "react-router-dom";
import Routes from "../../../routes/routes";

const CreateProductPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <BasePage>
      <div className='w-2/6 mx-auto'>
        <div className='flex flex-row items-center justify-between mb-6'>
          <h2 className='text-[28px] font-bold'>{t("Product.CreateTitle")}</h2>
          <img
            onClick={() =>
              navigate(`${Routes.company.prefix}${Routes.company.base}`)
            }
            src={closeIcon}
            alt='close icon'
            className='w-7 h-7 cursor-pointer'
          />
        </div>

        <div className='flex justify-center'>
          <CreateProcuctForm />
        </div>
      </div>
    </BasePage>
  );
};

export default CreateProductPage;
