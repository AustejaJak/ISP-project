import { useForm, FormProvider } from "react-hook-form";
import { SignUpFormField, signUpDefaultValues, signUpModel } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "../input/Input";

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

  const processForm = () => {
    const data = signUpModel.parse(getValues());
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign up
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(processForm)}>
              <BaseInput
                formField={SignUpFormField.NAME}
                label='First Name'
                type='text'
                autoComplete='name'
                errorMessage={errors[SignUpFormField.NAME]?.message}
              />
              <BaseInput
                formField={SignUpFormField.SURNAME}
                label='Last Name'
                type='text'
                autoComplete='surname'
                errorMessage={errors[SignUpFormField.SURNAME]?.message}
              />
              <BaseInput
                formField={SignUpFormField.EMAIL}
                label='Email Address'
                type='email'
                autoComplete='email'
                errorMessage={errors[SignUpFormField.EMAIL]?.message}
              />
              <BaseInput
                formField={SignUpFormField.PASSWORD}
                label='Password'
                type='password'
                autoComplete='current-password'
                errorMessage={errors[SignUpFormField.PASSWORD]?.message}
              />
              <BaseInput
                formField={SignUpFormField.REPEAT_PASSWORD}
                label='Repeat Password'
                type='password'
                errorMessage={errors[SignUpFormField.REPEAT_PASSWORD]?.message}
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
