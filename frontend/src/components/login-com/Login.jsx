"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../axios/axios";
import toast from "react-hot-toast";
import { useToken } from "../navi/TokenLog";
import Spinner from "../Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleLogin } = useToken();
  const router = useRouter();

  //cookie-ee checkleed redirect hiih
  useEffect(() => {
    const checkAuth = () => {
      const hasCookie = document.cookie.includes("book-token");
      const hasLocalToken = localStorage.getItem("book-token");

      if (hasCookie || hasLocalToken) {
        router.replace("/books");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Имэйл, нууц үг оруулна уу");

    setLoading(true);
    try {
      const { data } = await axios.post("users/login", { email, password });
      handleLogin(data.token);
      toast.success("Амжилттай нэвтэрлээ");

      setTimeout(() => {
        router.push("/books");
      }, 200);
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Серверт холбогдож чадсангүй"
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Нэвтрэх</h1>
      <form className="flex flex-col gap-4" onSubmit={handleClick}>
        <input
          type="email"
          placeholder="Имэйл"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Нууц үг"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
        >
          Нэвтрэх
        </button>
      </form>
    </div>
  );
};

export default Login;
