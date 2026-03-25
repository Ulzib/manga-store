"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MainCarousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isScrolling, setIsScrolling] = useState(false);
  // const mainCarouselRef = useRef(null);
  const slides = [
    {
      id: 1,
      image:
        "https://dw9to29mmj727.cloudfront.net/promo/2016/6981-WSJ2024_Issue04_05_PageHeader_2000x800-promo-a6zvBSyxs7ULOvusaAqbiw.jpg",
      title: "Шинэ гарсан манганууд",
      description: "2025 оны хамгийн их уншигдсан номуудтай танилцаарай",
      link: "/books?sort=-createdAt&limit=20",
    },
    {
      id: 2,
      image:
        "https://www.theindianbookstore.in/cdn/shop/collections/Mangas.jpg?v=1745283942",
      title: "Бестселлер номууд",
      description: "Ашиг орлогоороо тэргүүлж буй манганууд ",
      link: "/books?sort=-averageRating&limit=-20",
    },
    {
      id: 3,
      image:
        "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/10/jujutsu-kaisen-s-main-cast.jpg?w=1200&h=675&fit=crop",
      title: "Хар шидийн хүч",
      description:
        "Хүмүүсийг хорон муу аюулаас хамгаалдаг нууцлаг “жүжүцү” хэмээх илбийн сургууль оршин байдаг",
      link: "/books/6909f85adb21d1c1b9e0f689",
    },
    {
      id: 4,
      image:
        "https://www.animationmagazine.net/wordpress/wp-content/uploads/%E3%80%90BLUE-LOCK%E3%80%91Season-3-Announcement.jpg",
      title: "Blue lock",
      description:
        "Багийг ялалтад хөтлөх чадвартай, төгс довтлогч, жинхэнэ “Ace довтлогч” хэрэгтэй.",
      link: "/books/6909f85adb21d1c1b9e0f69b",
    },
    {
      id: 5,
      image: "https://miro.medium.com/1*2kA5cLxeTWH5XVlXm7FVFA.jpeg",
      title: "Haikyu",
      description:
        "Домогт тоглогч “Бяцхан аварга”-ыг үндэсний волейболын аваргад өрсөлдөж байхыг үзсэн цагаасаа хойш Хината Шоёо хэзээ нэгэн өдөр хамгийн шилдэг волейболын тоглогч болохыг мөрөөдөнө",
      link: "/books/6909f85adb21d1c1b9e0f68a",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => {
      if (prev === slides.length - 1) {
        return 0; //suuliin slide bol ehlel ruu butsah
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return slides.length - 1; //ehnii slide bol suul ruu ochih
      }
      return prev - 1;
    });
  };

  return (
    <div className=" relative w-full h-screen overflow-hidden bg-linear-to-b from-slate-900 to-slate-800 ">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0 z-10"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full z-0"
                  : "opacity-0 translate-x-full z-0"
            }`}
          >
            {/*background image*/}
            <div className="absolute inset-0 ">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-top lg:object-fill"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              {/*content*/}
              <div className="absolute inset-0 z-20 px-12 flex items-center pb-35 md:pb-35 sm:px-14 lg:px-20">
                <div className="w-full md:max-w-2xl text-white space-y-4 md:space-y-6 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm line-clamp-4 md:text-lg lg:text-xl text-gray-200">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block px-5 py-1.5 text-sm  md:px-8 md:py-3  bg-white text-black hover:bg-gray-500 hover:text-white rounded-lg font-semibold transition"
                  >
                    Дэлгэрэнгүй
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/50 text-white p-3 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/50 text-white p-3 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-36 md:bottom-64 left-1/2 -translate-x-1/2 z-20 flex gap-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          ></button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent">
        {children}
      </div>
    </div>
  );
};
export default MainCarousel;
