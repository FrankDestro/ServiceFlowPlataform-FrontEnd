import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllCategoryTicket() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: '/category-ticket/active'
  }
  return requestBackendConfig(config);
}

export function getSolvingAreaByCategory(categoryId: string) {
  return requestBackendConfig({ url: `/category-ticket/${categoryId}/solving-area` });
}