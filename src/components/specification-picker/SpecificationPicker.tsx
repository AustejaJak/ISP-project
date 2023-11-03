import React from "react";
import plusIcon from "../../images/plus.svg";
import AddSpecificationForm from "../forms/add-specification/AddSpecificationForm";
import { useTranslation } from "react-i18next";

type SpecificationPickerProps = {
  formField: string;
  isOpen: boolean;
  setIsOpen: (condition: boolean) => void;
  label: string;
};

const SpecificationPicker: React.FC<SpecificationPickerProps> = ({
  formField,
  isOpen,
  setIsOpen,
  label,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <label
        htmlFor={formField}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <img
        className='w-9 h-9 cursor-pointer'
        src={plusIcon}
        alt='plus icon'
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <AddSpecificationForm
          formField={formField}
          setIsOpen={setIsOpen}
          title={t("Product.AddDetail")}
        />
      )}
    </div>
  );
};

export default SpecificationPicker;
