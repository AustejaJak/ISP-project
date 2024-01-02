import { z, object, string, number } from "zod";
import { t } from "i18next";

export enum CreateProductFields {
  SKU = "sku",
  PICTURE_URL = "pictureUrl",
  QUANTITY_IN_STORAGE = "quantityInStorage",
  TYPE = "type",
  COUNTRY_OF_ORIGIN = "countryOfOrigin",
  MEASUREMENTS = "measurements",
  QUANTITY_IN_PACKAGE = "quantityInPackage",
  TITLE = "name",
  DESCRIPTION = "description",
  PRICE = "cost",
  VENDOR = "vendor",
}

export const createProductModel = object({
  [CreateProductFields.SKU]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.PICTURE_URL]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateProductFields.QUANTITY_IN_STORAGE]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
  [CreateProductFields.TYPE]: string().min(1, t("Errors.FieldNotEmpty")),
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
  [CreateProductFields.PRICE]: number(),
  [CreateProductFields.VENDOR]: string().min(
    1,
    t("Error.ProductVendorRequired")
  ),
});

export const createProductDefaultValues = {
  [CreateProductFields.SKU]: "",
  [CreateProductFields.PICTURE_URL]: "",
  [CreateProductFields.QUANTITY_IN_STORAGE]: 0,
  [CreateProductFields.TYPE]: "",
  [CreateProductFields.COUNTRY_OF_ORIGIN]: "",
  [CreateProductFields.MEASUREMENTS]: "",
  [CreateProductFields.QUANTITY_IN_PACKAGE]: 0,
  [CreateProductFields.TITLE]: "",
  [CreateProductFields.DESCRIPTION]: "",
  [CreateProductFields.PRICE]: 0,
  [CreateProductFields.VENDOR]: "",
};

export type SignUpModel = z.infer<typeof createProductModel>;
