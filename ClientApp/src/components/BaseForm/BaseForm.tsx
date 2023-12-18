import React from "react";

interface BaseFormProps {
  left: () => React.ReactNode;
  right: () => React.ReactNode;
}

export const BaseForm: React.FC<BaseFormProps> = ({ left, right }) => {
  return (
    <div className='flex gap-5 justify-center w-full'>
      <div>{left()}</div>
      <div>{right()}</div>
    </div>
  );
};
