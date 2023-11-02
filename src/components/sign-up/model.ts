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
  [SignUpFormField.NAME]: string().min(1, "Name is required."),
  [SignUpFormField.SURNAME]: string().min(1, "Surname is required."),
  [SignUpFormField.BIRTHDATE]: date(),
  [SignUpFormField.EMAIL]: string().min(1, "Email is required.").email(),
  [SignUpFormField.PASSWORD]: string().min(1, "Password is required."),
  [SignUpFormField.REPEAT_PASSWORD]: string().min(1, "Password is required."),
}).refine(
  (data) => {
    console.log("labas");
    if (
      data[SignUpFormField.PASSWORD] === data[SignUpFormField.REPEAT_PASSWORD]
    )
      return true;
    return false;
  },
  {
    path: [SignUpFormField.REPEAT_PASSWORD],
    message: "Passwords should match.",
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
