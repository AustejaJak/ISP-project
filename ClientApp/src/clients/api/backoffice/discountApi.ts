import { Employer } from "../../../types/types";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Admins`;

export const discountApi = {
  getDiscountList: async () => {
    const { data } = await axiosInstance.get<Employer[]>(`${BASE_URL}`);
    return data;
  },
  createDiscountCode: async (discountData: any) => {
    const { data } = await axiosInstance.post<any>(
      `${BASE_URL}/AddDiscount`,
      discountData
    );
    return data;
  },
  editDiscountCode: async ({
    discountId,
    discountData,
  }: {
    discountId: number;
    discountData: any;
  }) => {
    const { data } = await axiosInstance.patch<any>(
      `${BASE_URL}/${discountId}`,
      discountData
    );
    return data;
  },
};
