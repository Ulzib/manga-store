"use client";
import Link from "next/link";
import { useToken } from "../../navi/TokenLog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "../../axios/axios";
import { getImageUrl } from "../../../../utils/imageHelper";
import { useRef } from "react";

const AdminNavBar = () => {
  const { token, handleLogout } = useToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50);
    });
    router.replace("/login");
  };

  //input dr bichih burd realtime search
  useEffect(() => {
    const fetchSearch = async () => {
      if (!search.trim()) {
        setResult([]);
        setShowDropdown(false);
        return;
      }
      try {
        const res = await axios.get(`books?name=${search}&limit=5`);

        setResult(res.data.data || []); //result hadgalah
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    };
    const delay = setTimeout(fetchSearch, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setShowDropdown(false);
      router.push(`/admin/books?search=${search}`);
    }
  };

  //result grsn book songood orno
  const handleSelectBook = (id) => {
    setSearch("");
    setShowDropdown(false);
    router.push(`/admin/books/${id}`);
  };

  //remove dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50  gap-4 p-4  bg-gray-800 backdrop-blur-md shadow-lg text-white">
      <div className="flex w-full mx-auto px-4 sm:px-2 lg:px-4  items-center justify-between h-8 md:h-12 container">
        <div className="flex items-center gap-10">
          <Link href="/admin">Admin Home</Link>
          <Link href="/admin/books">Номын жагсаалт</Link>
          <Link href="/admin/books/create">Ном нэмэх</Link>
          <Link href="/admin/categories">Категори</Link>
          <Link href="/admin/users">Хэрэглэгчид</Link>
          <Link href="/admin/orders">Захиалга</Link>
        </div>

        <form
          ref={dropdownRef}
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md mx-4 relative"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Ном хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 "
            />

            {showDropdown && result.length > 0 && (
              <div className="absolute right-0 lg:left-0  mt-1 bg-gray-800 border rounded shadow-lg max-h-60 overflow-y-auto z-50 border-none min-w-52">
                {result.map((book) => (
                  <div
                    key={book._id}
                    className="flex gap-5 p-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelectBook(book._id)}
                  >
                    {book.photo && (
                      <img
                        src={getImageUrl(book.photo)}
                        alt={book.name}
                        className="w-16 h-16 object-fill rounded-full flex-shrink-0 "
                      />
                    )}
                    <div className="flex flex-col">
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
          <button onClick={logout}>Гарах</button>
        ) : (
          <Link href="/login">Нэвтрэх</Link>
        )}
      </div>
    </nav>
  );
};
export default AdminNavBar;
