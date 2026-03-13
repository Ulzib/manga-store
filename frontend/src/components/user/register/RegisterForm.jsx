"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
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
import { cn } from "@/lib/utils";

// Бүртгүүлэх форм компонент
const RegisterForm = ({ className, ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Бүртгүүлэх товч дарахад ажиллана
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Талбар хоосон байвал алдаа гарна
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Бүх талбарыг бөглөнө үү");
    }

    // Нууц үг таарахгүй бол алдаа гарна
    if (password !== confirmPassword) {
      return toast.error("Нууц үг таарахгүй байна");
    }

    setLoading(true);
    try {
      // Backend-д бүртгүүлэх хүсэлт илгээнэ
      await axios.post("users/register", { name, email, password });
      toast.success("Амжилттай бүртгүүллээ! Нэвтэрнэ үү.");
      router.push("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Серверт холбогдож чадсангүй",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Бүртгүүлэх</CardTitle>
          <CardDescription>
            Мэдээллээ оруулан шинэ бүртгэл үүсгэнэ үү
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Нэр */}
              <Field>
                <FieldLabel htmlFor="name">Нэр</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Таны нэр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              {/* И-мэйл */}
              <Field>
                <FieldLabel htmlFor="email">И-Мэйл</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {/* Нууц үг */}
              <Field>
                <FieldLabel htmlFor="password">Нууц үг</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Дор хаяж 4 тэмдэгт"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {/* Нууц үг давтах */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Нууц үг давтах
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Нууц үгээ дахин оруулна уу"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Field>

              {/* Товчнууд */}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
                </Button>
                <FieldDescription className="text-center">
                  Бүртгэлтэй юу?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Нэвтрэх
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
