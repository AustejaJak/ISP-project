import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Clients`;

export const clientsApi = {
  getClientPaymentDetails: async ({ userId }: { userId: string }) => {
    const { data } = await axiosInstance.get(
      `${BASE_URL}/paymentDetails?userId=${userId}`
    );
    return data;
  },
  removeClientPaymentDetails: async ({
    userId,
    paymentId,
  }: {
    userId: string;
    paymentId: number;
  }) => {
    const { data } = await axiosInstance.delete(
      `${BASE_URL}/removePaymentDetails?userId=${userId}&paymentDetailsId=${paymentId}`
    );
    return data;
  },
  addClientPaymentDetails: async ({
    userId,
    paymentDetails,
  }: {
    userId: string;
    paymentDetails: any;
  }) => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/addPaymentDetails?userId=${userId}`,
      paymentDetails
    );
    return data;
  },
};
