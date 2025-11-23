"use client";

import { Button } from "@/components/ui/button";
import axios from "../../axios/axios";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("categories");
      setCategories(res.data.data || []);
    } catch (err) {
      toast.error("Категори татахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" категорийг устгах уу?`)) return;

    try {
      await axios.delete(`categories/${id}`);
      toast.success("Амжилттай устгагдлаа");
      fetchCategories();
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Устгахад алдаа гарлаа"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl container flex flex-col justify-between p-6">
      <h1 className="text-3xl font-bold p-3">Категори</h1>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-end pb-4 px-2 md:px-0 ">
        <Link href="/admin/categories/create" className="w-full md:w-auto">
          <Button className="hover:bg-gray-500">+ Шинэ категори нэмэх</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cate) => (
          <div key={cate.id} className="border rounded-lg p-4 ">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{cate.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {cate.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2 ">
              <Link href={`/admin/categories/${cate._id}`}>
                <Button className="hover:bg-gray-500 transition">Засах</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(cate._id, cate.name)}
                className="hover:bg-red-400  transition"
              >
                Устгах
              </Button>
            </div>
          </div>
        ))}
      </div>
      {categories.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Одоогоор категори алга
        </p>
      )}
    </div>
  );
};

export default CategoryList;
