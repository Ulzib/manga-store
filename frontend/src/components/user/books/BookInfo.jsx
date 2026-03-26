"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "../../Spinner";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { getImageUrl } from "../../../../utils/imageHelper";
import { useCart } from "@/context/CartContext";
import MainReview from "../review/MainReview";
import WishlistButton from "../wishlist/WishlistButton";
import { ArrowLeft } from "lucide-react";
import BookBackground from "./BackImage";

export default function BookInfo({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await axios.get(`books/${id}`);
      const data = await res.data;
      setBook(data.data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  //sagsand nemeh
  const handleAddToCart = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAdding(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      addToCart(book);
      toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <p>Ном олдсонгүй</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BookBackground bookId={id} />
      <div className="relative z-10 w-full mx-auto pt-20 lg:pt-24 pb-14 px-4 md:px-14">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group mb-3 text-white hover:text-black transition-colors hover:bg-white/90 text-[10px] md:text-xs lg:text-sm flex items-center gap-1 md:gap-2"
        >
          <ArrowLeft className="w-1 h-1 lg:w-4 lg:h-4  text-white group-hover:text-black transition-colors " />
          Буцах
        </Button>
        <div className="flex flex-col items-center mt-8 gap-8 md:gap-15">
          <div className="relative w-full flex items-center justify-center ">
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-white tracking-tight text-center ">
              {book.name}
            </h1>
            <div className="absolute right-0">
              <WishlistButton
                bookId={book._id}
                className="scale-125 w-7 h-7 md:w-10 md:h-10"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 lg:flex-row md:justify-between ">
            <div className="flex flex-col items-center md:items-start md:flex-row md:gap-18">
              {book.photo && (
                <div className="w-60  md:w-full md:max-w-xs overflow-hidden ">
                  <img
                    className="w-full aspect-3/4 object-fill rounded-lg"
                    src={getImageUrl(book.photo)}
                    alt={book.name}
                  />
                </div>
              )}

              <div className="flex flex-col gap-5 pt-8 md:pt-0">
                <div>
                  <label className="font-medium text-sm md:text-lg lg:text-xl text-gray-100">
                    Зохиолч
                  </label>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                    {book.author}
                  </p>
                </div>

                <div>
                  <label className="font-medium text-sm md:text-lg lg:text-xl text-gray-100">
                    Үнэ
                  </label>
                  <p className="text-xl lg:text-2xl font-bold text-white">
                    {book.price}₮
                  </p>
                </div>

                <div>
                  <label className="font-medium text-sm md:text-lg lg:text-xl text-gray-100">
                    Категори
                  </label>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                    {book.category?.name || "—"}
                  </p>
                </div>

                <div>
                  <label className="font-medium text-gray-100 text-sm md:text-lg lg:text-xl">
                    Тайлбар
                  </label>
                  <p
                    className={`text-gray-300 text-sm md:text-lg  leading-relaxed max-w-2xl ${expanded ? "" : "line-clamp-5"}`}
                  >
                    {book.description}
                  </p>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-xs md:text-sm text-gray-500 hover:text-white mt-1"
                  >
                    {expanded ? "Хураах" : " Цааш унших"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="bg-blue-800/80 hover:bg-blue-600 p-4 md:p-5 text-white transition-colors text-[10px] sm:text-xs md:text-sm"
                  >
                    {isAdding ? (
                      <div className="flex items-center gap-2">
                        <Spinner size="sm" />
                        <span>Нэмж байна...</span>{" "}
                      </div>
                    ) : (
                      "Сагсанд нэмэх"
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <MainReview bookId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
