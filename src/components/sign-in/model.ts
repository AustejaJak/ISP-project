import { z, object, string } from "zod";

export const signInModel = object({
  email: string().min(1, "Email is required.").email(),
  password: string().min(1, "Password is required."),
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
