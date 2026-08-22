/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import { type UserDTO } from "../../modules/Usuarios/models/RequesterDTO";
import { FileType } from "../helpers/models/EnumTypes";

export const getStatusUserBadgeStyle = (
  status: string
): React.CSSProperties => {
  switch (status.toLowerCase()) {
    case "inactive":
      return {
        backgroundColor: "#F8D7DA", // Vermelho claro
        color: "#721C24", // Texto vermelho escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "active":
      return {
        backgroundColor: "#D4EDDA", // Verde claro
        color: "#155724", // Texto verde escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    default:
      return {
        backgroundColor: "#D1ECF1", // Azul claro como fallback
        color: "#0C5460", // Texto azul escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
  }
};

export const getBlockedStatusBadgeStyle = (
  statusBlock: boolean
): React.CSSProperties => {
  switch (statusBlock) {
    case true:
      return {
        backgroundColor: "#FDEAEA", // Vermelho muito claro
        color: "#B71C1C", // Vermelho escuro forte
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case false:
      return {
        backgroundColor: "#EAF7EA", // Verde muito claro
        color: "#2E7D32", // Verde escuro diferente
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    default:
      return {
        backgroundColor: "#E0E0E0", // Cinza claro como fallback
        color: "#424242", // Cinza escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
  }
};

export const getStatusTicketBadgeStyle = (
  statusTicket: string
): React.CSSProperties => {
  switch (statusTicket.toUpperCase()) {
    case "OPEN":
      return {
        backgroundColor: "#CCE5FF", // Azul claro suave
        color: "#004085",           // Azul escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "IN_PROGRESS":
      return {
        backgroundColor: "#FFF3CD", // Amarelo claro suave
        color: "#856404",           // Amarelo escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "FROZEN":
      return {
        backgroundColor: "#D6D8DB", // Cinza claro
        color: "#383D41",           // Cinza escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "CANCELED":
      return {
        backgroundColor: "#F8D7DA", // Vermelho claro suave
        color: "#721C24",           // Vermelho escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "FINISHED":
      return {
        backgroundColor: "#D4EDDA", // Verde claro suave
        color: "#155724",           // Verde escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    default:
      return {
        backgroundColor: "#D1ECF1", // Azul claro fallback
        color: "#0C5460",           // Azul escuro
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
  }
};

export const getPriorityBadgeStyle = (
  value: string
): React.CSSProperties => {
  switch (value?.toUpperCase()) {
    case "LOW":
      return {
        backgroundColor: "#f0fdf4",
        color: "#16a34a",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
      };
    case "MEDIUM":
      return {
        backgroundColor: "#f0fdfa",
        color: "#0f6e56",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
      };
    case "HIGH":
      return {
        backgroundColor: "#fffbeb",
        color: "#d97706",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
      };
    case "CRITICAL":
      return {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
      };
    default:
      return {
        backgroundColor: "#f8fafc",
        color: "#64748b",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
      };
  }
};

export const getStatusKnowErrorsBadgeStyle = (
  knowErrorStatus: string
): React.CSSProperties => {
  switch (knowErrorStatus.toUpperCase()) {
    case "OPEN":
      return {
        backgroundColor: "#FFC107" /* Amarelo */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "UNDER_ANALYSIS":
      return {
        backgroundColor: "#17a2b8" /* Azul Claro */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "DOCUMENTED":
      return {
        backgroundColor: "#6c757d" /* Cinza Claro */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "SOLUTION_PENDING":
      return {
        backgroundColor: "#fd7e14" /* Laranja Escuro */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "RESOLVED":
      return {
        backgroundColor: " #28a745" /* Verde */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    default:
      return {
        backgroundColor: "#343a40" /* Cinza Escuro */,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
  }
};

export const getSeverityBadgeStyle = (
  severity: string
): React.CSSProperties => {
  switch (severity.toLowerCase()) {
    case "baixa":
      return {
        backgroundColor: "#8DD600", // Verde claro
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "média":
      return {
        backgroundColor: "#FFC107", // Amarelo
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "alta":
      return {
        backgroundColor: "#FF9800", // Laranja
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "urgente":
      return {
        backgroundColor: "#F44336", // Vermelho escuro
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    case "crítica":
      return {
        backgroundColor: "#9C27B0", // Roxo
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
    default:
      return {
        backgroundColor: "#E0E0E0", // Cinza padrão
        color: "#333",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      };
  }
};

export function calculateRemainingTime(dueDate: string): string {
  // Converte a string de data fornecida para um objeto Date
  const dueDateObj = parseISO(dueDate);
  const currentDate = new Date();

  // Calcula a diferença de tempo em minutos
  const differenceMinutes = differenceInMinutes(dueDateObj, currentDate);
  const differenceHours = differenceInHours(dueDateObj, currentDate);
  const differenceDays = differenceInDays(dueDateObj, currentDate);

  // Calcula os minutos restantes após calcular as horas
  const remainingMinutes = Math.abs(differenceMinutes - differenceHours * 60);

  // Formata a diferença em uma string no formato "x dias, x horas e x minutos"
  const daysString = differenceDays > 0 ? `${differenceDays} dias, ` : "";
  const hoursString = `${Math.abs(differenceHours)} h `;
  const minutesString = `${remainingMinutes} min`;

  const sign = differenceMinutes < 0 ? "-" : "";

  return `${sign}${daysString}${hoursString}${minutesString}`;
}

export const formatDate = (date: Date | string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }

  return parsedDate
    .toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
};

export function toValuesTicket(inputs: any) {
  const data: any = {};

  for (const name in inputs) {
    if (name === "typeRequest" || name === "categoryTicket" || name === "sla") {
      data[name] = { id: parseInt(inputs[name], 10) };
    } else {
      data[name] = inputs[name];
    }
  }
  return data;
}

export const cleanDescription = (description: string) => {
  return description.replace(/<\/?p>/g, "");
};

export const validatePassword = (password: string): boolean => {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\\/?]).{8,}$/;
  return regex.test(password);
};

export const removeTags = (value: string) => {
  const plainText = value.replace(/<\/?[^>]+(>|$)/g, "");
  return plainText;
};

export function toUserDTO(formData: any): UserDTO {
  const data: any = {};

  // Transformando os campos para o formato esperado no UserDTO
  data.firstName = formData.firstName;
  data.lastName = formData.lastName;
  data.email = formData.email;
  data.contactNumber = formData.contactNumber;

  // Transformando o departamento e área solucionadora para objetos (caso sejam passados como IDs)
  if (formData.department) {
    data.department = { id: parseInt(formData.department, 10) };
  }
  if (formData.solvingArea) {
    data.solvingArea = { id: parseInt(formData.solvingArea, 10) };
  }

  // Transformando permissões (roles) em um array de objetos, caso existam
  if (formData.roles && Array.isArray(formData.roles)) {
    data.roles = formData.roles.map((roleId: string) => ({
      id: parseInt(roleId, 10),
    }));
  } else {
    data.roles = [];
  }

  // Se a imagem de perfil foi adicionada, você pode incluir ela como base64 ou em um formato adequado
  if (formData.imgProfile && formData.imgProfile instanceof File) {
    // Aqui você pode tratar a imagem conforme necessário (ex: convertendo para base64)
    // Por enquanto, deixo como um exemplo de como você pode incluir a imagem
    data.imgProfile = formData.imgProfile;
  }

  return data;
}

export function getFileType(mimeType: string): FileType | null {
  switch (mimeType) {
    case "image/png":
      return FileType.PNG;
    case "application/pdf":
      return FileType.PDF;
    case "application/msword":
      return FileType.DOC;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return FileType.DOCX;
    case "image/gif":
      return FileType.GIF;
    case "text/plain":
      return FileType.TXT;
    case "image/jpeg":
      return FileType.JPEG;
    case "application/octet-stream": // link ou outro tipo genérico
      return FileType.LINK;
    default:
      return null; // Ou você pode lançar um erro aqui se o tipo for inválido
  }
}

export function isSlaCritical(dueDate: string): boolean {
  const now = new Date().getTime();
  const due = new Date(dueDate).getTime();
  const diffMs = due - now;

  const fortyFiveMinutesMs = 45 * 60 * 1000;

  return diffMs <= fortyFiveMinutesMs;
}

export const noteTypeLabels: Record<string, string> = {
  COMMENT: "Comentário",
  STATUS_CHANGE: "Mudança de Status",
  REASSIGNMENT: "Redirecionamento",
  PRIORITY_CHANGE: "Mudança de Prioridade",
  SLA_BREACH: "Violação de SLA",
  ATTACHMENT: "Anexo Adicionado",
  SYSTEM_GENERATED: "Sistema",
  TICKET_OPENED: "Ticket criado",
  AWAITING_APPROVAL: "Ticket aguardando aprovação",
  TICKET_APPROVAL: "Ticket aprovado"
};

export function getNoteTypeLabel(noteType: string): string {
  return noteTypeLabels[noteType] ?? noteType;
}

function colorByNoteType(noteType: string): string {
  const map: Record<string, string> = {
    AWAITING_APPROVAL: "#767a80",
    TICKET_OPENED: "#3b82f6",
    REASSIGNMENT: "#8b5cf6",
    PRIORITY_CHANGE: "#f59e0b",
    SLA_BREACH: "#ef4444",
    SYSTEM_GENERATED: "#94a3b8",
  };
  return map[noteType] ?? "#94a3b8";
}

// Badge de status
export function getStatusKnowledgeBadgeStyle(status: string): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    DRAFT: { background: "#fef9c3", color: "#854d0e", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    PUBLISHED: { background: "#dcfce7", color: "#166534", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    ARCHIVED: { background: "#1e293b", color: "#f8fafc", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  };
  return styles[status] ?? styles["DRAFT"];
}


// MODULO DE MUDANÇAS
export const getStatusBadgeStyle = (status: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    REQUESTED: { background: "#e0f2fe", color: "#075985", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    APPROVED: { background: "#dcfce7", color: "#166534", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    IN_PROGRESS: { background: "#fef9c3", color: "#854d0e", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    COMPLETED: { background: "#1e293b", color: "#f8fafc", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    CANCELLED: { background: "#fee2e2", color: "#991b1b", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  };
  return styles[status] ?? styles["REQUESTED"];
};

export const getTypeBadgeStyle = (type: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    STANDARD: { background: "#e0f2fe", color: "#075985", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    NORMAL: { background: "#ede9fe", color: "#5b21b6", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    MAJOR: { background: "#fee2e2", color: "#991b1b", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    MINOR: { background: "#f0fdf4", color: "#166534", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    EMERGENCY: { background: "#fef3c7", color: "#92400e", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  };
  return styles[type] ?? styles["STANDARD"];
};

export const getPriorityStyle = (priority: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    CRITICAL: { color: "#7c2d12", fontWeight: 700 },
    HIGH: { color: "#dc2626", fontWeight: 700 },
    MEDIUM: { color: "#d97706", fontWeight: 600 },
    LOW: { color: "#16a34a", fontWeight: 600 },
  };
  return styles[priority] ?? {};
};


// MODULO DE CHANGES 
export const getTypeBadgeClass = (type: string) => {
  const map: Record<string, string> = {
    STANDARD: "badge badge-standard",
    NORMAL: "badge badge-normal",
    MAJOR: "badge badge-major",
    MINOR: "badge badge-minor",
    EMERGENCY: "badge badge-emergency",
  };
  return map[type] ?? "badge";
};

export const getStatusBadgeClass = (status: string) => {
  const map: Record<string, string> = {
    REQUESTED: "badge badge-requested",
    APPROVED: "badge badge-approved",
    IN_PROGRESS: "badge badge-progress",
    COMPLETED: "badge badge-completed",
    CANCELLED: "badge badge-cancelled",
    RESOLVED : "badge badge-resolved",
  };
  return map[status] ?? "badge";
};

export const getApproverBadgeClass = (status: string) => {
  const map: Record<string, string> = {
    APPROVED: "badge badge-approved",
    PENDING: "badge badge-pending",
    REJECTED: "badge badge-rejected",
  };
  return map[status] ?? "badge";
};

export const getPriorityClass = (level: string) => {
  const map: Record<string, string> = {
    CRITICAL: "priority-critical",
    HIGH: "priority-high",
    MEDIUM: "priority-medium",
    LOW: "priority-low",
  };
  return map[level] ?? "";
};

export const getLevelClass = (level: string) => {
  const map: Record<string, string> = {
    HIGH: "level-indicator level-high",
    MEDIUM: "level-indicator level-medium",
    LOW: "level-indicator level-low",
  };
  return map[level] ?? "level-indicator";
};

export const getTaskCheckClass = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: "task-check done",
    IN_PROGRESS: "task-check progress",
    PENDING: "task-check pending",
  };
  return map[status] ?? "task-check pending";
};

export const getTaskStatusClass = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: "task-status ts-done",
    IN_PROGRESS: "task-status ts-progress",
    PENDING: "task-status ts-pending",
  };
  return map[status] ?? "task-status ts-pending";
};

export const getTaskStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: "Concluída",
    IN_PROGRESS: "Em andamento",
    PENDING: "Pendente",
  };
  return map[status] ?? status;
};

export const getInitials = (email: string) => {
  return email?.substring(0, 2).toUpperCase() ?? "??";
};

// MODULO DE PROBLEM
export const getUrgencyStyle = (urgency: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    CRITICAL: { color: "#7c2d12", fontWeight: 700 },
    HIGH: { color: "#dc2626", fontWeight: 700 },
    MEDIUM: { color: "#d97706", fontWeight: 600 },
    LOW: { color: "#16a34a", fontWeight: 600 },
  };
  return styles[urgency] ?? {};
};

export const getProblemStatusBadgeStyle = (status: string): React.CSSProperties => {
  const styles: Record<string, React.CSSProperties> = {
    OPEN: { background: "#e0f2fe", color: "#075985", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    IN_INVESTIGATION: { background: "#fef9c3", color: "#854d0e", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    KNOWN_ERROR: { background: "#ede9fe", color: "#5b21b6", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    RESOLVED: { background: "#dcfce7", color: "#166534", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    CLOSED: { background: "#1e293b", color: "#f8fafc", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    OVERDUE: { background: "#fee2e2", color: "#991b1b", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  };
  return styles[status] ?? styles["OPEN"];
};

export const getProblemStatusBadgeClass = (status: string) => {
  const map: Record<string, string> = {
    OPEN: "badge badge-open",
    IN_INVESTIGATION: "badge badge-investigation",
    KNOWN_ERROR: "badge badge-known-error",
    RESOLVED: "badge badge-resolved",
    CLOSED: "badge badge-closed",
    OVERDUE: "badge badge-overdue",
  };
  return map[status] ?? "badge";
};


// PROJECT
export const getStatusTaskBadgeClass = (status: string) => {
  const map: Record<string, string> = {
    BACKLOG: "badge badge-requested",
    TODO: "badge badge-approved",
    IN_PROGRESS: "badge badge-progress",
    IN_REVIEW: "badge badge-completed",
    TESTING: "badge badge-cancelled",
    DONE: "badge badge-resolved",
    CANCELLED: "badge badge-cancelled",
  };
  return map[status] ?? "badge";
};