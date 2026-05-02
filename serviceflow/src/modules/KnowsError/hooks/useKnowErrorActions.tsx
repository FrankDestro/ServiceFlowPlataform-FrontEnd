import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as knowErrorService from "../services/knowError-service.ts";

function useKnowErrorActions(id: number, onSuccess: () => void) {
    const queryClient = useQueryClient();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["know-error"] });

    const { mutate: changeStatus } = useMutation({
        mutationFn: (status: string) => knowErrorService.changeStatusKnowErrorRequest(id, status),
        onSuccess: () => { toast.success("Status atualizado!"); invalidate(); },
        onError: () => toast.error("Erro ao atualizar status."),
    });

    const { mutate: archive, isPending: isArchiving } = useMutation({
        mutationFn: () => knowErrorService.archiveKnowErrorRequest(id),
        onSuccess: () => { toast.success("Arquivado com sucesso!"); invalidate(); onSuccess(); },
        onError: () => toast.error("Erro ao arquivar."),
    });

    return { changeStatus, archive, isArchiving };
}

export default useKnowErrorActions;