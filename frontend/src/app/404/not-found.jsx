"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="relative mb-4 select-none">
        <span
          className={`font-montserrat text-[10rem] md:text-[14rem] font-black leading-none text-white/10 ${
            glitch ? "translate-x-1 text-red-400/20" : ""
          } transition-transform duration-75`}
        >
          404
        </span>

        {glitch && (
          <span className="absolute inset-0 font-montserrat text-[10rem] md:text-[14rem] font-black leading-none text-cyan-400/20 -translate-x-1">
            404
          </span>
        )}
      </div>

      <div className="text-center relative z-10 -mt-8 md:-mt-16">
        <h1 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-3">
          Хуудас олдсонгүй
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-sm mx-auto">
          Таны хайж байгаа хуудас устгагдсан эсвэл алга байна.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/home"
            className="px-6 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-100 transition-colors"
          >
            Нүүр хуудас
          </Link>
          <Link
            href="/books"
            className="px-6 py-2.5 border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors"
          >
            Манганууд үзэх
          </Link>
        </div>
      </div>
    </div>
  );
}
