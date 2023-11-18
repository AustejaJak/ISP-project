import {
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import { BaseComponentProps } from "../../types/baseComponent";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface BaseSelectProps extends BaseComponentProps {
  items: Identifiable[] | undefined | null;
  bottomSpacer?: boolean;
  onAfterChange?: (value: any) => void;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      paddingLeft: 4,
    },
  },
};

interface Identifiable {
  id: string;
  name: string;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  control,
  formField,
  label,
  items,
  errorMessage,
  className = "",
  onAfterChange,
  required,
  bottomSpacer = true,
  disabled = false,
}) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={formField}
      control={formContext?.control ?? control}
      render={({ field }) => (
        <FormControl size='small' className='flex'>
          <InputLabel id='gemma-center-label'>{label}</InputLabel>
          <Select
            {...field}
            className={`${
              bottomSpacer && !errorMessage ? "mb-4" : ""
            } ${className}`}
            size='small'
            MenuProps={MenuProps}
            onChange={(e) => {
              const { value } = e.target as HTMLSelectElement;
              field.onChange(value);
              onAfterChange?.(value);
            }}
            error={!!errorMessage}
            input={<OutlinedInput label={label} />}
            disabled={disabled}
          >
            {items?.map(({ name, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && (
            <FormHelperText className='mb-4' error={true}>
              {errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
