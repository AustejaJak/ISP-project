import axiosInstance from "../axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/Email`;

export const emailApi = {
  sendEmail: async ({
    email,
    emailSubject,
    emailBody,
  }: {
    email: string;
    emailSubject: string;
    emailBody: string;
  }) => {
    const { data } = await axiosInstance.post(`${BASE_URL}`, {
      email,
      emailSubject,
      emailBody,
      userName: "Ecommerce",
    });
    return data;
  },
};
