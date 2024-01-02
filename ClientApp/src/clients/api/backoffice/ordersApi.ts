import { OrderProductProps } from "../../../components/order-history-ui/OrderHistoryUI";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Orders`;

export type OrdersSummariesProps = {
  id: number;
  averageSum: number;
  generationDate: number;
  orders: {
    orderId: number;
    orderDate: string;
    orderCost: number;
    status: number;
    attachedDocuments: string;
    deliveryAddress: string;
    clientName: string;
    clientSurname: string;
    clientEmail: string;
    clientPhoneNumber: string;
    orderItems: OrderProductProps[];
    shopName: string;
    discountName: string;
  }[];
};

export const ordersApi = {
  getCompanyOrders: async () => {
    const { data } = await axiosInstance.get<OrdersSummariesProps[]>(
      `${BASE_URL}`
    );
    return data;
  },
  getCompanyOrdersStatistics: async () => {
    const { data } = await axiosInstance.get<OrdersSummariesProps[]>(
      `${BASE_URL}/orderSummaries`
    );
    return data;
  },
  generateCompanyOrdersStatistics: async (id: number) => {
    const { data } = await axiosInstance.post(`${BASE_URL}/orderSummary`);
    return data;
  },
};
