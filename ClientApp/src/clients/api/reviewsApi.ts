import { Review } from "../../types/types";
import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Reviews`;

export const reviewsApi = {
  getProductReviews: async ({ productId }: { productId: string }) => {
    const { data } = await axiosInstance.get<Review[]>(
      `${BASE_URL}?productId=${productId}`
    );
    return data;
  },
  createReview: async ({
    productId,
    review,
  }: {
    productId: string;
    review: Review;
  }) => {
    const { data } = await axiosInstance.post(
      `${BASE_URL}/${productId}`,
      review
    );
    return data;
  },
};
