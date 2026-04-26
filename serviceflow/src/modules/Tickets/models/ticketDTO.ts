import type { TicketStatus } from "../constant/TicketStatus";
import type { CategoryTicketDTO } from "./CategoryTicketDTO";
import type { ImpactTicketDTO } from "./ImpactTicketDTO";
import type { UserDTO, UserSimpleDTO } from "./RequesterDTO";
import type { SLADTO } from "./slaDTO";
import type { SolvingAreaDTO } from "./solvingAreaDTO";
import type { TypeRequestDTO } from "./typeRequestDTO";
import type { UrgencyTicketDTO } from "./UrgencyTicketDTO";

export type TicketSimpleDTO = {
    id: number;
    ticketNumber: string;
    subject: string;
    statusTicket: TicketStatus;
    registrationDate: string;
    dueDate: string;
    sla: SLADTO;
    categoryTicket: CategoryTicketDTO;
    solvingArea: SolvingAreaDTO;
    requester: UserSimpleDTO;
    technician: UserSimpleDTO | null;
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
    parentTicketId: number | null;  
    typeRequest: TypeRequestDTO;
    sla: SLADTO;
    solvingArea: SolvingAreaDTO;
    categoryTicket: CategoryTicketDTO;
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
    parentTicketId:string;
    typeRequest: string;
    solvingArea: string;
    categoryTicket: string;
}

export type TicketStatusForm = {
    status: string;
    closureReason?: string; 
}

export type TicketTypeRequestForm = {
    typeRequestId: string;
}

export type TicketUpdateAssignmetForm = {
    categoryTicketId : string;
    solvingArea: string;
    technicianId: string;
}
