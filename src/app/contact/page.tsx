"use client";

import { Flex, Heading, Icon, IconButton, useBoolean } from "@chakra-ui/react";
import { useAppBarStore } from "../store";
import { useEffect, useLayoutEffect } from "react";
import {
  MdEmail,
  MdOutlineContentCopy,
  MdPhone,
  MdCheck,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";
import { Link } from "@chakra-ui/next-js";

export default function ContactPage() {
  const setAppBarState = useAppBarStore((state) => state.setAppBarState);

  useLayoutEffect(() => {
    setAppBarState({
      id: 5,
      name: "Contact",
      path: "/contact",
    });
  }, [setAppBarState]);

  return (
    <Flex
      justifyContent={"center"}
      p={24}
      h={0}
      flex={"auto"}
      overflow={"auto"}
      className="bg-slate-900 text-white"
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={6}
      >
        <Heading fontSize={"5xl"} mb={8}>
          Contact
        </Heading>
        <ContactItem
          icon={MdEmail}
          text={"397love@gmail.com"}
          link="mailto:397love@gmail.com"
        />
        <ContactItem
          icon={MdPhone}
          text={"+821083554870"}
          link="tel:+821083554870"
        />
        <ContactItem
          icon={FaGithub}
          text={"Github Link"}
          link="https://github.com/rlatmfrl24"
        />
        <ContactItem
          icon={FaLinkedin}
          text={"LinkedIn Link"}
          link="https://www.linkedin.com/in/seul-ki-kim-112186144/"
        />
      </Flex>
    </Flex>
  );
}

const ContactItem = ({
  icon,
  text,
  link,
}: {
  icon: IconType;
  text: string;
  link: string;
}) => {
  const [isCopied, setIsCopied] = useBoolean();

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied.off();
      }, 1000);
    }
  }, [isCopied, setIsCopied]);

  return (
    <Flex
      className="flex gap-2 items-center "
      fontSize={"xl"}
      fontFamily={"noto"}
      fontWeight={"bold"}
    >
      <Icon as={icon} fontSize={"4xl"} />
      <Link w={"2xs"} display={"flex"} justifyContent={"center"} href={link}>
        {text}
      </Link>

      <IconButton
        aria-label={"email"}
        icon={isCopied ? <MdCheck /> : <MdOutlineContentCopy />}
        variant={"outline"}
        colorScheme="white"
        size={"sm"}
        onClick={() => {
          ["mailto:", "tel:"].forEach((prefix) => {
            if (link.startsWith(prefix)) {
              link = link.replace(prefix, "");
            }
          });
          navigator.clipboard.writeText(link);
          setIsCopied.toggle();
        }}
      />
    </Flex>
  );
};
