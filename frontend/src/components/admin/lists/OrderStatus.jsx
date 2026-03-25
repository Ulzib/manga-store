import { CheckCircle, Clock, Package, XCircle } from "lucide-react";

const OrderStatusBadge = ({ status }) => {
  const getStatusStyle = (s) => {
    switch (s) {
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

  const getStatusIcon = (s) => {
    switch (s) {
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

  const statusLabels = {
    pending: "Хүлээгдэж байна",
    processing: "Боловсруулж байна",
    completed: "Дууссан",
    cancelled: "Цуцлагдсан",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusStyle(status)}`}
    >
      {getStatusIcon(status)}
      {statusLabels[status] || status}
    </span>
  );
};

export default OrderStatusBadge;
