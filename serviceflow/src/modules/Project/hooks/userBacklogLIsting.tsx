import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as taskService from "../services/task-service";

type QueryParams = {
    page: number;
    size: number;
    taskNumber: string,
    projectId: number | null,
    epicId: number | null,
    status: string,
    priority: string,
    assignedTo: number | null,
    sort: string
};

type SearchParams = Omit<QueryParams, "page" | "size" | "sort">;

function userBacklogLIsting() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        taskNumber: "",
        projectId: null,
        epicId: null,
        status: "",
        priority: "",
        assignedTo: null,
        sort: "id,desc"
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["task", queryParams],
        queryFn: async () => {
            const res = await taskService.getAllBacklog(
                queryParams.page,
                queryParams.size,
                queryParams.taskNumber,
                queryParams.projectId,
                queryParams.epicId,
                queryParams.status,
                queryParams.priority,
                queryParams.assignedTo,
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
        backlog: data?.content ?? [],
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

export default userBacklogLIsting;