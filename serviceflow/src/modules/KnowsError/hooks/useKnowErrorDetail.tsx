import { useQuery } from "@tanstack/react-query";
import * as knowErrorService from "../services/knowError-service";

function useKnowErrorDetail(id: number | null) {
    return useQuery({
        queryKey: ["know-error", id],
        queryFn: async () => {
            const res = await knowErrorService.knowErrorByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

export default useKnowErrorDetail;