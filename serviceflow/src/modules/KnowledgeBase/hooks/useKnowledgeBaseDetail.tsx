// useKnowledgeBaseDetail.tsx
import { useQuery } from "@tanstack/react-query";
import * as knowledgeBaseService from "../service/knowledgeBase-service";

function useKnowledgeBaseDetail(id: number | null) {
    return useQuery({
        queryKey: ["knowledge-base", id],
        queryFn: async () => {
            const res = await knowledgeBaseService.knowledgeBaseByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

export default useKnowledgeBaseDetail;