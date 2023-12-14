import { z, object, string } from "zod";

export const changeEmailModel = object({
  currentEmail: string()
    .min(1, "Laukas privalomas.")
    .email("Netinkamas formatas."),
  newEmail: string().min(1, "Laukas privalomas.").email("Netinkamas formatas."),
});

export const changeEmailDefaultValues = {
  currentEmail: "",
  newEmail: "",
};

export enum ChangeEmailFormField {
  CURRENT_EMAIL = "currentEmail",
  NEW_EMAIL = "newEmail",
}

export type ChangeEmailModel = z.infer<typeof changeEmailModel>;
