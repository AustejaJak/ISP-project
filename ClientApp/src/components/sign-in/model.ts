import { t } from "i18next";
import { z, object, string } from "zod";

export const signInModel = object({
  email: string().min(1, t("Errors.FieldNotEmpty")).email(),
  password: string().min(1, t("Errors.FieldNotEmpty")),
});

export const signInDefaultValues = {
  email: "",
  password: "",
};

export enum SignInFormField {
  EMAIL = "email",
  PASSWORD = "password",
}

export type SignInModel = z.infer<typeof signInModel>;
