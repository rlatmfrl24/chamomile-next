"use client";

import { ProjectInfoDetailType } from "@/lib/typeDef";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { format, intervalToDuration } from "date-fns";
import { NextPage } from "next";
import ProjectPreview from "./project-preview";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Balancer } from "react-wrap-balancer";
import { ProjectBadgeProvider } from "../component";
import { AiFillGithub } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

const ProjectInfo: NextPage<{
  data: ProjectInfoDetailType | undefined;
  thumbs: string[];
}> = ({ data, thumbs }) => {
  return (
    <Flex className="gap-10 m-24 h-fit">
      <Container w={"container.md"} fontFamily={"body"}>
        <IconButton
          colorScheme="white"
          aria-label="Back to project list"
          fontSize={"4xl"}
          icon={<ArrowBackIcon />}
          onClick={() => {
            window.history.back();
          }}
        />
        <Stack>
          <Heading color={"white"} fontSize={"5xl"} className="flex ">
            {data === undefined ? "Not Found" : data.title}
          </Heading>
          <Flex alignItems={"center"} gap={2}>
            {data?.type.map((type) => ProjectBadgeProvider(type))}
          </Flex>

          <InfoHeading>프로젝트 설명</InfoHeading>
          <Text color={"white"}>
            <Balancer>
              {data === undefined ? "Not Found" : data.description_kr}
            </Balancer>
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
                  )} (${
                    intervalToDuration({
                      start: data.startDate,
                      end: data.endDate,
                    }).years
                  }년 ${
                    intervalToDuration({
                      start: data.startDate,
                      end: data.endDate,
                    }).months
                  }개월)`}
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
          {data?.links?.github === undefined &&
          data?.links?.website === undefined ? (
            <></>
          ) : (
            <>
              <InfoHeading>
                <Text color={"white"}>프로젝트 링크</Text>
              </InfoHeading>
              <ProjectLinkProvider
                github={data?.links?.github}
                website={data?.links?.website}
              />
            </>
          )}
        </Stack>
      </Container>
      {thumbs.length === 0 ? <></> : <ProjectPreview thumbs={thumbs} />}
    </Flex>
  );
};

const InfoHeading = ({ children }: { children: React.ReactNode }) => (
  <Heading color={"white"} fontSize={"xl"} mt={3}>
    {children}
  </Heading>
);

const ProjectLinkProvider: NextPage<{
  github?: string;
  website?: string;
}> = ({ github, website }) => {
  return (
    <ButtonGroup>
      {github === undefined ? (
        <></>
      ) : (
        <Link href={github} isExternal>
          <Button
            leftIcon={<AiFillGithub />}
            variant={"outline"}
            color={"white"}
            colorScheme="whiteAlpha"
          >
            Github
          </Button>
        </Link>
      )}
      {website === undefined ? (
        <></>
      ) : (
        <Link href={website} isExternal>
          <Button
            leftIcon={<CgWebsite />}
            variant={"outline"}
            color={"white"}
            colorScheme="whiteAlpha"
          >
            Website
          </Button>
        </Link>
      )}
    </ButtonGroup>
  );
};

export default ProjectInfo;
