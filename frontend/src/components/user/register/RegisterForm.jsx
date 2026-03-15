"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "../../axios/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RegisterForm = ({ className, ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Талбаруудыг гүйцэт бөглөнө үү");
    }

    if (password !== confirmPassword) {
      return toast.error("Нууц үг таарахгүй байна");
    }

    setLoading(true);

    try {
      await axios.post("users/register", { name, email, password });
      toast.success("Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү");
      router.push("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message ||
          "Бүртгэл үүсгэхэд алдаа гарлаа. Серверт холбогдсонгүй",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Бүртгүүлэх</CardTitle>
          <CardDescription>
            {" "}
            Мэдээллээ оруулан шинэ бүртгэл үүсгэнэ үү
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Бүртгэл үүсгэж байна.." : "Бүргүүлэх"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Бүртгэлтэй юу?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Нэвтрэх
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterForm;
