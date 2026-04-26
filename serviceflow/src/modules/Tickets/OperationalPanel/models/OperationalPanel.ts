export type summaryDTO = {
    openedToday: number;
    resolvedToday: number;
    outOfSla: number;
    reopenedToday: number;
}

export type unassignedDTO = {
    id: number;
    ticketNumber: string;
    subject: string;
    solvingAreaName: string;
    urgencyName: string;
    hoursWithoutAssignee: number;
}

export type slaAtRiskDTO = {
    id: number;
    ticketNumber: number;
    subject: string;
    solvingAreaName: string;
    urgencyName: string;
    technicianName: string;
    hoursUntilSlaBreach: number;
}

export type ticketsWithoutUpdateDTO = {
    id: number;
    ticketNumber: string;
    subject: string;
    solvingAreaName: string;
    urgencyName: string;
    technicianName: string;
    hoursWithoutUpdate: number;
}

export type workloadDTO = {
    technicianId: number;
    technicianName: string;
    ticketCount: number;
}



export type distributionDTO = {
    byStatus: byStatusDTO[];
    byUrgency: byUrgencyDTO[];
    averageTimes: averageTimesDTO;
}

type byStatusDTO = {
    statusTicket: string;
    ticketCount: number
}

type byUrgencyDTO = {
    urgency: string;
    ticketCount: number;
}

type averageTimesDTO = {
    AvgFirstResponseMinutes: string;
    AvgResolution: string;
    PercentWithinSla: number;
    PercentOutOfSla: number;
}