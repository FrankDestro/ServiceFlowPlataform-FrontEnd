import type { ChannelTicketDTO } from "../constant/ChannelTicket";
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
  channel: ChannelTicketDTO;
  slaBreached: boolean;
  registrationDate: string;
  dueDate: string;
  updatedAt: string;
  typeRequest: TypeRequestDTO;
  sla: SLADTO;
  solvingArea: SolvingAreaDTO;
  categoryTicket: CategoryTicketDTO;
  requester: UserDTO
  technician: UserDTO
};

export type TicketFormDTO = {
    subject: string;
    description: string;
    urgency: number;
    impact: number;
    channel: string;
    parentTicketId: number | null;
    typeRequestId: number;
    solvingAreaId: number;
    categoryTicketId: number;
};