import { BasketItem } from "../../types/types";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Baskets`;

export const basketApi = {
  getClientBasket: async () => {
    const { data } = await axiosInstance.get<BasketItem>(`${BASE_URL}`);
    return data;
  },
  addItemToBasket: async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    const { data } = await axiosInstance.post<BasketItem>(
      `${BASE_URL}/AddItem?productId=${productId}&quantity=${quantity}`
    );
    return data;
  },
};
