import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";
import type { KnowledgeBaseFormDTO, KnowledgeBaseUpdateDTO } from "../models/knowledgeBaseDTO.ts";

export function allKnowledgeBaseRequest(
    page: number,
    size: number = 10,
    title: string,
    categoryId: number | null,
    status: string,
    tags: string,
) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/knowledge-base",
        params: {
            page,
            size,
            title: title || null,
            categoryId: categoryId || null,
            status: status || null,
            tags: tags.length > 0 ? tags : null,
        },
    };
    return requestBackendConfig(config);
}

export function createKnowledgeBaseRequest(data: KnowledgeBaseFormDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/knowledge-base",
        data,
    };
    return requestBackendConfig(config);
}

export function knowledgeBaseByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/knowledge-base/${id}`,
    };
    return requestBackendConfig(config);
}

export function updateKnowledgeBaseRequest(id: number, data: KnowledgeBaseUpdateDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/knowledge-base/${id}`,
        data,
    };
    return requestBackendConfig(config);
}

export function changeStatusKnowledgeBaseRequest(id: number, status: string) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/knowledge-base/${id}/status`,
        params: { status },
    };
    return requestBackendConfig(config);
}

export function incrementViewsKnowledgeBaseRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/knowledge-base/${id}/view`,
    };
    return requestBackendConfig(config);
}

export function markAsHelpfulKnowledgeBaseRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/knowledge-base/${id}/helpful`,
    };
    return requestBackendConfig(config);
}

export function archiveKnowledgeBaseRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/knowledge-base/${id}/archive`,
    };
    return requestBackendConfig(config);
}

export function getAllCategoriesRequest() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/knowledge-base/categories",
    };
    return requestBackendConfig(config);
}

export function getAllActiveCategoriesRequest() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/knowledge-base/categories/active",
    };
    return requestBackendConfig(config);
}

export function getCategoryByIdRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/knowledge-base/categories/${id}`,
    };
    return requestBackendConfig(config);
}

export function createCategoryRequest(data: { name: string; description?: string }) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/knowledge-base/categories",
        data,
    };
    return requestBackendConfig(config);
}

export function updateCategoryRequest(id: number, data: { name: string; description?: string }) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/knowledge-base/categories/${id}`,
        data,
    };
    return requestBackendConfig(config);
}

export function deactivateCategoryRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: "PATCH",
        url: `/knowledge-base/categories/${id}/deactivate`,
    };
    return requestBackendConfig(config);
}