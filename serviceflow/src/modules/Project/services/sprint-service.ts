import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { SprintDetailDTO } from "../models/SprintDTO.ts";
import type { EpicHistoryDTO } from "../models/EpicDTO.ts";
import type { TaskSimpleDTO } from "../models/TaskDTO.ts";

export function getAllSprints(
    page: number,
    size: number = 10,
    name: string,
    status: string,
    projectId: number | null,
    sort: string
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/sprint",
        params: {
            page,
            size,
            name: name || null,
            status: status || null,
            projectId: projectId || null,
            sort
        },
    };
    return requestBackendConfig(config);
}


export function SprintByIdRequest(id: number): AxiosPromise<SprintDetailDTO> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/sprint/${id}`,
    };
    return requestBackendConfig(config);
}


export function getTaskBySprintId(id: number): AxiosPromise<TaskSimpleDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/sprint/${id}/tasks`,
    };
    return requestBackendConfig(config);
}

// PRECISA TERMINAR
export function getSprintHistoryRequest(id: number): AxiosPromise<EpicHistoryDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/sprint/${id}/history`,
    };
    return requestBackendConfig(config);
}