import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todolist-api.hexschool.io",
});

// 請求攔截器：自動注入 Authorization Header
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const getCookie = (name) => {
        const regex = new RegExp(
          `(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
        );
        return document.cookie.replace(regex, "$1") || null;
      };
      
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
