import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Users`;

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
    }>(`${BASE_URL}/ClientRegister`, userInformation);
    return data.data;
  },
  authenticateClient: async (userInformation: {
    username: string;
    password: string;
  }) => {
    const { data } = await axiosInstance.post<{
      data: any;
    }>(`${BASE_URL}/login`, userInformation);
    return data.data;
  },
};
