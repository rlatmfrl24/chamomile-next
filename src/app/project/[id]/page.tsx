"use client";

import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ProjectList } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { format } from "date-fns";

const ProjectPreview = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <Flex className="bg-white">
        <Swiper
          className="h-full"
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          {Array.from({ length: 10 }, (_, i) => (
            <SwiperSlide key={i} className="flex">
              <Flex className="h-full justify-center items-center">
                <Image
                  src="https://picsum.photos/400/300"
                  alt="Project Image Placeholder"
                  objectFit="contain"
                  className="h-full"
                />
              </Flex>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </AspectRatio>
  );
};

export default function ProjectDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const projectData = ProjectList.find((project) => project.pid === params.id);

  return (
    <div className="bg-slate-900 flex flex-col p-24 flex-1">
      <Container maxW={"container.lg"}>
        <Stack>
          <ProjectPreview />
          <Heading color={"white"} my={3}>
            {projectData === undefined ? "Not Found" : projectData.title}
          </Heading>
          <Heading color={"white"} fontSize={"xl"}>
            프로젝트 개요
          </Heading>
          <Text color={"white"}>
            {projectData === undefined ? "Not Found" : projectData.summary_kr}
          </Text>
          <Heading color={"white"} fontSize={"xl"}>
            프로젝트 참여 기간
          </Heading>
          {projectData?.startDate === undefined ||
          projectData?.endDate === undefined ? (
            <></>
          ) : (
            <Text color={"white"}>
              {projectData === undefined
                ? "Not Found"
                : `${format(projectData.startDate, "yyyy-MM")} ~ ${format(
                    projectData.endDate,
                    "yyyy-MM"
                  )}`}
            </Text>
          )}
          <Heading color={"white"} fontSize={"xl"}>
            담당 업무
          </Heading>
          <Text color={"white"}></Text>
        </Stack>
      </Container>
    </div>
  );
}
