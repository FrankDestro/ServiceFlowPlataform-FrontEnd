import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAttachmentById, uploadAnexos } from "../service/attachment-service";

export function useAttachment(id: string) {
    const queryClient = useQueryClient();

    // ── LISTA ──────────────────────────────────────
    const { data: attachments, isLoading } = useQuery({
        queryKey: ["attachment", id],
        queryFn: () => getAllAttachmentById(id).then(res => res.data),
        enabled: !!id,
    });

    // ── UPLOAD ─────────────────────────────────────
    const { mutate: upload, isPending: isUploading } = useMutation({
        mutationFn: (data: FormData) => uploadAnexos(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachment", id] });
        },
    });

    return {
        attachments,
        isLoading,
        upload,
        isUploading,
    };
}