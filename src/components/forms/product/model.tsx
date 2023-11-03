import { z, object, string, number, array } from "zod";
import { t } from "i18next";
import { addSpecificationSchema } from "../add-specification/model";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export enum ProductFields {
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

export const productModel = object({
  [ProductFields.TITLE]: string(),
  [ProductFields.DESCRIPTION]: string(),
  [ProductFields.PRICE]: number(),
  [ProductFields.VENDOR]: string().min(1, t("Error.ProductVendorRequired")),
  [ProductFields.IMAGES]: array(imagesSchema),
  [ProductFields.COLORS]: array(string()),
  [ProductFields.DETAILS]: array(addSpecificationSchema),
}).refine(
  (data) => {
    if (data.description.length > 0) return true;
    return false;
  },
  {
    path: [ProductFields.DESCRIPTION],
    message: t("Error.ProductDescriptionRequired"),
  }
);

export const productDefaultValues = {
  [ProductFields.TITLE]: "",
  [ProductFields.DESCRIPTION]: "",
  [ProductFields.PRICE]: 0,
  [ProductFields.VENDOR]: "",
  [ProductFields.IMAGES]: [],
  [ProductFields.COLORS]: [],
  [ProductFields.DETAILS]: [],
};

export type ProductModel = z.infer<typeof productModel>;
