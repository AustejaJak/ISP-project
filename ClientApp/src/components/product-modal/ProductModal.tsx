import React, { useEffect } from "react";
import { BaseModal } from "../Modal/BaseModal";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateProductFields,
  createProductDefaultValues,
  createProductModel,
} from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productApi } from "../../clients/api/productApi";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import { BaseForm } from "../BaseForm/BaseForm";
import { inventoryApi } from "../../clients/api/backoffice/inventoryApi";
import { BaseSelect } from "../base-select/BaseSelect";
import { backofficeProductApi } from "../../clients/api/backoffice/productApi";

interface ProductModalProps {
  open: boolean;
  headerTitle: string;
  buttonTitle: string;
  processSubmit: (data: any) => void;
  closeModal: () => void;
  isBackoffice?: boolean;
  productId?: string;
  approveAbility?: boolean;
  refetch?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  buttonTitle,
  headerTitle,
  processSubmit,
  closeModal,
  productId,
  approveAbility,
  isBackoffice = "false",
  refetch,
}) => {
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
    reset,
  } = methods;

  const approveProduct = useMutation({
    mutationKey: [QueryKey.APPROVE_PRODUCT],
    mutationFn: inventoryApi.approveProduct,
  });

  const { data: product } = useQuery({
    queryKey: [QueryKey.FIND_PRODUCT_BY_ID],
    queryFn: () => productApi.findProductById({ productId: productId! }),
    enabled: !!productId,
  });

  const { data: categories } = useQuery({
    queryKey: [QueryKey.GET_CATEGORIES],
    queryFn: () => backofficeProductApi.getProductCategories(),
  });

  useEffect(() => {
    if (product && productId) {
      setValue("sku", product.sku as never);
      setValue("pictureUrl", product.pictureUrl as never);
      setValue("type", product.type as never);
      setValue("countryOfOrigin", product.countryOfOrigin as never);
      setValue("measurements", product.measurements as never);
      setValue(
        "quantityInPackage",
        product.quantityInPackage.toString() as never
      );
      setValue("name", product.name as never);
      setValue("description", product.description as never);
      setValue("cost", product.cost.toString() as never);
      setValue("weight", product.weight.toString() as never);
      setValue("brand", product.brand as never);
    }
    return () => {
      reset();
    };
  }, [product, productId, setValue]);

  const processForm = () => {
    const data = createProductModel.parse(getValues());
    processSubmit({
      ...data,
      isConfirmed: product?.isConfirmed || isBackoffice,
    });
  };

  const handleProductApprove = () => {
    if (!productId) return;
    approveProduct.mutate(
      {
        productId,
      },
      {
        onSuccess: () => {
          closeModal();
          refetch && refetch();
        },
      }
    );
  };

  const renderLeftSide = () => {
    return (
      <div className='flex flex-col gap-5 w-full'>
        <BaseTextField
          formField={CreateProductFields.SKU}
          label={t("Product.SKU")}
          type='text'
          errorMessage={errors[CreateProductFields.SKU]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.TITLE}
          label={t("Product.Title")}
          type='text'
          errorMessage={errors[CreateProductFields.TITLE]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.WEIGHT}
          label={t("Product.Weight")}
          type='number'
          errorMessage={errors[CreateProductFields.WEIGHT]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.DESCRIPTION}
          label={t("Product.Description")}
          type='text'
          errorMessage={errors[CreateProductFields.DESCRIPTION]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.PICTURE_URL}
          label={t("Product.Picture")}
          type='text'
          errorMessage={errors[CreateProductFields.PICTURE_URL]?.message}
        />
      </div>
    );
  };

  const renderRightSide = () => {
    return (
      <div className='flex flex-col gap-5 w-full'>
        <BaseSelect
          formField={CreateProductFields.TYPE}
          label={t("Product.Type")}
          items={categories?.map(({ type, ...rest }) => ({
            ...rest,
            id: rest.id.toString(),
            name: type,
          }))}
          errorMessage={errors[CreateProductFields.TYPE]?.message}
        />

        <BaseTextField
          formField={CreateProductFields.PRICE}
          label={t("Product.Price")}
          type='number'
          errorMessage={errors[CreateProductFields.PRICE]?.message}
        />

        <BaseTextField
          formField={CreateProductFields.COUNTRY_OF_ORIGIN}
          label={t("Product.CountryOfOrigin")}
          type='text'
          errorMessage={errors[CreateProductFields.COUNTRY_OF_ORIGIN]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.MEASUREMENTS}
          label={t("Product.Measurements")}
          type='text'
          errorMessage={errors[CreateProductFields.MEASUREMENTS]?.message}
        />
        <BaseTextField
          formField={CreateProductFields.QUANTITY_IN_PACKAGE}
          label={t("Product.QuantityInPackage")}
          type='number'
          errorMessage={
            errors[CreateProductFields.QUANTITY_IN_PACKAGE]?.message
          }
        />
        <BaseTextField
          formField={CreateProductFields.BRAND}
          label={t("Product.Brand")}
          type='text'
          errorMessage={errors[CreateProductFields.BRAND]?.message}
        />
      </div>
    );
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
            <BaseForm left={renderLeftSide} right={renderRightSide} />
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                {buttonTitle}
              </button>
            </div>
          </form>
          {approveAbility && !product?.isConfirmed && (
            <div className='mt-3'>
              <button
                onClick={handleProductApprove}
                className='flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Patvirtinti
              </button>
            </div>
          )}
        </FormProvider>
      </div>
    </BaseModal>
  );
};
