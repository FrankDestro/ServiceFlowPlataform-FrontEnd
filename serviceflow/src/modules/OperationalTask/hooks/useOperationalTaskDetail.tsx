// hooks/useOperationalTaskDetail.ts
import { useQuery } from "@tanstack/react-query";
import * as operationalTaskService from "../services/operational-task-service";
import type { OperationalTaskDetailsDTO } from "../model/operationalTaskDTO";

export default function useOperationalTaskDetail(id: number | null) {
    return useQuery<OperationalTaskDetailsDTO>({
        queryKey: ["operational-task-detail", id],
        queryFn: async () => {
            const res = await operationalTaskService.OperationalTaskByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

