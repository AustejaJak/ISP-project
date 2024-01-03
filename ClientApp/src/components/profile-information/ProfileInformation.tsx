import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  ProfileInformationFormField,
  profileInformationDefaultValues,
  profileInformationModel,
} from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../input/Input";
import BaseChangeableInput from "../changeable-input/ChangeableInput";
import { BaseModal } from "../Modal/BaseModal";
import { ChangeEmailForm } from "./change-email/ChangeEmail";
import { useUserContext } from "../../context/userContext";
import { ChangePasswordForm } from "./change-password/ChangePassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { clientsApi } from "../../clients/api/clientsApi";
import { PaymentDetailsForm } from "./payment-details/PaymentDetails";

const ProfileInformation = () => {
  const methods = useForm({
    resolver: zodResolver(profileInformationModel),
    defaultValues: profileInformationDefaultValues,
  });
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isCreatePaymentMethodModalOpen, setIsCreatePaymentMethodModalOpen] =
    useState(false);
  const [isChangePasswordModalOpen, setIsPasswordEmailModalOpen] =
    useState(false);
  const { userInformation } = useUserContext();
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue("name", userInformation.name);
    setValue("surname", userInformation.surname);
    setValue("email", userInformation.email);
    setValue("password", "123456789");
  }, [userInformation]);

  const { data: paymentDetails, refetch } = useQuery({
    queryKey: [QueryKey.GET_PAYMENT_DETAILS],
    queryFn: () =>
      clientsApi.getClientPaymentDetails({ userId: userInformation.userId }),
    enabled: !!userInformation.userId,
  });

  const removePaymentMethod = useMutation({
    mutationKey: [QueryKey.DELETE_PAYMENT_DETAILS],
    mutationFn: clientsApi.removeClientPaymentDetails,
  });

  const processForm = () => {
    const data = profileInformationModel.parse(getValues());
  };

  const handlePaymentDetailsRemove = (id: number) => {
    removePaymentMethod.mutate(
      {
        userId: userInformation.userId,
        paymentId: id,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleFetch = () => {
    refetch();
  };

  return (
    <FormProvider {...methods}>
      <BaseModal
        title='Pakeisti Elektroninį paštą'
        open={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      >
        <ChangeEmailForm closeModal={() => setIsChangeEmailModalOpen(false)} />
      </BaseModal>

      <BaseModal
        title='Sukurti naują apmokėjimo adresą'
        open={isCreatePaymentMethodModalOpen}
        onClose={() => setIsCreatePaymentMethodModalOpen(false)}
      >
        <PaymentDetailsForm
          refetch={handleFetch}
          closeModal={() => setIsCreatePaymentMethodModalOpen(false)}
        />
      </BaseModal>

      <BaseModal
        title='Pakeisti slaptažodį'
        open={isChangePasswordModalOpen}
        onClose={() => setIsPasswordEmailModalOpen(false)}
      >
        <ChangePasswordForm
          closeModal={() => setIsPasswordEmailModalOpen(false)}
        />
      </BaseModal>

      <div className='w-[350px] pt-5'>
        <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
          <BaseInput
            formField={ProfileInformationFormField.NAME}
            label='Vardas'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.NAME]?.message}
          />

          <BaseInput
            formField={ProfileInformationFormField.SURNAME}
            label='Pavardė'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.SURNAME]?.message}
          />

          <BaseChangeableInput
            formField={ProfileInformationFormField.EMAIL}
            label='El. Paštas'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.EMAIL]?.message}
            isChangeable
            changeableText='Pakeisti El. paštą'
            onChangeableTextClick={() => setIsChangeEmailModalOpen(true)}
          />
          <BaseChangeableInput
            formField={ProfileInformationFormField.PASSWORD}
            label='Slaptažodis'
            type='password'
            disabled
            errorMessage={errors[ProfileInformationFormField.PASSWORD]?.message}
            isChangeable
            changeableText='Pakeisti slaptažodį'
            onChangeableTextClick={() => setIsPasswordEmailModalOpen(true)}
          />
        </form>
      </div>
      <div>
        <h1>Apmokėjimų adresai</h1>
        <div className='flex gap-3 w-full'>
          {paymentDetails?.map((detail: any) => (
            <div className='p-5 rounded-lg bg-[#5046E5] w-72'>
              <h1 className='text-white'>{detail.cardNumber}</h1>
              <p>{detail.billingCity}</p>
              <p>{detail.billingStreet}</p>
              <button
                onClick={() => handlePaymentDetailsRemove(detail.id)}
                className='bg-red-500 p-2 mt-2 rounded-md'
              >
                Panaikinti
              </button>
            </div>
          ))}
          <div className='p-5 rounded-lg bg-[#5046E5] w-72 flex justify-center align-items'>
            <button
              onClick={() => setIsCreatePaymentMethodModalOpen(true)}
              className=' bg-green-500 p-2 rounded-md'
            >
              Sukurti naują
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileInformation;
