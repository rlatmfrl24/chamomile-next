import { NextPage } from "next";
import { Box, Image } from "@chakra-ui/react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { MutableRefObject } from "react";

const Lightbox: NextPage<{
  thumbs: string[];
}> = ({ thumbs }) => {
  return (
    <Gallery>
      {thumbs.map((thumb) => (
        <Item
          key={thumb}
          original={thumb}
          thumbnail={thumb}
          width={1024}
          height={768}
        >
          {({ ref, open }) => (
            <div
              ref={ref as MutableRefObject<HTMLDivElement>}
              className="flex"
              onClick={open}
            >
              <Image
                src={thumb}
                alt="Project Image Placeholder"
                objectFit="contain"
              />
            </div>
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default Lightbox;
