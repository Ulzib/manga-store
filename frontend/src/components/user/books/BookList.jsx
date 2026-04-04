"use client";
import axios from "../../axios/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../../utils/imageHelper";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import WishlistButton from "../wishlist/WishlistButton";

const BookInfoSkeleton = () => {
  return (
    <div className="flex flex-col p-3 border border-white/6 rounded-2xl bg-gray-900/90">
      <div className="w-full h-48 md:h-60 rounded-lg bg-zinc-700/60 animate-pulse" />
      <div className="h-3 bg-zinc-700/60 rounded animate-pulse mt-3 mx-auto w-65 md:w-60 lg:w-50" />
      <div className="h-9 rounded bg-zinc-800/60 animate-pulse mt-3" />
    </div>
  );
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName"); //url-s ner avna
  const { addToCart } = useCart();
  const router = useRouter();

  const fetchData = async (page = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const categoryId = searchParams.get("category") || "";
      let query = `books?limit=15&page=${page}`;
      if (searchQuery) query += `&name=${searchQuery}`;
      if (categoryId) query += `&category=${categoryId}`;

      const res = await axios.get(query);
      setBooks(res.data.data);
      //Backend-s irsen pagination object -> totalPages, totalItems, nextPage
      setPagination({ ...res.data.pagination, page });
      setCurrentPage(page);
    } catch (err) {
      setError("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    fetchData(1, searchQuery);
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    const searchQuery = searchParams.get("search") || "";
    fetchData(page, searchQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleAddToCart = (book, e) => {
    e.preventDefault();
    e.stopPropagation(); //e deesh damjihiig zogsooh, endee duusah
    addToCart(book);
    toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
  };

  return (
    <div className="max-w-7xl pt-22 md:pt-30 pb-10 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="group mb-3 text-white hover:text-black transition-colors hover:bg-white/90 text-[10px] md:text-xs lg:text-sm flex items-center gap-1 md:gap-2"
      >
        <ArrowLeft className="w-1 h-1 lg:w-4 lg:h-4  text-white group-hover:text-black transition-colors " />
        Буцах
      </Button>
      {categoryName && !loading && (
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-center text-white">
          {categoryName}
        </h2>
      )}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <BookInfoSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className="
          grid
          gap-4
          md:gap-6
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          
        "
        >
          {books.map((book) => (
            <div
              key={book._id}
              className="group relative flex flex-col hover:shadow-lg transition-all p-3 border border-white/6 rounded-2xl bg-gray-900/90"
            >
              <div className="opacity-0 group-hover:opacity-100 absolute top-5 right-5 z-10">
                <WishlistButton bookId={book._id} />
              </div>
              <Link href={`/books/${book._id}`} className="w-full block">
                <div className="relative w-full aspect-3/3 overflow-hidden rounded-lg">
                  <img
                    src={getImageUrl(book.photo)}
                    alt={book.name}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="mt-3 text-[12px] md:text-sm font-medium text-center leading-tight line-clamp-1 text-white">
                  {book.name}
                </h2>
              </Link>
              <div className="w-full pt-3">
                <Button
                  onClick={(e) => handleAddToCart(book, e)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors text-[12px] md:text-sm"
                >
                  <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                  Сагслах
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Ном олдсонгүй</p>
      )}
      {!categoryName && (
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Books;
