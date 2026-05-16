import { useQuery } from "@tanstack/react-query";
import { getAllAttachmentById } from "../service/attachment-service";

export function useAttachment(entityType: string, id: string) {

    const { data: attachments, isLoading } = useQuery({
        queryKey: ["attachment", entityType, id],
        queryFn: () => getAllAttachmentById(entityType, id).then(res => res.data),
        enabled: !!id && !!entityType,
    });

    return {
        attachments,
        isLoading,
    };
}