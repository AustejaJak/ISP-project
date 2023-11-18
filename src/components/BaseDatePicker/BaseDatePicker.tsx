import { DesktopDatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateView } from "@mui/x-date-pickers";
import { BaseComponentProps } from "../../types/baseComponent";

type BaseDateTimeProps = BaseComponentProps & {
  views?: DateView[];
  format?: string;
  minDate?: Date;
  maxDate?: Date;
};

export const BaseDatePicker: React.FC<BaseDateTimeProps> = ({
  formField,
  label,
  control,
  format,
  errorMessage,
  minDate,
  maxDate,
  className,
  disabled = false,
  views = ["year", "month", "day"],
}) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <DesktopDatePicker
          {...field}
          views={views}
          className={className}
          format={format}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              size: "small",
              error: !!errorMessage,
              helperText: errorMessage,
            },
          }}
          label={label}
        />
      )}
    />
  );
};
