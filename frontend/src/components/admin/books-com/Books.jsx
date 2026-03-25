"use client";
import axios from "../../axios/Axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const fetchData = async (page = 1, searchQuery = "") => {
    setLoading(true);
    try {
      let query = `books?limit=15&page=${page}`;
      if (searchQuery) query += `&name=${searchQuery}`;

      const res = await axios.get(query);
      setBooks(res.data.data);
      //Backend-s irsen pagination object - totalPages, totalItems, nextPage, etc.
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

  const handlePageChange = (page) => {
    const searchQuery = searchParams.get("search") || "";
    fetchData(page, searchQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && books.length === 0) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="container">
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
        {books.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Ном олдсонгүй</p>
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
