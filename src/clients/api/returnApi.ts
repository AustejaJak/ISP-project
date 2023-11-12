import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/return`;

export const returnApi = {
  makeOrderReturn: async ({
    orderId,
    items,
  }: {
    orderId: string;
    items: number[];
  }) => {
    const { data } = await axiosInstance.post<{
      data: any;
    }>(`${BASE_URL}/${orderId}`, { items });
    return data.data;
  },
};
