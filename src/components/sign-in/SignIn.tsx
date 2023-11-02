import { useForm, FormProvider } from "react-hook-form";
import { SignInFormField, signInDefaultValues, signInModel } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../input/Input";

const SignIn = () => {
  const methods = useForm({
    resolver: zodResolver(signInModel),
    defaultValues: signInDefaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const processForm = () => {
    const data = signInModel.parse(getValues());
  };

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
              <BaseInput
                formField={SignInFormField.EMAIL}
                label='Email address'
                type='email'
                autoComplete='email'
                errorMessage={errors[SignInFormField.EMAIL]?.message}
              />

              <BaseInput
                formField={SignInFormField.PASSWORD}
                label='Password'
                type='password'
                autoComplete='current-password'
                errorMessage={errors[SignInFormField.PASSWORD]?.message}
              />

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Sign in
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
