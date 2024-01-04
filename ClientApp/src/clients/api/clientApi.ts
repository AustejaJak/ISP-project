import { User } from "../../types/types";
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
  getAllClients: async () => {
    const { data } = await axiosInstance.get<User[]>(`${BASE_URL}/getUsers`);
    return data;
  },
  registerEmployee: async (userInformation: any) => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/EmployeeRegister`,
      userInformation
    );
    return data;
  },
  authenticateClient: async (userInformation: {
    username: string;
    password: string;
  }) => {
    const { data } = await axiosInstance.post<any>(
      `${BASE_URL}/login`,
      userInformation
    );
    return data;
  },
};
