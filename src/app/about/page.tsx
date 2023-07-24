"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Icon,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tag,
  Text,
  Wrap,
  WrapItem,
  UnorderedList,
  ListItem,
  Flex,
  Container,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { MdWork } from "react-icons/md";
import { skillData, steps } from "./data";
import { useAppBarStore } from "../store";
import { useLayoutEffect } from "react";

const SkillCard: NextPage<{
  title: string;
  progress: number;
  color?: string;
  tags: string[];
}> = ({ title, progress, tags, color }) => {
  return (
    <Card
      className="bg-slate-900 w-auto min-w-min max-w-md"
      borderColor={"gray.300"}
      variant={"outline"}
    >
      <CardBody>
        <Stack spacing={5}>
          <Heading color={"white"} fontWeight={"bold"}>
            {title}
          </Heading>

          <Progress
            value={progress}
            colorScheme={
              color === undefined ? "blue" : (color as any).toString()
            }
            className="rounded-xl"
          />
          <Wrap>
            {tags.map((tag) => (
              <WrapItem key={tag}>
                <Tag fontFamily={"body"} fontWeight={"bold"}>
                  {tag}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </CardBody>
    </Card>
  );
};

const CareerPage = () => {
  return (
    <Stepper
      index={1}
      w={"fit-content"}
      orientation="vertical"
      colorScheme="whiteAlpha"
      gap={0}
      mt={10}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<Icon as={MdWork} color={"white"} />}
            />
          </StepIndicator>
          <Box flexShrink={0} mb={6} ml={1}>
            <StepTitle>
              <Text
                color={"white"}
                fontFamily={"heading"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                className="-translate-y-2"
              >
                {step.title}
              </Text>
              <Text
                color={"white"}
                fontSize={"xl"}
                fontFamily={"body"}
                fontWeight={"bold"}
              >
                {step.role}
              </Text>
            </StepTitle>
            <StepDescription as="div">
              <Stack>
                {step.startDate !== "" && (
                  <Text color={"white"}>
                    {step.startDate} ~ {step.endDate}
                  </Text>
                )}
                <UnorderedList my={3}>
                  {step.description.map((desc, index) => (
                    <ListItem
                      key={index}
                      color={"white"}
                      fontSize={"md"}
                      fontFamily={"body"}
                    >
                      {desc}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Stack>
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

const SkillPage = () => {
  return (
    <SimpleGrid columns={2} spacing={6}>
      {skillData.map((skill, index) => (
        <SkillCard
          key={index}
          title={skill.skillName}
          progress={skill.progress}
          color={skill.color}
          tags={skill.tags}
        />
      ))}
    </SimpleGrid>
  );
};

export default function About() {
  const setAppBarState = useAppBarStore((state) => state.setAppBarState);

  useLayoutEffect(() => {
    setAppBarState({
      id: 2,
      name: "About",
      path: "/about",
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
      <Container
        maxW={"container.lg"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        h={"fit-content"}
      >
        <Stack className="flex justify-center items-center" gap={16}>
          <Flex flexDirection={"column"} alignItems={"center"} gap={3}>
            <Image
              objectFit={"contain"}
              src="/default-profile.svg"
              alt="profile"
              className="rounded-full"
              mx="auto"
            />
            <Heading color="white">Seul-Ki Kim</Heading>
            <Text color={"white"} className="flex gap-2 items-center">
              1990. 11. 21.
            </Text>

            <Text className="flex gap-2 items-center" color={"white"}>
              Seoul, Korea
            </Text>
          </Flex>
          <SkillPage />
          <CareerPage />
        </Stack>
      </Container>
    </Flex>
  );
}
