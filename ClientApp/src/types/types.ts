import { statusEnum } from "../enums/enums";
import { ProductProp } from "../pages/client/product/ProductPage";

export type Employer = {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  role: string;
  jobPosition: string;
  gender: number;
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

export type DiscountCode = {
  id: number;
  code: string;
  discountAmount: number;
  discountEnd: string;
  discountStart: string;
  minimalAmount: string;
};

export type Category = {
  id: number;
  type: string;
};

export type BasketItem = {
  id: number;
  clientId: string;
  paymentIntentId: string;
  clientSecret: string;
  totalSum: number;
  items: BasketProduct[];
};

export type BasketProduct = Omit<ProductProp, "sku"> & {
  productSKU: string;
  quantity: number;
};
