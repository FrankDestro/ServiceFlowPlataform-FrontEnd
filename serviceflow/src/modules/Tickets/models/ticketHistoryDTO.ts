import { type UserSimpleDTO } from "../../Usuarios/models/UserDTO";

export type TicketHistoryDTO = {
  id : number,
  description: string;
  annotationPublic: boolean;
  visibleToRequester: boolean;
  noteType: string;
  ticketId: number;
  user: UserSimpleDTO;
  registrationDate : string;
  systemGenerated: string;
  };
