import { useQuery } from "@tanstack/react-query";
import * as changeService from "../service/change-service";

function useChangeTasks(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["changes", id, "tasks"],
        queryFn: async () => {
            const res = await changeService.tasksByChangeId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

function useChangeApprovers(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["changes", id, "approvers"],
        queryFn: async () => {
            const res = await changeService.approversByChangeId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

function useChangeHistory(id: number, enabled: boolean) {
    return useQuery({
        queryKey: ["changes", id, "history"],
        queryFn: async () => {
            const res = await changeService.historyByChangeId(id);
            return res.data;
        },
        enabled: !!id && enabled,
    });
}

export { useChangeTasks, useChangeApprovers, useChangeHistory };
