import { Search, X } from "lucide-react";
import axios from "../../axios/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { getImageUrl } from "../../../../utils/imageHelper";

const MobileSearch = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSearch = async () => {
      if (!search.trim()) {
        setResult([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`/books?name=${search}&limit=10`);
        setResult(res.data.data || []);
      } catch (err) {
        console.error("Хайх явцад алдаа гарлаа: ", err);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSearch, 400);
    return () => clearTimeout(delay);
  }, [search]);
  //overlay haagdahad hailtiin utgiig tseverlene
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setResult([]);
    }
  }, [isOpen]);
  //Form submit hiihed buren hailtiin huudas ru shiljine
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onClose();
      router.push(`/books?search=${search}`);
    }
  };

  const handleSelectBook = (id) => {
    onClose();
    router.push(`/books/${id}`);
  };

  //herev overlay neegdegui bol harulahgui
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-100 bg-black/95 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur-lg border-b border-white/10 p-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3"
          >
            <div className="shrink-0 text-white">
              <Search className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Хайх"
              autoFocus
              className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-400 outline-none"
            />

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto pb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : result.length > 0 ? (
            // Result list
            <div className="p-4">
              <h2 className="text-white font-bold text-lg mb-4">
                Үр дүн ({result.length})
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {result.map((book) => (
                  <div
                    key={book._id}
                    onClick={() => handleSelectBook(book._id)}
                    className="flex flex-col gap-2 cursor-pointer"
                  >
                    {book.photo ? (
                      <img
                        src={getImageUrl(book.photo)}
                        alt={book.name}
                        className="w-full aspect-2/3 object-cover rounded-lg"
                      />
                    ) : (
                      // zuraggui bl:
                      <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs">
                          Зураг байхгүй
                        </span>
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {book.name}
                      </p>
                      <p className="text-gray-400 text-[10px] truncate">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : search.trim() ? (
            //  No result
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Search className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-white font-medium mb-1">Үр дүн олдсонгүй</p>
              <p className="text-gray-400 text-sm">
                "{search}" хайлтаар үр дүн олдсонгүй
              </p>
            </div>
          ) : (
            // Empty state
            <div className="p-4">
              <h2 className="text-white font-bold text-lg mb-4">Эрэлт ихтэй</h2>
              <p className="text-gray-400 text-sm">
                Дээд талын хайлтын талбарт хайлт хийнэ үү
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobileSearch;
