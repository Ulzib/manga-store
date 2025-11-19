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

// JWT Token decode хийх (role гаргах)
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("❌ Token decode error:", error);
    return null;
  }
};

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // ← НЭМСЭН
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 TokenProvider initializing...");

    // 1️⃣ Cookie-с унших
    const cookieToken = getCookie("book-token");
    console.log("🍪 Cookie token:", cookieToken ? "Found" : "Not found");

    if (cookieToken) {
      setToken(cookieToken);
      localStorage.setItem("book-token", cookieToken);

      // Token decode хийж role авах
      const decoded = decodeToken(cookieToken);
      console.log("🔓 Decoded token:", decoded);
      setUserRole(decoded?.role); // ← НЭМСЭН

      console.log("✅ Token loaded from cookie");
    } else {
      // 2️⃣ localStorage-с fallback
      const localToken = localStorage.getItem("book-token");
      console.log("💾 LocalStorage token:", localToken ? "Found" : "Not found");

      if (localToken) {
        setToken(localToken);

        // Token decode
        const decoded = decodeToken(localToken);
        setUserRole(decoded?.role); // ← НЭМСЭН

        console.log("⚠️ Token loaded from localStorage (cookie missing)");
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = (newToken) => {
    console.log("🔐 handleLogin called");
    setToken(newToken);
    localStorage.setItem("book-token", newToken);

    // Token decode хийж role авах
    const decoded = decodeToken(newToken);
    setUserRole(decoded?.role); // ← НЭМСЭН

    console.log("✅ Token saved to localStorage");
  };

  const handleLogout = async () => {
    console.log("🚪 handleLogout called");

    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("✅ Logout API success");
    } catch (error) {
      console.error("❌ Logout API error:", error);
    }

    // Local state цэвэрлэх
    setToken(null);
    setUserRole(null); // ← НЭМСЭН
    localStorage.removeItem("book-token");
    document.cookie =
      "book-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("✅ Token cleared locally");
  };

  return (
    <TokenContext.Provider
      value={{ token, userRole, handleLogin, handleLogout, loading }} // ← userRole нэмсэн
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
