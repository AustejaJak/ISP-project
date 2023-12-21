import { t } from "i18next";
import { z, object, string } from "zod";

export enum SignUpFormField {
  USERNAME = "username",
  NAME = "name",
  SURNAME = "surname",
  ADDRESS = "address",
  PHONE_NUMBER = "phoneNumber",
  EMAIL = "email",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
  GENDER = "gender",
  JOB_POSITION = "jobPosition",
}

export const signUpModel = object({
  [SignUpFormField.USERNAME]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.PHONE_NUMBER]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.NAME]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.GENDER]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.JOB_POSITION]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.SURNAME]: string().min(1, t("Errors.FieldNotEmpty")),
  [SignUpFormField.ADDRESS]: string().min(1, t("Errors.FieldNotEmpty")),
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
  [SignUpFormField.USERNAME]: "",
  [SignUpFormField.ADDRESS]: "",
  [SignUpFormField.NAME]: "",
  [SignUpFormField.PHONE_NUMBER]: "",
  [SignUpFormField.SURNAME]: "",
  [SignUpFormField.GENDER]: "",
  [SignUpFormField.JOB_POSITION]: "",
  [SignUpFormField.EMAIL]: "",
  [SignUpFormField.PASSWORD]: "",
  [SignUpFormField.REPEAT_PASSWORD]: "",
};

export type SignUpModel = z.infer<typeof signUpModel>;
