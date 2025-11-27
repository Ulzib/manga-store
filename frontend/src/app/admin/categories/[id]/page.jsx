"use client";

import CategoryDetail from "@/components/admin/categories/CategoryDetail";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const { id } = useParams();
  return <CategoryDetail id={id} />;
};

export default EditCategoryPage;
