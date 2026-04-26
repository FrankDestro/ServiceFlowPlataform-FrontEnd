import { type AxiosRequestConfig } from "axios";
import { type TicketHistoryFormDTO } from "../models/ticketHistoryDTO";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function addTicketHistoryNote(obj: TicketHistoryFormDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/ticket-history",
    withCredentials: true,
    data: obj,
  };
  return requestBackendConfig(config);
}

export function getAllHistoryById(id: number) {
  return requestBackendConfig({ url: `/ticket-history/ticket/${id}` });
}
