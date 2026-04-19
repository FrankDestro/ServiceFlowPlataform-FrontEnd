import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllTypeRequest() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/type-request/active",
  };
  return requestBackendConfig(config);
}
