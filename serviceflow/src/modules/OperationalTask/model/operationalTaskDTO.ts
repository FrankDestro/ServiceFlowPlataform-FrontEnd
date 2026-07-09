export type OperationalTaskSimpleDTO = {
    id: number;
    taskNumber: string;
    title: string;
    status: string;
    priority: string;
    scheduledStart: string;
    scheduledEnd: string;
    assignedToName: string;
    categoryName: string;
}

// SEARCH
export type OperationalTaskSearchParams = {
    taskNumber: string;
    status: string;
    priority: string;
    categoryId: number | null;
    assignedTo: string;
    scheduledStartFrom: string;
    scheduledStartTo: string;
    dueDateFrom: string;
    dueDateTo: string;
};