import axiosInstance from "../../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Admins/RemoveUser`;

export const userApi = {
  deleteUser: async ({ userId }: { userId: any }) => {
    const { data } = await axiosInstance.delete(`${BASE_URL}?userId=${userId}`);
    return data;
  },
};
