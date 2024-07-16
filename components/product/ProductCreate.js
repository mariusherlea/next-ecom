"use client";

import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";

export default function ProductCreate() {
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const { categories, fetchCategories } = useCategory();
  const { tags, fetchTags } = useTag();

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div className="container">
      Productcreate
      <pre>
        {JSON.stringify(categories, null, 4)}
        {JSON.stringify(tags, null, 4)}
      </pre>
    </div>
  );
}
