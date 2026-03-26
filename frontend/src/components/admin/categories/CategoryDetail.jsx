"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "../../Spinner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт"),
  description: z
    .string()
    .min(10, "Тайлбар хамгийн багадаа 10 тэмдэгт")
    .max(500, "Тайлбар хамгийн ихдээ 500 тэмдэгт"),
});

const CategoryDetail = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`categories/${id}`);
      form.reset({
        name: data.data.name,
        description: data.data.description,
      });
    } catch (error) {
      toast.error("Алдаа гарлаа");
      router.push("/admin/categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`categories/${id}`, values);
      toast.success("Амжилттай шинэчлэгдлээ");
      form.reset({
        name: data.data.name,
        description: data.data.description,
      });

      setTimeout(() => router.push("/admin/categories"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Категори засах</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категорийн нэр</FormLabel>
                <FormControl>
                  <Input placeholder="Адал явдал" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тайлбар</FormLabel>
                <FormControl>
                  <Textarea placeholder="Тайлбар..." rows={4} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 rounded-md"
              onClick={() => router.back()}
            >
              Буцах
            </Button>
            <Button
              className="flex-1 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md "
              type="submit"
              disabled={loading}
              onSubmit={onSubmit}
            >
              {loading ? <Spinner /> : "Хадгалах"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CategoryDetail;
