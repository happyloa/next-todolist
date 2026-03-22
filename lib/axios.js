import axios from "axios";

import { getCookie } from "./utils";

const axiosInstance = axios.create({
  baseURL: "https://todolist-api.hexschool.io",
});

// 請求攔截器：自動注入 Authorization Header
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const token = getCookie("hexschoolTodo");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
