// useKnowledgeBaseActions.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as knowledgeBaseService from "../service/knowledgeBase-service.ts";

function useKnowledgeBaseActions(id: number, onSuccess: () => void) {
    const queryClient = useQueryClient();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["knowledge-base"] });

    const { mutate: changeStatus } = useMutation({
        mutationFn: (status: string) => knowledgeBaseService.changeStatusKnowledgeBaseRequest(id, status),
        onSuccess: () => { toast.success("Status atualizado!"); invalidate(); },
        onError: () => toast.error("Erro ao atualizar status."),
    });

    const { mutate: archive, isPending: isArchiving } = useMutation({
        mutationFn: () => knowledgeBaseService.archiveKnowledgeBaseRequest(id),
        onSuccess: () => { toast.success("Arquivado com sucesso!"); invalidate(); onSuccess(); },
        onError: () => toast.error("Erro ao arquivar."),
    });

    return { changeStatus, archive, isArchiving };
}

export default useKnowledgeBaseActions;