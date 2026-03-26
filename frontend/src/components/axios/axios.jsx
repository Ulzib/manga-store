import axios from "axios";

const instance = axios.create({
  baseURL: "${process.env.NEXT_PUBLIC_API_URL}/api/v1/",
  withCredentials: true, // Cookie automataar damjuulna
});

// Global default tohirgoo
instance.defaults.withCredentials = true;

// REQUEST interceptor - Token nemeh
instance.interceptors.request.use(
  (config) => {
    // Cookie-с token avah
    const getCookieToken = () => {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "book-token") {
          // Tanii cookie ner
          return value;
        }
      }
      return null;
    };

    const token = getCookieToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error(" No token found in cookie");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE interceptor - 401 aldaa bol logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("book-token");
      document.cookie =
        "book-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    return Promise.reject(error);
  },
);

export default instance;
