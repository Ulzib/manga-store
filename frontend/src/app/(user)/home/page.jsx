import BestSellers from "@/components/user/home/BestSellers";
import CategorySection from "@/components/user/home/CategorySection";
import FeaturedBooks from "@/components/user/home/FeaturedBooks";
import HeroCarousel from "@/components/user/home/HeroCarousel";
import MainCarousel from "@/components/user/home/MainCarousel";
import NewArrivals from "@/components/user/home/NewArrivals";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <MainCarousel>
        <HeroCarousel />
      </MainCarousel>
      <div className="flex flex-col justify-center items-center px-14">
        {/* <BestSellers />
        <FeaturedBooks />
        <CategorySection />
        <NewArrivals /> */}
      </div>
    </div>
  );
};
export default HomePage;
