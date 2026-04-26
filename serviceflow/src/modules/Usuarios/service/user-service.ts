import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllUserBySolvingArea(solvingAreaId: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: '/users/getUserBySolvingArea',
        params: {
            solvingAreaId
        }
    }
    return requestBackendConfig(config);
}