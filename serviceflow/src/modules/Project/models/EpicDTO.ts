import type { ProjectDTO } from "./ProjectDTO";

export type EpicSimpleDTO = {
  id: number,
  epicNumber: string,
  title: string,
  status: string,
  priority: string,
  startDate: string,
  dueDate: string,
  projectNumber: string,
  taskCount: number
}

export interface EpicFilterFormData {
  epicNumber: string;
  status: string;
  priority: string;
  projectId: number | null;
}

// Filtro + paginação — só existe na fronteira com a API
export interface EpicSearchParams extends EpicFilterFormData {
  page: number;
  size: number;
  sort?: string;
}


export type EpicDetailDTO = {
  id: number,
  epicNumber: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  startDate: string,
  dueDate: string,
  projectNumber: string,
  project: ProjectDTO
  taskCount: number,
  createdAt: string,
  createdBy: string,
  createdByEmail: string,
}

export type EpicHistoryDTO = {

}