import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Компанийн мэдээлэл */}
        <div>
          <h3 className="text-white font-bold text-xl mb-4">Manga Store</h3>
          <p className="text-sm leading-relaxed">
            Монгол дахь хамгийн том manga, комикс, номын дэлгүүр. Таны дуртай
            manga-г хүргэж өгнө.
          </p>
        </div>

        {/* Холбоосууд */}
        <div>
          <h4 className="text-white font-semibold mb-4">Холбоосууд</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/books"
                className="hover:text-white transition-colors"
              >
                Бүх номууд
              </Link>
            </li>
            <li>
              <Link
                href="/books?sort=-createdAt"
                className="hover:text-white transition-colors"
              >
                Шинэ номууд
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="hover:text-white transition-colors"
              >
                Миний захиалга
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="hover:text-white transition-colors"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Үйлчилгээ */}
        <div>
          <h4 className="text-white font-semibold mb-4">Үйлчилгээ</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Хүргэлтийн үйлчилгээ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Буцаалт & Солилт
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Нууцлалын бодлого
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Үйлчилгээний нөхцөл
              </a>
            </li>
          </ul>
        </div>

        {/* Холбоо барих */}
        <div>
          <h4 className="text-white font-semibold mb-4">Холбоо барих</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-gray-500">📧</span>
              <span>info@mangastore.mn</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500">📞</span>
              <span>+976 7777-7777</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-500">📍</span>
              <span>Улаанбаатар хот, Монгол Улс</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Manga Store. Бүх эрх хуулиар
          хамгаалагдсан.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
