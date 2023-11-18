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

export const ChangeEmailForm = () => {
  const methods = useForm({
    resolver: zodResolver(changeEmailModel),
    defaultValues: changeEmailDefaultValues,
  });

  const { userInformation } = useUserContext();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    setValue("currentEmail", userInformation.email);
  }, [userInformation]);

  const processForm = () => {
    const data = changeEmailModel.parse(getValues());
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
              Sign in
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
