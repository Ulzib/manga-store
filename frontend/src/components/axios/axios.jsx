import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true, // ✅ Cookie автоматаар дамжуулна
});

// Global default тохиргоо
instance.defaults.withCredentials = true;

// REQUEST interceptor - Token нэмэх
instance.interceptors.request.use(
  (config) => {
    // Cookie-с token авах
    const getCookieToken = () => {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "book-token") {
          // Таны cookie нэр
          return value;
        }
      }
      return null;
    };

    const token = getCookieToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token added to request:", token.substring(0, 20) + "...");
    } else {
      console.log("⚠️ No token found in cookie");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE interceptor - 401 алдаа бол logout
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
