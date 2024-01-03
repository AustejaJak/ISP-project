import { useForm, FormProvider } from "react-hook-form";
import { SignUpFormField, signUpDefaultValues, signUpModel } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { BaseDatePicker } from "../BaseDatePicker/BaseDatePicker";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { clientApi } from "../../clients/api/clientApi";
import { useSnackbarContext } from "../../context/snackbarContext";
import { emailApi } from "../../clients/api/emailApi";

const SignUp = () => {
  const methods = useForm({
    resolver: zodResolver(signUpModel),
    defaultValues: signUpDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const registerClient = useMutation({
    mutationKey: [QueryKey.REGISTER_CLIENT],
    mutationFn: clientApi.registerClient,
  });

  const sendEmail = useMutation({
    mutationKey: [QueryKey.SEND_EMAIL, "register"],
    mutationFn: emailApi.sendEmail,
  });

  const { setMessage } = useSnackbarContext();

  const processForm = () => {
    const { repeatPassword, ...rest } = signUpModel.parse(getValues());

    const { email: userEmail, username } = rest;

    registerClient.mutate(rest, {
      onSuccess: (res) => {
        setMessage("Registracija sėkminga");
        sendEmail.mutate({
          email: userEmail,
          emailBody: `Sveikiname ${username} sėkmingai atlikus registraciją!`,
          emailSubject: `Sveikiname prisijungus!`,
        });
      },
      onError: (err) => {
        setMessage(err.message);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            {t("SignUpPage.PageTitle")}
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
              <BaseTextField
                formField={SignUpFormField.USERNAME}
                label={t("SignUpPage.Username")}
                type='text'
                className='w-full'
                autoComplete='username'
                errorMessage={errors[SignUpFormField.USERNAME]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.NAME}
                label={t("SignUpPage.FirstName")}
                type='text'
                className='w-full'
                autoComplete='name'
                errorMessage={errors[SignUpFormField.NAME]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.SURNAME}
                label={t("SignUpPage.LastName")}
                type='text'
                className='w-full'
                autoComplete='surname'
                errorMessage={errors[SignUpFormField.SURNAME]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.EMAIL}
                label={t("SignUpPage.Email")}
                type='email'
                className='w-full'
                autoComplete='email'
                errorMessage={errors[SignUpFormField.EMAIL]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.PHONE_NUMBER}
                label={t("SignUpPage.PhoneNumber")}
                type='text'
                className='w-full'
                autoComplete='phoneNumber'
                errorMessage={errors[SignUpFormField.PHONE_NUMBER]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.ADDRESS}
                label={t("SignUpPage.Address")}
                type='text'
                className='w-full'
                autoComplete='address'
                errorMessage={errors[SignUpFormField.ADDRESS]?.message}
              />
              <BaseDatePicker
                formField={SignUpFormField.BIRTHDATE}
                label={t("SignUpPage.Birthdate")}
                maxDate={new Date()}
                className='w-full'
                errorMessage={errors[SignUpFormField.BIRTHDATE]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.PASSWORD}
                label={t("SignUpPage.Password")}
                type='password'
                className='w-full'
                autoComplete='current-password'
                errorMessage={errors[SignUpFormField.PASSWORD]?.message}
              />
              <BaseTextField
                formField={SignUpFormField.REPEAT_PASSWORD}
                label={t("SignUpPage.RepeatPassword")}
                type='password'
                className='w-full'
                errorMessage={errors[SignUpFormField.REPEAT_PASSWORD]?.message}
              />

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  {t("SignUpPage.SignUpButton")}
                </button>
              </div>
            </form>

            <div className='mt-6'>
              <div className='relative'></div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUp;
