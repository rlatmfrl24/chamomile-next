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
} from "@chakra-ui/react";
import ReactPageScroller from "react-page-scroller";
import { NextPage } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { MdWork } from "react-icons/md";

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

  const steps = [
    {
      title: "Phill-IT",
      startDate: "2017. 01",
      endDate: "2018. 09",
      role: "Researcher, Android Developer",
      description: [
        "안드로이드 환경의 필기 인식 모듈 개발",
        "사용자 입력 키워드 기반 연계 광고 모듈 개발",
        "사용자 입력 키워드 기반 단어 추천 모듈 개발 참여",
      ],
    },
    {
      title: "Cyberlogitec",
      startDate: "2018. 10",
      endDate: "Working",
      role: "Android Developer, Frontend Developer",
      description: [
        "해운 물류 산업 기반 포워딩 플랫폼의 안드로이드/프론트엔드 개발",
        "블록체인 기반 컨테이너 검사 신청 시스템의 안드로이드 개발",
        "컨테이너 유지 보수 이력 관리 시스템의 안드로이드 개발",
        "선사 업무 지원 솔루션의 UI/UX 개선 사업의 퍼블리싱 수행",
        "포워딩 관련 신사업 프로젝트의 프론트엔드 개발 담당",
        "사내 터미널 운영 관리 솔루션의 프론트엔드 개발 담당",
        "컨테이너 자원 관리 솔루션 Refactoring 프로젝트의 프론트엔드 개발 담당",
      ],
    },
    {
      title: "Next..?",
      startDate: "",
      endDate: "",
      role: "Wait for the next challenge!",
      description: [],
    },
  ];

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
                        <ListItem key={index} color={"white"} fontSize={"lg"}>
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
      </div>
    </ReactPageScroller>
  );
}
