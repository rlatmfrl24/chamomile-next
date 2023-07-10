"use client";

import { ProjectInfoDetailType } from "@/lib/typeDef";
import { Container, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { NextPage } from "next";
import ProjectPreview from "./project-preview";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ProjectInfo: NextPage<{
  data: ProjectInfoDetailType | undefined;
  thumbs: string[];
}> = ({ data, thumbs }) => {
  return (
    <Container maxW={"container.lg"}>
      <Stack>
        <>
          <Heading
            color={"white"}
            fontSize={"5xl"}
            className="flex items-center"
          >
            <IconButton
              colorScheme="white"
              aria-label="Back to project list"
              fontSize={"4xl"}
              icon={<ArrowBackIcon />}
              onClick={() => {
                window.history.back();
              }}
            />
            <Text className="flex-1 flex justify-center">
              {data === undefined ? "Not Found" : data.title}
            </Text>
          </Heading>
          <ProjectPreview thumbs={thumbs} />

          <Heading color={"white"} fontSize={"xl"}>
            프로젝트 개요
          </Heading>
          <Text color={"white"}>
            {data === undefined ? "Not Found" : data.summary_kr}
          </Text>
          <Heading color={"white"} fontSize={"xl"}>
            프로젝트 참여 기간
          </Heading>
          {data?.startDate === undefined || data?.endDate === undefined ? (
            <></>
          ) : (
            <Text color={"white"}>
              {data === undefined
                ? "Not Found"
                : `${format(data.startDate, "yyyy-MM")} ~ ${format(
                    data.endDate,
                    "yyyy-MM"
                  )}`}
            </Text>
          )}
          <Heading color={"white"} fontSize={"xl"}>
            담당 업무
          </Heading>
          <Text color={"white"}></Text>
        </>
      </Stack>
    </Container>
  );
};

export default ProjectInfo;
