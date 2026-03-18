"use client";

import CategoryDetail from "@/components/admin/categories/CategoryDetail";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const { id } = useParams();
  return (
    <div className="pt-26">
      <CategoryDetail id={id} />
    </div>
  );
};

export default EditCategoryPage;
