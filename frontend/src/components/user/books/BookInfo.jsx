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

export default function BookInfo({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const goBack = () => {
    router.back();
  };

  const fetchData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await axios.get(`books/${id}`);
      const data = await res.data;
      setBook(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
    <div className="max-w-5xl container">
      <div className="flex flex-col items-center mt-8 gap-10">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[30px] font-bold">{book.name}</h1>
          <WishlistButton bookId={book._id} className="scale-125" />
        </div>

        <div className="w-full flex gap-8">
          {book.photo && (
            <div className="w-[310px] shrink-0">
              <div className="w-[310px] h-96 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-contain"
                  src={getImageUrl(book.photo)}
                  alt={book.name}
                />
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-4">
            <div>
              <label className="font-medium text-gray-600">Зохиолч</label>
              <p className="text-lg">{book.author}</p>
            </div>

            <div>
              <label className="font-medium text-gray-600">Үнэ</label>
              <p className="text-2xl font-bold text-green-600">{book.price}₮</p>
            </div>

            <div>
              <label className="font-medium text-gray-600">Категори</label>
              <p className="text-lg">{book.category?.name || "—"}</p>
            </div>

            <div>
              <label className="font-medium text-gray-600">Тайлбар</label>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button className="bg-blue-900" onClick={goBack}>
                Буцах
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-500"
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
        <MainReview bookId={id} />
      </div>
    </div>
  );
}
