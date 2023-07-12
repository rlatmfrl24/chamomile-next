"use client";

import { Box, HStack, Link, Stack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 bg-slate-900 overflow-auto">
      <div className="flex flex-1 justify-center items-center p-3 gap-10">
        <div>TBU</div>
        <div className="flex flex-col gap-3">
          <Box>
            <Text fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              React
            </Text>
            <Text fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              Frontend
            </Text>
            <Text fontSize={"6xl"} fontWeight={"bold"} color={"white"}>
              Developer
            </Text>
          </Box>
          <Text color={"gray.400"}>
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
        </div>
      </div>
    </main>
  );
}
