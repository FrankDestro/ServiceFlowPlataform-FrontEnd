export type ChangeSimpleDTO = {
    id: number;
    changeNumber: string;
    title: string;
    changeTypeName: string;
    priority: string;
    status: string;
    stage: string;
    changeOwnerEmail: string;
    scheduledStart: string;
    scheduledEnd: string;
};

export type ChangeDetailDTO = {
    id: number;
    changeNumber: string;
    title: string;
    description: string;
    reasonChange: string;
    affectedServices: string[];
    scheduledStart: string;
    scheduledEnd: string;
    prerequisite: string;
    implementationPlan: string;
    rollbackPlan: string;
    riskLevel: string;
    riskDescription: string;
    impactLevel: string;
    impactDescription: string;
    changeType: string;
    priority: string;
    status: string;
    stage: string;
    approvalStatus: string;
    createdByUserId: number;
    createdByEmail: string;
    changeOwnerUserId: number;
    changeOwnerEmail: string;
    relatedTicketNumber: string | null;
    relatedProblemNumber: string | null;
    createdAt: string;
    updatedAt: string;
};

export type ChangeTaskDTO = {
    id: number;
    title: string;
    description: string;
    status: string;
    estimatedHours: number;
    taskOrder: number;
    assignedToUserId: number;
    assignedToEmail: string;
    assignedToName: string;
};

export type ChangeApproverDTO = {
    id: number;
    userId: number;
    userEmail: string;
    userName: string;
    status: string;
    comment: string | null;
    approvedAt: string | null;
};

export type ChangeHistoryDTO = {
    id: number;
    operation: string;
    description: string;
    createdByUserId: number;
    createdByEmail: string;
    createdAt: string;
};

export type ChangeSearchParams = {
    title: string;
    changeNumber: string;
    changeTypeId: number | null;
    priority: string;
    status: string;
    stage: string;
    scheduledStartFrom: string;
    scheduledStartTo: string;
};



export type ChangeFormDTO = {
    // IDENTIFICACAO
    title: string;
    description: string;
    reasonChange: string;
    affectedServices: string[];

    //PLANEJAMENTO
    scheduledStart: string;
    scheduledEnd: string;
    prerequisite: string;
    implementationPlan: string;
    rollbackPlan: string;

    // RISCO E IMPACTO
    riskLevel: string;
    riskDescription: string;
    impactLevel: string;
    impactDescription: string;

    //CLASSIFICACAO
    changeType: string;
    priority: string;

    //RESPONSAVEL 
    changeOwner: string;

    //ASSOCIACOES
    relatedTicketNumber: string | null;
    relatedProblemNumber: string | null;

    //TASK
    tasks: ChangeTaskFormDTO[];

    // APPROVALS
    changeApprovals: number[];
}

export type ChangeTaskFormDTO = {
    title: string;
    description: string;
    assignedToUserId: number;
    estimatedHours: number;
    taskOrder: number; 
    //status: string; // AUTOMATICO BACKEND
}
