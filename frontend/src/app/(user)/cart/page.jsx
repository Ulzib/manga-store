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
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Таны сагс хоосон байна
        </h2>
        <Button
          onClick={() => router.push("/books")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Манга үзэх
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
    <div className="max-w-6xl mx-auto pt-6 flex flex-col gap-9 ">
      <h1 className="text-3xl font-bold mb-6">Миний сагс</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col rounded-lg bg-white shadow gap-6">
          <div className="divide-y divide-gray-200/70">
            {cart.map((item) => (
              <div key={item._id} className=" p-4 ">
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <img
                    src={item.photo || "placeholder.jpg"}
                    alt={item.name}
                    className="w-full sm:w-24 h-48 sm:h-32 object-fill rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between sm:gap-0">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.price?.toLocaleString()}₮
                    </p>
                    <div className="flex items-center justify-center sm:justify-start rounded-lg">
                      <Button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="p-1 bg-gray-200 "
                        variant="outline"
                      >
                        <Minus className="w-4 h-4 " />
                      </Button>
                      <span className="w-12 text-center font-bold">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="p-1 bg-gray-200"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500 " />
                    </Button>
                    <p className="font-bold text-lg">
                      {(item.price * item.quantity).toLocaleString()}₮
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-90 h-40 flex flex-col justify-between bg-white p-6 rounded-lg shadow ">
          <div className="flex justify-between mb-4">
            <span className="text-xl font-bold">Нийт дүн:</span>
            <span className="text-2xl font-bold text-black">
              {totalPrice.toLocaleString()}₮
            </span>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 bg-blue-950 text-white rounded-3xl hover:bg-blue-800 transition"
          >
            {loading ? <Spinner /> : "Захиалга үүсгэх"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
