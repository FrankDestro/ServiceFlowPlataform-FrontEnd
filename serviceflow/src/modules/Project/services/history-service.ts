import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { ProjectHistoryDTO } from "../models/ProjectHIstoryDTO.ts";

export function getProjectHistory(entityType: string, entityId: number): AxiosPromise<ProjectHistoryDTO[]> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/project-history",
        params: {
            entityType,
            entityId,
        },
    };
    return requestBackendConfig(config);
}