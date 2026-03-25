"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../components/axios/Axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  //wishlist tatah
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/wishlist");
      setWishlist(res.data.data.books || []);
    } catch (err) {
      console.log("Хүслийн жагсаалт татахад алдаа гарлаа : ", err);
    } finally {
      setLoading(false);
    }
  };

  //nom nemeh
  const addToWishlist = async (bookId) => {
    try {
      const res = await axios.post(`/wishlist/${bookId}`);
      setWishlist(res.data.data.books);
      toast.success("Жагсаалтад нэмэгдлээ");
    } catch (err) {
      const msg = err.response?.data?.error || "Алдаа гарлаа";
      toast.error(msg);
    }
  };

  //nom hasah
  const removeFromWishlist = async (bookId) => {
    try {
      const res = await axios.delete(`/wishlist/${bookId}`);
      setWishlist(res.data.data.books);
      toast.success("Жагсаалтаас хасагдлаа");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };

  //wishlist dtr bga esehiig shalgh
  const isInWishlist = (bookId) => {
    return wishlist.some((book) => book._id === bookId);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishList = () => useContext(WishlistContext);
