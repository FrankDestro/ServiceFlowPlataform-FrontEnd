import { useQuery } from "@tanstack/react-query";
import * as history from "../services/history-service";
import type { ProjectHistoryDTO } from "../models/ProjectHIstoryDTO";


export function useProjectHistory(entityType: string, entityId: number, enabled: boolean) {
    return useQuery<ProjectHistoryDTO[]>({
        queryKey: ["project-history", entityType, entityId],
        queryFn: async () => {
            const res = await history.getProjectHistory(entityType, entityId);
            return res.data;
        },
        enabled: !!entityId && enabled,
    });
}