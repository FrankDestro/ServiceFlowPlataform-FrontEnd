// useKnowledgeBaseCategories.tsx
import { useQuery } from "@tanstack/react-query";
import * as knowledgeBaseService from "../service/knowledgeBase-service.ts";

function useKnowledgeBaseCategories() {
    return useQuery({
        queryKey: ["knowledge-base-categories"],
        queryFn: async () => {
            const res = await knowledgeBaseService.getAllActiveCategoriesRequest();
            return res.data;
        },
    });
}

export default useKnowledgeBaseCategories;