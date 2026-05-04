import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as changeService from "../service/change-service.ts";

type QueryParams = {
    page: number;
    size: number;
    title: string;
    changeNumber: string;
    changeTypeId: number | null;
    priority: string;
    status: string;
    stage: string;
    scheduledStartFrom: string;
    scheduledStartTo: string;
};

type SearchParams = Omit<QueryParams, "page" | "size">;

function useChangeListing() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        title: "",
        changeNumber: "",
        changeTypeId: null,
        priority: "",
        status: "",
        stage: "",
        scheduledStartFrom: "",
        scheduledStartTo: "",
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["changes", queryParams],
        queryFn: async () => {
            const res = await changeService.getAllChanges(
                queryParams.page,
                queryParams.size,
                queryParams.changeNumber,
                queryParams.changeTypeId,
                queryParams.priority,
                queryParams.status,
                queryParams.stage,
                queryParams.scheduledStartFrom,
                queryParams.scheduledStartTo,
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

    return {
        changes: data?.content ?? [],
        totalItems: data?.totalElements ?? 0,
        isLoading,
        error,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    };
}

export default useChangeListing;