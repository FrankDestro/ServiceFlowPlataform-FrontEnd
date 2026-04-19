import { type AxiosRequestConfig } from "axios";
import { type TicketHistoryDTO } from "../models/ticketHistoryDTO";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function addTicketHistoryNote(obj: TicketHistoryDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/ticketHistory/addHistory",
    withCredentials: true,
    data: obj,
  };
  return requestBackendConfig(config);
}

export function getAllHistoryById(id: number) {
  return requestBackendConfig({ url: `/ticketHistory/${id}` });
}
