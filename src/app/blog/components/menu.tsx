"use client";

import { ButtonGroup, Heading } from "@chakra-ui/react";
import { useBlogMenuStore } from "../store";
import { useEffect } from "react";
import CategoryButton from "./menuButton";

const BlogMenu = () => {
  const setCurrentCategory = useBlogMenuStore(
    (state) => state.setCurrentCategory
  );

  useEffect(() => {
    setCurrentCategory({
      name: "All",
      path: "/",
    });
  }, [setCurrentCategory]);

  return (
    <div className="min-w-fit p-6 flex flex-col ">
      <Heading fontSize={"lg"} mt={5} mb={2}>
        Development
      </Heading>
      <CategoryButton
        categoryType={{
          name: "Android",
          path: "/android",
        }}
      />
      <CategoryButton
        categoryType={{
          name: "Frontend",
          path: "/frontend",
        }}
      />
      <Heading fontSize={"lg"} mt={5} mb={2}>
        Hobby
      </Heading>
    </div>
  );
};

export default BlogMenu;
