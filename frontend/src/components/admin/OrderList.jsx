"use client";

import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Clock, Package, Trash2, XCircle } from "lucide-react";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("orders");
        setOrders(response.data.data || []);
      } catch (err) {
        console.log("Алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  // Tuluv solih
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`orders/${orderId}`, { status: newStatus });
      //state refresh
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.log("Алдаа гарлаа : ", err);
    }
  };

  //order arilgah
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Та энэ захиалгыг устгахдаа итгэлтэй байна уу?")) {
      return;
    }
    try {
      await axios.delete(`orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success("Захиалга амжилттай устгагдлаа!");
    } catch (err) {
      toast.error("Захиалга устгахад алдаа гарлаа!");
    }
  };

  //Tuluviin ugnu
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  //Tuluviin icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6"> Захиалгууд</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-6">
              <div className="flex items-start gap-4">
                {/* zahialgiin medeelel */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">
                      Захиалга #{order._id.slice(-6)}
                    </p>
                    <span
                      className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status === "pending"
                        ? "Хүлээгдэж байна"
                        : order.status === "processing"
                        ? "Боловсруулж байна"
                        : order.status === "completed"
                        ? "Дууссан"
                        : order.status === "cancelled"
                        ? "Цуцлагдсан"
                        : order.status}
                    </span>
                  </div>
                  {/* user */}
                  <p className="text-sm text-gray-600 mb-2">
                    Хэрэглэгч: {order.user?.name || "N/A"} ({order.user?.email})
                  </p>
                  {/* nomuud */}
                  <div className="space-y-1 mb-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        • {item.book?.name || "Манга"} × {item.quantity} =
                        {item.price}₮
                      </div>
                    ))}
                  </div>
                  {/* niit une */}
                  <p className="font-bold text-lg">
                    Нийт: {order.totalAmount}₮
                  </p>
                  {/* Ognoo */}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(order.createdAt).toLocaleString("mn-MN")}
                  </p>
                </div>
                {/* Тuluv uurchluh buttonuud */}
                <div className="flex flex-col gap-2">
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(order._id, "processing")
                        }
                      >
                        Боловсруулах
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleStatusChange(order._id, "cancelled")
                        }
                      >
                        Цуцлах
                      </Button>
                    </>
                  )}
                  {order.status === "processing" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(order._id, "completed")}
                    >
                      Дуусгах
                    </Button>
                  )}
                  {/* completed, cancelled zahialga arilgah*/}
                  {(order.status === "completed" ||
                    order.status === "cancelled") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 "
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {orders.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Захиалга байхгүй</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderList;
