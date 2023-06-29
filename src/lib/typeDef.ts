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
  description_en: string;
  description_kr: string;
  type: ProjectType[];
}

export enum ProjectType {
  General = "general",
  Backend = "backend",
  Frontend = "frontend",
  Android = "android",
  ETC = "etc",
}
