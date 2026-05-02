import { useEffect, useState } from "react";
import type { TicketSimpleDTO } from "../models/ticketDTO.ts";
import * as ticketService from "../service/ticket-service.ts";

type QueryParams = {
    page: number;
    size: number;
};

function useApprovals() {
    const [tickets, setTickets]       = useState<TicketSimpleDTO[]>([]);
    const [isLoading, setIsLoading]   = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
    });

    function changePage(page: number) {
        setQueryParams({ ...queryParams, page });
    }

    function changePageSize(size: number) {
        setQueryParams({ ...queryParams, size, page: 0 });
    }

    function reload() {
        setRefreshFlag((prev) => !prev);
    }

    useEffect(() => {
        setIsLoading(true);
        ticketService
            .getAwaitingApprovalRequest(
                queryParams.page,
                queryParams.size
            )
            .then((response) => {
                const { content, totalElements } = response.data;
                setTickets(content);
                setTotalItems(totalElements);
            })
            .finally(() => setIsLoading(false));
    }, [queryParams, refreshFlag]);

    return {
        tickets,
        isLoading,
        totalItems,
        queryParams,
        changePage,
        changePageSize,
        reload,
    };
}

export default useApprovals;