import axios from "axios";
import { error } from "console";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
