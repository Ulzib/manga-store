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
      console.log("🔄 useEffect: Token шалгаж байна..."); // ← НЭМЭХ

      const hasCookie = document.cookie.includes("book-token");
      console.log("🍪 useEffect: Cookie байгаа эсэх:", hasCookie); // ← НЭМЭХ

      if (hasCookie) {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("book-token="))
          ?.split("=")[1];

        console.log(
          "🔍 useEffect: Cookie token:",
          cookieToken?.substring(0, 50) + "...",
        ); // ← НЭМЭХ

        const decoded = decodeToken(cookieToken);
        console.log("🔍 useEffect: Decoded from cookie:", decoded); // ← НЭМЭХ
        console.log("🔍 useEffect: Role from cookie:", decoded?.role); // ← НЭМЭХ

        if (decoded?.role === "admin" || decoded?.role === "operator") {
          console.log("➡️ useEffect: Admin руу redirect"); // ← НЭМЭХ
          router.replace("/admin/books");
        } else {
          console.log("➡️ useEffect: User руу redirect"); // ← НЭМЭХ
          router.replace("/books");
        }
      } else {
        const hasLocalToken = localStorage.getItem("book-token");
        console.log(
          "💾 useEffect: LocalStorage token байгаа эсэх:",
          !!hasLocalToken,
        ); // ← НЭМЭХ

        if (hasLocalToken) {
          const decoded = decodeToken(hasLocalToken);
          console.log("🔍 useEffect: Decoded from localStorage:", decoded); // ← НЭМЭХ
          console.log("🔍 useEffect: Role from localStorage:", decoded?.role); // ← НЭМЭХ

          if (decoded?.role === "admin" || decoded?.role === "operator") {
            console.log("➡️ useEffect: Admin руу redirect"); // ← НЭМЭХ
            router.replace("/admin/books");
          } else {
            console.log("➡️ useEffect: User руу redirect"); // ← НЭМЭХ
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
    console.log("🚀 Login button дарагдлаа");
    if (!email || !password) return toast.error("Имэйл, нууц үг оруулна уу");

    setLoading(true);
    console.log("📤 API дуудаж байна...");
    try {
      const { data } = await axios.post("users/login", { email, password });
      console.log("✅ API response:", data);
      handleLogin(data.token);
      toast.success("Амжилттай нэвтэрлээ");
      //Token decode hj role-r redirect
      const decoded = decodeToken(data.token);

      console.log("🔍 Decoded token:", decoded); // ← Энийг нэмээрэй
      console.log("🔍 Role:", decoded?.role);
      setTimeout(() => {
        if (decoded?.role === "admin" || decoded?.role === "operator") {
          console.log("➡️ Admin хэсэг рүү явна");
          router.push("/admin/books");
        } else {
          console.log("➡️ User хэсэг рүү явна");
          router.push("/home");
        }
      }, 200);
    } catch (err) {
      console.error("❌ Login алдаа:", err);
      toast.error(
        err.response?.data?.error?.message || "Серверт холбогдож чадсангүй",
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
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
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Нэвтрэх</Button>
                <Button variant="outline" type="button">
                  Gmail-р нэвтрэх
                </Button>
                <FieldDescription className="text-center">
                  Шинэ хэрэглэгч болох <a href="#">Бүртгүүлэх</a>
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
