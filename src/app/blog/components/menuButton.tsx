"use client";

import { Link } from "@chakra-ui/next-js";
import { BlogCategoryProps, useBlogMenuStore } from "../store";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function CategoryButton({ categoryType }: { categoryType: BlogCategoryProps }) {
  const currentCategory = useBlogMenuStore((state) => state.currentCategory);
  const setCurrentCategory = useBlogMenuStore(
    (state) => state.setCurrentCategory
  );
  const [buttonClassName, setButtonClassName] = useState<string>("");

  useEffect(() => {
    if (currentCategory.path === categoryType.path) {
      setButtonClassName("hover:text-black text-blue-400");
    } else {
      setButtonClassName("hover:text-black text-gray-400");
    }
  }, [currentCategory, categoryType]);

  return (
    <Link
      as={NextLink}
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
