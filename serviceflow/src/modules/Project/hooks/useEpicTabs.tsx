import { useQuery } from "@tanstack/react-query";
import * as epicServices from "../services/epic-service";
import type { EpicHistoryDTO } from "../models/EpicDTO";
import type { TaskDTO } from "../models/TaskDTO";

export function useEpicHistory(id: number, enabled: boolean) {
    return useQuery<EpicHistoryDTO[]>({
        queryKey: ["epic", id, "history"],
        queryFn: async () => {
            const res = await epicServices.EpicHistory(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}

export function useTasks(id: number, enabled: boolean) {
    return useQuery<TaskDTO[]>({
        queryKey: ["epic/", id, "tasks"],
        queryFn: async () => {
            const res = await epicServices.Tasks(id!);
            return res.data;
        },
       enabled: !!id && enabled,
    });
}