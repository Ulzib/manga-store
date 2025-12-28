import ReviewStars from "./ReviewStar";

const ReviewItem = ({ review }) => {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">
          {review.user?.name || "Тодорхойгүй хэрэглэгч"}
        </span>
        <ReviewStars rating={review.rating} />
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleString("mn-MN")}
        </span>
      </div>
      <p className="text-gray-700 break-words whitespace-pre-wrap leading-relaxed overflow-hidden">
        {review.text}
      </p>
    </div>
  );
};
export default ReviewItem;
