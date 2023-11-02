import { z, object, string } from "zod";

export const profileInformationModel = object({
  name: string(),
  surname: string(),
  email: string().email(),
});

export const profileInformationDefaultValues = {
  name: "",
  surname: "",
  email: "",
};

export enum ProfileInformationFormField {
  NAME = "name",
  SURNAME = "surname",
  EMAIL = "email",
}

export type SignInModel = z.infer<typeof profileInformationModel>;
