"use client";

import { useEffect } from "react";
import { useBlogMenuStore } from "../store";

export default function BlogContentPage({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const setCurrentCategory = useBlogMenuStore(
    (state) => state.setCurrentCategory
  );

  useEffect(() => {
    setCurrentCategory({
      name: params.category,
      path: "/" + params.category,
    });
  }, [setCurrentCategory, params.category]);

  return <div className="flex-1">{params.category}</div>;
}
