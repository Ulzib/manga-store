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
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="absolute w-full max-w-md hover:shadow-lg transition bg-gray-900/70 border-none text-white">
        <CardHeader>
          <CardTitle>Нууц үг солих</CardTitle>
          <CardDescription>Шинэ нууц үгээ оруулна уу</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Input
                  id="password"
                  type="password"
                  placeholder="Шинэ нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-600"
                  required
                />
              </Field>
              <Field>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Шинэ нууц үгээ дахин оруулна уу"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-600"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90"
                >
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
