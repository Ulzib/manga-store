import Link from "next/link";
import { getImageUrl } from "../../../../utils/imageHelper";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";

const WishlistItem = ({ book, onAdd, onRemove }) => {
  return (
    <div className="group relative flex flex-col border rounded-lg overflow-hidden hover:shadow-lg transition bg-white h-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(book._id);
        }}
        className="absolute top-2 right-2 z-20 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-gray-300 hover:text-white transition-all shadow-sm"
      >
        <X className="w-4 h-4" />
      </button>

      <Link href={`/books/${book._id}`} className="block">
        <div className="relative w-full aspect-[2/3] sm:aspect-[3/4] max-h-[250px] sm:max-h-[300px] overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(book.photo)}
            alt={book.name}
            className="w-full h-full object-fill group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1 line-clamp-2 h-10 leading-tight">
            {book.name}
          </h3>
          {book.author && (
            <p className="text-xs text-black mb-2 ">
              {book.author || book.zohiogch || "Зохиолч байхгүй"}
            </p>
          )}
          <p className="font-bold text-gray-400 text-base mb-3">
            {book.price?.toLocaleString()}₮
          </p>
        </div>

        <Button
          onClick={(e) => onAdd(book, e)}
          className="w-full gap-2 bg-green-500 hover:bg-green-900 text-white mt-auto"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Сагслах</span>
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
