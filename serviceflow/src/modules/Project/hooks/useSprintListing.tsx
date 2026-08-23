import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as sprintService from "../services/sprint-service"

type QueryParams = {
    page: number;
    size: number;
    name: string;
    status: string;
    projectId: number | null;
    sort: string;
};

type SearchParams = Omit<QueryParams, "page" | "size" | "sort">;

function useSprintListing() {

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        name: "",
        projectId: null,
        status: "",
        sort: "id,desc"
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["sprint", queryParams],
        queryFn: async () => {
            const res = await sprintService.getAllSprints(
                queryParams.page,
                queryParams.size,
                queryParams.name,
                queryParams.projectId,
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
        sprints: data?.content ?? [],
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

export default useSprintListing;