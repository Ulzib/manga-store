"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../axios/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Нууц үг таарахгүй байна");
    }
    console.log("📤 Явуулж байгаа өгөгдөл:", { resetToken: token, password });
    setLoading(true);

    try {
      //backend ru token, new password yvulna
      await axios.post("users/reset-password", {
        resetToken: token,
        password,
      });
      toast.success("Нууц үг амжилттай солигдлоо");
      router.push("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Серверт холбогдсонгүй");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Нууц үг солих</CardTitle>
          <CardDescription>Шинэ нууц үгээ оруулна уу</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Шинэ нууц үг</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Дор хаяж 4 тэмдэгт оруулна уу"
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
                  {loading ? "Сольж байна" : "Нууц үг солих"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default ResetPasswordForm;
