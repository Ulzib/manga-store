"use client";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReviewStars from "./ReviewStar";
import { useToken } from "@/components/navi/TokenLog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ReviewForm from "./ReviewForm";
import Spinner from "@/components/Spinner";
import ReviewItem from "./ReviewItem";

const MainReview = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const { token } = useToken();
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/books/${bookId}/reviews`);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Үнэлгээ татахад алдаа гарлаа :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Нэвтэрч орно уу");
      router.push("/login");
      return;
    }
    if (rating === 0) {
      toast.error("Үнэлгээ өгнө үү");
      return;
    }
    if (!text.trim()) {
      toast.error("Сэтгэгдэл бичнэ үү");
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`/books/${bookId}/reviews`, { rating, text });
      toast.success("Үнэлгээ өглөө");
      setRating(0);
      setText("");
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Алдаа гарлаа";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="flex flex-col gap-2 lg:gap-3 w-full border-2 lg:border-3 border-gray-300 rounded-xl p-5 lg:w-sm">
      <div className="flex flex-1 mb-3 md:mb-5">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
            Үнэлгээ
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <ReviewStars rating={avgRating} size="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-lg font-medium text-gray-100">
                {avgRating}
              </span>
              <span className="text-gray-300 text-sm md:text-base">
                ({reviews.length})
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-2 min-w-0 text-gray-200 text-sm md:text-text-base">
        {showForm && (
          <ReviewForm
            rating={rating}
            setRating={setRating}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            text={text}
            setText={setText}
            handleSubmit={handleSubmit}
            submitting={submitting}
            onCancel={() => {
              setShowForm(false);
              setRating(0);
              setText("");
            }}
          />
        )}

        {loading ? (
          <div className="text-center text-white">
            <Spinner />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-300 mb-3">Хоосон байна</p>
        ) : (
          <div className="space-y-6 w-full ">
            {reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                onUpdated={fetchReviews}
              />
            ))}
          </div>
        )}

        {token && !showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="mt-5 md:mt-3 bg-zinc-800/80 hover:bg-zinc-700 text-gray-300 text-xs md:text-sm"
          >
            Үнэлгээ өгөх
          </Button>
        )}
      </div>
    </div>
  );
};
export default MainReview;
