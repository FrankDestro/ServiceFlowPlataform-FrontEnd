import type { ChannelTicketDTO } from "../constant/ChannelTicket";
import type { PriorityTicket } from "../constant/PriorityTicket";
import type { TicketStatus } from "../constant/TicketStatus";

export type TicketFilter = {
  page: number;
  size: number;

  ticketNumber: string;

  statusTicket: TicketStatus | null;
  priority: PriorityTicket | null;
  channel: ChannelTicketDTO | null;

  slaBreached: boolean | null;

  solvingAreaId: number | null;
  categoryTicketId: number | null;
  typeRequestId: number | null;
  slaId: number | null;

  initialDate: string;   // ← Data de Registro inicial
  finalDate: string;     // ← Data de Registro final

  myTickets: boolean;
  myAreaTickets: boolean;
  assignedToMe: boolean;
};