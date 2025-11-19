"use client";
import Link from "next/link";
import { useToken } from "../navi/TokenLog";
import { useRouter } from "next/navigation";

export default function AdminNavBar() {
  const { token, handleLogout } = useToken();
  const router = useRouter();

  // Түр userRole шалгалтыг устгах
  // if (userRole !== "admin" && userRole !== "operator") {
  //   return null;
  // }

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50);
    });
    router.replace("/login");
  };

  return (
    <nav className="flex gap-4 p-4 bg-white shadow">
      <Link href="/admin">Admin Home</Link>
      <Link href="/admin/books">Номын жагсаалт</Link>
      <Link href="/admin/books/create">Ном нэмэх</Link>
      {token ? (
        <button onClick={logout}>Гарах</button>
      ) : (
        <Link href="/login">Нэвтрэх</Link>
      )}
    </nav>
  );
}
