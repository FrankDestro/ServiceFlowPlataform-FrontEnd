import { useEffect, useState } from "react";
import type {KnowErrorDTO} from "../models/knowErrorDTO.ts";
import * as knowErrorService from "../services/knowError-service.ts";

type QueryParams = {
    page: number;
    size: number;
    title: string;
    status: string;
    affectedSystems: string;
    tags: string[];
    initialDate: string;
    finalDate: string;
    initialDateResolution: string;
    finalDateResolution: string;
};

function useKnowError() {
    const [knowErrors, setKnowErrors] = useState<KnowErrorDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [affectedSystems, setAffectedSystems] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [initialDateResolution, setInitialDateResolution] = useState("");
    const [finalDateResolution, setFinalDateResolution] = useState("");

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        title: "",
        status: "",
        affectedSystems: "",
        tags: [],
        initialDate: "",
        finalDate: "",
        initialDateResolution: "",
        finalDateResolution: "",
    });

    function search() {
        setQueryParams({
            page: 0,
            size: 10,
            title,
            status,
            affectedSystems,
            tags,
            initialDate,
            finalDate,
            initialDateResolution,
            finalDateResolution,
        });
    }

    function changePage(page: number) {
        setQueryParams({ ...queryParams, page });
    }

    function changePageSize(size: number) {
        setQueryParams({ ...queryParams, size, page: 0 });
    }

    useEffect(() => {
        setIsLoading(true);
        knowErrorService
            .allKnowErrorRequest(
                queryParams.page,
                queryParams.size,
                queryParams.title,
                queryParams.status,
                queryParams.affectedSystems,
                queryParams.tags,
                queryParams.initialDate,
                queryParams.finalDate,
                queryParams.initialDateResolution,
                queryParams.finalDateResolution
            )
            .then((response) => {
                const { content, totalElements } = response.data;
                setKnowErrors(content);
                setTotalItems(totalElements);
            })
            .finally(() => setIsLoading(false));
    }, [queryParams, refreshFlag]);

    function reload() {
        setRefreshFlag((prev) => !prev);
    }

    return {
        knowErrors,
        isLoading,
        totalItems,
        queryParams,
        title, setTitle,
        status, setStatus,
        affectedSystems, setAffectedSystems,
        tags, setTags,
        initialDate, setInitialDate,
        finalDate, setFinalDate,
        initialDateResolution, setInitialDateResolution,
        finalDateResolution, setFinalDateResolution,
        search,
        changePage,
        changePageSize,
        reload,
    };
}

export default useKnowError;