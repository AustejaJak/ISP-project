import { z, object, string } from "zod";

export const profileInformationModel = object({
  name: string(),
  surname: string(),
  email: string().email(),
  password: string(),
});

export const profileInformationDefaultValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

export enum ProfileInformationFormField {
  NAME = "name",
  SURNAME = "surname",
  EMAIL = "email",
  PASSWORD = "password",
}

export type SignInModel = z.infer<typeof profileInformationModel>;
