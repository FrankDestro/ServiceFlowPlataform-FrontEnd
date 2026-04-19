import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service"

export function getAllSolvingArea()  {
    const config : AxiosRequestConfig = {
      method : "GET",
      url : '/solving-area/active'
    }
    return requestBackendConfig(config);
}
