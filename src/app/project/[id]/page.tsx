"use client";

import {
  AspectRatio,
  Box,
  Container,
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
        <ProjectPreview />
        <Heading color={"white"}>
          {projectData === undefined ? "Not Found" : projectData.title}
        </Heading>
        <Stack></Stack>
      </Container>
    </div>
  );
}
