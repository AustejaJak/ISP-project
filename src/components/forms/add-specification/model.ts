import { z, object, string, array } from "zod";

export const addSpecificationSchema = object({
  name: string(),
  items: array(string()),
});

export enum AddSpecificationFormField {
  NAME = "name",
  ITEMS = "items",
}

export const addSpecificationDefaultValues = {
  [AddSpecificationFormField.NAME]: "",
  [AddSpecificationFormField.ITEMS]: [],
};

export type AddSpecificationModel = z.infer<typeof addSpecificationSchema>;
