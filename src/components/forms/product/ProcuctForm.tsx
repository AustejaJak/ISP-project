import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { ProductFields, productDefaultValues, productModel } from "./model";
import BaseInput from "../../input/Input";
import { useTranslation } from "react-i18next";
import FileUploader from "../../file-uploader/FileUploader";
import SpecificationPicker from "../../specification-picker/SpecificationPicker";
import { useState } from "react";

const CreateProcuctForm = () => {
  const [isSpecificationFormOpen, setIsSpecificationFormOpen] = useState(false);
  const { t } = useTranslation();
  const methods = useForm({
    resolver: zodResolver(productModel),
    defaultValues: productDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = productModel.parse(getValues());
  };

  console.log(methods);

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
        <BaseInput
          formField={ProductFields.TITLE}
          label={t("Product.Title")}
          type='text'
          errorMessage={errors[ProductFields.TITLE]?.message}
        />

        <BaseInput
          formField={ProductFields.DESCRIPTION}
          label={t("Product.Description")}
          type='text'
          errorMessage={errors[ProductFields.DESCRIPTION]?.message}
        />
        <BaseInput
          formField={ProductFields.PRICE}
          label={t("Product.Price")}
          type='number'
          errorMessage={errors[ProductFields.PRICE]?.message}
        />
        <BaseInput
          formField={ProductFields.VENDOR}
          label={t("Product.Vendor")}
          type='text'
          errorMessage={errors[ProductFields.VENDOR]?.message}
        />
        <FileUploader
          label={t("Product.Images")}
          fieldName={ProductFields.IMAGES}
        />
        <BaseInput
          formField={ProductFields.COLORS}
          label={t("Product.Colors")}
          type='text'
          errorMessage={errors[ProductFields.COLORS]?.message}
        />
        {/* <BaseInput
          formField={ProductFields.DETAILS}
          label={t("Product.Details")}
          type='text'
          errorMessage={errors[ProductFields.DETAILS]?.message}
        /> */}
        <SpecificationPicker
          label={t("Product.Details")}
          isOpen={isSpecificationFormOpen}
          setIsOpen={setIsSpecificationFormOpen}
          formField={ProductFields.DETAILS}
        />

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {t("Product.CreateButton")}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateProcuctForm;
