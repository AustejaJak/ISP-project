import { OrderProps } from "../../components/order-history-ui/OrderHistoryUI";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/orders`;

export const ordersApi = {
  getOrdersHistory: async ({ userId }: { userId: string }) => {
    const { data } = await axiosInstance.get<{
      data: OrderProps[];
    }>(`${BASE_URL}/${userId}`);
    return data.data;
  },
};
