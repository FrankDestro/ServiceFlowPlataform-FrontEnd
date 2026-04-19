import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function addAttachments(formData: FormData) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/attachments",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return requestBackendConfig(config);
}


export function getAllAttachmentById(id: number) {
  return requestBackendConfig({ url: `/attachments/${id}` });
}
