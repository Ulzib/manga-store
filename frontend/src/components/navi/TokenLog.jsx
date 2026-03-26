"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

// Cookie unshih helper
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// JWT Token decode hiih (role gargh)
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cookie-s unshih
    const cookieToken = getCookie("book-token");

    if (cookieToken) {
      setToken(cookieToken);
      localStorage.setItem("book-token", cookieToken);

      // Token decode hj role avna
      const decoded = decodeToken(cookieToken);

      setUserRole(decoded?.role);
    } else {
      // localStorage-s fallback
      const localToken = localStorage.getItem("book-token");

      if (localToken) {
        setToken(localToken);
        // Token decode
        const decoded = decodeToken(localToken);
        setUserRole(decoded?.role);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("book-token", newToken);

    // Token decode hj role avna
    const decoded = decodeToken(newToken);
    setUserRole(decoded?.role);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(" Logout API error:", error);
    }

    // Local state tsetserlene
    setToken(null);
    setUserRole(null);
    localStorage.removeItem("book-token");
    document.cookie =
      "book-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <TokenContext.Provider
      value={{ token, userRole, handleLogin, handleLogout, loading }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
