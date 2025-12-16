"use client";
import axios from "../../axios/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";
import ToastProvider from "@/components/toast/ToastProvider";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("books?limit=50");
      setBooks(res.data.data);
    } catch (err) {
      setError("Алдаа гарлаа");
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //sagsand nemeh
  const handleAddToCart = (book, e) => {
    e.preventDefault();
    e.stopPropagation(); //e deesh damjihiig zogsooh, endee duusah
    addToCart(book);

    toast.success(`"${book.name}" сагсанд нэмэгдлээ`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-6">
      <div className="container">
        <h1 className="pl-2.5 text-2xl font-semibold mb-6 ">Номын дэлгүүр</h1>

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
          gap-6
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
          >
            {books.map((el) => (
              <div
                key={el._id}
                className="flex flex-col items-center hover:shadow-lg transition-all rounded-1 p-3"
              >
                <div className="w-full aspect-3/4 overflow-hidden rounded-lg">
                  <Link href={`/books/${el._id}`}>
                    <img
                      src={getImageUrl(el.photo)}
                      alt={el.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>
                <h2 className="mt-3 text-sm font-medium text-gray-800 text-center line-clamp-2">
                  {el.name}
                </h2>
                {/* une, sagslah tovch */}
                <div className="w-full mt-3 flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-blue-600">
                    {el.price?.toLocaleString()}₮
                  </span>
                  <Button
                    onClick={(e) => handleAddToCart(el, e)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Сагс
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
