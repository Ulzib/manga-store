import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "../../axios/axios";
import { getImageUrl } from "../../../../utils/imageHelper";

const DesktopSearch = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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
        console.error("Хайх явцад алдаа гарлаа: ", err);
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
    setShowDropDown(false);
    router.push(`/books/${id}`);
  };
  //remove dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
        if (!search) setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);
  return (
    <div className="hidden md:block">
      <form
        ref={dropdownRef}
        onSubmit={handleSearchSubmit}
        className="relative flex items-center justify-end transition-all duration-300 "
      >
        <div
          className={`flex items-center transition-all duration-300 rounded-full ${
            isSearchOpen ? "bg-white/10 w-40 sm:w-70 px-2" : "w-10 opacity-100"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-white"
          >
            <Search className="w-5 h-5 " />
          </button>

          <Input
            placeholder="Хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={` bg-transparent border-none ring-0 focus:ring-0 focus:outline-none text-white text-sm outline-none transition-all ${
              isSearchOpen ? "w-full ml-1" : "w-0 opacity-0"
            }`}
          />
        </div>

        {isSearchOpen && showDropDown && result.length > 0 && (
          <div className="absolute top-full right-0 mt-3 w-182 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md z-50">
            {result.map((book) => (
              <div
                key={book._id}
                className="flex items-center gap-4 p-3 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => handleSelectBook(book._id)}
              >
                {book.photo && (
                  <img
                    src={getImageUrl(book.photo)}
                    alt={book.name}
                    className="w-12 h-12 object-fill rounded-full"
                  />
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-white truncate">
                    {book.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
export default DesktopSearch;
