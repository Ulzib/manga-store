"use client";
import BookDetail from "@/app/components/book-detail/BookDetail";

import { useParams } from "next/navigation";

export default function BookDetailPage() {
  const { id } = useParams();
  return (
    <div className="w-full flex justify-center items-center">
      <BookDetail id={id} />
    </div>
  );
}
