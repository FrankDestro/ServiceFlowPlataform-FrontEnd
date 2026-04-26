import { type AxiosRequestConfig } from "axios";
import { requestBackendConfig } from "../../../utils/api/api-service";

export function uploadAnexos(formData: FormData) {
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


export function getAllAttachmentById(id: string) {
    return requestBackendConfig({ url: `/attachments/ticket/${id}` });
}


export function downloadAnexo(bucket: string, objectName: string) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/attachments/downloadFile",
        params: {
            bucket,
            objectName,
        },
    };
    return requestBackendConfig(config);
}