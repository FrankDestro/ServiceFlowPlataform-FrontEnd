// hooks/useOperationalTaskTabs.ts
import { useQuery } from "@tanstack/react-query";
import type { ChangeSummaryDTO, OperationalSubTaskDTO, OperationalTaskHistoryDTO, ProblemSummaryDTO, TicketSummaryDTO } from "../model/operationalTaskDTO";
import * as operationalTaskService from "../services/operational-task-service";

const mockAttachments = [
    { id: 1, fileName: "backup_log_230626.txt", fileSize: "14 KB", createdAt: "23/06/2026 03:10" },
    { id: 2, fileName: "dump_prod_230626.sql.gz", fileSize: "2.4 MB", createdAt: "23/06/2026 03:22" },
];

export function useOperationalTaskChecklist(id: number, enabled: boolean) {
    return useQuery<OperationalSubTaskDTO[]>({
        queryKey: ["operational-task/checklist", id, "task"],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskCheckListById(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useOperationalTaskHistory(id: number, enabled: boolean) {
    return useQuery<OperationalTaskHistoryDTO[]>({
        queryKey: ["operational-task/", id, "task"],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskHistoricById(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useOperationalTaskRelatedTickets(id: number, enabled: boolean) {
    return useQuery<TicketSummaryDTO[]>({
        queryKey: ["operational-task/", id, "tickets"],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskRelatedTicketsById(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useOperationalTaskRelatedChanges(id: number, enabled: boolean) {
    return useQuery<ChangeSummaryDTO[]>({
        queryKey: ["operational-task/", id, "changes"],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskRelatedChangesById(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useOperationalTaskRelatedProblems(id: number, enabled: boolean) {
    return useQuery<ProblemSummaryDTO[]>({
        queryKey: ["operational-task/", id, "problems"],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskRelatedProblemsById(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useOperationalTaskAttachments(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["operational-task-attachments", id],
        queryFn: () => Promise.resolve(mockAttachments),
        enabled,
    });
}