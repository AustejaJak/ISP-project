import { useForm, FormProvider } from "react-hook-form";
import { SignInFormField, signInDefaultValues, signInModel } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseTextField } from "../BaseTextField/BaseTextField";
import { t } from "i18next";
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "../../clients/api/clientApi";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { useNavigate } from "react-router-dom";
import { useSnackbarContext } from "../../context/snackbarContext";

const SignIn = () => {
  const methods = useForm({
    resolver: zodResolver(signInModel),
    defaultValues: signInDefaultValues,
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const { setMessage } = useSnackbarContext();

  const authenticateClient = useMutation({
    mutationKey: [QueryKey.LOGIN_CLIENT],
    mutationFn: clientApi.authenticateClient,
  });

  const processForm = () => {
    const data = signInModel.parse(getValues());

    authenticateClient.mutate(data, {
      onSuccess: (res) => {
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
        setMessage(err.message);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            {t("SignInPage.PageTitle")}
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
              <BaseTextField
                formField={SignInFormField.USERNAME}
                label={t("SignInPage.Username")}
                type='test'
                className='w-full'
                autoComplete='username'
                errorMessage={errors[SignInFormField.USERNAME]?.message}
              />

              <BaseTextField
                formField={SignInFormField.PASSWORD}
                label={t("SignInPage.Password")}
                type='password'
                className='w-full'
                autoComplete='current-password'
                errorMessage={errors[SignInFormField.PASSWORD]?.message}
              />

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  {t("SignInPage.SignInButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignIn;
