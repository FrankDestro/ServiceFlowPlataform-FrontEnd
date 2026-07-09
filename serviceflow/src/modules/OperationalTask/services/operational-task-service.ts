import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";

export function operationalTaskListing(
    page: number,
    size: number = 10,
    taskNumber: string,
   categoryId: number | null,
    status: string,
    assignedTo: string,
    scheduledStartFrom: string,
    scheduledStartTo: string,
    dueDateFrom: string,
    dueDateTo: string,
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-task",
        params: {
            page,
            size,
            taskNumber: taskNumber || null,
            status: status || null,
             categoryId: categoryId || null,
            assignedTo: assignedTo || null,
            scheduledStartFrom: scheduledStartFrom || null,
            scheduledStartTo: scheduledStartTo || null,
            dueDateFrom: dueDateFrom || null,
            dueDateTo: dueDateTo || null
        },
    };
    return requestBackendConfig(config);
}

export function OperationalTaskByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}`,
    };
    return requestBackendConfig(config);
}