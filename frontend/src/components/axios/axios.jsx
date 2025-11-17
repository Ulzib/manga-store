import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true, // ✅ Cookie автоматаар дамжуулна
});

// Global default тохиргоо
instance.defaults.withCredentials = true;

// Response interceptor - 401 алдаа бол logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("❌ 401 Unauthorized");
      localStorage.removeItem("book-token");
      document.cookie =
        "book-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    return Promise.reject(error);
  }
);

export default instance;
