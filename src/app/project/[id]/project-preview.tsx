import { NextPage } from "next";
import { AspectRatio, Flex, Image } from "@chakra-ui/react";
import { register } from "swiper/element/bundle";
import { CSSProperties, useState } from "react";
import FsLightbox from "fslightbox-react";
register();

const ProjectPreview: NextPage<{
  thumbs: string[];
}> = ({ thumbs }) => {
  const [toggler, setToggler] = useState({
    toggler: false,
    slide: 1,
  });

  return (
    <>
      <FsLightbox
        toggler={toggler.toggler}
        sources={thumbs}
        slide={toggler.slide}
      />
      <AspectRatio
        height={"fit-content"}
        width={"fit-content"}
        minWidth={"container.md"}
      >
        <swiper-container
          navigation
          pagination
          autoplay
          style={
            {
              "--swiper-navigation-color": "#fff",
              "--swiper-navigation-size": "24px",
              "--swiper-pagination-color": "#fff",
              "--swiper-pagination-bullet-inactive-color": "#fff",
            } as CSSProperties
          }
        >
          {thumbs.map((thumb, idx) => (
            <swiper-slide
              key={idx}
              className="flex"
              onClick={() => {
                setToggler({
                  toggler: !toggler.toggler,
                  slide: idx + 1,
                });
              }}
            >
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
    </>
  );
};

export default ProjectPreview;
