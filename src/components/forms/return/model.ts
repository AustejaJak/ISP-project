import { z, object, string, number, array } from "zod";
import { t } from "i18next";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export enum CreateProductFields {
  TITLE = "title",
  DESCRIPTION = "description",
  PRICE = "price",
  VENDOR = "vendor",
  IMAGES = "images",
  COLORS = "colors",
  DETAILS = "details",
}

const imagesSchema = z.object({
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      t("Error.ProductDetails.SizeOverLimit")
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      t("Error.ProductImages.SupportedImageTypes")
    ),
});

const detailsSchema = z.object({
  name: string(),
  items: array(string()),
});

export const createProductModel = object({
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
  [CreateProductFields.IMAGES]: array(imagesSchema),
  [CreateProductFields.COLORS]: array(string()),
  [CreateProductFields.DETAILS]: array(detailsSchema),
});

export const createProductDefaultValues = {
  [CreateProductFields.TITLE]: "",
  [CreateProductFields.DESCRIPTION]: "",
  [CreateProductFields.PRICE]: 0,
  [CreateProductFields.VENDOR]: "",
  [CreateProductFields.IMAGES]: [],
  [CreateProductFields.COLORS]: [],
  [CreateProductFields.DETAILS]: [],
};

export type SignUpModel = z.infer<typeof createProductModel>;
