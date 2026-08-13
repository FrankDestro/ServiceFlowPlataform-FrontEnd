export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type PriorityTask = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// Usado nas listagens (aba Tasks do Épico, Backlog, Board)
export interface TaskSimpleDTO {
  id: number;
  taskNumber: string;
  title: string;
  status: TaskStatus;
  priority: PriorityTask;
  dueDate: string | null;
  assignedTo: string | null;
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