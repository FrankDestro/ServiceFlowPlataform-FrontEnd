// useProblemDetail.ts
import { useQuery } from "@tanstack/react-query";
import * as problemService from "../service/management-problem-service";

function useProblemDetail(id: number | null) {
    return useQuery({
        queryKey: ["problems", id],
        queryFn: async () => {
            const res = await problemService.problemByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

export default useProblemDetail;