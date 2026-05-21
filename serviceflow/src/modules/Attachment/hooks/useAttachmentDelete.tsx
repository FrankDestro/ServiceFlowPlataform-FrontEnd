import { useMutation } from "@tanstack/react-query";
import { deleteAnexo } from "../service/attachment-service";
import { toast } from "react-toastify";

export function useAttachmentDelete(onDelete?: () => void) {
    const { mutate: deleteAttachment, isPending: isDeleting } = useMutation({
        mutationFn: ({ id, bucket, objectName }: { id: number; bucket: string; objectName: string }) =>
            deleteAnexo(id, bucket, objectName),
        onSuccess: () => {
            toast.success("Anexo removido com sucesso!");
            onDelete?.();
        },
        onError: () => {
            toast.error("Erro ao remover anexo.");
        }
    });

    return {
        deleteAttachment,
        isDeleting,
    };
}