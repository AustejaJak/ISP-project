import { z, object, string } from "zod";

export const checkoutModel = object({
  email: string().min(1, "Šis laukas privalomas.").email(),
  address: string().min(1, "Šis laukas privalomas."),
  discount: string().optional(),
});

export const checkoutDefaultValues = {
  email: "",
  address: "",
  discount: "",
};

export enum CheckoutFormField {
  EMAIL = "email",
  ADDRESS = "address",
  DISCOUNT = "discount",
}

export type CheckoutModel = z.infer<typeof checkoutModel>;
