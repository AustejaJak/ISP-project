import { ProductProp } from "../../../pages/client/product/ProductPage";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Products`;

export const inventoryApi = {
  getCompanyInventory: async () => {
    const { data } = await axiosInstance.get<ProductProp[]>(`${BASE_URL}`);
    return data;
  },
  approveProduct: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.post<ProductProp>(
      `${BASE_URL}/${productId}`
    );
    return data;
  },
};
