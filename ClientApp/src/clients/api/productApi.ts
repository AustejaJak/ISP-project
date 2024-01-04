import { ProductProp } from "../../pages/client/product/ProductPage";
import { generateQueryString } from "../../utils/queryGenerator";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Products`;

export const productApi = {
  getProducts: async ({
    query,
    additionalQuery,
  }: {
    query?: { [key: string]: unknown };
    additionalQuery?: string;
  }) => {
    const { data } = await axiosInstance.get<ProductProp[]>(
      `${BASE_URL}${query && generateQueryString(query)}${
        additionalQuery || ""
      }`
    );
    return data;
  },
  findProductById: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.get<ProductProp>(
      `${BASE_URL}/${productId}`
    );
    return data;
  },
  getProductBrands: async () => {
    const { data } = await axiosInstance.get<{
      Watches: string[];
      Clotches: string[];
      Decorations: string[];
      Electronics: string[];
      Books: string[];
    }>(`${BASE_URL}/filters`);
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
