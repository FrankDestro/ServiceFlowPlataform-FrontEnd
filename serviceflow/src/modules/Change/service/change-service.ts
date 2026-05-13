import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { ChangeFormDTO } from "../models/ChangeDTO.ts";

export function getAllChanges(
    page: number,
    size: number = 10,
    changeNumber: string,
    changeTypeId: number | null,
    priority: string,
    status: string,
    stage: string,
    scheduledStartFrom: string,
    scheduledStartTo: string,
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/changes",
        params: {
            page,
            size,
            changeNumber: changeNumber || null,
            changeTypeId: changeTypeId || null,
            priority: priority || null,
            status: status || null,
            stage: stage || null,
            scheduledStartFrom: scheduledStartFrom || null,
            scheduledStartTo: scheduledStartTo || null,

        },
    };
    return requestBackendConfig(config);
}

export function changeByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/changes/${id}`,
    };
    return requestBackendConfig(config);
}

export function tasksByChangeId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/changes/${id}/tasks`,
    };
    return requestBackendConfig(config);
}

export function approversByChangeId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/changes/${id}/approvers`,
    };
    return requestBackendConfig(config);
}

export function historyByChangeId(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/changes/${id}/history`,
    };
    return requestBackendConfig(config);
}

export function createChange(dto: ChangeFormDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/changes",
        data: dto,
    };
    return requestBackendConfig(config);
}

export function getAllChangeTypes() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/changes/types",
    };
    return requestBackendConfig(config);
}