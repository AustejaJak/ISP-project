import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  CreateProductFields,
  createProductDefaultValues,
  createProductModel,
} from "./model";
import { useTranslation } from "react-i18next";
import FileUploader from "../../file-uploader/FileUploader";
import { BaseTextField } from "../../BaseTextField/BaseTextField";
import { BaseSelect } from "../../base-select/BaseSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { productApi } from "../../../clients/api/productApi";
import { useNavigate } from "react-router-dom";
import { useSnackbarContext } from "../../../context/snackbarContext";
import { useEffect } from "react";

const CreateProcuctForm = () => {
  const { setMessage } = useSnackbarContext();
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

  const { data: colors, error } = useQuery({
    queryKey: [QueryKey.GET_COLORS],
    queryFn: () => productApi.getColorEnums(),
  });

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  const navigate = useNavigate();

  const createProduct = useMutation({
    mutationKey: [QueryKey.CREATE_PRODUCT],
    mutationFn: productApi.createProduct,
  });

  const processForm = () => {
    const data = createProductModel.parse(getValues());
    createProduct.mutate(data, {
      onSuccess: (res) => {
        navigate(-1);
      },
      onError: (err) => {
        console.log(err);
        setMessage(err.message);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col gap-5'>
          <BaseTextField
            formField={CreateProductFields.TITLE}
            label={t("Product.Title")}
            type='text'
            errorMessage={errors[CreateProductFields.TITLE]?.message}
          />
          <BaseTextField
            formField={CreateProductFields.DESCRIPTION}
            label={t("Product.Description")}
            type='text'
            errorMessage={errors[CreateProductFields.DESCRIPTION]?.message}
          />

          <BaseTextField
            formField={CreateProductFields.PRICE}
            label={t("Product.Price")}
            type='number'
            errorMessage={errors[CreateProductFields.PRICE]?.message}
          />

          <BaseTextField
            formField={CreateProductFields.VENDOR}
            label={t("Product.Vendor")}
            type='text'
            errorMessage={errors[CreateProductFields.VENDOR]?.message}
          />

          <FileUploader
            label={t("Product.Images")}
            fieldName={CreateProductFields.IMAGES}
          />

          <BaseSelect
            formField={CreateProductFields.COLORS}
            label={t("Product.Color")}
            items={colors || []}
            errorMessage={errors[CreateProductFields.COLORS]?.message}
          />

          {/* <BaseTextField
            formField={CreateProductFields.DETAILS}
            label={t("Product.Details")}
            type='text'
            errorMessage={errors[CreateProductFields.DETAILS]?.message}
          /> */}
        </div>
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
