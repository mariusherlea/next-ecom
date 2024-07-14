"use client";
import { useTag } from "@/context/tag";
import { useEffect } from "react";
import { useCategory } from "@/context/category";

export default function TagCreate() {
  //context

  const {
    name,
    setName,
    parentCategory,
    setParentCategory,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTag();

  const { fetchCategories, categories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <input
        type="text"
        value={updatingTag ? updatingTag?.name : name}
        onChange={(e) => {
          if (updatingTag) {
            setUpdatingTag({ ...updatingTag, name: e.target.value });
          } else {
            setName(e.target.value);
          }
        }}
        className="form-control my-4 p-2"
      />

      <div className="form-group mt-4">
        <label>Parent category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) =>
            updatingTag
              ? setUpdatingTag({
                  ...updatingTag,
                  parentCategory: e.target.value,
                })
              : setParentCategory(e.target.value)
          }
        >
          {categories?.map((category) => (
            <option
              key={category._id}
              value={category._id}
              selected={
                category._id === updatingTag?.parentCategory ||
                category._id === parentCategory
              }
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* <pre>{JSON.stringify(updatingTag, null, 4)}</pre> */}

      <div className="d-flex justify-content-between">
        <button
          className={`btn bg-${updatingTag ? "info" : "primary"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingTag ? updateTag() : createTag();
          }}
        >
          {updatingTag ? "Update" : "Create"}
        </button>

        {updatingTag && (
          <>
            <button
              className={`btn bg-danger text-light`}
              onClick={(e) => {
                e.preventDefault();
                deleteTag();
              }}
            >
              Delete
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingTag(null)}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </>
  );
}
