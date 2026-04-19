import { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../utils/apiService";

export function getAllDepartment()  {
    const config : AxiosRequestConfig = {
      method : "GET",
      url : '/department/getAllDepartment'
    }
    return requestBackendConfig(config);
}
