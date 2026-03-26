"use client";
import { useState } from "react";
import axios from "../axios/axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ForgotPasswordModal = ({ onClose }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      return toast.error("Имэйл хаягаа оруулна уу");
    }
    setLoading(true);
    try {
      await axios.post("users/forgot-password", { email: forgotEmail });
      setForgotSent(true);
      toast.success("Имэйл амжилттай илгээгдлээ");
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Серверт холбогдсонгүй",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 hover:shadow-lg transition bg-gray-900/70 border-none text-white">
        <CardHeader>
          <CardTitle>Нууц үг сэргээх</CardTitle>
          <CardDescription className="text-gray-200">
            {forgotSent
              ? "Имэйл амжилттай илгээгдлээ"
              : "Бүртгэлтэй и-мэйл хаягаа оруулна уу"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {forgotSent ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-200">
                <strong>{forgotEmail}</strong> хаяг руу нууц үг сэргээх холбоос
                илгээлээ. Имэйлээ шалгана уу.
              </p>
              <Button
                onClick={onClose}
                className="bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors"
              >
                Хаах
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="И-Мэйл"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
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
                    {loading ? "Илгээж байна..." : "Илгээх"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onClose}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lghover:bg-gray-200 shadow-sm"
                  >
                    Болих
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default ForgotPasswordModal;
