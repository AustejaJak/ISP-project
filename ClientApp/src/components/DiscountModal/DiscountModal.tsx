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
import { discountApi } from "../../clients/api/backoffice/discountApi";

interface DiscountModalProps {
  open: boolean;
  headerTitle: string;
  buttonTitle: string;
  processSubmit: (data: any) => void;
  closeModal: () => void;
  discountId?: number;
  refetch?: () => void;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  open,
  buttonTitle,
  headerTitle,
  processSubmit,
  closeModal,
  discountId,
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

  const { data: discount } = useQuery({
    queryKey: [QueryKey.FIND_PRODUCT_BY_ID],
    queryFn: () => discountApi.getDiscountById(discountId!),
    enabled: !!discountId,
  });

  useEffect(() => {
    if (discountId && discount) {
      setValue("code", discount.code as never);
      setValue("discount", discount.discountAmount.toString() as never);
      setValue("endDate", new Date(discount.discountEnd) as never);
      setValue("startDate", new Date(discount.discountStart) as never);
      setValue("minSum", discount.minimalAmount.toString() as never);
    }
    return () => {
      reset();
    };
  }, [discount, discountId, reset, setValue]);

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
