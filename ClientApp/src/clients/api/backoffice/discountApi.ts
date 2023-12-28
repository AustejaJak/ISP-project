import { DiscountCode } from "../../../types/types";
import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Admins`;

export const discountApi = {
  getDiscountList: async () => {
    const { data } = await axiosInstance.get<DiscountCode[]>(
      `${BASE_URL}/getDiscounts`
    );
    return data;
  },
  createDiscountCode: async (discountData: DiscountCode) => {
    const { data } = await axiosInstance.post<any>(
      `${BASE_URL}/AddDiscount`,
      discountData
    );
    return data;
  },
  getDiscountById: async (id: number) => {
    const { data } = await axiosInstance.get<DiscountCode>(`${BASE_URL}/${id}`);
    return data;
  },
  editDiscountCode: async ({
    discountId,
    discountData,
  }: {
    discountId: string;
    discountData: DiscountCode;
  }) => {
    console.log(discountId);
    const { data } = await axiosInstance.patch(
      `${BASE_URL}/${discountId}`,
      discountData
    );
    return data;
  },
};
