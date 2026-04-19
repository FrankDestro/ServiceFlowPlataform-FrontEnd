import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";
import { type TicketFormDTO } from "../models/ticketDTO";
import type { TicketFilter } from "../models/TicketFilter";

export function getAllTicketsByFilters(
  params: TicketFilter,
  sort = "registrationDate"
) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      return value !== 0 && value !== "" && value !== false;
    })
  );

  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/tickets",
    params: {
      ...cleanParams,
      sort,
    },
  };

  return requestBackendConfig(config);
}

export function ticketById(id: number) {
  return requestBackendConfig({ url: `/ticket/getTicketById/${id}` });
}

export function createTicket(obj: TicketFormDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/tickets/create",
    withCredentials: true,
    data: obj,
  };
  return requestBackendConfig(config);
}
