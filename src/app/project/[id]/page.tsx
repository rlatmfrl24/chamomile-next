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
  let imagePaths: string[] = [];

  // check if project image folder exists
  if (
    fs.existsSync(
      path.join(process.cwd(), "public", "screenshot", projectData?.pid || "")
    )
  ) {
    // get image pathes from public folder
    imagePaths = fs
      .readdirSync(
        path.join(process.cwd(), "public", "screenshot", projectData?.pid || "")
      )
      .map((path) => `/screenshot/${projectData?.pid}/${path}`);
  }

  return (
    <div className="bg-slate-900 p-24 flex flex-col flex-auto h-0 overflow-auto">
      <ProjectInfo data={projectData} thumbs={imagePaths} />
    </div>
  );
}
