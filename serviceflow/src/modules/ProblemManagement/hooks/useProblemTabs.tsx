// useProblemTabs.ts
import { useQuery } from "@tanstack/react-query";
import * as problemService from "../service/management-problem-service";

function useProblemRelatedTickets(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["problems", id, "tickets"],
        queryFn: async () => {
            const res = await problemService.relatedTicketsByProblemId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

function useProblemRelatedChanges(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["problems", id, "changes"],
        queryFn: async () => {
            const res = await problemService.relatedChangesByProblemId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

function useProblemHistory(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["problems", id, "history"],
        queryFn: async () => {
            const res = await problemService.historyByProblemId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

function useProblemAttachments(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["problems", id, "attachments"],
        queryFn: async () => {
            const res = await problemService.attachmentsByProblemId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

export { useProblemRelatedTickets, useProblemAttachments, useProblemHistory, useProblemRelatedChanges };

