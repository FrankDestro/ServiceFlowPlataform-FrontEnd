import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAnexos } from "../service/attachment-service";
import { showToast } from "../../../layout/Toastify/Toastify";

export function useAttachmentUpload(entityType: string, id: string) {
    const queryClient = useQueryClient();

    const { mutate: upload, isPending: isUploading } = useMutation({
        mutationFn: ({ file, originalName }: { file: File; originalName: string }) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("entityType", entityType);
            formData.append("entityId", id);
            formData.append("originalName", originalName);
            return uploadAnexos(formData);
        },
        onSuccess: () => {
            showToast.success("Arquivo anexado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["attachment", entityType, id] });
        },
        onError: () => {
            showToast.error("Erro ao anexar arquivo.");
        },
    });

    return {
        upload,
        isUploading,
    };
}