import { t } from "i18next";
import { z, object, string } from "zod";

export const signInModel = object({
  username: string().min(1, t("Errors.FieldNotEmpty")),
  password: string().min(1, t("Errors.FieldNotEmpty")),
});

export const signInDefaultValues = {
  username: "",
  password: "",
};

export enum SignInFormField {
  USERNAME = "username",
  PASSWORD = "password",
}

export type SignInModel = z.infer<typeof signInModel>;
