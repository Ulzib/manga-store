"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShippingSection from "./Shipping";
import toast from "react-hot-toast";
import axios from "../../axios/axios";
import PaymentSection from "./Payment";
import OrderSummary from "./OrderSummary";

const CheckoutForm = () => {
  const { cart, setCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    district: "",
    address: "",
    phone: "",
    note: "",
    paymentMethod: "cash",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, //name:ali field value:shine utga, [name]:value = zuvhun ter fieldiig update
    }));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async () => {
    if (
      !formData.city ||
      !formData.district ||
      !formData.address ||
      !formData.phone
    ) {
      toast.error("Хүргэлтийн мэдээллийг бүрэн бөглөнө үү");
      return;
    }
    if (cart.length === 0) {
      toast.error("Таны сагс хоосон байна!");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        items: cart.map((item) => ({
          book: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          city: formData.city,
          district: formData.district,
          address: formData.address,
          phone: formData.phone,
          note: formData.note,
        },
        paymentMethod: formData.paymentMethod,
      };
      const response = await axios.post("/orders", orderData);
      if (response.data.success) {
        toast.success("Захиалга амжилттай үүслээ!");
        clearCart();

        setTimeout(() => {
          router.push("/orders/success");
        }, 2000);
        setLoading(false);
      }
    } catch (error) {
      console.error("Захиалга үүсгэхэд алдаа гарлаа:", error);

      // Error message-г string болгож харуулах
      let errorMessage = "Захиалга үүсгэхэд алдаа гарлаа!";

      if (error.response?.status === 403) {
        errorMessage = "Нэвтрэх эрх хүрэлцэхгүй байна!";
      } else if (error.response?.status === 401) {
        errorMessage = "Нэвтрэх шаардлагатай!";
        setTimeout(() => router.push("/login"), 2000);
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Package className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Таны сагс хоосон байна
        </h2>
        <Button onClick={() => router.push("/books")} className="mt-4">
          Манга үзэх
        </Button>
      </div>
    );
  }

  if (cart.length === 0) return;
  return (
    <div className="max-w-4xl mx-auto px-7 md:px-6 lg:px-4 pt-16 md:pt-22 pb-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="group mb-3 text-white hover:text-black transition-colors hover:bg-white/90 text-[10px] md:text-xs lg:text-sm flex items-center gap-1 md:gap-2"
      >
        <ArrowLeft className="w-1 h-1 lg:w-4 lg:h-4  text-white group-hover:text-black transition-colors " />
        Буцах
      </Button>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-center text-white">
        Захиалга баталгаажуулах
      </h1>
      <div className="flex flex-col gap-6 ">
        <ShippingSection formData={formData} onChange={handleInputChange} />

        <PaymentSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <OrderSummary
          cart={cart}
          totalPrice={totalPrice}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
export default CheckoutForm;
