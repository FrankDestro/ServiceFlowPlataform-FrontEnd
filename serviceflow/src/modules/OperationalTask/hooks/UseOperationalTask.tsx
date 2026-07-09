import { useEffect, useState } from "react";
import type { OperationalTaskSimpleDTO } from "../model/operationalTaskDTO.ts";
import * as operationaTaskService from "../services/operational-task-service.ts";

type QueryParams = {
    page: number;
    size: number;
    taskNumber: string,
    categoryId: number | null;
    status: string;
    assignedTo: string,
    scheduledStartFrom: string,
    scheduledStartTo: string,
    dueDateFrom: string,
    dueDateTo: string,
};

type SearchParams = Omit<QueryParams, "page" | "size">;

function UseOperationalTask() {
    const [tasks, setTasks] = useState<OperationalTaskSimpleDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        taskNumber: "",
        categoryId: null,
        status: "",
        assignedTo: "",
        scheduledStartFrom: "",
        scheduledStartTo: "",
        dueDateFrom: "",
        dueDateTo: "",
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
        operationaTaskService
            .operationalTaskListing(
                queryParams.page,
                queryParams.size,
                queryParams.taskNumber,
                queryParams.categoryId,
                queryParams.status,
                queryParams.assignedTo,
                queryParams.scheduledStartFrom,
                queryParams.scheduledStartTo,
                queryParams.dueDateFrom,
                queryParams.dueDateTo,
            )
            .then((response) => {
                const { content, totalElements } = response.data;
                setTasks(content);
                setTotalItems(totalElements);
            })
            .finally(() => setIsLoading(false));
    }, [queryParams, refreshFlag]);

    return {
        tasks,
        isLoading,
        totalItems,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    };
}

export default UseOperationalTask;

