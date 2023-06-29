"use client";

import {
  Box,
  Card,
  CardBody,
  Divider,
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
  useSteps,
  Tag,
  Text,
  Wrap,
  WrapItem,
  UnorderedList,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import ReactPageScroller from "react-page-scroller";
import { NextPage } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
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
              <WrapItem key="tag">
                <Tag>{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default function About() {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (number: number) => {
    setCurrentPage(number);
  };

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <ReactPageScroller
      pageOnChange={handlePageChange}
      customPageNumber={currentPage}
      animationTimer={700}
    >
      <div className="bg-slate-900 flex flex-col justify-between items-center p-16 h-full">
        <Box display={"flex"} flex={1} gap={10} className="items-center">
          <Stack className="flex justify-end items-center">
            <Image
              objectFit={"contain"}
              src="/default-profile.svg"
              alt="profile"
              className="rounded-full"
              boxSize={64}
              mx="auto"
            />
            <Heading color="white">Seul-Ki Kim</Heading>
            <Text color={"white"} className="flex gap-2 items-center">
              1990. 11. 21.
            </Text>

            <Text className="flex gap-2 items-center" color={"white"}>
              Seoul, Korea
            </Text>
          </Stack>
          <Divider orientation="vertical" className="h-96" />
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
              tags={[
                "Node.js",
                "Express",
                "TypeScript",
                "Golang",
                "Goin",
                "MongoDB",
              ]}
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
        </Box>
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Text color={"white"} display={"flex"}>
            Scroll down to
            <Text ml={1} fontWeight={"bold"}>
              Career
            </Text>
          </Text>
          <Icon as={HiOutlineChevronDoubleDown} className="text-white" />
        </motion.div>
      </div>
      <div className="bg-slate-900 flex flex-col justify-center items-center p-24 h-full">
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Icon
            as={HiOutlineChevronDoubleDown}
            className="text-white rotate-180"
          />
          <Text color={"white"} display={"flex"}>
            Scroll up to
            <Text ml={1} fontWeight={"bold"}>
              Skills
            </Text>
          </Text>
        </motion.div>
        <Box display={"flex"} flex={1} alignItems={"center"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Stepper
              index={activeStep}
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
                    </StepTitle>
                    <StepDescription>
                      <Text color={"white"} fontSize={"xl"}>
                        {step.role}
                      </Text>
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
          </Box>
        </Box>
      </div>
    </ReactPageScroller>
  );
}
