import { useQuery } from "@tanstack/react-query";
import * as sprintService from "../services/sprint-service";

export function useSprintTasks(sprintId: number, enabled: boolean) {
    return useQuery({
        queryKey: ["sprint", sprintId, "tasks"],
        queryFn: async () => {
            const res = await sprintService.getTaskBySprintId(sprintId)
            return res.data;
        },
        enabled: enabled && !!sprintId,
    });
} 

export function useSprintHistory(sprintId: number, enabled: boolean) {
    return useQuery({
        queryKey: ["sprint-history", sprintId],
        queryFn: async () => {
            // AJUSTAR: endpoint GET /sprints/{id}/history ainda não existe no backend.
            // Fictício por enquanto, só pra não quebrar a tela — troca pelo service real quando o endpoint existir.
            const res = await sprintService.getSprintHistoryRequest(sprintId);
            return res.data;
        },
        enabled: enabled && !!sprintId,
    });
}