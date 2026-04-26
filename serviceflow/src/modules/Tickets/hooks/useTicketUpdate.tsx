import { useRef, useState } from "react";
import type { TicketStatusForm, TicketTypeRequestForm, TicketUpdateAssignmetForm } from "../models/ticketDTO";
import { showToast } from "../../../layout/Toastify/Toastify";
import { changeAssignment, changeTicketStatus, changeTypeRequesty } from "../service/ticket-service";

const REQUIRES_REASON = ["FINISHED", "CANCELED", "FROZEN"];

export function useTicketUpdate(
    ticketId: number,
    initialStatus: string = "",
    initialTypeRequestId: string = "",
    initialCategoryId: string = "",
    initialSolvingAreaId: string = "",
    initialTechnicianId: string = "",
) {

    // USESTATES
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // FORM_DATAS 
    const [formDataStatus, setFormDataStatus] = useState<TicketStatusForm>({
        status: initialStatus,
        closureReason: "",
    });

    const [formDataTypeRequest, setFormDataTypeRequest] = useState<TicketTypeRequestForm>({
        typeRequestId: initialTypeRequestId,
    });

    const [formDataAssignmet, setForDataAssignmet] = useState<TicketUpdateAssignmetForm>({
        categoryTicketId: initialCategoryId,
        solvingArea: initialSolvingAreaId,
        technicianId: initialTechnicianId,
    });

    // FORM_DATAS 

    // ALTERACAO DE TIPO DE REQUISICAO
    function handleTypeRequestChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormDataTypeRequest(prev => ({ ...prev, [name]: value }));
    }


    // ALTERACAO DE STATUS
    function handleStatusChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        if (name === "status" && REQUIRES_REASON.includes(value)) {
            setFormDataStatus(prev => ({ ...prev, status: value }));
            setModalOpen(true);
            return;
        }
        setFormDataStatus(prev => ({ ...prev, [name]: value }));
    }

    const closureReasonRef = useRef("");

    function handleReasonConfirm(reason: string) {
        closureReasonRef.current = reason;
        setFormDataStatus(prev => ({ ...prev, closureReason: reason }));
        setModalOpen(false);
    }


    // FUNCAO DE SUBMMIT PARA TODOS OS CAMPOS IRA APENAS COMPARAR QUEM MUDOU OU NAO PARA CHAMAR A REQUEST
    async function handleUpdateSubmmit(e: React.FormEvent<HTMLFormElement>,
        assignmentFormData: { categoryId: string, solvingAreaId: string, technicianId: string }) {
        e.preventDefault();

        // STATUS
        if (formDataStatus.status !== initialStatus) {
            const requiresReason = REQUIRES_REASON.includes(formDataStatus.status);
            const reason = closureReasonRef.current;

            if (requiresReason && !reason) {
                setModalOpen(true);
                showToast.warning("Informe o motivo para este status.");
                return;
            }

            setIsSubmitting(true);
            try {
                await changeTicketStatus(ticketId, formDataStatus.status, reason);
                showToast.success("Status atualizado com sucesso!");
            } catch {
                showToast.error("Erro ao atualizar status.");
            } finally {
                setIsSubmitting(false);
            }
        }
        // STATUS

        // TYPEREQUEST
        if (formDataTypeRequest.typeRequestId !== initialTypeRequestId) {
            try {
                await changeTypeRequesty(ticketId, formDataTypeRequest.typeRequestId);
                showToast.success("Tipo de requisição atualizado com sucesso!");
            } catch {
                showToast.error("Erro ao atualizar tipo de requisição.");
            } finally {
                setIsSubmitting(false);
            }
        }
        // TYPEREQUEST

        const categoryChanged = assignmentFormData.categoryId !== initialCategoryId;
        const technicianChanged = assignmentFormData.technicianId !== initialTechnicianId;

        if (categoryChanged || technicianChanged) {
            try {
                await changeAssignment(ticketId, assignmentFormData.categoryId, assignmentFormData.solvingAreaId, assignmentFormData.technicianId);
                showToast.success("Atribuição atualizada com sucesso!");
            } catch {
                showToast.error("Erro ao atualizar atribuição.");
            } finally {
                setIsSubmitting(false);
            }
        }
    }
    // FUNCAO DE SUBMMIT PARA TODOS OS CAMPOS IRA APENAS COMPARAR QUEM MUDOU OU NAO PARA CHAMAR A REQUEST

    return {
        formDataStatus,
        formDataTypeRequest,
        modalOpen,
        setModalOpen,
        handleReasonConfirm,
        handleStatusChange,
        handleTypeRequestChange,
        handleUpdateSubmmit,
    };
}