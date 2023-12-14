import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/authentication`;

export const clientApi = {
  getClient: async () => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}`);
    return data.data;
  },
  registerClient: async (userInformation: any) => {
    const { data } = await axiosInstance.post<{
      data: any;
    }>(`${BASE_URL}`, { userInformation });
    return data.data;
  },
  authenticateClient: async (userInformation: {
    email: string;
    password: string;
  }) => {
    const { data } = await axiosInstance.post<{
      data: any;
    }>(`${BASE_URL}`, { userInformation });
    return data.data;
  },
};
