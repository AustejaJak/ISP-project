import { OrderProps } from "../../components/order-history-ui/OrderHistoryUI";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Orders`;

export const ordersApi = {
  createOrder: async ({ orderData }: { orderData: { [key: string]: any } }) => {
    const { data } = await axiosInstance.post(`${BASE_URL}`, orderData);
    return data;
  },
  getOrdersHistory: async ({ userId }: { userId: string }) => {
    const { data } = await axiosInstance.get<{
      data: OrderProps[];
    }>(`${BASE_URL}/${userId}`);
    return data.data;
  },
  getOrderById: async ({
    userId,
    orderId,
  }: {
    userId: string;
    orderId: string;
  }) => {
    const { data } = await axiosInstance.get<{
      data: OrderProps;
    }>(`${BASE_URL}/${userId}/order/${orderId}`);
    return data.data;
  },
};
