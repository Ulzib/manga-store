"use client";

import { useEffect, useState } from "react";
import axios from "../../axios/Axios";
import { Card } from "../../ui/card";
import { Package } from "lucide-react";
import Spinner from "../../Spinner";
import toast from "react-hot-toast";
import OrderItemCard from "./OrderCard";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Order tatah
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("orders");
        setOrders(response.data.data || []);
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Tuluv solih (Pending - Processing - Completed)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`orders/${orderId}`, { status: newStatus });
      // State shinechleh (desktop dr shuud haruulah)
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
      toast.success("Төлөв шинэчлэгдлээ");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Та энэ захиалгыг устгахдаа итгэлтэй байна уу?"))
      return;
    try {
      await axios.delete(`orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success("Захиалга амжилттай устгагдлаа!");
    } catch (err) {
      toast.error("Захиалга устгахад алдаа гарлаа!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="mx-auto container lg:max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Захиалгууд</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItemCard
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteOrder}
            />
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
