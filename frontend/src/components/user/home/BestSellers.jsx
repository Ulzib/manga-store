"use client";
import axios from "../../axios/Axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WishlistButton from "../wishlist/WishlistButton";
import { getImageUrl } from "../../../../utils/imageHelper";
import { Button } from "@/components/ui/button";
import { Badge, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

const BestSellers = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/books?limit=12&sort=-price");
        setBooks(res.data.data || []);
      } catch (err) {
        console.log("Алдаа гарлаа: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  const handleAddCart = (book, e) => {
    e.preventDefault();
    addToCart(book);
    toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
  };

  if (loading) {
    return (
      <div className="w-full flex py-20 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }
  return (
    <div className="w-full pt-6 md:pt-12">
      <div className="relative flex justify-between items-center md:justify-center w-full mb-1 lg:mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-white">Бестселлер</h2>
        <Link
          href="/books"
          className="absolute right-0 text-white/40 hover:text-white font-medium text-[10px] md:text-sm transition-colors"
        >
          Бүгдийг үзэх →
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        plugins={[WheelGesturesPlugin()]}
        className="w-full"
      >
        <CarouselContent className="-ml-4 basis-auto">
          {books.map((book) => (
            <CarouselItem key={book._id} className="pl-4 basis-auto pt-10">
              <div className="group relative w-28 md:w-40 lg:w-52 bg-gray-900/60 rounded-2xl p-4 pt-0 transition-all border border-white/5">
                <Link href={`/books/${book._id}`} className="block">
                  <div className="relative -mt-8 mb-4 mx-auto w-20 md:w-30 lg:w-40 aspect-151/223 overflow-hidden rounded-lg transition-transform durantion-500 ease-out group-hover:-translate-y-1 ">
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition">
                      <WishlistButton bookId={book._id} />
                    </div>
                    <img
                      src={getImageUrl(book.photo)}
                      alt={book.name}
                      className="w-full h-full object-fill"
                      draggable="false"
                    />
                    {book.bestseller && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 px-1">
                    {book.averageRating > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-sm font-bold">
                          {book.averageRating.toFixed(1)}
                        </span>
                        <span className="text-zinc-500 text-xs">
                          ({book.reviewCount || 0})
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold text-white text-[8px] md:text-sm leading-tight line-clamp-1">
                      {book.name}
                    </h3>
                    <p className="text-[7px] md:text-[12px] text-zinc-400 font-medium truncate pb-2">
                      {book.author}
                    </p>
                  </div>
                </Link>

                <Button
                  onClick={(e) => handleAddCart(book, e)}
                  className="w-full h-6 md:h-11 bg-zinc-800/90 hover:bg-zinc-700 text-white rounded-2xl border-none  flex items-center justify-center gap-2 transition-colors md:my-2"
                >
                  <ShoppingCart className="w-4 h-4 opacity-70" />
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden hover:bg-white/80 md:flex" />
        <CarouselNext className="hidden hover:bg-white/80 md:flex" />
      </Carousel>
    </div>
  );
};
export default BestSellers;
