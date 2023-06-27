"use client";

import {
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { NextPage } from "next";

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
  return (
    <div className="bg-slate-900 flex flex-1 items-center justify-center gap-10 p-24">
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
            "Mobx",
            "Zustand",
            "React-query",
            "VISX",
          ]}
        />
        <SkillCard
          title={"Android"}
          color="green"
          progress={60}
          tags={["Kotlin", "Java", "Android Studio", "Retrofit", "RxJava"]}
        />
        <SkillCard
          title={"Backend"}
          color="red"
          progress={50}
          tags={[
            "Node.js",
            "Express",
            "TypeScript",
            "Prisma",
            "Golang",
            "Goin",
            "Python",
            "Django",
            "MongoDB",
          ]}
        />

        <SkillCard
          title={"DevOps"}
          progress={40}
          color="yellow"
          tags={["Docker", "GCP", "Git", "Firebase", "Jira", "Confluence"]}
        />
      </SimpleGrid>
    </div>
  );
}
