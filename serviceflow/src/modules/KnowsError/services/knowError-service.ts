import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { KnowErrorUpdateDTO } from "../models/knowErrorDTO.ts";


export function allKnowErrorRequest(
    page: number,
    size: number = 10,
    title: string,
    status: string,
    affectedSystems: string,
    tags: string,
    initialDate: string,
    finalDate: string,
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/know-error",
        params: {
            page,
            size,
            title: title || null,
            status: status || null,
            affectedSystems: affectedSystems || null,
            tags: tags.length > 0 ? tags : null, // ← junta em string
            initialDate: initialDate || null,
            finalDate: finalDate || null,
        },

    };
    return requestBackendConfig(config);
}

export function createKnowErrorRequest(data: {
    title: string;
    description: string;
    rootCause: string;
    solution: string;
    workaround: string;
    affectedSystems: string;
    status: string;
    tags: string[];
}) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/know-error",
        data,
    };
    return requestBackendConfig(config);
}

export function knowErrorByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/know-error/${id}`,
    };
    return requestBackendConfig(config);
}

export function updateKnowErrorRequest(id: number, data: KnowErrorUpdateDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/know-error/${id}`,
        data: data,
    };
    return requestBackendConfig(config);
}

// Change Status - query param
export function changeStatusKnowErrorRequest(id: number, status: string) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/know-error/${id}/status`,
        params: { status }, // query param ?status=RESOLVED
    };
    return requestBackendConfig(config);
}

// Increment Views - só o id
export function incrementViewsKnowErrorRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/know-error/${id}/view`,
    };
    return requestBackendConfig(config);
}

// Mark as Helpful - só o id
export function markAsHelpfulKnowErrorRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/know-error/${id}/helpful`,
    };
    return requestBackendConfig(config);
}

// Archive - só o id
export function archiveKnowErrorRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/know-error/${id}/archive`,
    };
    return requestBackendConfig(config);
}