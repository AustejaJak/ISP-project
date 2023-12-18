import React, { useEffect } from "react";
import { BaseModal } from "../Modal/BaseModal";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productApi } from "../../clients/api/productApi";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import { BaseForm } from "../BaseForm/BaseForm";
import { inventoryApi } from "../../clients/api/backoffice/inventoryApi";
import {
  CreateDiscountFields,
  createDiscountDefaultValues,
  createDiscountModel,
} from "./modal";
import { BaseDatePicker } from "../BaseDatePicker/BaseDatePicker";

interface DiscountModalProps {
  open: boolean;
  headerTitle: string;
  buttonTitle: string;
  processSubmit: (data: any) => void;
  closeModal: () => void;
  isBackoffice?: boolean;
  discountId?: string;
  approveAbility?: boolean;
  refetch?: () => void;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  open,
  buttonTitle,
  headerTitle,
  processSubmit,
  closeModal,
  discountId,
  approveAbility,
  isBackoffice = "false",
  refetch,
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: zodResolver(createDiscountModel),
    defaultValues: createDiscountDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = methods;

  //   const approveProduct = useMutation({
  //     mutationKey: [QueryKey.APPROVE_PRODUCT],
  //     mutationFn: inventoryApi.approveProduct,
  //   });

  //   const { data: product } = useQuery({
  //     queryKey: [QueryKey.FIND_PRODUCT_BY_ID],
  //     queryFn: () => productApi.findProductById({ productId: productId! }),
  //     enabled: !!productId,
  //   });

  //   useEffect(() => {
  //     if (product && productId) {
  //       setValue("sku", product.sku as never);
  //       setValue("pictureUrl", product.pictureUrl as never);
  //       setValue("type", product.type as never);
  //       setValue("countryOfOrigin", product.countryOfOrigin as never);
  //       setValue("measurements", product.measurements as never);
  //       setValue(
  //         "quantityInPackage",
  //         product.quantityInPackage.toString() as never
  //       );
  //       setValue("name", product.name as never);
  //       setValue("description", product.description as never);
  //       setValue("cost", product.cost.toString() as never);
  //       setValue("weight", product.weight.toString() as never);
  //       setValue("brand", product.brand as never);
  //     }
  //     return () => {
  //       reset();
  //     };
  //   }, [product, productId, setValue]);

  const processForm = () => {
    const data = createDiscountModel.parse(getValues());
    processSubmit(data);
  };

  //   const handleProductApprove = () => {
  //     if (!productId) return;
  //     approveProduct.mutate(
  //       {
  //         productId,
  //       },
  //       {
  //         onSuccess: () => {
  //           closeModal();
  //           refetch && refetch();
  //         },
  //       }
  //     );
  //   };

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
            <div className='flex flex-col gap-5 w-full'>
              <BaseTextField
                formField={CreateDiscountFields.CODE}
                label={t("DiscountCode.Code")}
                type='text'
                errorMessage={errors[CreateDiscountFields.CODE]?.message}
              />
              <BaseTextField
                formField={CreateDiscountFields.DISCOUNT}
                label={t("DiscountCode.Discount")}
                type='number'
                errorMessage={errors[CreateDiscountFields.DISCOUNT]?.message}
              />
              <BaseDatePicker
                formField={CreateDiscountFields.START_DATE}
                label={t("DiscountCode.StartDate")}
                errorMessage={errors[CreateDiscountFields.START_DATE]?.message}
              />
              <BaseDatePicker
                formField={CreateDiscountFields.END_DATE}
                label={t("DiscountCode.EndDate")}
                errorMessage={errors[CreateDiscountFields.END_DATE]?.message}
              />
              <BaseTextField
                formField={CreateDiscountFields.MIN_SUM}
                label={t("DiscountCode.MinSum")}
                type='number'
                errorMessage={errors[CreateDiscountFields.MIN_SUM]?.message}
              />
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
