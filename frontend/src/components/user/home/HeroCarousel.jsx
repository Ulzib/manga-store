"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const HeroCarousel = () => {
  const scrollRef = useRef(null);
  const router = useRouter();

  const profiles = [
    {
      id: 1,
      img: "https://i.pinimg.com/736x/47/8e/21/478e214eece850deea19bd37484a7441.jpg",
      link: "/books/6909f85adb21d1c1b9e0f68c",
    },
    {
      id: 2,
      img: "https://i1.sndcdn.com/artworks-000343540824-726wyi-t1080x1080.jpg",
      link: "/books/6909f85adb21d1c1b9e0f693",
    },
    {
      id: 3,
      img: "https://cdn.mos.cms.futurecdn.net/mpEEEAmXjDJnaD88wrHBiS.jpg",
      link: "/books/6909f85adb21d1c1b9e0f688",
    },
    {
      id: 4,
      img: "https://e0.pxfuel.com/wallpapers/347/705/desktop-wallpaper-ichigo-kurosaki-bleach-ichigo.jpg",
      link: "/books/6909f85adb21d1c1b9e0f68e",
    },
    {
      id: 5,
      img: "https://static0.cbrimages.com/wordpress/wp-content/uploads/2025/01/custom-image-of-luffy-from-one-piece.png?w=1600&h=900&fit=crop",
      link: "/books/6909f85adb21d1c1b9e0f68d",
    },
    {
      id: 6,
      img: "https://wallpapers.com/images/featured/doraemon-4k-xbhxhl6fbcdcaqz8.jpg",
      link: "/books/6909f85adb21d1c1b9e0f695",
    },
    {
      id: 7,
      img: "https://wallpapercave.com/wp/wp8194151.jpg",
      link: "/books/6909f85adb21d1c1b9e0f690",
    },
    {
      id: 8,
      img: "https://shirtplanet.com.ph/ssc/i/design_image/541403466/800/800/EFEFEF/2/1/Dragonball-Kid-Goku-Riding-Kintoun-Cloud-Clipart-Dragon-Ball.jpg",
      link: "/books/6909f85adb21d1c1b9e0f68b",
    },
    {
      id: 9,
      img: "https://fwmedia.fandomwire.com/wp-content/uploads/2024/07/14103658/soul-dismantle-jujutsu-kaisen-itadori-yuji.jpg",
      link: "/books/6909f85adb21d1c1b9e0f689",
    },
    {
      id: 10,
      img: "https://preview.redd.it/need-some-cool-gintoki-profile-pictures-v0-5tkp5ruawacb1.jpeg?width=750&format=pjpg&auto=webp&s=90175a8d0e74570a2f2b708b5805a8521238aaef",
      link: "/books/6909f85adb21d1c1b9e0f697",
    },
    {
      id: 11,
      img: "https://i.pinimg.com/736x/c4/8e/41/c48e41bdd7bbd16b606c7a5cfc32db0f.jpg",
      link: "/books/6909f85adb21d1c1b9e0f68a",
    },
    {
      id: 12,
      img: "https://wallpapersok.com/images/high/lightning-art-yusuke-from-yuyu-hakusho-6nkpsmj03qeq3gct.jpg",
      link: "/books/6909f85adb21d1c1b9e0f68f",
    },
    {
      id: 13,
      img: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2Fash-pikachu-pokemon-retire-protagonist-news-info-000.jpg?w=960&cbr=1&q=90&fit=max",
      link: "/books/6909f85adb21d1c1b9e0f692",
    },
    {
      id: 14,
      img: "https://i.redd.it/p74a91rmuq8b1.png",
      link: "/books/6909f85adb21d1c1b9e0f691",
    },
    {
      id: 15,
      img: "https://canvas-lb.tubitv.com/opts/ZkYcebbbQ1FiqQ==/21dc6014-fb3e-44b0-9dba-b4db513ffdb2/CJ4GEMADOgUxLjEuOA==",
      link: "/books/6909f85adb21d1c1b9e0f694",
    },
  ];

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full text-white py-4">
      {/* Хэвтээ гүйлгэх профайл зургууд */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            href={profile.link}
            className="shrink-0 w-26 h-26 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-full bg-gradient-to-tr from-gray-900 to-blue-700 hover:from-purple-700 hover:to-blue-500  p-1 cursor-pointer transition-transform"
          >
            {/* Дотор нь дугуй зураг */}
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
              <img
                src={profile.img}
                alt="profile"
                className="w-full h-full object-cover"
                onClick={() => router.push(profile.link)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/80 text-white rounded-full transition"
      >
        <ChevronLeft size={42} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:bg-white/80 text-white rounded-full transition"
      >
        <ChevronRight size={42} />
      </button>
    </section>
  );
};

export default HeroCarousel;
