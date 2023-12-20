import React, { useEffect } from "react";
import {
  ChangeEmailFormField,
  changeEmailDefaultValues,
  changeEmailModel,
} from "./model";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../../input/Input";
import { useUserContext } from "../../../context/userContext";
import { QueryKey } from "../../../clients/react-query/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../clients/api/userApi";
import { useSnackbarContext } from "../../../context/snackbarContext";

interface ChangeEmailFormProps {
  closeModal: () => void;
}

export const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
  closeModal,
}) => {
  const methods = useForm({
    resolver: zodResolver(changeEmailModel),
    defaultValues: changeEmailDefaultValues,
  });

  const { userInformation } = useUserContext();
  const { setMessage } = useSnackbarContext();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    setValue("currentEmail", userInformation.email || "man@gmail.com");
  }, [userInformation]);

  const changeEmail = useMutation({
    mutationKey: [QueryKey.CHANGE_EMAIL],
    mutationFn: usersApi.changeEmail,
  });

  const processForm = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const data = changeEmailModel.parse(getValues());
      const { newEmail } = data;
      changeEmail.mutate(
        { userId, newEmail },
        {
          onSuccess: () => {
            setMessage("Elektroninis paštas sėkmingai pakeistas.");
            closeModal();
          },
        }
      );
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col gap-5'>
          <BaseInput
            formField={ChangeEmailFormField.CURRENT_EMAIL}
            label='Dabartinis El. paštas'
            type='text'
            disabled
            errorMessage={errors[ChangeEmailFormField.CURRENT_EMAIL]?.message}
          />

          <BaseInput
            formField={ChangeEmailFormField.NEW_EMAIL}
            label='Naujas El. paštas'
            type='text'
            errorMessage={errors[ChangeEmailFormField.NEW_EMAIL]?.message}
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
