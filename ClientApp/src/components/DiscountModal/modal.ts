import { z, object, string, date } from "zod";
import { t } from "i18next";

export enum CreateDiscountFields {
  CODE = "code",
  DISCOUNT = "discount",
  END_DATE = "endDate",
  START_DATE = "startDate",
  MIN_SUM = "minSum",
}

export const createDiscountModel = object({
  [CreateDiscountFields.CODE]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateDiscountFields.DISCOUNT]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
  [CreateDiscountFields.END_DATE]: date().transform((val) =>
    new Date(val).toISOString()
  ),
  [CreateDiscountFields.START_DATE]: date().transform((val) =>
    new Date(val).toISOString()
  ),
  [CreateDiscountFields.MIN_SUM]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
});

export const createDiscountDefaultValues = {
  [CreateDiscountFields.CODE]: "",
  [CreateDiscountFields.DISCOUNT]: 0,
  [CreateDiscountFields.END_DATE]: null as Date | null,
  [CreateDiscountFields.START_DATE]: null as Date | null,
  [CreateDiscountFields.MIN_SUM]: 0,
};

export type SignUpModel = z.infer<typeof createDiscountModel>;
