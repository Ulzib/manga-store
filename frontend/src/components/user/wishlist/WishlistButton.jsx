"use client";
import { useToken } from "@/components/navi/TokenLog";
import { Button } from "@/components/ui/button";
import { useWishList } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const WishlistButton = ({ bookId, className = "" }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishList();
  const { token } = useToken();
  const router = useRouter();
  const inWishlist = isInWishlist(bookId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Нэвтэрч орно уу");
      router.push("/login");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(bookId);
    } else {
      addToWishlist(bookId);
    }
  };
  return (
    <Button
      onClick={handleClick}
      className={`p-2 rounded-full hover:bg-gray-700 transition ${className}`}
      title={inWishlist ? "Жагсаалтаас хасах" : "Жагсаалд нэмэх"}
    >
      <Heart
        className={`w-5 h-5 ${
          inWishlist
            ? "fill-gray-300 text-gray-300"
            : "text-gray-400 hover:text-red-500"
        }`}
      />
    </Button>
  );
};

export default WishlistButton;
