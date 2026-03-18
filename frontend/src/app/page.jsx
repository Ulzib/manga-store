"use client";

import { useToken } from "@/components/navi/TokenLog";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { token, userRole, loading } = useToken();
  const router = useRouter();

  //role shalgaad redirect

  useEffect(() => {
    // loading duusahiig huleeh
    if (loading) return;

    //token bga bol role shalgh
    if (token) {
      if (userRole === "admin" || userRole === "operator") {
        router.replace("/admin");
      } else {
        router.replace("/home");
      }
    } else {
      router.replace("/home");
    }
  }, [token, userRole, loading, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
};
export default Home;
