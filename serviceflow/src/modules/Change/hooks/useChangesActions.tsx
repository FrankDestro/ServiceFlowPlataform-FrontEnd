import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserNameOrEmail } from "../../Usuarios/service/user-service";
import { getAllChangeTypes } from "../../Change/service/change-service"; // ajusta o caminho

export function useChangeActions() {

    // ── Aprovadores ──
    const [approverSearch, setApproverSearch] = useState("");
    const [debouncedApproverSearch, setDebouncedApproverSearch] = useState("");
    const [selectedOwner, setSelectedOwner] = useState<{ id: number, email: string } | null>(null);

    const { data: changeTypesData, isLoading: isLoadingChangeTypes } = useQuery({
        queryKey: ["change-types"],
        queryFn: getAllChangeTypes,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedApproverSearch(approverSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [approverSearch]);

    const { data: approverResults } = useQuery({
        queryKey: ["users-search-approver", debouncedApproverSearch],
        queryFn: () => getUserNameOrEmail(debouncedApproverSearch),
        enabled: debouncedApproverSearch.trim().length >= 2,
    });

    // ── Change Owner ──
    const [ownerSearch, setOwnerSearch] = useState("");
    const [debouncedOwnerSearch, setDebouncedOwnerSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedOwnerSearch(ownerSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [ownerSearch]);

    const { data: ownerResults } = useQuery({
        queryKey: ["users-search-owner", debouncedOwnerSearch],
        queryFn: () => getUserNameOrEmail(debouncedOwnerSearch),
        enabled: debouncedOwnerSearch.trim().length >= 2,
    });


    // ── Task Responsável ──
    const [taskSearch, setTaskSearch] = useState("");
    const [debouncedTaskSearch, setDebouncedTaskSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTaskSearch(taskSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [taskSearch]);

    const { data: taskResults } = useQuery({
        queryKey: ["users-search-task", debouncedTaskSearch],
        queryFn: () => getUserNameOrEmail(debouncedTaskSearch),
        enabled: debouncedTaskSearch.trim().length >= 2,
    });

    return {
        approverSearch,
        setApproverSearch,
        approverResults: approverResults?.data ?? [],
        ownerSearch,
        setOwnerSearch,
        ownerResults: ownerResults?.data ?? [],
        selectedOwner,
        setSelectedOwner,
        taskSearch,
        setTaskSearch,
        taskResults: taskResults?.data ?? [],
        changeTypes: changeTypesData?.data ?? [],
        isLoadingChangeTypes,
    };
}