"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "../../Spinner";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import DetailImage from "./DetailImage";
import DetailFields from "./DetailFields";
import DetailActions from "./DetailActions";

export default function BookDetail({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    category: "",
    description: "",
    photo: "",
  });
  const [headerName, setHeaderName] = useState("");
  const [imageFile, setImageFile] = useState(null); // Backend ruu yvulah file
  const [imagePreview, setImagePreview] = useState(null); // User-t haruulh preview

  // Input-n utga uurchlugduh burd formData-г shinechleh
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Anhnii ugugdul (nom bolon category) tataj avah
  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookRes, catRes] = await Promise.all([
        axios.get(`books/${id}`),
        axios.get("categories"),
      ]);
      const book = bookRes.data.data;
      setFormData({
        name: book.name,
        author: book.author,
        price: book.price,
        category: book.category?._id || "",
        description: book.description,
        photo: book.photo,
      });
      setHeaderName(book.name);
      setCategories(catRes.data.data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview uusgeh
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Herev shine zurag songosn bl ehleed zurgiig upload hiine
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const imgRes = await axios.put(`books/${id}/upload-photo`, fd);
        setFormData((prev) => ({ ...prev, photo: imgRes.data.data }));
      }
      // Nomiin medeellig shinechleh
      await axios.put(`books/${id}`, formData);
      setHeaderName(formData.name);
      toast.success("Амжилттай хадгалагдлаа");
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Та үнэхээр устгахыг хүсэж байна уу?")) return;
    try {
      setLoading(true);
      await axios.delete(`books/${id}`);
      toast.success("Ном амжилттай устгагдлаа");
      setDeleted(true);
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Устгахад алдаа гарлаа",
      );
    } finally {
      setLoading(false);
    }
  };
  // component achaalagdh ued data-g tatah
  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="container flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  if (deleted)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 pb-35">
        <p className="text-xl font-semibold">Ном амжилттай устгагдлаа</p>
        <Button onClick={() => router.back()}>Буцах</Button>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-start p-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="w-20 mb-6 text-black hover:bg-gray-600/30 text-sm ml-0"
      >
        <ArrowLeft className="w-4 h-4 text-black" /> Буцах
      </Button>

      <div className="mx-auto container lg:max-w-6xl flex flex-col gap-10">
        <h1 className="text-3xl font-bold">{headerName}</h1>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image component */}
          <DetailImage
            imagePreview={imagePreview}
            photo={formData.photo}
            name={formData.name}
            handleImageChange={handleImageChange}
          />
          <div className="flex-1">
            {/* talbaruudiin component */}
            <DetailFields
              formData={formData}
              categories={categories}
              handleChange={handleChange}
            />
            {/* button component */}
            <DetailActions
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
