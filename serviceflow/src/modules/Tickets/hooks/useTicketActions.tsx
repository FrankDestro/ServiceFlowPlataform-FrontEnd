import { useQuery } from "@tanstack/react-query";
import * as ticketService from "../service/ticket-service";

function useTicketActions(ticketNumber: string | null) {
    return useQuery({
        queryKey: ["/tickets/by-number", ticketNumber],
        queryFn: async () => {
            const res = await ticketService.TicketByTicketNumber(ticketNumber!);
            return res.data;
        },
        enabled: !!ticketNumber,
        retry: false, // ← não tenta de novo em caso de erro
    });
}

export default useTicketActions;