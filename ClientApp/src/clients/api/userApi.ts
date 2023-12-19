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
    const { data } = await axiosInstance.get<any>(
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
    const { data } = await axiosInstance.get<any>(
      `${BASE_URL}/changePassword?userId=${userId}&newEmail=${newEmail}`
    );
    return data;
  },
};
