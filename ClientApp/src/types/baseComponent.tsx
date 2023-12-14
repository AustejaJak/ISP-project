import { Control } from "react-hook-form";

export type BaseComponentProps = {
  formField: string;
  label: string;
  control?: Control<any, any>;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};
