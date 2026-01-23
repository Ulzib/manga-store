import Footer from "@/components/user/Footer";
import UserNavBar from "../../components/user/navigation/UserNavBar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <UserNavBar />
      <main className="flex-1 w-full max-w-full bg-black ">{children}</main>
      <Footer />
    </div>
  );
}
