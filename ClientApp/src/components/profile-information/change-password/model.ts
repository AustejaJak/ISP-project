import { z, object, string } from "zod";

export const changePasswordModel = object({
  oldPassword: string().min(1, "Laukas privalomas."),
  newPassword: string().min(1, "Laukas privalomas."),
});

export const changePasswordDefaultValues = {
  oldPassword: "",
  newPassword: "",
};

export enum ChangePasswordFormField {
  OLD_PASSWORD = "oldPassword",
  NEW_PASSWORD = "newPassword",
}

export type ChangeEmailModel = z.infer<typeof changePasswordModel>;
