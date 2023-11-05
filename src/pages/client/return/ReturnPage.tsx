import React from "react";
import ReturnForm from "../../../components/forms/return/ReturnForm";
import Footer from "../../../components/footer/Footer";
import BasePage from "../../../components/base-page/BasePage";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../../images/close.svg";
import { useTranslation } from "react-i18next";

const ReturnPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <BasePage>
      <div className='w-4/6 mx-auto'>
        <div className='flex flex-row items-center justify-between mb-6'>
          <h2 className='text-[28px] font-bold'>{t("Return.PageTitleText")}</h2>
          <img
            onClick={() => navigate(-1)}
            src={closeIcon}
            alt='close icon'
            className='w-7 h-7 cursor-pointer'
          />
        </div>

        <div className='flex justify-center'>
          <ReturnForm />
        </div>
        <Footer />
      </div>
    </BasePage>
  );
};

export default ReturnPage;
