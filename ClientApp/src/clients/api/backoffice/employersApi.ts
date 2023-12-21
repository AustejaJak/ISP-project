import { Employer } from "../../../types/types";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Employees`;

export const employersApi = {
  getCompanyEmployers: async ({ shopId }: { shopId: number }) => {
    const { data } = await axiosInstance.get(
      `${BASE_URL}/GetShopEmployees?shopId=${shopId}`
    );
    return data;
  },
  getCompanyEmployerById: async ({ employerId }: { employerId: string }) => {
    const { data } = await axiosInstance.get<{
      data: Employer;
    }>(`${BASE_URL}/${employerId}`);
    return data.data;
  },
};
