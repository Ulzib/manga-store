"use client";
import Link from "next/link";
import { useToken } from "../navi/TokenLog";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import { ShoppingCart } from "lucide-react";

export default function UserNavBar() {
  const { token, handleLogout } = useToken();
  const router = useRouter();

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50);
    });
    router.replace("/login");
  };

  return (
    <nav className="flex items-center  gap-4 p-4 bg-white shadow">
      <Link href="/">Нүүр</Link>
      <Link href="/books">Номууд</Link>
      <Link href="/orders"> Миний захиалга</Link>
      <CartButton />
      {token ? (
        <>
          <Link href="/profile">Профайл</Link>
          <button onClick={logout}>Гарах</button>
        </>
      ) : (
        <Link href="/login">Нэвтрэх</Link>
      )}
    </nav>
  );
}
