"use client";

import { BlogCategoryProps, useBlogMenuStore } from "../store";
import { useEffect, useState } from "react";
import Link from "next/link";

function CategoryButton({ categoryType }: { categoryType: BlogCategoryProps }) {
  const currentCategory = useBlogMenuStore((state) => state.currentCategory);
  const setCurrentCategory = useBlogMenuStore(
    (state) => state.setCurrentCategory
  );
  const [buttonClassName, setButtonClassName] = useState<string>("");

  useEffect(() => {
    if (currentCategory.path === categoryType.path) {
      setButtonClassName(
        "hover:text-blue-400 text-blue-400 font-bold bg-blue-900 rounded-md px-2 py-1"
      );
    } else {
      setButtonClassName(
        "hover:text-blue-400 text-gray-400 px-2 py-1 rounded-md"
      );
    }
  }, [currentCategory, categoryType]);

  return (
    <Link
      href={`/blog/${categoryType.path}`}
      onClick={() => {
        setCurrentCategory(categoryType);
      }}
      className={` ${buttonClassName}`}
    >
      {categoryType.name}
    </Link>
  );
}

export default CategoryButton;
