"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Home, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2"> Захиалга амжилттай!</h1>

        <div className="space-y-3">
          <Button
            onClick={() => router.push("/orders")}
            className="w-full bg-blue-950 hover:bg-blue-800"
          >
            <Package className="w-4 h-4 mr-2" />
            Миний захиалгууд
          </Button>

          <Button
            onClick={() => router.push("/books")}
            variant="outline"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Нүүр хуудас
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default OrderSuccessPage;
