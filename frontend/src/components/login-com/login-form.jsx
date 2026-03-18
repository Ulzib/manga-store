"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../axios/axios";
import toast from "react-hot-toast";
import { useToken } from "../navi/TokenLog";
import Spinner from "../Spinner/index";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ForgotPasswordModal from "./LoginForgot";
import Link from "next/link";

const decodeToken = (token) => {
  try {
    if (!token) return null;
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const LoginForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const { handleLogin } = useToken();
  const router = useRouter();

  //cookie-ee checkleed redirect hiih
  useEffect(() => {
    const checkAuth = () => {
      const hasCookie = document.cookie.includes("book-token");
      if (hasCookie) {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("book-token="))
          ?.split("=")[1];
        const decoded = decodeToken(cookieToken);

        if (decoded?.role === "admin" || decoded?.role === "operator") {
          router.replace("/admin");
        } else {
          router.replace("/books");
        }
      } else {
        const hasLocalToken = localStorage.getItem("book-token");

        if (hasLocalToken) {
          const decoded = decodeToken(hasLocalToken);

          if (decoded?.role === "admin" || decoded?.role === "operator") {
            router.replace("/admin");
          } else {
            router.replace("/books");
          }
        } else {
          setLoading(false);
        }
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
      //Token decode hj role-r redirect
      const decoded = decodeToken(data.token);
      setTimeout(() => {
        if (decoded?.role === "admin" || decoded?.role === "operator") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      }, 200);
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Серверт холбогдож чадсангүй",
      );
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("users/guest-login");
      handleLogin(data.token);
      toast.success("Зочноор нэвтэрлээ");
      router.push("/home");
    } catch {
      toast.error("Нэвтрэх явцад алдаа гарлаа");
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
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="hover:shadow-lg transition bg-gray-900/70 border-none text-white">
        <CardHeader>
          <CardTitle>Нэвтрэх</CardTitle>
          <CardDescription>
            И-мэйл болон нууц үгээ оруулан нэвтэрнэ үү
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleClick}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">И-Мэйл</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border border-gray-600"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Нууц үг</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-400"
                  >
                    Нууц үгээ мартсан?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border border-gray-600"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90"
                >
                  Нэвтрэх
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white text-gray-700 
  border border-gray-300 
  px-6 py-2 rounded-lg
  hover:bg-gray-200
  shadow-sm"
                  onClick={handleGuestLogin}
                >
                  Зочноор нэвтрэх
                </Button>
                <FieldDescription className="text-center">
                  Шинэ хэрэглэгч болох{" "}
                  <Link
                    href="/register"
                    className="text-gray-200! transition-colors hover:text-gray-400!"
                  >
                    Бүртгүүлэх
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </div>
  );
};
export default LoginForm;
