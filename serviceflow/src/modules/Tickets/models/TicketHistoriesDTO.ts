import { type UserDTO } from "./RequesterDTO";

export type TicketHistoriesDTO = {
  id: number;
  description: string;
  annotationPublic: boolean;
  registrationDate: string;
  visibleToRequester: boolean;
  systemGenerated: boolean;
  changedField: string;
  oldValue: string;
  newValue : string;
  noteType: string;
  ticketId: number;
  user :  UserDTO;
};
