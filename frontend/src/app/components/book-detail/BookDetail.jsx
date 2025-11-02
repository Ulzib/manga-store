"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import axios from "../axios/axios";
import toast from "react-hot-toast";

export default function BookDetail({ id }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleted, setDeleted] = useState(false);

  //butsah
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleType = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`books/${id}`);
      const data = await res.data;
      setName(data.data?.name || "");
      setPrice(data.data?.price || "");
      setDescription(data.data?.description || "");
      setPhoto(data.data?.photo || "");
      setLoading(false);
      setError(null);
      console.log(data);
    } catch (err) {
      console.log(err);
      const errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const put = await axios.put(`books/${id}`, {
        name,
        price,
        description,
      });
      console.log(put);
      toast.success("Амжилттай хадгалагдлаа");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message || // "нэвтэрч байж энэ үйлдлийг хийх боломжтой"
        err.response?.data?.message ||
        err.message ||
        "Хадгалахад алдаа гарлаа";
      toast.error(errorMessage);
      console.log(errorMessage);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const isConfirmed = window.confirm("Та үнэхээр устгахыг хүсэж байна уу?");

    if (!isConfirmed) {
      console.log("Амжилтгүй");
      return;
    }

    try {
      setLoading(true);

      // Token байхгүй байсан ч хүсэлт явуулах
      const response = await axios.delete(`books/${id}`);

      console.log("Delete success:", response.data);
      toast.success("Ном амжилттай устгагдлаа");
      setDeleted(true);
    } catch (err) {
      console.log("Delete error:", err);
      console.log("Error response:", err.response?.data);

      //  Middleware-ээс ирсэн мессеж
      const errorMessage =
        err.response?.data?.error?.message || // "нэвтэрч байж энэ үйлдлийг хийх боломжтой!"
        err.response?.data?.message ||
        err.message ||
        "Устгахад алдаа гарлаа";

      toast.error(errorMessage);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (deleted) {
    return (
      <div className="container flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-xl font-semibold">Ном амжилттай устгагдлаа</p>
        <Button onClick={goBack}>Буцах</Button>
      </div>
    );
  }

  return (
    <div className="container ">
      <div className="flex flex-col items-center mt-8 gap-10">
        <h1 className="text-[30px] font-bold"> {name}</h1>

        <div className="w-full flex gap-8">
          {photo && (
            <div className="w-[310px] h-[384px] overflow-hidden rounded-lg flex-shrink-0 ">
              <img className="w-full h-full " src={photo} alt={name} />
            </div>
          )}
          <div className="w-full flex flex-col gap-3">
            <label className="font-medium">Нэр</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleType}
              className="border p-2 rounded"
            />
            <label className="font-medium">Үнэ</label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleType}
              className="border p-2 rounded"
            />
            <label className="font-medium">Тайлбар</label>
            <textarea
              name="description"
              value={description}
              onChange={handleType}
              className="h-30 border p-2 rounded"
            />
            <div className="flex gap-2">
              <Button className="bg-blue-900" onClick={goBack}>
                Буцах
              </Button>
              <Button className="bg-green-500" onClick={handleSave}>
                Хадгалах
              </Button>
              <Button className="bg-red-500 " onClick={handleDelete}>
                Устгах
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
