import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";
import { type TicketFormDTO } from "../models/ticketDTO";
import type { TicketFilter } from "../models/TicketFilter";

export function getAllTicketsByFilters(
  params: TicketFilter,
  sort = "ticketNumber"
) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      if (key === "page" || key === "size") return true;
      return value !== 0 && value !== "" && value !== false && value !== null;
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
  return requestBackendConfig({ url: `/tickets/${id}` });
}

export function TicketByTicketNumber(ticketNumber: string) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/tickets/by-number/${ticketNumber}`,
    // @ts-ignore
    silent: true  // ← parâmetro customizado na config
  }
  return requestBackendConfig(config);
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

export function changeTicketStatus(id: number, status: string, closureReason: string) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `/tickets/${id}/status`,
    params: {
      status,
      closureReason
    }
  };
  return requestBackendConfig(config);
}

export function changeTypeRequesty(id: number, typeRequest: string) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `/tickets/${id}/type-request`,
    params: {
      typeRequest
    }
  };
  return requestBackendConfig(config);
}

export function changeAssignment(id: number, categoryId: string, solvingAreaId: string, technicianId: string) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `/tickets/${id}/assignment`,
    params: {
      categoryId,
      solvingAreaId,
      technicianId,
    }
  };
  return requestBackendConfig(config);
}


export function getAwaitingApprovalRequest(page: number, size: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/tickets/awaiting-approval",
    params: { page, size },
  };
  return requestBackendConfig(config);
}


export function approveTicketRequest(id: number) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `/tickets/${id}/approve`,
  };
  return requestBackendConfig(config);
}

export function rejectTicketRequest(id: number, reason: string) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `/tickets/${id}/reject`,
    params: { reason },
  };
  return requestBackendConfig(config);
}

