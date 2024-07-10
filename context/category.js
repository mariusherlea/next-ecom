"use client";

import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  //to create a category
  const [name, setName] = useState("");
  //for fetching all categories
  const [categories, setCategories] = useState([]);
  //for update and delete a category
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        const data = await response.json();
        setName("");
        setCategories([data, ...categories]);
        toast.success("Category created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured. Try again");
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured. Try again");
    }
  };
  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Category updated successfully");
        setUpdatingCategory(null);
        setCategories(
          categories.map((category) => {
            category._id === updatingCategory._id ? data : category;
          })
        );
        setUpdatingCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured. Try again");
    }
  };
  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Category deleted successfully");
        setCategories(
          categories.filter((category) => category._id !== updatingCategory._id)
        );
        setUpdatingCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured. Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        fetchCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
