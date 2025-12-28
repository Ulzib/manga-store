import BookInfo from "@/components/user/books/BookInfo";

export default async function BookInfoPage({ params }) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col justify-center items-center">
      <BookInfo id={resolvedParams.id} />
    </div>
  );
}
