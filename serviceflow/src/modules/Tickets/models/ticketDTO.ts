import type { TicketStatus } from "../constant/TicketStatus";
import type { CategoryTicketDTO } from "./CategoryTicketDTO";
import type { ImpactTicketDTO } from "./ImpactTicketDTO";
import type { UserDTO } from "./RequesterDTO";
import type { SLADTO } from "./slaDTO";
import type { SolvingAreaDTO } from "./solvingAreaDTO";
import type { SubCategoryTicketDTO } from "./SubCategoryDTO";
import type { TypeRequestDTO } from "./typeRequestDTO";
import type { UrgencyTicketDTO } from "./UrgencyTicketDTO";

export type TicketSimpleDTO = {
    id: number;
    ticketNumber: string;
    subject: string;
    statusTicket: TicketStatus;
    registrationDate: string;
    dueDate: string;
    updatedAt: string | null;
    slaSeverity: string | null;
    solvingAreaName: string | null;
    categoryTicketName: string | null;
    subCategoryName: string | null;
    requesterName: string;
    technicianName: string | null;
};

export type TicketDTO = {
    id: number;
    ticketNumber: string;
    subject: string;
    description: string;
    statusTicket: TicketStatus;
    urgencyTicket: UrgencyTicketDTO;
    impactTicket: ImpactTicketDTO;
    priority: string;
    channel: string;
    slaBreached: boolean;
    registrationDate: string;
    firstResponseAt: string | null;
    dueDate: string;
    completionDate: string | null;
    updatedAt: string;
    closureReason: string | null;
    relatedTickets: string[];
    typeRequest: TypeRequestDTO;
    sla: SLADTO;
    solvingArea: SolvingAreaDTO;
    categoryTicket: CategoryTicketDTO;
    subCategoryTicket: SubCategoryTicketDTO;
    requester: UserDTO;
    technician: UserDTO;
    resolver: UserDTO | null;
};

export type TicketFormDTO = {
    subject: string;
    description: string;
    urgency: string;
    impact: string;
    channel: string;
    relatedTickets?: string[];
    typeRequest: string;
    solvingArea: string;
    categoryTicket: string;
    subCategoryTicket: string;
}

export type TicketStatusForm = {
    status: string;
    closureReason?: string;
}

export type TicketTypeRequestForm = {
    typeRequestId: string;
}

export type TicketUpdateAssignmetForm = {
    categoryTicketId: string;
    solvingArea: string;
    technicianId: string;
}
