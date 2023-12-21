import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Payments`;

export const paymentsApi = {
  getPaymentIntent: async () => {
    const { data } = await axiosInstance.post(`${BASE_URL}`);
    return data;
  },
};
