"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [inLoading, setInLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (inLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ShoppingBag className="w-18 h-18 md:w-24 md:h-24 text-gray-300 mb-4" />
        <h2 className="text-lg md:text-2xl font-bold text-gray-500 mb-4">
          Таны сагс хоосон байна
        </h2>
        <Button
          onClick={() => router.push("/books")}
          className="px-6 py-3  text-white rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs md:text-sm"
        >
          Манга харах
        </Button>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await router.push("/checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-4xl lg:w-6xl mx-auto pt-23 md:pt-30 pb-8 px-4 md:px-8">
      <h1 className="text-xl text-left sm:text-2xl lg:text-3xl font-bold pb-6 sm:pb-10 text-white">
        Миний сагс
      </h1>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-7">
        <div className="mx-auto w-full flex flex-col rounded-lg shadow gap-6 p-2 lg:p-3 bg-gray-700/40 border-none text-white">
          <div className="divide-y divide-gray-200/70">
            {cart.map((item) => (
              <div key={item._id} className="p-2 ">
                <div className="flex sm:gap-8">
                  <img
                    src={item.photo || "placeholder.jpg"}
                    alt={item.name}
                    className="w-26 h-34 object-fill rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col pt-5 md:pt-0 pl-5">
                      <h3 className="font-bold text-xs pb-1 sm:text-sm md:text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm">
                        {item.price?.toLocaleString()}₮
                      </p>
                    </div>
                    <div className="flex items-center justify-start rounded-lg pl-2">
                      <Button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="p-1 text-white border border-transparent hover:border-gray-400 hover:bg-transparent"
                        variant="ghost"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </Button>
                      <span className="w-12 text-xs sm:text-sm text-center font-bold">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="p-1 text-white border border-transparent hover:border-gray-400 hover:bg-transparent"
                        variant="ghost"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item._id)}
                      className="border border-transparent hover:border-red-900 hover:bg-transparent"
                    >
                      <Trash2 className="w-5 h-5 text-red-500 " />
                    </Button>
                    <p className="font-bold text-xs sm:text-sm lg:text-lg">
                      {(item.price * item.quantity).toLocaleString()}₮
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full md:w-lg md:h-40 flex flex-col justify-between p-5 sm:p-7 rounded-lg shadow bg-gray-700/40 border-none text-white gap-4 md:gap-1">
          <div className="flex items-center gap-3">
            <p className="text-sm sm:text-[16px] md:text-xl font-bold">
              Нийт дүн:
            </p>
            <p className="text-[16px] sm:text-[18px] md:text-2xl font-bold text-white">
              {totalPrice.toLocaleString()}₮
            </p>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full flex items-center gap-2 px-3 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors text-[10px] sm:text-xs md:text-sm"
          >
            {loading ? <Spinner /> : "Захиалга үүсгэх"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
