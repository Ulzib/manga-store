import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OrderSummary = ({ cart, totalPrice, loading, handleSubmit }) => {
  return (
    <div className="w-full">
      <Card className="p-6 sticky top-6 bg-gray-700/40 border-none text-white">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
          Захиалгын дэлгэрэнгүй
        </h2>
        <div className="space-y-3 ">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-3 pb-3  ">
              <img
                src={item.photo || "placeholder.jpg"}
                alt={item.name}
                className="w-14 h-18 md:w-16 md:h-20 object-fill rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-xs md:text-sm">{item.name}</p>
                <p className="text-xs md:text-sm text-gray-600">
                  {item.quantity} × {item.price?.toLocaleString()}₮
                </p>
              </div>
              <p className="font-medium text-sm md:text-[16px]">
                {(item.price * item.quantity).toLocaleString()}₮
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-4 ">
          <div className="flex justify-between">
            <span className="text-sm md:text-[16px]">Нийт үнэ:</span>
            <span className="font-medium text-sm md:text-[16px]">
              {totalPrice.toLocaleString()}₮
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm md:text-[16px]">Хүргэлт:</span>
            <span className="text-sm md:text-[16px] font-medium text-green-600">
              Үнэгүй
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-700">
            <span className="text-[17px] md:text-lg">Нийт дүн:</span>
            <span className="text-[17px] md:text-lg">
              {totalPrice.toLocaleString()}₮
            </span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-5 md:py-6 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl transition text-sm md:text-lg"
        >
          {loading ? "Илгээж байна..." : "Төлбөр төлөх"}
        </Button>
      </Card>
    </div>
  );
};
export default OrderSummary;
