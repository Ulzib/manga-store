"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const { totalItems } = useCart();
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative p-2 hover:text-white/10 transition"
    >
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-gray-400 transition-colors duration-200 cursor-pointer" />
      {/* sagsnii too */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};
export default CartButton;
