"use client";

import { BookText, Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = ({ onSearchClick }) => {
  const pathname = usePathname();
  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const links = [
    {
      name: "Нүүр",
      path: "/",
      icon: <Home className="w-6 h-6" />,
    },
    {
      name: "Номууд",
      path: "/books",
      icon: <BookText className="w-6 h-6" />,
    },
    {
      name: "Захиалга",
      path: "/orders",
      icon: <ShoppingBag className="w-6 h-6" />,
    },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-xl border-t border-white/10 z-100 px-8 py-3 pb-safe">
      <div className="flex justify-between items-center text-white/50">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive(link.path) ? "text-white" : "hover:text-white"
            }`}
          >
            {link.icon}
            <span className="text-[10px] font-medium">{link.name}</span>
          </Link>
        ))}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1 transition-colors hover:text-white"
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Хайх</span>
        </button>
      </div>
    </div>
  );
};
export default BottomNav;
