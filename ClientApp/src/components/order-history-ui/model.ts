import { z, object, string } from "zod";
import { t } from "i18next";

export enum ChangeOrderInformationFields {
  ADDRESS = "deliveryAddress",
  ATTACHED_DOCUMENTS = "attachedDocuments",
}

export const changeOrderInformationModel = object({
  [ChangeOrderInformationFields.ADDRESS]: string().min(
    1,
    t("Errors.FieldNotEmpty")
  ),
  [ChangeOrderInformationFields.ATTACHED_DOCUMENTS]: string().min(
    1,
    t("Errors.FieldNotEmpty")
  ),
});

export const changeOrderInformationDefaultValues = {
  [ChangeOrderInformationFields.ADDRESS]: "",
  [ChangeOrderInformationFields.ATTACHED_DOCUMENTS]: "",
};

export type ChangeInformationModel = z.infer<
  typeof changeOrderInformationModel
>;
