import { z, object, string } from "zod";
import { t } from "i18next";

export enum CreateProductFields {
  SKU = "sku",
  PICTURE_URL = "pictureUrl",
  TYPE = "type",
  COUNTRY_OF_ORIGIN = "countryOfOrigin",
  MEASUREMENTS = "measurements",
  QUANTITY_IN_PACKAGE = "quantityInPackage",
  TITLE = "name",
  DESCRIPTION = "description",
  PRICE = "cost",
  WEIGHT = "weight",
  BRAND = "brand",
}

export const createProductModel = object({
  [CreateProductFields.SKU]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.BRAND]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.PICTURE_URL]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.TYPE]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.WEIGHT]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
  [CreateProductFields.COUNTRY_OF_ORIGIN]: string().min(
    1,
    t("Errors.FieldNotEmpty")
  ),
  [CreateProductFields.MEASUREMENTS]: string().min(
    1,
    t("Errors.FieldNotEmpty")
  ),
  [CreateProductFields.QUANTITY_IN_PACKAGE]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
  [CreateProductFields.TITLE]: string().min(1, t("Error.ProductNameRequired")),
  [CreateProductFields.DESCRIPTION]: string().min(
    1,
    t("Error.ProductDescriptionRequired")
  ),
  [CreateProductFields.PRICE]: string().transform((val) => Number(val)),
});

export const createProductDefaultValues = {
  [CreateProductFields.SKU]: "",
  [CreateProductFields.BRAND]: "",
  [CreateProductFields.PICTURE_URL]: "",
  [CreateProductFields.TYPE]: "",
  [CreateProductFields.WEIGHT]: 0,
  [CreateProductFields.COUNTRY_OF_ORIGIN]: "",
  [CreateProductFields.MEASUREMENTS]: "",
  [CreateProductFields.QUANTITY_IN_PACKAGE]: 0,
  [CreateProductFields.TITLE]: "",
  [CreateProductFields.DESCRIPTION]: "",
  [CreateProductFields.PRICE]: 0,
};

export type SignUpModel = z.infer<typeof createProductModel>;
