import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../../utils/api/api-service";

export function getSummary(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/summary",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}

export function getUnassigned(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/unassigned",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}

export function getSlaAtRisk(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/sla-at-risk",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}

export function getTicketsWithoutUpdate(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/tickets-without-update",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}

export function getWorkload(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/workload",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}

export function getDistribution(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operational-panel/distribution",
        params: { solvingAreaId },
    };
    return requestBackendConfig(config);
}