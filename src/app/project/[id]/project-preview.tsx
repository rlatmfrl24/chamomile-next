import { NextPage } from "next";
import { AspectRatio, Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

const ProjectPreview: NextPage<{
  thumbs: string[];
}> = ({ thumbs }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <Flex>
        <Swiper
          className="h-full"
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          {thumbs.map((thumb) => (
            <SwiperSlide key={thumb} className="flex">
              <Flex className="h-full justify-center items-center">
                <Image
                  src={thumb}
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

export default ProjectPreview;
