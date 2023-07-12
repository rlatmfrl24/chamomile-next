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
import { steps } from "./data";

const SkillCard: NextPage<{
  title: string;
  progress: number;
  color?: string;
  tags: string[];
}> = ({ title, progress, tags, color }) => {
  return (
    <Card
      className="bg-slate-900 w-auto min-w-min max-w-md hover:bg-slate-800 cursor-pointer"
      borderColor={"gray.300"}
      variant={"outline"}
    >
      <CardBody>
        <Stack spacing={5}>
          <Heading color={"white"}>{title}</Heading>

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
                <Tag>{tag}</Tag>
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
                fontWeight={"bold"}
                fontSize={"3xl"}
                className="-translate-y-2"
              >
                {step.title}
              </Text>
              <Text color={"white"} fontSize={"xl"}>
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
                    <ListItem key={index} color={"white"} fontSize={"md"}>
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
      <SkillCard
        title={"Frontend"}
        progress={90}
        tags={[
          "React",
          "Next.js",
          "Tailwind CSS",
          "Chakra UI",
          "MUI",
          "Semantic UI",
          "Recoil",
          "MobX",
          "Zustand",
          "React-query",
          "VISX(D3)",
        ]}
      />
      <SkillCard
        title={"Android"}
        color="green"
        progress={60}
        tags={[
          "Kotlin",
          "Java",
          "Android Studio",
          "Jetpack Compose",
          "Koin",
          "Dexter",
          "Data Binding",
          "Retrofit",
          "LiveData",
          "Room",
          "Realm",
        ]}
      />
      <SkillCard
        title={"Backend"}
        color="red"
        progress={50}
        tags={["Node.js", "Express", "TypeScript", "Golang", "Goin", "MongoDB"]}
      />

      <SkillCard
        title={"Others"}
        progress={40}
        color="yellow"
        tags={[
          "Docker",
          "GCP",
          "Git",
          "Firebase",
          "Python",
          "Selenium",
          "Jira",
          "Confluence",
          "Tensorite",
        ]}
      />
    </SimpleGrid>
  );
};

export default function About() {
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
