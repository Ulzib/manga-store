"use client";
import Link from "next/link";
import { useToken } from "../../navi/TokenLog";
import { usePathname, useRouter } from "next/navigation";
import CartButton from "../CartButton";
import { CircleUserRound, Heart, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import MobileSearch from "./MobileSearch";
import DesktopSearch from "./DesktopSearch";

export default function UserNavBar() {
  const { token, handleLogout } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/" || pathname === "/home";

  //scroll hiihed navbar ungu solih
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50);
    });
    router.replace("/home");
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navLinkClass =
    "relative pb-1 transition-colors hover:text-white/90 group";
  const underlineClass = (path) =>
    `absolute bottom-0 left-0 w-full h-0.5 bg-white transition-opacity duration-500 ease-in-out ${
      isActive(path) ? "opacity-100" : "opacity-0 group-hover:opacity-50"
    }`;

  const navbarBg = () => {
    if (!isHomePage) return "bg-gray-900/90 backdrop-blur-md shadow-lg";
    return isScrolled
      ? "bg-gray-900/90 shadow-lg backdrop-blur-md"
      : "bg-transparent";
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 flex gap-6 py-4  ${navbarBg()}`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-14 flex items-center justify-between h-8 md:h-12 ">
          <Link
            href="/"
            className="flex sm:text-xl md:text-2xl font-black text-white shrink-0"
          >
            Panel
          </Link>
          <div className="hidden md:flex items-center md:ml-auto gap-7 text-white font-medium  uppercase tracking-wider">
            <Link href="/" className={navLinkClass}>
              Нүүр
              <span className={underlineClass("/")}></span>
            </Link>
            <Link href="/books" className={navLinkClass}>
              Номууд
              <span className={underlineClass("/books")}></span>
            </Link>
            <Link href="/orders" className={navLinkClass}>
              Миний захиалга
              <span className={underlineClass("/orders")}></span>
            </Link>
          </div>
          <div className="flex ml-auto items-center gap-3 md:gap-7">
            <DesktopSearch />

            <CartButton />
            {token && (
              <Link href="/wishlist" className="block">
                <Heart className="w-5 h-5 md:w-6 md:h-6 hover:fill-white hover:text-white transition-all text-white" />
              </Link>
            )}

            {token ? (
              <div className="relative group block">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-gray-100 cursor-pointer" />

                <div className="absolute right-0 top-full opacity-0 invisible group-hover:opacity-100 pt-4 group-hover:visible transition-all ">
                  <div className="w-48 bg-gray-900 overflow-hidden border border-white/10  rounded-lg shadow-xl text-white">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                    >
                      <CircleUserRound className="w-4 h-4 text-white" />
                      Профайл
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm  text-white hover:bg-white/10 transition"
                    >
                      <LogOut className="w-4 h-4 text-white" />
                      Гарах
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm font-semibold text-white px-4 py-2 rounded-lg hover:text-blue-900 transition"
              >
                Нэвтрэх
              </Link>
            )}
          </div>
        </div>
      </nav>
      <BottomNav onSearchClick={() => setIsMobileSearchOpen(true)} />
      <MobileSearch
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />
    </>
  );
}
