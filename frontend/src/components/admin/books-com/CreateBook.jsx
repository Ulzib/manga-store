"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "../../axios/axios"; // Backend руу хүсэлт явуулах
import toast from "react-hot-toast"; // Мессеж харуулах

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Spinner from "../../Spinner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Номын нэр 2-оос доошгүй үсэгтэй байх ёстой.")
    .max(500, "Хэт урт байна"),
  author: z
    .string()
    .min(2, "Зохиолчийн нэр 2-оос доошгүй үсэгтэй байх ёстой.")
    .max(50, "Нэр хэт урт байна"),
  price: z.string().min(4, "Үнийн дүн 4-с доошгүй байх."),
  category: z.string().min(1, "Категори сонгоно уу"),
  description: z.string().min(30, "Тайлбарт дор хаяж 30 үг бичнэ үү"),
});

const CreateBook = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Категориудын жагсаалт
  const [imageFile, setImageFile] = useState(null); // Файл объект,  Backend руу илгээх файл
  const [imagePreview, setImagePreview] = useState(null); // Хэрэглэгчид зураг харуулах

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
      price: "",
      category: "",
      description: "",
    },
  });

  // Dropdown дотор категориуд харуулах
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("categories"); // GET /api/v1/categories
        setCategories(data.data); //state-d hadgalah
      } catch (error) {
        toast.error("Категори татахад алдаа гарав");
      }
    };
    fetchCategories();
  }, []); //component achaalagdh ued 1 uda ajillana

  const handleImageChange = (el) => {
    const file = el.target.files[0]; //songosn file
    //validation
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Зөвхөн зураг файл байна!");
        return;
      }
      setImageFile(file); //file hadgalah,  Backend ruu ilgeene
      //preview uusgene
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); //base64 zurag, user-d haruulah
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const onSubmit = async (values) => {
    setLoading(true);

    //nom uusgeh
    try {
      const { data } = await axios.post("books", {
        name: values.name,
        author: values.author,
        price: Number(values.price),
        description: values.description,
        category: values.category,
      });
      const bookid = data.data._id; //uussen nomiin ud
      toast.success("Ном амжилттай үүслээ");

      //zurag upload
      if (imageFile) {
        const formData = new FormData(); //file ilgeeh format
        formData.append("file", imageFile);

        await axios.put(`books/${bookid}/upload-photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Зураг амжилттай хадгалагдав");
      }

      setTimeout(() => router.push("/admin/books"), 1000);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Та нэвтэрнэ үү!");
      } else if (error.response?.status === 403) {
        toast.error("Ном нэмэх эрхгүй байна!");
      } else {
        toast.error(error.response?.data?.error?.message || "Алдаа гарлаа");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="max-w-5xl container ">
        <p className="text-4xl font-bold leading-2 text-center pb-10">
          Шинэ ном нэмэх
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between pt-10 "
          >
            <div className="flex flex-col gap-2">
              <FormLabel>Номын зураг</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 "
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className=" aspect-3/4  rounded-lg object-contain  w-full h-full"
                />
              )}
            </div>

            <div className="w-full h-auto pl-18 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номын нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Номын нэрийг оруулна уу" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Зохиолч</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Зохиолчийн нэрийг оруулна уу"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Үнэ (₮)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Үнийг оруулна уу"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категори</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Категори сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-6">
                <Button
                  type="button"
                  onClick={() => {
                    if (confirm("Та гарахдаа итгэлтэй байна уу?")) {
                      router.back();
                    }
                  }}
                >
                  Буцах
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? <Spinner /> : "Хадгалах"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBook;
