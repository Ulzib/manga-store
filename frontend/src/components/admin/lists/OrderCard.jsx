import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import OrderStatusBadge from "./OrderStatus";

const OrderItemCard = ({ order, onStatusChange, onDelete }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        {/* undsen medeelel */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-medium">Захиалга #{order._id.slice(-6)}</p>
            <OrderStatusBadge status={order.status} />
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Хэрэглэгч: {order.user?.name || "N/A"} ({order.user?.email})
          </p>

          {/* book lists */}
          <div className="space-y-1 mb-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="text-sm">
                • {item.book?.name || "Манга"} × {item.quantity} = {item.price}₮
              </div>
            ))}
          </div>

          <p className="font-bold text-lg">Нийт: {order.totalAmount}₮</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(order.createdAt).toLocaleString("mn-MN")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {order.status === "pending" && (
            <>
              <Button
                size="sm"
                onClick={() => onStatusChange(order._id, "processing")}
              >
                Боловсруулах
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onStatusChange(order._id, "cancelled")}
              >
                Цуцлах
              </Button>
            </>
          )}
          {order.status === "processing" && (
            <Button
              size="sm"
              onClick={() => onStatusChange(order._id, "completed")}
            >
              Дуусгах
            </Button>
          )}
          {(order.status === "completed" || order.status === "cancelled") && (
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:bg-red-50"
              onClick={() => onDelete(order._id)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderItemCard;
