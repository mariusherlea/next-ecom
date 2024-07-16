"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const uploadImages = (e) => {};

  const deleteImage = (public_id) => {};

  const createProduct = async (data) => {
    try {
      const response = await fetch(`{process.env.api}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(`Product "${data?.title}" created`);
        router.push("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fecthProducts = async (page = 1) => {
    try {
      const response = await fetch(
        `{process.env.api}/admin/product?page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        setCurrentPage(data?.currentPage);
        setTotalPages(data?.totalPages);
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `{process.env.api}/admin/product/${updatingProduct?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatingProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        toast.success(`Product "${data?.title}" updated`);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `{process.env.api}/admin/product/${updatingProduct?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        toast.success(`Product "${data?.title}" deleted`);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        updatingProduct,
        setUpdatingProduct,
        uploadImages,
        uploading,
        setUploading,
        createProduct,
        fecthProducts,
        updateProduct,
        deleteProduct,
        deleteImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
