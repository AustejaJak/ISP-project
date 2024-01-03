import { OrderProps } from "../../components/order-history-ui/OrderHistoryUI";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Orders`;

export const ordersApi = {
  createOrder: async ({ orderData }: { orderData: { [key: string]: any } }) => {
    const { data } = await axiosInstance.post(`${BASE_URL}`, orderData);
    return data;
  },
  getOrdersHistory: async () => {
    const { data } = await axiosInstance.get<OrderProps[]>(`${BASE_URL}`);
    return data;
  },
  changeOrderInformation: async ({
    orderId,
    orderData,
  }: {
    orderId: number;
    orderData: any;
  }) => {
    const { data } = await axiosInstance.patch(
      `${BASE_URL}/orderId?orderId=${orderId}`,
      orderData
    );
    return data;
  },
  getOrderById: async ({ orderId }: { orderId: number }) => {
    const { data } = await axiosInstance.get<{
      data: OrderProps;
    }>(`${BASE_URL}/${orderId}`);
    return data.data;
  },
};
