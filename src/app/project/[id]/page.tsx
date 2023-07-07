import { ProjectList } from "../data";
import { ProjectInfoDetailType } from "@/lib/typeDef";
import ProjectInfo from "./project-info";
import fs from "fs";
import path from "path";

export default function ProjectDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const projectData: ProjectInfoDetailType | undefined = ProjectList.find(
    (project) => project.pid === params.id
  );

  // get image pathes from public folder
  const imagePaths = fs
    .readdirSync(
      path.join(process.cwd(), "public", "screenshot", projectData?.pid || "")
    )
    .map((path) => `/screenshot/${projectData?.pid}/${path}`);

  return (
    <div className="bg-slate-900 flex flex-col p-24 flex-1">
      <ProjectInfo data={projectData} thumbs={imagePaths} />
    </div>
  );
}
