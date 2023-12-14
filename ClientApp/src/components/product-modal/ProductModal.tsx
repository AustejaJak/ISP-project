import React, { useEffect } from "react";
import { BaseModal } from "../Modal/BaseModal";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateProductFields,
  createProductDefaultValues,
  createProductModel,
} from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../clients/api/productApi";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import FileUploader from "../file-uploader/FileUploader";
import { BaseSelect } from "../base-select/BaseSelect";

interface ProductModalProps {
  open: boolean;
  headerTitle: string;
  buttonTitle: string;
  processSubmit: (data: any) => void;
  closeModal: () => void;
  productId?: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  buttonTitle,
  headerTitle,
  processSubmit,
  closeModal,
  productId,
}) => {
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
    setValue,
  } = methods;

  const { data: colors, error } = useQuery({
    queryKey: [QueryKey.GET_COLORS],
    queryFn: () => productApi.getColorEnums(),
  });

  const { data: product } = useQuery({
    queryKey: [QueryKey.FIND_PRODUCT_BY_ID],
    queryFn: () => productApi.findProductById({ productId: productId! }),
    enabled: !!productId,
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.name as never);
      setValue("description", product.description as never);
      setValue("price", product.price as never);
      setValue("vendor", product.vendor as never);
      setValue("images", product.images as never);
      setValue("colors", product.colors as never);
    }
  }, [product]);

  useEffect(() => {
    if (error) setMessage(error.message);
  }, [error]);

  const processForm = () => {
    const data = createProductModel.parse(getValues());
    processSubmit(data);
  };
  return (
    <BaseModal
      onClose={closeModal}
      width='w-[680px]'
      title={headerTitle}
      open={open}
    >
      <div className='p-5'>
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
                {buttonTitle}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </BaseModal>
  );
};
