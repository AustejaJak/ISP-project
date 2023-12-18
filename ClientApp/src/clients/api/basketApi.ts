import { OrderProps } from "../../components/order-history-ui/OrderHistoryUI";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Baskets`;

export const basketApi = {
  getClientBasket: async () => {
    const { data } = await axiosInstance.get<OrderProps[]>(`${BASE_URL}`);
    return data;
  },
};
