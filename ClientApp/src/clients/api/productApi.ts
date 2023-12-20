import { ProductProp } from "../../pages/client/product/ProductPage";
import { generateQueryString } from "../../utils/queryGenerator";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Products`;

export const productApi = {
  getProducts: async ({ query }: { query?: { [key: string]: unknown } }) => {
    const { data } = await axiosInstance.get<ProductProp[]>(
      `${BASE_URL}${query && generateQueryString(query)}`
    );
    return data;
  },
  findProductById: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.get<ProductProp>(
      `${BASE_URL}/${productId}`
    );
    return data;
  },
  createProduct: async (product: any) => {
    const { data } = await axiosInstance.post<{
      data: ProductProp;
    }>(`${BASE_URL}`, product);
    return data.data;
  },
  editProduct: async ({
    productId,
    product,
  }: {
    productId: string;
    product: ProductProp;
  }) => {
    const { data } = await axiosInstance.patch<{
      data: ProductProp;
    }>(`${BASE_URL}/${productId}`, product);
    return data.data;
  },
  deleteProduct: async (productId: string) => {
    const { data } = await axiosInstance.put<{
      data: ProductProp;
    }>(`${BASE_URL}/${productId}`);
    return data.data;
  },
  getColorEnums: async () => {
    const { data } = await axiosInstance.get<{
      data: { id: string; name: string }[];
    }>(`${BASE_URL}/colors`);
    return data.data;
  },
  getCompanyActiveProducts: async () => {
    const { data } = await axiosInstance.get<ProductProp[]>(
      `${BASE_URL}/GetValidated`
    );
    return data;
  },
  getCompanyPendingProducts: async () => {
    const { data } = await axiosInstance.get<ProductProp[]>(
      `${BASE_URL}/GetUnvalidated`
    );
    return data;
  },
};
