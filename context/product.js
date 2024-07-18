"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Resizer from "react-image-file-resizer";
import { set } from "mongoose";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const uploadImages = (e) => {
    const files = e.target.files;
    let allUploadedFiles = updatingProduct
      ? updatingProduct?.images || []
      : product
      ? product?.images || []
      : [];

    if (files) {
      //check if there are more than 4 images
      const totalImages = allUploadedFiles?.length + files?.length;
      if (totalImages > 4) {
        toast.error("You can only upload 4 images");
        return;
      }
      setUploading(true);
      const uploadPromises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1280,
            1280,
            "JPEG",
            100,
            0,
            (uri) => {
              fetch(`${process.env.api}/admin/upload/image`, {
                method: "POST",
                body: JSON.stringify({
                  image: uri,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  allUploadedFiles.unshift(data);
                  resolve();
                })
                .catch((err) => {
                  console.log("image upload error=> ", err);
                  resolve();
                });
            },
            "base64"
          );
        });
        uploadPromises.push(promise);
      }
      Promise.all(uploadPromises)
        .then(() => {
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                images: allUploadedFiles,
              })
            : setProduct({ ...product, images: allUploadedFiles });
          setUploading(false);
        })
        .catch((err) => {
          console.log("image upload error=> ", err);
        });
    }
  };

  const deleteImage = (public_id) => {
    setUploading(true);
    fetch(`${process.env.api}/admin/upload/image/`, {
      method: "DELETE",
      body: JSON.stringify({ public_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedImages = updatingProduct?.images.filter(
          (image) => image.public_id !== public_id
        );
        updatingProduct
          ? setUpdatingProduct({ ...updatingProduct, images: updatedImages })
          : setProduct({ ...product, images: updatedImages });
        setUploading(false);
      });
  };

  const createProduct = async (data) => {
    try {
      const response = await fetch(`${process.env.api}/admin/product`, {
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
        `${process.env.api}/admin/product?page=${page}`,
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
        `${process.env.api}/admin/product/${updatingProduct?._id}`,
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
        `${process.env.api}/admin/product/${updatingProduct?._id}`,
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
