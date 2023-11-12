import { ProductProp } from "../../pages/client/product/ProductPage";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/product`;

export const productApi = {
  findProductById: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.get<{
      data: ProductProp;
    }>(`${BASE_URL}/${productId}`);
    return data.data;
  },
};
