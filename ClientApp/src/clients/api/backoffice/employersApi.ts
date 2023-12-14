import { Employer } from "../../../types/types";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/backoffice/employers`;

export const employersApi = {
  getCompanyEmployers: async () => {
    const { data } = await axiosInstance.get<{
      data: Employer[];
    }>(`${BASE_URL}`);
    return data.data;
  },
  getCompanyEmployerById: async ({ employerId }: { employerId: string }) => {
    const { data } = await axiosInstance.get<{
      data: Employer;
    }>(`${BASE_URL}/${employerId}`);
    return data.data;
  },
};
