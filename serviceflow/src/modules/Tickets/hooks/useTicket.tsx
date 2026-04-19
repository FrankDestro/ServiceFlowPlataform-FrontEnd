import { useEffect, useState } from "react";
import { type TicketSimpleDTO } from "../models/ticketDTO";
import * as ticketService from "../service/ticket-service";
import { type TicketFilter } from "../models/TicketFilter";

export const initialQueryParams: TicketFilter = {
  page: 0,
  size: 10,
  ticketNumber: "",
  statusTicket: null,
  priority: null,
  channel: null,
  slaBreached: null,
  solvingAreaId: null,
  categoryTicketId: null,
  typeRequestId: null,
  slaId: null,
  registrationDate: null,
  completionDate: null,
  myTickets: false,
  myAreaTickets: false,
  assignedToMe: false,
};


export function useTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<TicketSimpleDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const [queryParams, setQueryParams] = useState<TicketFilter>(initialQueryParams);

  useEffect(() => {
    setIsLoading(true);

    ticketService
      .getAllTicketsByFilters(queryParams)
      .then((response: { data: { totalPages: number; content: TicketSimpleDTO[] } }) => {
        const { totalPages, content } = response.data;
        setTickets(content);
        setTotalPages(totalPages);
      })
      .finally(() => setIsLoading(false));

  }, [queryParams, showPagination]);

  function handleSearch(filters: Partial<TicketFilter>) {
    setTickets([]);

    setQueryParams(prev => ({
      ...prev,
      page: 0,
      ...filters,
    }));
  }

  function handlePageChange(newPage: number) {
    setQueryParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRowsPerPageChange(newSize: number) {
    setQueryParams(prev => ({ ...prev, page: 0, size: newSize }));
  }

  function handleActiveTabChange(isTabOneActive: boolean) {
    setShowPagination(isTabOneActive);
  }

  return {
    isLoading,
    tickets,
    totalPages,
    showPagination,
    queryParams,
    handleSearch,
    handlePageChange,
    handleRowsPerPageChange,
    handleActiveTabChange,
  };
}