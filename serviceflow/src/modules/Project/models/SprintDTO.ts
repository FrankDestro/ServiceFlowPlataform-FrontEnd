import type { ProjectDTO } from "./ProjectDTO";

export type SprintStatus = "PLANNED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface SprintFilterFormData {
  name: string;
  status: string;
  projectId: number | null;
}

export interface SprintSearchParams extends SprintFilterFormData {
  page: number;
  size: number;
  sort?: string;
}

export interface SprintSimpleDTO {
  id: number;
  name: string;
  goal: string;
  status: SprintStatus;
  startDate: string | null;
  endDate: string | null;
  projectNumber: string;
  taskCount: number;
}

export interface SprintDetailDTO {
  id: number;
  name: string;
  goal: string | null;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  project: ProjectDTO;
  taskCount: number;
  createdAt: string;
  createdBy: string;
}