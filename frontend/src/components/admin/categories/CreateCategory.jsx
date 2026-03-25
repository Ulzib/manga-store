"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import axios from "../../axios/Axios";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  description: z
    .string()
    .min(10, "Тайлбар хамгийн багадаа 10 тэмдэгт байх ёстой")
    .max(500, "Тайлбар хамгийн ихдээ 500 тэмдэгт байх ёстой"),
});

const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      //category uusgeh
      const { data } = await axios.post("categories", {
        name: values.name,
        description: values.description,
      });
      toast.success("Категори амжилттай үүслээ");

      setTimeout(() => router.push("/admin/categories"), 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || "Алдаа гарлаа";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Шинэ категори нэмэх</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Нэр */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категорийн нэр</FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ: Адал явдал" {...field} />
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
                  <Textarea
                    placeholder="Категорийн тухай товч тайлбар..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="bg-gray-800 text-white 
  border border-gray-700 
  hover:bg-gray-700 
   rounded-md"
            >
              Буцах
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white 
  hover:bg-indigo-500 
   rounded-md "
            >
              {loading ? <Spinner /> : "Хадгалах"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategory;
