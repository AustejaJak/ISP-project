import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  ProfileInformationFormField,
  profileInformationDefaultValues,
  profileInformationModel,
} from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../input/Input";

const ProfileInformation = () => {
  const methods = useForm({
    resolver: zodResolver(profileInformationModel),
    defaultValues: profileInformationDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = profileInformationModel.parse(getValues());
  };

  return (
    <FormProvider {...methods}>
      <div className='w-[350px] pt-5'>
        <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
          <BaseInput
            formField={ProfileInformationFormField.NAME}
            label='Name'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.NAME]?.message}
          />

          <BaseInput
            formField={ProfileInformationFormField.SURNAME}
            label='Surname'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.SURNAME]?.message}
          />

          <BaseInput
            formField={ProfileInformationFormField.EMAIL}
            label='Email'
            type='text'
            disabled
            errorMessage={errors[ProfileInformationFormField.EMAIL]?.message}
          />
        </form>
      </div>
    </FormProvider>
  );
};

export default ProfileInformation;
