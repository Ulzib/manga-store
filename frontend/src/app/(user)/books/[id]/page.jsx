import BookInfo from "@/components/user/books/BookInfo";

export default async function BookInfoPage({ params }) {
  const resolvedParams = await params;
  return <BookInfo id={resolvedParams.id} />;
}
