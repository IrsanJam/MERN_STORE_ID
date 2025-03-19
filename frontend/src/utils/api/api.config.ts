import axios from "axios";
import Cookies from "js-cookie";

export const apiConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://mern-storeidku.vercel.app",
  headers: { "Content-Type": "application/json" },
});

// Middleware untuk menambahkan token secara dinamis
apiConfig.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
