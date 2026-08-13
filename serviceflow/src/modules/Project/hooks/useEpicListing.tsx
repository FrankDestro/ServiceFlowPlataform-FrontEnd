import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as epicService from "../services/epic-service";

type QueryParams = {
    page: number;
    size: number;
    projectId: number | null;
    status: string;
    priority: string;
    sort: string;
};

type SearchParams = Omit<QueryParams, "page" | "size" | "sort">;

function useEpicListing() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        projectId: null,
        priority: "",
        status: "",
        sort: "id,desc"
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["epic", queryParams],
        queryFn: async () => {
            const res = await epicService.getAllEpics(
                queryParams.page,
                queryParams.size,
                queryParams.projectId,
                queryParams.priority,
                queryParams.status,
                queryParams.sort
            );
            return res.data;
        },
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
        refetch();
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

    return {
        epics: data?.content ?? [],
        totalItems: data?.totalElements ?? 0,
        isLoading,
        error,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
        changeSort
    };
}

export default useEpicListing;