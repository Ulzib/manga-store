"use client";
import axios from "../../axios/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";
import Pagination from "@/components/Pagination";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`books?limit=15&page=${page}`);
      setBooks(res.data.data);
      setPagination(res.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError("Алдаа гарлаа");
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageChange = (page) => {
    fetchData(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>;
  }

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
                  <Link href={`/admin/books/${el._id}`}>
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
              </div>
            ))}
          </div>
        )}
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Books;
