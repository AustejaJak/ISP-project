import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  CreateProductFields,
  createProductDefaultValues,
  createProductModel,
} from "./model";
import BaseInput from "../../input/Input";
import { useTranslation } from "react-i18next";
import FileUploader from "../../file-uploader/FileUploader";

const CreateProcuctForm = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: zodResolver(createProductModel),
    defaultValues: createProductDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = createProductModel.parse(getValues());
  };

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
        <BaseInput
          formField={CreateProductFields.TITLE}
          label={t("Product.Title")}
          type='text'
          errorMessage={errors[CreateProductFields.TITLE]?.message}
        />

        <BaseInput
          formField={CreateProductFields.DESCRIPTION}
          label={t("Product.Description")}
          type='text'
          errorMessage={errors[CreateProductFields.DESCRIPTION]?.message}
        />
        <BaseInput
          formField={CreateProductFields.PRICE}
          label={t("Product.Price")}
          type='number'
          errorMessage={errors[CreateProductFields.PRICE]?.message}
        />
        <BaseInput
          formField={CreateProductFields.VENDOR}
          label={t("Product.Vendor")}
          type='text'
          errorMessage={errors[CreateProductFields.VENDOR]?.message}
        />
        <FileUploader
          label={t("Product.Images")}
          fieldName={CreateProductFields.IMAGES}
        />
        <BaseInput
          formField={CreateProductFields.COLORS}
          label={t("Product.Colors")}
          type='text'
          errorMessage={errors[CreateProductFields.COLORS]?.message}
        />
        <BaseInput
          formField={CreateProductFields.DETAILS}
          label={t("Product.Details")}
          type='text'
          errorMessage={errors[CreateProductFields.DETAILS]?.message}
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
