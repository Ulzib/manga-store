import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OrderSummary = ({ cart, totalPrice, loading, handleSubmit }) => {
  return (
    <div className="container">
      <Card className="p-6 sticky top-6">
        <h2 className="text-xl font-semibold mb-4">Захиалгын дэлгэрэнгүй</h2>
        <div className="space-y-3 mb-4 divide-y">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-3 pb-3  ">
              <img
                src={item.photo || "placeholder.jpg"}
                alt={item.name}
                className="w-16 h-20 object-fill rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} × {item.price?.toLocaleString()}₮
                </p>
              </div>
              <p className="font-medium">
                {(item.price * item.quantity).toLocaleString()}₮
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-4 ">
          <div className="flex justify-between">
            <span>Нийт үнэ:</span>
            <span className="font-medium">{totalPrice.toLocaleString()}₮</span>
          </div>
          <div className="flex justify-between">
            <span>Хүргэлт:</span>
            <span className="font-medium text-green-600">Үнэгүй</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Нийт дүн:</span>
            <span>{totalPrice.toLocaleString()}₮</span>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-6 bg-blue-950 text-white rounded-xl hover:bg-blue-800 transition text-lg"
        >
          {loading ? "Илгээж байна..." : "Төлбөр төлөх"}
        </Button>
      </Card>
    </div>
  );
};
export default OrderSummary;
