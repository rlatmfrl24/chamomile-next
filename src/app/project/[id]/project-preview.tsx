import { NextPage } from "next";
import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";
import { register } from "swiper/element/bundle";
import { CSSProperties } from "react";
register();

const ProjectPreview: NextPage<{
  thumbs: string[];
}> = ({ thumbs }) => {
  return (
    <AspectRatio
      height={"fit-content"}
      width={"fit-content"}
      minWidth={"container.md"}
    >
      <swiper-container
        navigation
        pagination
        style={
          {
            "--swiper-navigation-size": "24px",
            "--swiper-pagination-bullet-inactive-color": "#fff",
          } as CSSProperties
        }
      >
        {thumbs.map((thumb) => (
          <swiper-slide key={thumb} className="flex">
            <Flex className="h-full justify-center items-center p-10">
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
