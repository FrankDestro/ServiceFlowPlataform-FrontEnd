import { type UserSimpleDTO } from "../../Usuarios/models/UserDTO";

export type TicketHistoryDTO = {
  id: number,
  description: string;
  annotationPublic: boolean;
  visibleToRequester: boolean;
  noteType: string;
  ticketId: number;
  user: UserSimpleDTO;
  registrationDate: string;
  systemGenerated: string;
};


export type TicketHistoryFormDTO = {
  description: string;
  annotationPublic: boolean;
  visibleToRequester: boolean;
  systemGenerated : boolean
  noteType: string;
  ticketId: number;
};