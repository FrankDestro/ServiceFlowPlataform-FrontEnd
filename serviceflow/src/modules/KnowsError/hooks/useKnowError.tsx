import { useEffect, useState } from "react";
import type { KnowErrorDTO } from "../models/knowErrorDTO.ts";
import * as knowErrorService from "../services/knowError-service.ts";

type QueryParams = {
    page: number;
    size: number;
    title: string;
    status: string;
    affectedSystems: string;
    tags: string;
    initialDate: string;
    finalDate: string;
};


type SearchParams = Omit<QueryParams, "page" | "size">;

function useKnowError() {
    const [knowErrors, setKnowErrors] = useState<KnowErrorDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        size: 10,
        title: "",
        status: "",
        affectedSystems: "",
        tags: "",
        initialDate: "",
        finalDate: "",
    });

    function search(formData: SearchParams) {
        console.log("formData recebido:", formData); // ← adiciona aqui
        setQueryParams(prev => ({
            ...prev,
            page: 0,
            ...formData,
        }));
    }

    function changePage(page: number) {
        setQueryParams(prev => ({ ...prev, page }));
    }

    function changePageSize(size: number) {
        setQueryParams(prev => ({ ...prev, size, page: 0 }));
    }

    function reload() {
        setRefreshFlag(prev => !prev);
    }

    useEffect(() => {
        console.log("queryParams:", queryParams); // ← adiciona aqui
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
            )
            .then((response) => {
                const { content, totalElements } = response.data;
                setKnowErrors(content);
                setTotalItems(totalElements);
            })
            .finally(() => setIsLoading(false));
    }, [queryParams, refreshFlag]);

    return {
        knowErrors,
        isLoading,
        totalItems,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    };
}

export default useKnowError;