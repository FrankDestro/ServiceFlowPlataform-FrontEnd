import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";

export function getAllProblems(
    page: number,
    size: number = 10,
    problemNumber: string,
    categoryId: number | null,
    priority: string,
    urgency: string,
    status: string,
    assignedToId: number | null,
    createdById: number | null,
    initialDate: string,
    finalDate: string,
    myProblems: boolean,
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/problems",
        params: {
            page,
            size,
            problemNumber: problemNumber || null,
            categoryId: categoryId || null,
            priority: priority || null,
            urgency: urgency || null,
            status: status || null,
            assignedToId: assignedToId || null,
            createdById: createdById || null,
            initialDate: initialDate || null,
            finalDate: finalDate || null,
            myProblems: myProblems || null,
        },
    };
    return requestBackendConfig(config);
}

export function problemByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/problems/${id}`,
    };
    return requestBackendConfig(config);
}

export function relatedTicketsByProblemId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/problems/${id}/tickets`,
    };
    return requestBackendConfig(config);
}

export function relatedChangesByProblemId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/problems/${id}/changes`,
    };
    return requestBackendConfig(config);
}

export function historyByProblemId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/problems/${id}/history`,
    };
    return requestBackendConfig(config);
}

export function attachmentsByProblemId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/problems/${id}/attachments`,
    };
    return requestBackendConfig(config);
}