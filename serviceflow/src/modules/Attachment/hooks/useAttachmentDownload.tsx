import { useMutation } from "@tanstack/react-query";
import { downloadAnexo } from "../service/attachment-service";

export function useAttachmentDownload() {
    const { mutate: download, isPending: isDownloading } = useMutation({
        mutationFn: ({ bucket, objectName }: { bucket: string; objectName: string }) =>
            downloadAnexo(bucket, objectName).then(res => res.data),
        onSuccess: (url: string) => {
            window.open(url, "_blank");
        },
    });

    return {
        download,
        isDownloading,
    };
}