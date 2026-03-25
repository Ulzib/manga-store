"use client";
import { useToken } from "@/components/navi/TokenLog";
import ReviewStars from "./ReviewStar";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios/Axios";
import toast from "react-hot-toast";

const ReviewItem = ({ review, onUpdated }) => {
  const { token } = useToken();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(review.text);
  const [rating, setRating] = useState(review.rating);

  const myId = token ? jwtDecode(token).id : null;
  const isOwner = myId === review.user?._id;

  const handleUpdate = async () => {
    try {
      await axios.put(`/reviews/${review._id}`, { text, rating });
      toast.success("Засагдлаа");
      setEditing(false);
      onUpdated();
    } catch (err) {
      toast.error(err.response?.data?.error || "Өөрчлөх явцад алдаа гарлаа");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Үнэлгээг устгах уу?")) return;
    try {
      await axios.delete(`/reviews/${review._id}`);
      toast.success("Үнэлгээ устгагдлаа");
      onUpdated();
    } catch (err) {
      toast.error(err.response?.data?.error || "Устгах явцад алдаа гарлаа");
    }
  };

  return (
    <div className="border-b pb-4">
      <div className="flex justify-between md:items-center gap-2 mb-2">
        <div className="flex gap-4">
          <span className="font-medium">
            {review.user?.name || "Нэргүй хэрэглэгч"}
          </span>
          <ReviewStars rating={review.rating} size="w-3 h-3 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleString("mn-MN")}
          </span>
        </div>
        <div>
          {isOwner && !editing && (
            <div className="flex gap-2 flex-col">
              <button
                onClick={() => setEditing(true)}
                className="text-sm hover:bg-gray-100/20 rounded-lg p-1"
              >
                Засах
              </button>
              <button
                onClick={handleDelete}
                className="text-sm hover:bg-gray-100/20 rounded-lg p-1"
              >
                Устгах
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-16 bg-gray-50/20 text-white rounded-lg px-2 py-1 text-sm"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-50/20 shadow text-white rounded-lg px-2 py-1 text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="text-sm text-green-600 hover:bg-gray-100/20 rounded-lg p-1"
            >
              Хадгалах
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setText(review.text);
                setRating(review.rating);
              }}
              className="text-xs text-gray-400 hover:bg-gray-100/20 rounded-lg p-1"
            >
              Болих
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white font-medium break-words whitespace-pre-wrap text-xs md:text-sm leading-relaxed overflow-hidden">
          {review.text}
        </p>
      )}
    </div>
  );
};
export default ReviewItem;
