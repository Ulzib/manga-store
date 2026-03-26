"use client";

import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { BookOpen, Layers, TrendingUp, Users } from "lucide-react";
import { Card } from "../../ui/card";

import Link from "next/link";
import Spinner from "@/components/Spinner";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    totalUsers: 0,
    recentBooks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        //nomiin too
        const booksRes = await axios.get("books?limit=1");
        const totalBooks = booksRes.data.pagination.total;
        //categoriin too
        const catsRes = await axios.get("categories?limit=1");
        const totalCategories = catsRes.data.pagination.total;
        //suuld nemegdsn nomuud
        const recentRes = await axios.get("books?limit=5&sort=-createdAt");
        const recentBooks = recentRes.data.data;
        //state refresh
        setStats({
          totalBooks,
          totalCategories,
          totalUsers: 0,
          recentBooks,
        });
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="container mx-auto px-3">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* niit nomuud*/}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Нийт манга</p>
                <p className="text-2xl font-bold">{stats.totalBooks}</p>
              </div>
            </div>
          </Card>
          {/* niit category*/}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Категори</p>
                <p className="text-2xl font-bold">{stats.totalCategories}</p>
              </div>
            </div>
          </Card>
          {/* Customers*/}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Хэрэглэгч</p>
                <p className="text-2xl font-bold">
                  {stats.totalUsers || "N/A"}
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Suuld nemegdsn nomuud*/}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold">Сүүлд нэмэгдсэн номууд</h2>
          </div>

          <div className="space-y-3">
            {stats.recentBooks.map((book) => (
              <Link
                key={book._id}
                href={`/admin/books/${book._id}`}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded transition"
              >
                {/* medeelel*/}
                <div className="flex-1">
                  <p className="font-medium">{book.name}</p>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                {/* category*/}
                {book.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {book.category.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/admin/books"
              className="text-blue-600 hover:underline text-sm"
            >
              Бүх мангаг харах →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
