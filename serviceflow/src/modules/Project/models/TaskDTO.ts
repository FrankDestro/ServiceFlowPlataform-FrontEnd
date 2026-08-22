import type { EpicSimpleDTO } from "./EpicDTO";
import type { ProjectDTO } from "./ProjectDTO";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type PriorityTask = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// Usado nas listagens (aba Tasks do Épico, Backlog, Board)
export interface TaskSimpleDTO {
  id: number;
  taskNumber: string;
  title: string;
  status: TaskStatus;
  priority: PriorityTask;
  projectNumber: string | null;
  springName: string | null;
  createAt: string | null;
  assignedTo: string | null;
  dueDate: string;
}

// Usado no modal de detalhe da Task
export interface TaskDTO {
  id: number;
  taskNumber: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityTask;
  estimatedHours: number | null;
  dueDate: string | null;
  projectNumber: string;
  epicNumber: string | null;
  sprintName: string | null;
  assignedTo: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
}

export type TaskFilterDTO = {
  taskNumber: string;
 projectId: number | null;
  epicId: number | null;
  sprintId: number | null;
  assignedTo: number | null;
  status: string;
  priority: string;
}

export interface TaskDetailDTO {
  id: number;
  taskNumber: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityTask;
  estimatedHours: number | null;
  dueDate: string | null;
  project: ProjectDTO;
  epic: EpicSimpleDTO | null;
  // sprint: SprintDTO | null; — ainda comentado no backend, adiciona quando ativar
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
}