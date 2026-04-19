import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllUrgencyTicket()  {
    const config : AxiosRequestConfig = {
      method : "GET",
      url : '/urgency'
    }
    return requestBackendConfig(config);
}
