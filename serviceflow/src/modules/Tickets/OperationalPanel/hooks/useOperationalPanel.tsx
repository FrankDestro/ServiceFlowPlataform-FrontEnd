import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    getSummary,
    getUnassigned,
    getSlaAtRisk,
    getTicketsWithoutUpdate,
    getWorkload,
    getDistribution
} from "../service/operationalPanel-service";

type QueryParams = {
    solvingAreaId: string;
};

export function useOperationalPanel() {

    const [queryParams, setQueryParams] = useState<QueryParams>({ solvingAreaId: "" });

    function search(solvingAreaId: string) {

        console.log(solvingAreaId)


        setQueryParams({ solvingAreaId });
    }

    const { data: summary, isLoading: loadingSummary } = useQuery({
        queryKey: ["summary", queryParams.solvingAreaId],
        queryFn: () => getSummary(queryParams.solvingAreaId).then(res => res.data),
    });

    const { data: unassigned, isLoading: loadingUnassigned } = useQuery({
        queryKey: ["unassigned", queryParams.solvingAreaId],
        queryFn: () => getUnassigned(queryParams.solvingAreaId).then(res => res.data),
    });

    const { data: slaAtRisk, isLoading: loadingSlaAtRisk } = useQuery({
        queryKey: ["slaAtRisk", queryParams.solvingAreaId],
        queryFn: () => getSlaAtRisk(queryParams.solvingAreaId).then(res => res.data),
    });

    const { data: ticketsWithoutUpdate, isLoading: loadingTicketsWithoutUpdate } = useQuery({
        queryKey: ["ticketsWithoutUpdate", queryParams.solvingAreaId],
        queryFn: () => getTicketsWithoutUpdate(queryParams.solvingAreaId).then(res => res.data),
    });

    const { data: workload, isLoading: loadingWorkload } = useQuery({
        queryKey: ["workload", queryParams.solvingAreaId],
        queryFn: () => getWorkload(queryParams.solvingAreaId).then(res => res.data),
    });

    const { data: distribution, isLoading: loadingDistribution } = useQuery({
        queryKey: ["distribution", queryParams.solvingAreaId],
        queryFn: () => getDistribution(queryParams.solvingAreaId).then(res => res.data),
    });

    const isLoading = loadingSummary || loadingUnassigned || loadingSlaAtRisk ||
        loadingTicketsWithoutUpdate || loadingWorkload || loadingDistribution;

    return {
        summary,
        unassigned,
        slaAtRisk,
        ticketsWithoutUpdate,
        workload,
        distribution,
        isLoading,
        search,
    };
}