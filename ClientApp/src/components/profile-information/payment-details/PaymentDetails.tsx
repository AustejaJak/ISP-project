import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../../input/Input";
import { useUserContext } from "../../../context/userContext";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../clients/api/userApi";
import { useSnackbarContext } from "../../../context/snackbarContext";
import {
  ChangePaymentDetailsFormField,
  changePaymentDetailsDefaultValues,
  changePaymentDetailsModel,
} from "./model";
import { clientsApi } from "../../../clients/api/clientsApi";

interface ChangeEmailFormProps {
  closeModal: () => void;
  refetch: () => void;
}

export const PaymentDetailsForm: React.FC<ChangeEmailFormProps> = ({
  closeModal,
  refetch,
}) => {
  const methods = useForm({
    resolver: zodResolver(changePaymentDetailsModel),
    defaultValues: changePaymentDetailsDefaultValues,
  });

  const { userInformation } = useUserContext();
  const { setMessage } = useSnackbarContext();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  const addPayment = useMutation({
    mutationKey: [QueryKey.CREATE_PAYMENT_DETAILS],
    mutationFn: clientsApi.addClientPaymentDetails,
  });

  const processForm = () => {
    const data = changePaymentDetailsModel.parse(getValues());
    addPayment.mutate(
      { userId: userInformation.userId, paymentDetails: data },
      {
        onSuccess: () => {
          setMessage("Kortelė sėkmingai pridėta.");
          refetch();
          closeModal();
        },
        onError: () => {
          setMessage("Įvyko klaida. Bandykite dar kartą.");
        },
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col gap-5'>
          <BaseInput
            formField={ChangePaymentDetailsFormField.CARD_NUMBER}
            label='Korteles numeris'
            type='text'
            errorMessage={
              errors[ChangePaymentDetailsFormField.CARD_NUMBER]?.message
            }
          />

          <BaseInput
            formField={ChangePaymentDetailsFormField.BILLING_CITY}
            label='Miestas'
            type='text'
            errorMessage={
              errors[ChangePaymentDetailsFormField.BILLING_CITY]?.message
            }
          />
          <BaseInput
            formField={ChangePaymentDetailsFormField.BILLING_STREET}
            label='Gatvė'
            type='text'
            errorMessage={
              errors[ChangePaymentDetailsFormField.BILLING_STREET]?.message
            }
          />
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Sukurti
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
