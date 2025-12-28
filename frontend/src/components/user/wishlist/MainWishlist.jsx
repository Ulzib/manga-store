"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishList } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import WishlistItem from "./WishlistItem";
import { useEffect, useState } from "react";

const MainWishlist = () => {
  const { wishlist, loading, removeFromWishlist } = useWishList();
  const [inloading, setInLoading] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = async (book, e) => {
    e.preventDefault();
    await addToCart(book);
    toast.success(`"${book.name}" жагсаалтад нэмэгдлээ`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (inloading) {
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container  text-center flex flex-col justify-center items-center min-h-screen ">
        <Heart className="w-24 h-24 text-gray-300 " />
        <h1 className="text-gray-500 font-bold text-2xl mb-4">
          Жагсаалт хоосон байна
        </h1>
        <Link href="/books">
          <Button>Манга үзэх</Button>
        </Link>
      </div>
    );
  }

  //data-tai ued
  return (
    <div className="container flex flex-col justify-center py-8 ">
      <h1 className="text-3xl font-bold mb-6">Миний жагсаалт</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {wishlist.map((book) => (
          <WishlistItem
            key={book._id}
            book={book}
            onAdd={handleAddToCart}
            onRemove={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
};
export default MainWishlist;
