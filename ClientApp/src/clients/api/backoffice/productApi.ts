import { ProductProp } from "../../../pages/client/product/ProductPage";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Products`;

export const backofficeProductApi = {
  createProduct: async (product: any) => {
    const { data } = await axiosInstance.post<ProductProp>(
      `${BASE_URL}`,
      product
    );
    return data;
  },
  editProduct: async ({
    productId,
    product,
  }: {
    productId: string;
    product: ProductProp;
  }) => {
    const { data } = await axiosInstance.patch<ProductProp>(
      `${BASE_URL}/${productId}`,
      product
    );
    return data;
  },
  deleteProduct: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.put<ProductProp>(
      `${BASE_URL}/${productId}`
    );
    return data;
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
