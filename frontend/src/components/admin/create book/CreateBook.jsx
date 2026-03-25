"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "../../axios/Axios"; // Backend руу хүсэлт явуулах
import toast from "react-hot-toast"; // Мессеж харуулах

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Spinner from "../../Spinner";

// Тусдаа үүсгэсэн компонентууд
import ImageUpload from "./ImageUpload";
import BookFormFields from "./BookFormFields";

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
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null); // file object,  Backend ruu ilgeeh file
  const [imagePreview, setImagePreview] = useState(null); // User-t image haruulah

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
  // Dropdown dotor categoruud haruulah
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
    <div className="w-full flex flex-col justify-center items-center">
      <div className="mx-auto container lg:max-w-6xl px-4">
        <p className="text-3xl font-bold mb-6">Шинэ ном нэмэх</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between pt-8 "
          >
            {/* Zurgiin heseg */}
            <ImageUpload
              imagePreview={imagePreview}
              handleImageChange={handleImageChange}
            />
            <div className="w-full">
              {/* Form talbaruud */}
              <BookFormFields form={form} categories={categories} />

              <div className="flex gap-6 pl-18 mt-4">
                <Button
                  type="button"
                  onClick={() => {
                    if (confirm("Та гарахдаа итгэлтэй байна уу?")) {
                      router.back();
                    }
                  }}
                  className="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 rounded-md"
                >
                  Буцах
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md"
                >
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
