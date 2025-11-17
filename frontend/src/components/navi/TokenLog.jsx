"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

// Cookie унших helper
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 TokenProvider initializing...");

    // 1️⃣ Cookie-с унших (энэ давуу эрэмбэтэй)
    const cookieToken = getCookie("book-token");
    console.log("🍪 Cookie token:", cookieToken ? "Found" : "Not found");

    if (cookieToken) {
      setToken(cookieToken);
      localStorage.setItem("book-token", cookieToken);
      console.log("✅ Token loaded from cookie");
    } else {
      // 2️⃣ localStorage-с fallback
      const localToken = localStorage.getItem("book-token");
      console.log("💾 LocalStorage token:", localToken ? "Found" : "Not found");

      if (localToken) {
        setToken(localToken);
        console.log("⚠️ Token loaded from localStorage (cookie missing)");
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = (newToken) => {
    console.log("🔐 handleLogin called");
    setToken(newToken);
    localStorage.setItem("book-token", newToken);

    // ⚠️ Frontend-с cookie сэтлэх нь хангалтгүй - backend cookie чухал
    console.log("✅ Token saved to localStorage");
  };

  const handleLogout = async () => {
    console.log("🚪 handleLogout called");

    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include", //  Cookie дамжуулах
      });
      console.log("✅ Logout API success");
    } catch (error) {
      console.error("❌ Logout API error:", error);
    }

    // Local state цэвэрлэх
    setToken(null);
    localStorage.removeItem("book-token");
    document.cookie =
      "book-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("✅ Token cleared locally");
  };

  return (
    <TokenContext.Provider
      value={{ token, handleLogin, handleLogout, loading }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
