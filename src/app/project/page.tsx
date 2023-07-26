"use client";

import { ProjectInfoType } from "@/lib/typeDef";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { NextPage } from "next";
import NextLink from "next/link";
import { ProjectList } from "./data";
import { Balancer } from "react-wrap-balancer";
import { ProjectBadgeProvider } from "./component";
import { useAppBarStore } from "../store";
import { useLayoutEffect } from "react";

const ProjectCard: NextPage<ProjectInfoType> = (info) => {
  return (
    <Link
      as={NextLink}
      href={`/project/${info.pid}`}
      className="flex"
      style={{ textDecoration: "none" }}
    >
      <Card
        variant={"outline"}
        className="flex-1 bg-slate-900 hover:bg-slate-700 cursor-pointer"
      >
        <CardHeader>
          <Stack>
            <Flex alignItems={"center"} gap={2}>
              {info.type.map((type) => ProjectBadgeProvider(type))}
            </Flex>
            <Heading color={"white"}>{info.title}</Heading>
            <Flex alignItems={"center"} gap={2}>
              <Text color={"white"}>{info.organization}</Text>
              {info.startDate === undefined || info.endDate === undefined ? (
                <></>
              ) : (
                <>
                  <Divider orientation="vertical" height={4} />
                  <Text color={"white"}>
                    {`${format(info.startDate, "yyyy. MM")} ~ ${format(
                      info.endDate,
                      "yyyy. MM"
                    )}`}
                  </Text>
                </>
              )}
            </Flex>
          </Stack>
        </CardHeader>
        <CardBody>
          <Text color={"white"} wordBreak={"keep-all"} fontFamily={"body"}>
            <Balancer>{info.summary_kr}</Balancer>
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default function Project() {
  const setAppBarState = useAppBarStore((state) => state.setAppBarState);

  useLayoutEffect(() => {
    setAppBarState({
      id: 3,
      name: "Project",
      path: "/project",
    });
  }, [setAppBarState]);

  return (
    <Flex
      justifyContent={"center"}
      p={24}
      h={0}
      flex={"auto"}
      overflow={"auto"}
      className="bg-slate-900"
    >
      <Stack gap={4}>
        <Heading color={"white"}>Project</Heading>
        <Divider />
        <SimpleGrid columns={2} spacing={10} pt={10} pb={24}>
          {ProjectList.map((project) => (
            <ProjectCard
              pid={project.pid}
              key={project.pid}
              title={project.title}
              organization={project.organization}
              type={project.type}
              summary_kr={project.summary_kr}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
}
