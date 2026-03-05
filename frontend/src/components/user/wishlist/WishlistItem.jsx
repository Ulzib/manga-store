"use client";
import Link from "next/link";
import { getImageUrl } from "../../../../utils/imageHelper";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import Spinner from "@/components/Spinner";
import { useState } from "react";

const WishlistItem = ({ book, onAdd, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleAddClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onAdd(book, e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="group relative flex flex-col border rounded-lg overflow-hidden hover:shadow-lg transition bg-gray-700/40 border-none text-white w-full ">
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(book._id);
        }}
        className="absolute top-2 right-2 z-20 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-gray-300 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
      >
        <X className="w-2.5 h-2.5 md:w-4 md:h-4" />
      </button>

      <Link href={`/books/${book._id}`} className="block">
        <div className="relative w-full aspect-9/10 overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(book.photo)}
            alt={book.name}
            className="w-full h-full object-fill group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-bold text-[12px] md:text-sm line-clamp-2 h-10 leading-tight">
            {book.name}
          </h3>
          {book.author && (
            <p className="text-[10px] md:text-xs text-gray-400 mb-2 ">
              {book.author || book.zohiogch || "Зохиолч байхгүй"}
            </p>
          )}
          <p className="font-bold text-white text-sm md:text-base mb-3">
            {book.price?.toLocaleString()}₮
          </p>
        </div>

        <Button
          onClick={handleAddClick}
          disabled={loading}
          className="w-full gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white mt-auto transition-colors text-[12px] md:text-sm"
          size="sm"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
            </div>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
              <span>Сагслах</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
