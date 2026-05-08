import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function getAllSubCategories() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: '/sub-category-ticket/active'
  }
  return requestBackendConfig(config);
}

export function getSubCategoriesByCategory(categoryId: string) {
  return requestBackendConfig({ url: `/sub-category-ticket/by-category/${categoryId}` });
}