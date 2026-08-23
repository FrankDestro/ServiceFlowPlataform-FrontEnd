import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";

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