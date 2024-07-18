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
      <p className="lead">{updatingProduct ? "Update" : "Create"} Product</p>
      <input
        type="text"
        placeholder="Title"
        value={updatingProduct ? updatingProduct?.title : product?.title}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
            : setProduct({ ...product, title: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <textarea
        rows="5"
        className="form-control p-2 mb-2"
        placeholder="Description"
        value={
          updatingProduct ? updatingProduct?.description : product?.description
        }
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                description: e.target.value,
              })
            : setProduct({ ...product, description: e.target.value })
        }
      ></textarea>
      <input
        type="number"
        placeholder="Price"
        min="1"
        className="form-control p-2 mb-2"
        value={updatingProduct ? updatingProduct?.price : product?.price}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                price: e.target.value,
              })
            : setProduct({ ...product, price: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Color"
        value={updatingProduct ? updatingProduct?.color : product?.color}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, color: e.target.value })
            : setProduct({ ...product, color: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <input
        type="text"
        placeholder="Brand"
        value={updatingProduct ? updatingProduct?.brand : product?.brand}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value })
            : setProduct({ ...product, brand: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <input
        type="number"
        placeholder="Stock"
        min="1"
        className="form-control p-2 mb-2"
        value={updatingProduct ? updatingProduct?.stock : product?.stock}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                stock: e.target.value,
              })
            : setProduct({ ...product, stock: e.target.value })
        }
      />
      <div className="form-group">
        <select
          name="category"
          className="form-control p-2 mb-2"
          onChange={(e) => {
            const categoryId = e.target.value;
            const categoryName =
              e.target.options[e.target.selectedIndex].getAttribute("name");
            const category = categoryId
              ? {
                  _id: categoryId,
                  name: categoryName,
                }
              : null;
            if (updatingProduct) {
              setUpdatingProduct({
                ...updatingProduct,
                category,
              });
            } else {
              setProduct({
                ...product,
                category,
              });
            }
          }}
          value={
            updatingProduct
              ? updatingProduct?.category?._id
              : product?.category?._id
          }
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option value={category._id} name={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {tags
          ?.filter(
            (ft) =>
              ft.parentCategory ===
              (updatingProduct?.category?._id || product?.category?._id)
          )
          ?.map((tag) => (
            <div className="form-check" key={tag?._id}>
              <input
                type="checkbox"
                value={tag?._id}
                onChange={(e) => {
                  const tagId = e.target.value;
                  const tagName = e.tag?.name;
                  let selectedTags = updatingProduct
                    ? [...(updatingProduct?.tags ?? [])]
                    : [...(product?.tags ?? [])];

                  if (e.target.checked) {
                    selectedTags.push({
                      _id: tagId,
                      name: tagName,
                    });
                  } else {
                    selectedTags = selectedTags.filter(
                      (st) => st._id !== tagId
                    );
                  }
                  if (updatingProduct) {
                    setUpdatingProduct({
                      ...updatingProduct,
                      tags: selectedTags,
                    });
                  } else {
                    setProduct({
                      ...product,
                      tags: selectedTags,
                    });
                  }
                }}
              />
              <label>{tag?.name}</label>
            </div>
          ))}
      </div>
      <div className="form-group mb-3">
        <label
          className={`btn btn-primary col-12 ${uploading ? "disabled" : ""}`}
        >
          {uploading ? "Processing" : "Upload Images"}
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={uploadImages}
            disabled={uploading}
          />
        </label>
      </div>
      <pre>
        {JSON.stringify(product, null, 4)}
        {/* {JSON.stringify(tags, null, 4)} */}
      </pre>
    </div>
  );
}
