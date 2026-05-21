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

export type ProblemFormDTO = {
    title: string;
    description: string;
    priority: string;
    urgency: string;
    categoryId: number | null;
    affectedServices: string;
    dueDate: string | null;
    rootCause: string | null;
    workaround: string | null;
    resolutionNotes: string | null;
    relatedTicketNumbers: string[];
    relatedChangeNumbers: string[];
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

export type TicketSummaryDTO = {
    ticketNumber: string;
    subject: string;
    status: string;
    priority: string;
    requesterName: string;
    createdAt: string;
};

export type ChangeSummaryDTO = {
    id: number;
    changeNumber: string;
    title: string;
    status: string;
    priority: string;
    changeOwner: string | null;
    createdAt: string;
};


