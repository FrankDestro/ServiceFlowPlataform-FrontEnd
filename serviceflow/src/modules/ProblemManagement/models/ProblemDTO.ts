export type ProblemSimpleDTO = {
    id: number;
    problemNumber: string;
    title: string;
    status: string;
    priority: string;
    urgency: string;
    categoryName: string;
    affectedServices: string;
    dueDate: string | null;
    createdAt: string;
    assignedToName: string | null;
    createdByName: string;
};

export type ProblemDetailDTO = {
    id: number;
    problemNumber: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    urgency: string;
    categoryName: string;
    affectedServices: string;
    rootCause: string | null;
    workaround: string | null;
    resolutionNotes: string | null;
    dueDate: string | null;
    resolvedAt: string | null;
    closedAt: string | null;
    createdAt: string;
    assignedToName: string | null;
    createdByName: string;
};

export type ProblemSearchParams = {
    problemNumber: string;
    categoryId: number | null;
    priority: string;
    urgency: string;
    status: string;
    assignedToId: number | null;
    createdById: number | null;
    initialDate: string;
    finalDate: string;
    myProblems: boolean;
};