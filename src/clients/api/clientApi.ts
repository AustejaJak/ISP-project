import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/authentication`;

export const clientApi = {
  getClient: async () => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}`);
    return data.data;
  },
};
