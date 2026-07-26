export type OperationalTaskSimpleDTO = {
    id: number;
    taskNumber: string;
    title: string;
    status: string;
    priority: string;
    scheduledStart: string;
    scheduledEnd: string;
    assignedToName: string;
    categoryName: string;
}

export type OperationalTaskSearchParams = {
    taskNumber: string;
    status: string;
    priority: string;
    categoryId: number | null;
    assignedTo: string;
    scheduledStartFrom: string;
    scheduledStartTo: string;
    dueDateFrom: string;
    dueDateTo: string;
};

export interface OperationalTaskDetailsDTO {
  id: number;
  taskNumber: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED" | "OVERDUE";
  type: "MAINTENANCE" | "BACKUP" | "UPDATE" | "MONITORING" | "CONFIGURATION" | "INCIDENT" | "OTHER";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  estimatedHours: number | null;
  completionPercentage: number;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart: string | null;
  actualEnd: string | null;
  cancellationReason: string | null;
  completionNotes: string | null;
  createdAt: string;
  updatedAt: string | null;
  assignedTo: string | null;
  createBy: string; 
  category: string | null;
  subcategory: string | null;
}

export interface OperationalSubTaskDTO {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  taskOrder: number;
  createdAt: string;
  assignedTo: string | null;
  createdBy: string;
}

export interface OperationalTaskHistoryDTO {
  id: number;
  eventType:
    | "CREATED"
    | "STARTED"
    | "STATUS_CHANGED"
    | "ASSIGNEE_CHANGED"
    | "TICKET_LINKED"
    | "TICKET_UNLINKED"
    | "CHANGE_LINKED"
    | "CHANGE_UNLINKED"
    | "PROBLEM_LINKED"
    | "PROBLEM_UNLINKED"
    | "SUBTASK_ADDED"
    | "SUBTASK_COMPLETED"
    | "COMPLETED"
    | "CANCELLED"
    | "UPDATED";
  description: string;
  createdAt: string;
  createdByName: string;
}

export type TicketSummaryDTO = {
    ticketNumber: string;
    subject: string;
    status: string;
    priority: string;
    requesterName: string;
    createdAt: string;
};

export type ChangeSummaryDTO = {
    id: number;
    changeNumber: string;
    title: string;
    status: string;
    priority: string;
    changeOwner: string | null;
    createdAt: string;
};

export type ProblemSummaryDTO = {
    id: number;
    problemNumber: string;
    title: string;
    status: string;
    priority: string;
    createdBy: string | null;
    createdAt: string;
};