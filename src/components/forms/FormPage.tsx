import React from "react";
import BasePage from "../base-page/BasePage";
import closeIcon from "../../images/close.svg";
import { useNavigate } from "react-router";

type FormPageProps = {
  headerTitle?: string;
  closeLink?: string;
  closeFunction?: () => void;
  children?: React.ReactNode;
};

const FormPage: React.FC<FormPageProps> = ({
  headerTitle,
  closeLink,
  closeFunction,
  children,
}) => {
  const navigate = useNavigate();

  const handleCloseRedirect = () => {
    closeLink && navigate(closeLink);
    closeFunction?.();
  };

  return (
    <BasePage>
      <div className='w-2/6 mx-auto'>
        <div className='flex flex-row items-center justify-between mb-6'>
          {headerTitle && (
            <h2 className='text-[28px] font-bold'>{headerTitle}</h2>
          )}
          {closeLink ||
            (closeFunction && (
              <img
                onClick={handleCloseRedirect}
                src={closeIcon}
                alt='close icon'
                className='w-7 h-7 cursor-pointer'
              />
            ))}
        </div>

        <div className='flex justify-center'>{children}</div>
      </div>
    </BasePage>
  );
};

export default FormPage;
