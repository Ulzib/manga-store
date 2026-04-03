"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import axios from "../../axios/axios";

const CategroySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/categories?limit=6");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Алдаа гарлаа", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryImage = (categoryName, index) => {
    const img = {
      Спорт:
        "https://i.pinimg.com/736x/fa/56/2c/fa562cca84cc3a75e5aded9462a409ca.jpg",
      "Адал явдал":
        "https://cdn.magicdecor.in/com/2023/10/20180306/Dynamic-Action-Anime-Wallpaper-for-Wall.jpg",
      "Гэмт хэрэг, тулаант": "https://images8.alphacoders.com/374/374841.jpg",
      Инээдэм:
        "https://wallpaperbat.com/img/109955708-gintama-funny-anime-wallpaper.jpg",
      "Аймшиг-Триллер":
        "https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg",
      "Уран зөгнөл":
        "https://i.pinimg.com/736x/a4/d9/98/a4d998d074703ca2fd8c7fc5a9e5d779.jpg",
    };
    if (img[categoryName]) {
      return img[categoryName];
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-white md:text-center">
          Категори
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-42 rounded-lg bg-zinc-700/60 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-12">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-white md:text-center">
        Категори
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 ">
        {categories.map((cat, index) => (
          <Link
            key={cat._id}
            href={`/books?category=${cat._id}&categoryName=${encodeURIComponent(cat.name)}`}
          >
            <Card
              className="relative h-42 hover:scale-105 transition-transform shadow-lg cursor-pointer border-none "
              style={{
                backgroundImage: `url(${getCategoryImage(cat.name, index)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 transition-colors flex items-end justify-start  text-center p-5">
                <CardTitle className="text-sm md:text-base text-white">
                  {cat.name}
                </CardTitle>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CategroySection;
