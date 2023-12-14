import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;

export const productsApi = {
  getProducts: async ({
    query,
    category,
  }: {
    query: string;
    category: string;
  }) => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}/${category}${query}`);
    return data.data;
  },
};
