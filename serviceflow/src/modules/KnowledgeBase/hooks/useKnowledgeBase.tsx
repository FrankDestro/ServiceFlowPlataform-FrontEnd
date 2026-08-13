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
    sort: string;
};

type SearchParams = Omit<QueryParams, "page" | "size" | "sort">;

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
        sort: "id,desc"
    });

    function search(formData: SearchParams) {
        setQueryParams(prev => ({
            ...prev,
            page: 0,
            ...formData
        }));
    }
    function changePage(page: number) {
        setQueryParams(prev => ({
            ...prev,
            page
        }));
    }
    function changePageSize(size: number) {
        setQueryParams(prev => ({
            ...prev,
            size,
            page: 0
        }));
    }
    function changeSort(field: string) {
        setQueryParams(prev => {
            const direction =
                prev.sort === `${field},asc`
                    ? "desc"
                    : "asc";
            return {
                ...prev,
                page: 0,
                sort: `${field},${direction}`
            };
        });
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
                queryParams.sort
            )
            .then((response) => {
                const {
                    content,
                    totalElements
                } = response.data;
                setArticles(content);
                setTotalItems(totalElements);
            })
            .catch(() => {
                setArticles([]);
                setTotalItems(0);
            })
            .finally(() => {

                setIsLoading(false);
            });
    }, [queryParams, refreshFlag]);

    return {
        articles,
        isLoading,
        totalItems,
        queryParams,
        search,
        changeSort,
        changePage,
        changePageSize,
        reload
    };

}

export default useKnowledgeBase;