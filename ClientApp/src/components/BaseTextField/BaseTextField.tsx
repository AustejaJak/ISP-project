import { InputBaseComponentProps, TextField, Tooltip } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import { HTMLInputTypeAttribute } from "react";
import { BaseComponentProps } from "../../types/baseComponent";

interface BaseTextFieldProps extends BaseComponentProps {
  inputProps?: InputBaseComponentProps;
  endIcon?: {
    icon: React.ReactNode;
    tooltip?: string;
  };
  multiline?: boolean;
  autoComplete?: string;
  minRows?: number;
  transformToUppercase?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const BaseTextField: React.FC<BaseTextFieldProps> = ({
  formField,
  control,
  label,
  inputProps,
  errorMessage,
  disabled,
  endIcon,
  required,
  multiline = false,
  className = "",
  autoComplete = "off",
  minRows = 3,
  transformToUppercase = false,
  type = "text",
}) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          onChange={(e) => {
            const { value } = e.target;
            const updatedValue = transformToUppercase
              ? value.toUpperCase()
              : value;
            field.onChange(updatedValue);
          }}
          disabled={disabled}
          className={`mb-4 ${className}`}
          size='small'
          label={label}
          inputProps={inputProps}
          error={!!errorMessage}
          helperText={errorMessage}
          multiline={multiline}
          minRows={minRows}
          autoComplete={autoComplete}
          InputProps={{
            endAdornment: endIcon ? (
              <Tooltip title={endIcon.tooltip}>
                <InputAdornment position='end'>{endIcon.icon}</InputAdornment>
              </Tooltip>
            ) : null,
          }}
        />
      )}
    />
  );
};
