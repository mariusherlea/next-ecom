"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";

export default function TagList() {
  const { tags, fetchTags, setUpdatingTag } = useTag();
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>
      {tags?.map((tag) => (
        <button
          key={tag._id}
          className="btn"
          onClick={() => setUpdatingTag(tag)}
        >
          {tag.name}
        </button>
      ))}
    </>
  );
}
