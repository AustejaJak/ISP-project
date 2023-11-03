import React from "react";
import BaseInput from "../../input/Input";
import { Control, useFormContext } from "react-hook-form";
import { appendFormKey } from "../../form-module/utils";
import { AddSpecificationFormField } from "./model";
import { useTranslation } from "react-i18next";

type AddSpecificationFormProps = {
  title?: string;
  control?: Control<any, any>;
  formField: string;
  setIsOpen: (condition: boolean) => void;
};

const AddSpecificationForm: React.FC<AddSpecificationFormProps> = ({
  title,
  formField,
  setIsOpen,
}) => {
  const { t } = useTranslation();

  const onSubmit = () => {
    //   setValue(appendFormKey(formField, AddSpecificationFormField.NAME), [
    //     [...getValues(appendFormKey(formField, AddSpecificationFormField.NAME), {name: }]),
    //   ]);
    setIsOpen(false);
  };

  return (
    <div className='fixed h-full w-full top-0 left-0 bg-opacity-70 bg-black'>
      <div className='flex justify-center items-center h-full'>
        <div className='rounded-xl h-[350px] w-[450px] bg-white'>
          <div
            style={{ borderRadius: "8px 8px 0 0" }}
            className='h-fit bg-[#4F45E4] p-3'
          >
            <h2 className='text-xl font-bold text-white'>{title}</h2>
          </div>
          <div className='p-3'>
            <BaseInput
              formField={appendFormKey(
                formField,
                AddSpecificationFormField.NAME
              )}
              label='Pavadinimas'
              type='text'
            />
            <BaseInput
              formField={appendFormKey(
                formField,
                AddSpecificationFormField.ITEMS
              )}
              label='Aprašymas'
              type='text'
            />
            <button
              onClick={onSubmit}
              className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {t("Product.CreateButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpecificationForm;
