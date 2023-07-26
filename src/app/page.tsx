"use client";

import { Box, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAppBarStore } from "./store";
import { useLayoutEffect } from "react";

export default function Home() {
  const setAppBarState = useAppBarStore((state) => state.setAppBarState);

  useLayoutEffect(() => {
    setAppBarState({
      id: 1,
      name: "Home",
      path: "/",
    });
  }, [setAppBarState]);

  return (
    <main className="flex flex-col flex-1 bg-slate-900 overflow-auto">
      <div className="flex flex-1 justify-center items-center p-3 gap-10">
        <div>TBU</div>
        <div className="flex flex-col">
          <Box className="mb-5">
            <Heading fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              React
            </Heading>
            <Heading fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              Frontend
            </Heading>
            <Heading fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              Developer
            </Heading>
          </Box>
          <Text color={"gray.400"} fontFamily={"body"}>
            Please Check out
            <Link
              as={NextLink}
              href={"/about"}
              className="underline mx-1"
              color="white"
            >
              My Profile
            </Link>
            and
            <Link
              as={NextLink}
              href={"/project"}
              className="underline mx-1"
              color="white"
            >
              Projects
            </Link>
          </Text>
          <Text color={"gray.400"}>
            or wanna
            <Link
              as={NextLink}
              href="/contact"
              className="underline mx-1"
              color={"white"}
            >
              Contact me?
            </Link>
          </Text>
        </div>
      </div>
    </main>
  );
}
