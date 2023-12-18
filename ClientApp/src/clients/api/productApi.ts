import { ProductProp } from "../../pages/client/product/ProductPage";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Products`;

export const productApi = {
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
  editProduct: async (product: any) => {
    const { data } = await axiosInstance.put<{
      data: ProductProp;
    }>(`${BASE_URL}`, { product });
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
    const { data } = await axiosInstance.get<{
      data: ProductProp[];
    }>(`${BASE_URL}/active`);
    return data.data;
  },
  getCompanyPendingProducts: async () => {
    const { data } = await axiosInstance.get<ProductProp[]>(
      `${BASE_URL}/GetUnvalidated`
    );
    return data;
  },
};
