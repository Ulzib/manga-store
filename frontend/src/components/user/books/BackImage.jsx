import React from "react";

const BACKGROUND_IMAGES = {
  "6909f85adb21d1c1b9e0f688":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllKso7ptc3CXpRojeavWxqIP8vhzcS-Kqvw&s",
  "6909f85adb21d1c1b9e0f68a":
    "https://m.media-amazon.com/images/I/71EfETmQu2L.jpg",
  "6909f85adb21d1c1b9e0f689":
    "https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg",
  "6909f85adb21d1c1b9e0f68b": "https://images2.alphacoders.com/100/1003880.png",
  "6909f85adb21d1c1b9e0f68c":
    "https://images.alphacoders.com/137/thumb-1920-1370952.png",
  "6909f85adb21d1c1b9e0f68d":
    "https://images5.alphacoders.com/132/thumb-1920-1329624.png",
  "6909f85adb21d1c1b9e0f68e":
    "https://www.desktophut.com/images/1723805329.webp",
  "6909f85adb21d1c1b9e0f68f":
    "https://closetfullofnotebooks.com/wp-content/uploads/2019/10/yyhgroup3.jpg?w=1100",
  "6909f85adb21d1c1b9e0f690":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoV-t8ugC_adSZe1LA_JVSEjcRY3ZxrnhdSQ&s",
  "6909f85adb21d1c1b9e0f692":
    "https://images.template.net/375613/Pokemon-Environment-Background-Template-edit-online.jpg",
  "6909f85adb21d1c1b9e0f693":
    "https://image.idntimes.com/post/20240924/1727178624575-picsay-5dde684707a9bd341a7748e3998a2af9.jpg",
  "6909f85adb21d1c1b9e0f695":
    "https://s1.bwallpapers.com/wallpapers/2014/03/18/doraemon-wallpaper_062453982.jpg",
  "6909f85adb21d1c1b9e0f694":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-AIR2QCWnB2d25b9fZN5d8joIDodz8qvgOA&s",
  "6909f85adb21d1c1b9e0f697":
    "https://wallpapers.com/images/high/gintama-gintoki-with-dreadful-face-bbtjpgacfl4hna36.webp",
  "6909f85adb21d1c1b9e0f698":
    "https://a.storyblok.com/f/178900/640x360/a47c43c36b/635b0683a0b180f6190ed22dd8cf44551551122511_full.png/m/640x360",
  "6909f85adb21d1c1b9e0f699":
    "https://preview.redd.it/kuroko-no-basket-characters-compared-to-nba-players-pt-2-v0-vxq2bliy26fc1.jpeg?width=640&crop=smart&auto=webp&s=49c9f8d97e4b3a3438da52c0c50fea7f3bc4300c",
  "6909f85adb21d1c1b9e0f69b":
    "https://m.media-amazon.com/images/S/pv-target-images/cf60d92b2209f9756035d09ccedcb22a7422db3a56297dc90fc89dcfda6368d1._SX1080_FMjpg_.jpg",
  "6909f85adb21d1c1b9e0f69c":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeaWY2rHBnlXn_BywRiDS9C0xJhQZi83fhrg&s",
  "6909f85adb21d1c1b9e0f69a":
    "https://m.media-amazon.com/images/M/MV5BOWQyMGE3NzAtMDYxNS00ZTc5LTgwY2UtYWEwNzc5NzFjNmM4XkEyXkFqcGc@._V1_.jpg",
  "6909f85adb21d1c1b9e0f69d":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqugDDG-sM2EbrdEwkgo4mctifDqMj0ZTmrA&s",
  "6909f85adb21d1c1b9e0f69e":
    "https://wallpapers-clan.com/wp-content/uploads/2025/06/chainsaw-man-power-celestial-demon-desktop-wallpaper-cover.jpg",
  "6909f85adb21d1c1b9e0f69f":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXpm0okBiqb8Djl2lHd7L53aaP2STr-NrWQ&s",
  "6909f85adb21d1c1b9e0f6a0":
    "https://wallup.net/wp-content/uploads/2017/10/25/490225-Nodame_Cantabile-Noda_Megumi-Chiaki_Shin039ichi.jpg",
  "6909f85adb21d1c1b9e0f691":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsRyG2UPY0smRGy5ngSxQ1SxPfP8ylbTAhNw&s",
  "6909f85adb21d1c1b9e0f696":
    "https://www.abystyle.com/img/c/m/208_S_HunterXHunter.jpg",
  "690f8d6d12f599eabf3a83e6":
    "https://images.alphacoders.com/114/thumb-1920-1140929.jpg",
  "690f8de112f599eabf3a83fb":
    "https://www.indiewire.com/wp-content/uploads/2016/12/8your-name.jpg",
  "69200a4bcdb1567081af4118":
    "https://4kwallpapers.com/images/walls/thumbs/19127.jpg",
  "692010eacdb1567081af41ac":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptRr-I0YOgXz-5OAycWedKM4hmfzMJOuwuQ&s",
  "693828fc0bf6122004e7d0d9":
    "https://images2.alphacoders.com/754/thumb-1920-754789.jpg",
  "6980adbb14f2afce1fb2165c":
    "https://static.zerochan.net/Uchuu.Kyoudai.full.3621270.jpg",
  "6980b00914f2afce1fb2167f":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVtvhuUX1Dc6jQZIzL-VPitrO1KvULhg-Zg&s",
  "6980b46214f2afce1fb216f2":
    "https://img.filmsactu.net/datas/films/n/i/nicky-larson-et-le-parfum-de-cupidon/xl/nicky-larson-et-le-parfum-de-cupidon-5e7c8155e7884.jpg",
  "6981be4014f2afce1fb21784":
    "https://i.pinimg.com/736x/42/e9/dc/42e9dca45562ba71d7a96f5db6185deb.jpg",
  "6981c00d14f2afce1fb2179f":
    "https://i.pinimg.com/736x/f8/85/0b/f8850b34518e4b95df1665b6d92f480f.jpg",
  default:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKl-LDNSx_Omjq0zIt5cPpLDq3X5s_8L6gHw&s",
};

const BookBackground = ({ bookId }) => {
  const bgImage = BACKGROUND_IMAGES[bookId] || BACKGROUND_IMAGES["default"];

  return (
    <div className="opacity-0 md:opacity-100 absolute inset-0 z-0 pointer-events-none overflow-hidden ">
      <img
        src={bgImage}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "blur(5px) brightness(0.5)",
        }}
      />
    </div>
  );
};

export default BookBackground;
