import { z, object, string } from "zod";

export const changePaymentDetailsModel = object({
  cardNumber: string().min(1, "Laukas privalomas."),
  billingCity: string().min(1, "Laukas privalomas."),
  billingStreet: string().min(1, "Laukas privalomas."),
});

export const changePaymentDetailsDefaultValues = {
  cardNumber: "",
  billingCity: "",
  billingStreet: "",
};

export enum ChangePaymentDetailsFormField {
  CARD_NUMBER = "cardNumber",
  BILLING_CITY = "billingCity",
  BILLING_STREET = "billingStreet",
}

export type ChangePaymentDetailsModel = z.infer<
  typeof changePaymentDetailsModel
>;
