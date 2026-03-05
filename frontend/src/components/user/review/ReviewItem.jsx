import ReviewStars from "./ReviewStar";

const ReviewItem = ({ review }) => {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">
          {review.user?.name || "Тодорхойгүй хэрэглэгч"}
        </span>
        <ReviewStars rating={review.rating} size="w-3 h-3 md:w-5 md:h-5" />
        <span className="text-xs md:text-sm text-gray-400">
          {new Date(review.createdAt).toLocaleString("mn-MN")}
        </span>
      </div>
      <p className="text-white font-medium break-words whitespace-pre-wrap text-xs md:text-sm leading-relaxed overflow-hidden">
        {review.text}
      </p>
    </div>
  );
};
export default ReviewItem;
