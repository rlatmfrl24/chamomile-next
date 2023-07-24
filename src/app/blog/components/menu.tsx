"use client";

import { Button, ButtonGroup, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { BlogCategoryProps, useBlogMenuStore } from "../store";
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
    <div className="min-w-fit p-6 flex flex-col gap-5">
      <ButtonGroup flexDirection={"column"} gap={1} alignItems={"center"}>
        <Heading fontSize={"lg"} my={2}>
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
      </ButtonGroup>
      <ButtonGroup flexDirection={"column"} gap={1} alignItems={"center"}>
        <Heading fontSize={"lg"} my={2}>
          Hobby
        </Heading>
      </ButtonGroup>
    </div>
  );
};

export default BlogMenu;
