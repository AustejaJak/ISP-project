import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/backoffice`;

export const ordersApi = {
  getCompanyOrders: async () => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}/orders`);
    return data.data;
  },
  getCompanyOrdersStatistics: async () => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}/statistics`);
    return data.data;
  },
};
