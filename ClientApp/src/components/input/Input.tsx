import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";

interface BaseInputProps {
  formField: string;
  label: string;
  control?: Control<any, any>;
  errorMessage?: string;
  [key: string]: any;
}

const BaseInput: React.FC<BaseInputProps> = ({
  formField,
  control,
  label,
  errorMessage,
  ...restProps
}) => {
  const formContext = useFormContext();
  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <div>
          <label
            htmlFor={formField}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <div className='mt-1'>
            <input
              id={label}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              name={formField}
              {...restProps}
              className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            />
          </div>
          {!!errorMessage && (
            <div>
              <p className='text-red-600 text-sm'>{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default BaseInput;
