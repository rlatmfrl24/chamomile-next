"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { useAppBarStore } from "../store";
import { useLayoutEffect } from "react";

export default function ContactPage() {
  const setAppBarState = useAppBarStore((state) => state.setAppBarState);

  useLayoutEffect(() => {
    setAppBarState({
      id: 5,
      name: "Contact",
      path: "/contact",
    });
  }, [setAppBarState]);

  return (
    <Flex
      justifyContent={"center"}
      p={24}
      h={0}
      flex={"auto"}
      overflow={"auto"}
      className="bg-slate-900 text-white"
    >
      <Heading>Contact</Heading>
    </Flex>
  );
}
