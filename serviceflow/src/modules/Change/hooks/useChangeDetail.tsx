import { useQuery } from "@tanstack/react-query";
import * as changeService from "../service/change-service";

function useChangeDetail(id: number | null) {
    return useQuery({
        queryKey: ["changes", id],
        queryFn: async () => {
            const res = await changeService.changeByIdRequest(id!);
            return res.data;
        },
        enabled: !!id,
    });
}

export default useChangeDetail;
