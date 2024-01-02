import { WishList } from "../../types/types";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Wishlishts`;

export const wishlistApi = {
  getWishlistProducts: async ({ userId }: { userId: string }) => {
    const { data } = await axiosInstance.get<WishList>(
      `${BASE_URL}?userId=${userId}`
    );
    return data;
  },
  addToWishlist: async ({
    productId,
    userId,
  }: {
    productId: string;
    userId: string;
  }) => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}?userId=${userId}&productId=${productId}`
    );
    return data;
  },
  removeFromWishlist: async ({
    productId,
    userId,
  }: {
    productId: string;
    userId: string;
  }) => {
    const { data } = await axiosInstance.delete(
      `${BASE_URL}?userId=${userId}&productId=${productId}`
    );
    return data;
  },
};
