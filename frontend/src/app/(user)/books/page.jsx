export const dynamic = "force-dynamic";
import { Suspense } from "react";
import BookList from "@/components/user/books/BookList";

const BooksPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-2 lg:px-11">
      <Suspense
        fallback={<div className="pt-40 text-white">Уншиж байна...</div>}
      >
        <BookList />
      </Suspense>
    </div>
  );
};

export default BooksPage;
