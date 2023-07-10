"use client";

import { NextPage } from "next";
import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";
import { register } from "swiper/element/bundle";
register();

const ProjectPreview: NextPage<{
  thumbs: string[];
}> = ({ thumbs }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <swiper-container navigation>
        {thumbs.map((thumb) => (
          <swiper-slide key={thumb} className="flex">
            <Flex className="h-full justify-center items-center">
              <Image
                src={thumb}
                alt="Project Image Placeholder"
                objectFit="contain"
                className="h-full"
              />
            </Flex>
          </swiper-slide>
        ))}
      </swiper-container>
    </AspectRatio>
  );
};

export default ProjectPreview;
