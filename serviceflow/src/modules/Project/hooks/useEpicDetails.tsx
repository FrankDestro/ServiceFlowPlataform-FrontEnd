// hooks/useOperationalTaskDetail.ts
import { useQuery } from "@tanstack/react-query";
import * as epicServices from "../services/epic-service";
import type { EpicDetailDTO } from "../models/EpicDTO";

export default function useOperationalTaskDetail(id: number | null) {
    return useQuery<EpicDetailDTO>({
        queryKey: ["epic", id],
        queryFn: async () => {
            const res = await epicServices.EpicByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}