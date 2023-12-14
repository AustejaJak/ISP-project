import { statusEnum } from "../enums/enums";

export type Employer = {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  role: string;
  position: string;
  email: string;
  phoneNumber: string;
};

export type statusEnumKey = keyof typeof statusEnum;

export type InventoryProduct = {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  status: statusEnumKey;
  quantity: string;
  price: string;
};
