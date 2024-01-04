import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Admins`;

export const adminApi = {
  changeUserRole: async ({ userData }: { userData: any }) => {
    const { data } = await axiosInstance.patch(
      `${BASE_URL}/ChangeUserRole`,
      userData
    );
    return data;
  },
};
