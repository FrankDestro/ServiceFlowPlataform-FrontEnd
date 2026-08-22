// useKnowledgeBaseDetail.tsx
import { useQuery } from "@tanstack/react-query";
import * as taskService from "../services/task-service"

function userTaskDetails(id: number | null) {
    return useQuery({
        queryKey: ["task", id],
        queryFn: async () => {
            const res = await taskService.getTaskById(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

export default userTaskDetails;