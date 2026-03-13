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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Нууц үг сэргээх</CardTitle>
          <CardDescription>
            {forgotSent
              ? "Имэйл амжилттай илгээгдлээ"
              : "Бүртгэлтэй и-мэйл хаягаа оруулна уу"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {forgotSent ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                <strong>{forgotEmail}</strong> хаяг руу нууц үг сэргээх холбоос
                илгээлээ. Имэйлээ шалгана уу.
              </p>
              <Button onClick={onClose}>Хаах</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="forgot-email">И-Мэйл</FieldLabel>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="@gmail.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Илгээж байна..." : "Илгээх"}
                  </Button>
                  <Button variant="outline" type="button" onClick={onClose}>
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
