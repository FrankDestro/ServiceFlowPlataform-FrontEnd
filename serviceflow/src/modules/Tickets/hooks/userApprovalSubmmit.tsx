import { useState } from "react";
import { toast } from "react-toastify";
import * as ticketService from "../service/ticket-service.ts";

function useApprovalSubmit(onSuccess: () => void) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    function approveTicket(id: number) {
        setIsSubmitting(true);
        const toastId = toast.loading("Aprovando ticket...");

        ticketService
            .approveTicketRequest(id)
            .then(() => {
                toast.update(toastId, {
                    render: "Ticket aprovado com sucesso!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                onSuccess();
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Erro ao aprovar ticket.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
            .finally(() => setIsSubmitting(false));
    }

    function rejectTicket(id: number, reason: string) { // ← recebe direto
    if (!reason.trim()) {
        toast.error("Informe o motivo da rejeição.");
        return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Rejeitando ticket...");

    ticketService
        .rejectTicketRequest(id, reason) // ← usa o parâmetro direto
        .then(() => {
            toast.update(toastId, {
                render: "Ticket não aprovado.",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            onSuccess();
        })
        .catch(() => {
            toast.update(toastId, {
                render: "Erro ao rejeitar ticket.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        })
        .finally(() => setIsSubmitting(false));
}

    return {
        isSubmitting,
        rejectReason,
        setRejectReason,
        approveTicket,
        rejectTicket,
    };
}

export default useApprovalSubmit;