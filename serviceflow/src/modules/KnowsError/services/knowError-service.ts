import type { AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service.ts";

export function allKnowErrorRequest(
    page: number,
    size: number = 10,
    title: string,
    status: string,
    affectedSystems: string,
    tags: string[],
    initialDate: string,
    finalDate: string,
    initialDateResolution: string,
    finalDateResolution: string,
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/know-error",
    params: {
      page,
      size,
      title,
      status,
      affectedSystems,
      tags,
      initialDate,
      finalDate,
      initialDateResolution,
      finalDateResolution,
    },
  };
  return requestBackendConfig(config);
}