"use client";
import axios from "../../axios/Axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";
import ToastProvider from "@/components/toast/ToastProvider";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import WishlistButton from "../wishlist/WishlistButton";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const { addToCart } = useCart();

  const fetchData = async (page = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const categoryId = searchParams.get("category") || "";
      let query = `books?limit=15&page=${page}`;
      if (searchQuery) query += `&name=${searchQuery}`;
      if (categoryId) query += `&category=${categoryId}`;

      const res = await axios.get(query);
      setBooks(res.data.data);
      //Backend-s irsen pagination object → totalPages, totalItems, nextPage, etc.
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
  //sagsand nemeh
  const handleAddToCart = (book, e) => {
    e.preventDefault();
    e.stopPropagation(); //e deesh damjihiig zogsooh, endee duusah
    addToCart(book);

    toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
  };

  return (
    <div className="max-w-7xl pt-22 md:pt-30 pb-10 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="scale-150">
            <Spinner />
          </div>
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
      <Pagination
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Books;
