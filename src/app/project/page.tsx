"use client";

import { ProjectInfoType, ProjectType } from "@/lib/typeDef";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
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

const ProjectCard: NextPage<ProjectInfoType> = (info) => {
  const ProjectBadgeProvider = (type: ProjectType) => {
    switch (type) {
      case ProjectType.General:
        return (
          <Badge colorScheme="green" width={"fit-content"}>
            General
          </Badge>
        );
      case ProjectType.Backend:
        return (
          <Badge colorScheme="red" width={"fit-content"}>
            Backend
          </Badge>
        );
      case ProjectType.Frontend:
        return (
          <Badge colorScheme="blue" width={"fit-content"}>
            Frontend
          </Badge>
        );
      case ProjectType.Android:
        return (
          <Badge colorScheme="purple" width={"fit-content"}>
            Android
          </Badge>
        );
      case ProjectType.ETC:
        return (
          <Badge colorScheme="yellow" width={"fit-content"}>
            ETC
          </Badge>
        );
    }
  };

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
            <Box display={"flex"} alignItems={"center"} gap={2}>
              {info.type.map((type) => ProjectBadgeProvider(type))}
            </Box>
            <Heading color={"white"}>{info.title}</Heading>
            <Box display={"flex"} alignItems={"center"} gap={2}>
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
            </Box>
          </Stack>
        </CardHeader>
        <CardBody>
          <Text color={"white"} wordBreak={"keep-all"}>
            <Balancer>{info.summary_kr}</Balancer>
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default function Project() {
  return (
    <div className="bg-slate-900 flex flex-col p-24 h-0 flex-auto overflow-auto">
      <Heading color={"white"}>Project</Heading>
      <SimpleGrid columns={2} spacing={10} mt={10}>
        {ProjectList.map((project) => (
          <ProjectCard
            pid={project.pid}
            key={project.title}
            title={project.title}
            organization={project.organization}
            type={project.type}
            description_en={project.description_en}
            description_kr={project.description_kr}
            summary_kr={project.summary_kr}
            startDate={project.startDate}
            endDate={project.endDate}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
