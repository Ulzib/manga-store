"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import Spinner from "@/components/Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders/my");
        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Захиалга татахад алдаа гарлаа", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "processing":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Хүлээгдэж байна";
      case "processing":
        return "Боловсруулж байна";
      case "completed":
        return "Төлөгдсөн";
      case "cancelled":
        return "Цуцлагдсан";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Миний захиалгууд</h1>
        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray" />
            <p className="text-gray-600 mb-4">Захиалга алга байна</p>
            <Button
              onClick={() => router.push("/books")}
              className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800"
            >
              Манга үзэх
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <p>Захиалга #{order._id.slice(-6)}</p>
                      <span
                        className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <img
                            src={
                              getImageUrl(item.book?.photo) || "placeholder.jpg"
                            }
                            alt={item.book?.name}
                            className="w-12 h-16 object-fill rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {item.book?.name || "Манга"}
                            </p>
                            <p className="text-xs text-gray-600">
                              {item.quantity} × {item.price?.toLocaleString()}₮
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      {order.shippingAddress?.city},{""}
                      {order.shippingAddress?.district}, {""}
                      {order.shippingAddress?.address}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString("mn-MN")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Нийт дүн</p>
                    <p className="text-xl font-bold">
                      {order.totalAmount?.toLocaleString()}₮
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.paymentMethod === "cash"
                        ? "Дансаар"
                        : order.paymentMethod === "cart"
                        ? "Картаар"
                        : "QPay"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyOrdersPage;
