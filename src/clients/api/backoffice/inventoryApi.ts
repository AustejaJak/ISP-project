import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/backoffice/inventory`;

export const inventoryApi = {
  getCompanyInventory: async () => {
    const { data } = await axiosInstance.get<{
      data: any;
    }>(`${BASE_URL}`);
    return data.data;
  },
};
