import BookInfo from "@/components/user/books/BookInfo";

export default function BookInfoPage({ params }) {
  return <BookInfo id={params.id} />;
}
