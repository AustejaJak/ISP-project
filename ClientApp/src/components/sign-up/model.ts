import { t } from "i18next";
import { z, object, string, date } from "zod";

export enum SignUpFormField {
  NAME = "name",
  SURNAME = "surname",
  BIRTHDATE = "birthdate",
  EMAIL = "email",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeat-password",
}

export const signUpModel = object({
  [SignUpFormField.NAME]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.SURNAME]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.BIRTHDATE]: date().transform((val) => val.toUTCString()),
  [SignUpFormField.EMAIL]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .email("Elektroninis paštas neatitinka formato"),
  [SignUpFormField.PASSWORD]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.REPEAT_PASSWORD]: string().min(1, t("Errors.FieldNotEmpty")),
}).refine(
  (data) => {
    if (
      data[SignUpFormField.PASSWORD] === data[SignUpFormField.REPEAT_PASSWORD]
    )
      return true;
    return false;
  },
  {
    path: [SignUpFormField.REPEAT_PASSWORD],
    message: "Slaptažodžiai nesutampa",
  }
);

export const signUpDefaultValues = {
  [SignUpFormField.NAME]: "",
  [SignUpFormField.SURNAME]: "",
  [SignUpFormField.BIRTHDATE]: null as Date | null,
  [SignUpFormField.EMAIL]: "",
  [SignUpFormField.PASSWORD]: "",
  [SignUpFormField.REPEAT_PASSWORD]: "",
};

export type SignUpModel = z.infer<typeof signUpModel>;
