"use client";
import { useCart } from "@/context/CartContext";
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
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/books?limit=12&sort=-createdAt&page=2");
        setBooks(res.data.data || []);
      } catch (err) {
        console.log("Алдаа гарлаа", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeature();
  }, []);

  const handleAddCart = (book, e) => {
    e.preventDefault();
    addToCart(book);
    toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full pt-6 md:pt-12">
      <div className="relative flex justify-between items-center md:justify-center mb-1 lg:mb-6 w-full">
        <h2 className="text-xl md:text-3xl font-bold text-white">
          Онцлох номууд
        </h2>
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
        plugins={[WheelGesturesPlugin()]} //side scrolling Wheel gesture
        className="w-full"
      >
        <CarouselContent className="-ml-4 ">
          {books.map((book) => (
            <CarouselItem key={book._id} className="pl-4 basis-auto pt-10">
              <div className="group relative w-28 md:w-40 lg:w-52 bg-gray-900/60 rounded-2xl p-4 pt-0 transition-all border border-white/5 ">
                <Link href={`books/${book._id}`} className="block">
                  <div className="relative -mt-8 mb-4 mx-auto w-20 md:w-30 lg:w-40 aspect-151/223 overflow-hidden rounded-lg transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition">
                      <WishlistButton bookId={book._id} />
                    </div>
                    <img
                      src={getImageUrl(book.photo)}
                      alt={book.name}
                      className="w-full h-full object-fill"
                      draggable="false"
                    />
                  </div>

                  <div className="space-y-2 px-1">
                    <div className="flex items-center gap-3 text-zinc-500 text-[11px] mb-1"></div>
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
                  className="w-full h-6 md:h-11 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-lg border-none  flex items-center justify-center gap-2  transition-colors md:my-2 "
                >
                  <ShoppingCart className="w-4 h-4 opacity-70" />
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" hidden hover:bg-white/80 md:flex" />
        <CarouselNext className=" hidden hover:bg-white/80 md:flex" />
      </Carousel>
    </section>
  );
};
export default FeaturedBooks;
