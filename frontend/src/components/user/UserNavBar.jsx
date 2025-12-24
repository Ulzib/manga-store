"use client";
import Link from "next/link";
import { useToken } from "../navi/TokenLog";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "../axios/axios";
import { Input } from "../ui/input";
import { getImageUrl } from "../../../utils/imageHelper";

export default function UserNavBar() {
  const { token, handleLogout } = useToken();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50);
    });
    router.replace("/login");
  };

  useEffect(() => {
    const fetchSearch = async () => {
      if (!search.trim()) {
        setResult([]);
        setShowDropDown(false);
        return;
      }
      try {
        const res = await axios.get(`/books?name=${search}&limit=5`);
        setResult(res.data.data || []);
        setShowDropDown(true);
      } catch (err) {
        console.log("Хайх явцад алдаа гарлаа: ", err);
      }
    };
    const delay = setTimeout(fetchSearch, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setShowDropDown(false);
      router.push(`/books?search=${search}`);
    }
  };

  const handleSelectBook = (id) => {
    setResult("");
    setShowDropDown(false);
    router.push(`/books/${id}`);
  };

  //remove dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-center items-center  gap-8 p-4 bg-white shadow ">
      <Link href="/">Нүүр</Link>
      <Link href="/books">Номууд</Link>
      <Link href="/orders"> Миний захиалга</Link>
      <CartButton />
      <form
        ref={dropdownRef}
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-lg mx-4 relative"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Ном хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />

          {showDropDown && result.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
              {result.map((book) => (
                <div
                  key={book._id}
                  className="flex gap-5 p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectBook(book._id)}
                >
                  {book.photo && (
                    <img
                      src={getImageUrl(book.photo)}
                      alt={book.name}
                      className="w-14 h-14 object-fill rounded-full flex-shrink-0 "
                    />
                  )}
                  <div className="flex flex-col        ">
                    <p className="font-medium">{book.name} </p>
                    {book.author && (
                      <p className="text-sm text-gray-500">{book.author}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {token ? (
        <>
          <Link href="/profile">
            <User
              className=" w-6 h-6  text-black hover:text-gray-400
      rounded-full transition duration-200"
            />
          </Link>
          <button onClick={logout}>Гарах</button>
        </>
      ) : (
        <Link href="/login">Нэвтрэх</Link>
      )}
    </nav>
  );
}
