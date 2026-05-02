import { useEffect, useState } from "react";
import type { KnowledgeBaseSimpleDTO } from "../models/knowledgeBaseDTO.ts";
import * as knowledgeBaseService from "../service/knowledgeBase-service.ts";

type QueryParams = {
    page: number;
    size: number;
    title: string;
    categoryId: number | null;
    status: string;
    tags: string;
};

type SearchParams = Omit<QueryParams, "page" | "size">;

function useKnowledgeBase() {
    const [articles, setArticles] = useState<KnowledgeBaseSimpleDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        title: "",
        categoryId: null,
        status: "",
        tags: "",
    });

    function search(formData: SearchParams) {
        setQueryParams(prev => ({ ...prev, page: 0, ...formData }));
    }

    function changePage(page: number) {
        setQueryParams(prev => ({ ...prev, page }));
    }

    function changePageSize(size: number) {
        setQueryParams(prev => ({ ...prev, size, page: 0 }));
    }

    function reload() {
        setRefreshFlag(prev => !prev);
    }

    useEffect(() => {
        setIsLoading(true);
        knowledgeBaseService
            .allKnowledgeBaseRequest(
                queryParams.page,
                queryParams.size,
                queryParams.title,
                queryParams.categoryId,
                queryParams.status,
                queryParams.tags,
            )
            .then((response) => {
                const { content, totalElements } = response.data;
                setArticles(content);
                setTotalItems(totalElements);
            })
            .finally(() => setIsLoading(false));
    }, [queryParams, refreshFlag]);

    return {
        articles,
        isLoading,
        totalItems,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    };
}

export default useKnowledgeBase;