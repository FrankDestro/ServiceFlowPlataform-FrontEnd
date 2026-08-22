import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { EpicDetailDTO, EpicHistoryDTO } from "../models/EpicDTO.ts";
import type { TaskDTO } from "../models/TaskDTO.ts";

export function getAllEpics(
    page: number,
    size: number = 10,
    problemNumber: number | null,
    priority: string,
    status: string,
     sort: string
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/epic",
        params: {
            page,
            size,
            problemNumber: problemNumber || null,
            priority: priority || null,
            status: status || null,
            sort
        },
    };
    return requestBackendConfig(config);
}

export function EpicByIdRequest(id: number): AxiosPromise<EpicDetailDTO> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/epic/${id}`,
    };
    return requestBackendConfig(config);
}

export function EpicHistory(id: number): AxiosPromise<EpicHistoryDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/epic/${id}/history`,
    };
    return requestBackendConfig(config);
}


export function getTaskByEpicId(id: number): AxiosPromise<TaskDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/epic/${id}/tasks`,
    };
    return requestBackendConfig(config);
}