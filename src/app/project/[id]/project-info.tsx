"use client";

import { ProjectInfoDetailType } from "@/lib/typeDef";
import {
  Container,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
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
            className="flex items-center justify-center relative"
          >
            <IconButton
              className="absolute left-0"
              colorScheme="white"
              aria-label="Back to project list"
              fontSize={"4xl"}
              icon={<ArrowBackIcon />}
              onClick={() => {
                window.history.back();
              }}
            />
            {data === undefined ? "Not Found" : data.title}
          </Heading>
          {thumbs.length === 0 ? <></> : <ProjectPreview thumbs={thumbs} />}

          <InfoHeading>프로젝트 설명</InfoHeading>
          <Text color={"white"}>
            {data === undefined ? "Not Found" : data.description_kr}
          </Text>
          <InfoHeading>참여 기간</InfoHeading>
          {data?.startDate === undefined || data?.endDate === undefined ? (
            <></>
          ) : (
            <Text color={"white"}>
              {data === undefined
                ? "Not Found"
                : `${format(data.startDate, "yyyy년 MM월")} ~ ${format(
                    data.endDate,
                    "yyyy년 MM월"
                  )} ()`}
            </Text>
          )}
          <InfoHeading>담당 업무</InfoHeading>
          <UnorderedList>
            {data?.role === undefined ? (
              <></>
            ) : (
              data.role.map((role, index) => (
                <ListItem key={index} color={"white"}>
                  {role}
                </ListItem>
              ))
            )}
          </UnorderedList>
          <InfoHeading>사용 기술</InfoHeading>
          <UnorderedList>
            {data?.skill === undefined ? (
              <></>
            ) : (
              data.skill.map((role, index) => (
                <ListItem key={index} color={"white"}>
                  {role}
                </ListItem>
              ))
            )}
          </UnorderedList>
        </>
      </Stack>
    </Container>
  );
};

const InfoHeading = ({ children }: { children: React.ReactNode }) => (
  <Heading color={"white"} fontSize={"xl"} mt={3}>
    {children}
  </Heading>
);

export default ProjectInfo;
