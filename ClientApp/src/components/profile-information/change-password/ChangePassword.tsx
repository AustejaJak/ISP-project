import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../../input/Input";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../clients/api/userApi";
import { useSnackbarContext } from "../../../context/snackbarContext";
import {
  ChangePasswordFormField,
  changePasswordDefaultValues,
  changePasswordModel,
} from "./model";

interface ChangePasswordFormProps {
  closeModal: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  closeModal,
}) => {
  const methods = useForm({
    resolver: zodResolver(changePasswordModel),
    defaultValues: changePasswordDefaultValues,
  });

  const { setMessage } = useSnackbarContext();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const changePassword = useMutation({
    mutationKey: [QueryKey.CHANGE_EMAIL],
    mutationFn: usersApi.changePassword,
  });

  const processForm = () => {
    const data = changePasswordModel.parse(getValues());
    changePassword.mutate(
      {
        userId: "",
        ...data,
      },
      {
        onSuccess: () => {
          setMessage("Slaptažodis sėkmingai pakeistas.");
          closeModal();
        },
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col gap-5'>
          <BaseInput
            formField={ChangePasswordFormField.OLD_PASSWORD}
            label='Dabartinis slaptažodis'
            type='text'
            disabled
            errorMessage={errors[ChangePasswordFormField.OLD_PASSWORD]?.message}
          />

          <BaseInput
            formField={ChangePasswordFormField.NEW_PASSWORD}
            label='Naujas slaptažodis'
            type='text'
            errorMessage={errors[ChangePasswordFormField.NEW_PASSWORD]?.message}
          />
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Pakeisti
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
