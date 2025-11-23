"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "../../Spinner";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { getImageUrl } from "../../../../utils/imageHelper";
import { Camera } from "lucide-react";

export default function BookDetail({ id }) {
  const [headerName, setHeaderName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleted, setDeleted] = useState(false);

  //zurag uurchluh state-uud
  const [imageFile, setImageFile] = useState(null); //user-iin songosn zurag
  const [imagePreview, setImagePreview] = useState(null);

  //butsah
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleType = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "author") {
      setAuthor(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  //zurag songoh
  const handleImageChange = (el) => {
    const file = el.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Зураг сонгоно уу");
      return;
    }

    setImageFile(file);

    //preview uusgeh //zurag servert ilgeegeegui browser dr haruulh
    const reader = new FileReader(); //zurgiig base64 data url bolgon huvirgh
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`books/${id}`);
      const data = await res.data;
      setName(data.data?.name || "");
      setHeaderName(data.data?.name || "");
      setAuthor(data.data?.author || "");
      setPrice(data.data?.price || "");
      setCategory(data.data?.category._id || "");
      setDescription(data.data?.description || "");
      setPhoto(data.data?.photo || "");
      //buh category tatah
      const categoriesRes = await axios.get("categories");
      console.log("🔍 Categories response:", categoriesRes.data); // ← НЭМЭХ
      console.log("🔍 Type:", typeof categoriesRes.data); // ← НЭМЭХ
      console.log("🔍 Is array?", Array.isArray(categoriesRes.data)); // ← НЭМЭХ
      setCategories(categoriesRes.data.data || []);

      setLoading(false);
      setError(null);
      console.log(data);
    } catch (err) {
      console.log(err);
      const errorMessage = err.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // Хэрэв шинэ зураг сонгосон бол upload хийнэ
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile); //file nertei imageFile nemeed backend-d req.file hlberer ochno

        //Axios PUT хүсэлт илгээнэ
        // Endpoint: books/:id/upload-photo Header-д multipart/form-data гэж заавал өгөх шаардлагатай
        // Backend энэ замаар зураг хадгална (жишээ нь Cloudinary, S3 гэх мэт)
        const response = await axios.put(`books/${id}/upload-photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // State шинэчлэх
        setPhoto(response.data.data);
        setImageFile(null);
        // setImagePreview(null);
      }

      await axios.put(`books/${id}`, {
        name,
        author,
        price,
        category,
        description,
      });
      setHeaderName(name);
      toast.success("Амжилттай хадгалагдлаа");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message || // "нэвтэрч байж энэ үйлдлийг хийх боломжтой"
        err.response?.data?.message ||
        err.message ||
        "Хадгалахад алдаа гарлаа";
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Та үнэхээр устгахыг хүсэж байна уу?");

    if (!isConfirmed) {
      console.log("Амжилтгүй");
      return;
    }

    try {
      setLoading(true);

      // Token байхгүй байсан ч хүсэлт явуулах
      const response = await axios.delete(`books/${id}`);

      console.log("Delete success:", response.data);
      toast.success("Ном амжилттай устгагдлаа");
      setDeleted(true);
    } catch (err) {
      console.log("Delete error:", err);
      console.log("Error response:", err.response?.data);

      //  Middleware-ээс ирсэн мессеж
      const errorMessage =
        err.response?.data?.error?.message || // "нэвтэрч байж энэ үйлдлийг хийх боломжтой!"
        err.response?.data?.message ||
        err.message ||
        "Устгахад алдаа гарлаа";

      toast.error(errorMessage);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (deleted) {
    return (
      <div className="container flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-xl font-semibold">Ном амжилттай устгагдлаа</p>
        <Button onClick={goBack}>Буцах</Button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center mt-8 gap-10">
        <h1 className="text-[30px] font-bold">{headerName}</h1>

        <div className="w-full flex gap-8 ">
          {photo && (
            <div className="w-[310px] shrink-0 flex flex-col items-center">
              <div className="w-[310px] h-96 overflow-hidden rounded-lg relative group">
                <img
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  src={imagePreview || getImageUrl(photo)}
                  alt={name}
                />
                //zurag solih ui
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Camera className="w-10 h-10 text-white" />
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-3">
            <label className="font-medium">Нэр</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleType}
              className="border p-2 rounded"
            />
            <label className="font-medium">Зохиолч</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleType}
              className="border p-2 rounded"
            />

            <label className="font-medium">Үнэ</label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleType}
              className="border p-2 rounded"
            />

            <label className="font-medium">Категори</label>
            <select
              name="category"
              value={category}
              onChange={handleType}
              className="border p-2 rounded"
            >
              <option value="">Сонгох...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="font-medium">Тайлбар</label>
            <textarea
              name="description"
              value={description}
              onChange={handleType}
              className="h-30 border p-2 rounded"
            />

            <div className="flex gap-2 ">
              <Button className="bg-black" onClick={goBack}>
                Буцах
              </Button>
              <Button className="bg-black" onClick={handleSave}>
                Хадгалах
              </Button>
              <Button className="bg-black" onClick={handleDelete}>
                Устгах
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
