import { ProductProp } from "../../../pages/client/product/ProductPage";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/backoffice/product`;

export const backofficeProductApi = {
  createProduct: async (product: any) => {
    const { data } = await axiosInstance.post<{
      data: ProductProp;
    }>(`${BASE_URL}`, { product });
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
  approveProduct: async (productId: string) => {
    const { data } = await axiosInstance.get<{
      data: ProductProp;
    }>(`${BASE_URL}/${productId}/approve`);
    return data.data;
  },
  rejectProduct: async (productId: string) => {
    const { data } = await axiosInstance.get<{
      data: ProductProp;
    }>(`${BASE_URL}/${productId}/reject`);
    return data.data;
  },
};
