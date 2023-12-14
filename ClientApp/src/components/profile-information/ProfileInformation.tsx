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

const ProfileInformation = () => {
  const methods = useForm({
    resolver: zodResolver(profileInformationModel),
    defaultValues: profileInformationDefaultValues,
  });
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
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
  }, [userInformation]);

  const processForm = () => {
    const data = profileInformationModel.parse(getValues());
  };

  return (
    <FormProvider {...methods}>
      <BaseModal
        title='Pakeisti Elektroninį paštą'
        open={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      >
        <ChangeEmailForm />
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
        </form>
      </div>
    </FormProvider>
  );
};

export default ProfileInformation;
