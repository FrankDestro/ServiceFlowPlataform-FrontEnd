import { useQuery } from "@tanstack/react-query";
import * as sprintService from "../services/sprint-service";
import type { SprintDetailDTO } from "../models/SprintDTO";

export default function useSprintDetail(id: number | null) {
    return useQuery<SprintDetailDTO>({
        queryKey: ["sprint", id],
        queryFn: async () => {
            const res = await sprintService.SprintByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

