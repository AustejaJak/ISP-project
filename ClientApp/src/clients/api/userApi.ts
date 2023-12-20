import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Users`;

export const usersApi = {
  changePassword: async ({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    const { data } = await axiosInstance.post<any>(
      `${BASE_URL}/changePassword?userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
    return data;
  },
  changeEmail: async ({
    userId,
    newEmail,
  }: {
    userId: string;
    newEmail: string;
  }) => {
    const { data } = await axiosInstance.post<any>(
      `${BASE_URL}/changeEmail?userId=${userId}&newEmail=${newEmail}`
    );
    return data;
  },
};
