import type { AxiosPromise, AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { TaskDetailDTO } from "../models/TaskDTO.ts";

export function getAllTasks(
    page: number,
    size: number = 10,
    taskNumber: string,
    projectId: number | null,
    epicId: number | null,
    sprintId: number | null,
    status: string,
    priority: string,
    assignedTo: number | null,
    sort: string
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/task",
        params: {
            page,
            size,
            taskNumber: taskNumber || null,
            projectId: projectId || null,
            epicId: epicId || null,
            sprintId: sprintId || null,
            status: status || null,
            priority: priority || null,
            assignedTo: assignedTo || null,
            sort,
        },
    };
    return requestBackendConfig(config);
}

export function getTaskById(id: number): AxiosPromise<TaskDetailDTO> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/task/${id}`,
    };
    return requestBackendConfig(config);
}

export function getAllBacklog(
    page: number,
    size: number = 10,
    taskNumber: string,
    projectId: number | null,
    epicId: number | null,
    status: string,
    priority: string,
    assignedTo: number | null,
    sort: string
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/task/backlog",
        params: {
            page,
            size,
            taskNumber: taskNumber || null,
            projectId: projectId || null,
            epicId: epicId || null,
            status: status || null,
            priority: priority || null,
            assignedTo: assignedTo || null,
            sort,
        },
    };
    return requestBackendConfig(config);
}