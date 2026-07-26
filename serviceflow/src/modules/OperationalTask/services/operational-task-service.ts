import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { ChangeSummaryDTO, OperationalSubTaskDTO, OperationalTaskDetailsDTO, OperationalTaskHistoryDTO, ProblemSummaryDTO, TicketSummaryDTO } from "../model/operationalTaskDTO.ts";

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

export function OperationalTaskByIdRequest(id: number): AxiosPromise<OperationalTaskDetailsDTO> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}`,
    };
    return requestBackendConfig(config);
}

export function OperationalTaskCheckListById(id: number): AxiosPromise<OperationalSubTaskDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/checklist/${id}/task`,
    };
    return requestBackendConfig(config);
}


export function OperationalTaskHistoricById(id: number): AxiosPromise<OperationalTaskHistoryDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}/history`,
    };
    return requestBackendConfig(config);
}

export function OperationalTaskRelatedTicketsById(id: number): AxiosPromise<TicketSummaryDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}/tickets`,
    };
    return requestBackendConfig(config);
}


export function OperationalTaskRelatedChangesById(id: number):  AxiosPromise<ChangeSummaryDTO[]>{
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}/changes`,
    };
    return requestBackendConfig(config);
}


export function OperationalTaskRelatedProblemsById(id: number):  AxiosPromise<ProblemSummaryDTO[]>{
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/operational-task/${id}/problems`,
    };
    return requestBackendConfig(config);
}
