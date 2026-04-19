import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllImpactTicket()  {
    const config : AxiosRequestConfig = {
      method : "GET",
      url : '/impact'
    }
    return requestBackendConfig(config);
}
