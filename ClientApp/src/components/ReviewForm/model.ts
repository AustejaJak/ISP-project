import { z, object, string } from "zod";
import { t } from "i18next";

export enum CreateReviewFields {
  RATING = "rating",
  COMMENT = "comment",
  PICTURE_URL = "pictureUrl",
}

export const createReviewModel = object({
  [CreateReviewFields.RATING]: string()
    .min(1, t("Errors.FieldNotEmpty"))
    .transform((val) => Number(val)),
  [CreateReviewFields.COMMENT]: string().min(1, t("Errors.FieldNotEmpty")),
  [CreateReviewFields.PICTURE_URL]: string().min(1, t("Errors.FieldNotEmpty")),
});

export const createReviewDefaultValues = {
  [CreateReviewFields.RATING]: "",
  [CreateReviewFields.COMMENT]: "",
  [CreateReviewFields.PICTURE_URL]: "",
};

export type ReviewModel = z.infer<typeof createReviewModel>;
