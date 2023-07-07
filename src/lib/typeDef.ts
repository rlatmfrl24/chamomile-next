export interface MenuItemType {
  id: number;
  name: string;
  path: string;
}

export interface ProjectInfoType {
  pid: string;
  title: string;
  organization: string;
  startDate?: Date;
  endDate?: Date;
  summary_kr: string;
  type: ProjectType[];
}

export interface ProjectInfoDetailType extends ProjectInfoType {
  description_kr: string;
  role: string[];
  skill: string[];
  links?: {
    github?: string;
    playstore?: string;
    appstore?: string;
    website?: string;
  };
}

export enum ProjectType {
  General = "general",
  Backend = "backend",
  Frontend = "frontend",
  Android = "android",
  ETC = "etc",
}
