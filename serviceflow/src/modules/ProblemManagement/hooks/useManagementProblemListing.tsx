import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as problemService from "../service/management-problem-service";

type QueryParams = {
    page: number;
    size: number;
    problemNumber: string;
    categoryId: number | null;
    priority: string;
    urgency: string;
    status: string;
    assignedToId: number | null;
    createdById: number | null;
    initialDate: string;
    finalDate: string;
    myProblems: boolean;
};

type SearchParams = Omit<QueryParams, "page" | "size">;

function useManagementProblemListing() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        problemNumber: "",
        categoryId: null,
        priority: "",
        urgency: "",
        status: "",
        assignedToId: null,
        createdById: null,
        initialDate: "",
        finalDate: "",
        myProblems: false,
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["problems", queryParams],
        queryFn: async () => {
            const res = await problemService.getAllProblems(
                queryParams.page,
                queryParams.size,
                queryParams.problemNumber,
                queryParams.categoryId,
                queryParams.priority,
                queryParams.urgency,
                queryParams.status,
                queryParams.assignedToId,
                queryParams.createdById,
                queryParams.initialDate,
                queryParams.finalDate,
                queryParams.myProblems,
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
        problems: data?.content ?? [],
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

export default useManagementProblemListing;