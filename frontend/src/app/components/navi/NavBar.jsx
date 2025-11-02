"use client";
import Link from "next/link";
import Login from "../login-com/Login";
import { useToken } from "./TokenLog";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { token, handleLogout } = useToken();
  const router = useRouter();

  const logout = async () => {
    await new Promise((resolve) => {
      handleLogout();
      setTimeout(resolve, 50); // state шинэчлэгдэхийг 50ms хүлээх
    });
    router.replace("/login"); // login рүү redirect
  };
  return (
    <nav className="flex gap-4 p-4 bg-white shadow">
      {/* <Spinner /> */}
      <Link href="/">Home</Link>
      <Link href="/books">Books</Link>
      {/* <Link href="/books/detail">Book detail</Link> */}
      {token ? (
        <button onClick={logout}>Гарах</button>
      ) : (
        <Link href="/login">Нэвтрэх</Link>
      )}
    </nav>
  );
}
