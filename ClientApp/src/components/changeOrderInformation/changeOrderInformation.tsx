import React, { useEffect } from "react";
import { BaseModal } from "../Modal/BaseModal";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import {
  ChangeOrderInformationFields,
  changeOrderInformationDefaultValues,
  changeOrderInformationModel,
} from "../order-history-ui/model";
import { ordersApi } from "../../clients/api/ordersApi";

interface ProductModalProps {
  open: boolean;
  headerTitle: string;
  buttonTitle: string;
  processSubmit: (data: any) => void;
  closeModal: () => void;
  isBackoffice?: boolean;
  orderId: number;
  approveAbility?: boolean;
  refetch?: () => void;
  address?: string;
  attachedDocuments?: string;
}

export const ChangeOrderInformationModal: React.FC<ProductModalProps> = ({
  open,
  buttonTitle,
  headerTitle,
  processSubmit,
  closeModal,
  orderId,
  refetch,
  address,
  attachedDocuments,
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: zodResolver(changeOrderInformationModel),
    defaultValues: changeOrderInformationDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = methods;

  const { data: order } = useQuery({
    queryKey: [QueryKey.FIND_ORDER_BY_ID],
    queryFn: () => ordersApi.getOrderById({ orderId: orderId }),
    enabled: !!orderId,
  });

  useEffect(() => {
    setValue("deliveryAddress", address as never);
    setValue("attachedDocuments", attachedDocuments as never);
  }, [order, orderId, reset, setValue]);

  const processForm = () => {
    const data = changeOrderInformationModel.parse(getValues());
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
            <div className='flex flex-col gap-5 w-full'>
              <BaseTextField
                formField={ChangeOrderInformationFields.ADDRESS}
                label={"Adresas"}
                type='text'
                errorMessage={
                  errors[ChangeOrderInformationFields.ADDRESS]?.message
                }
              />
              <BaseTextField
                formField={ChangeOrderInformationFields.ATTACHED_DOCUMENTS}
                label={"Prisegti failai"}
                type='text'
                errorMessage={
                  errors[ChangeOrderInformationFields.ATTACHED_DOCUMENTS]
                    ?.message
                }
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
