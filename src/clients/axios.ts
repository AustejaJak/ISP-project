import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = undefined;
    const authToken = null;
    if (token) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
