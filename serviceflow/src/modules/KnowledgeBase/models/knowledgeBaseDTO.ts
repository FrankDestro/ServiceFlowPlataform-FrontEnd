export type KnowledgeBaseDTO = {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    categoryName: string;
    tags: string[];
    status: string;
    visibility: string;
    viewsCount: number;
    helpfulCount: number;
    createdAt: string;
    updatedAt: string;
    createdByEmail: string;
};

export type KnowledgeBaseSimpleDTO = {
    id: number;
    title: string;
    categoryId: number;
    categoryName: string;
    tags: string[];
    status: string;
    visibility: string;
    createdByEmail: string;
    createdAt: string;
    viewsCount: number;
    helpfulCount: number;
};

export type KnowledgeBaseSearchParams = {
    title: string;
    categoryId: number | null;
    status: string;
    tags: string;
};

export type KnowledgeBaseFormDTO = {
    title: string;
    content: string;
    categoryId: number | null;
    tags: string[];
    status: string;
    visibility: string;
};

export type KnowledgeBaseUpdateDTO = {
    title: string;
    content: string;
    categoryId: number | null;
    tags: string[];
    visibility: string;
};

export type KnowledgeBaseCategoryDTO = {
    id: number;
    name: string;
    description: string;
    active: boolean;
};