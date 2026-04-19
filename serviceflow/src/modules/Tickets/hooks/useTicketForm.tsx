import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as CategoryTicketService from "../service/category-service";
import * as TypeRequestService from "../service/type-request";
import * as UrgencyService from "../service/urgencyTicket-service";
import * as ImpactService from "../service/impactTicket-service";
import * as TicketService from "../service/ticket-service";
import * as AttachmentService from "../../Attachment/service/attachment-service";
import { type CategoryTicketDTO } from "../models/CategoryTicketDTO";
import { type TypeRequestDTO } from "../models/typeRequestDTO";
import { type UrgencyTicketDTO } from "../models/UrgencyTicketDTO";
import { type ImpactTicketDTO } from "../models/ImpactTicketDTO";

// ── Type interno do formulário ────────────────────────────
type TicketFormData = {
    subject: string;
    description: string;
    typeRequest: string;
    categoryTicket: string;
    solvingArea: string;
    urgency: string;
    impact: string;
    parentTicketId: string;
};

const initialFormData: TicketFormData = {
    subject: "",
    description: "",
    typeRequest: "",
    categoryTicket: "",
    solvingArea: "",
    urgency: "",
    impact: "",
    parentTicketId: "",
};

export function useTicketForm() {
    const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
    const [categories, setCategories] = useState<CategoryTicketDTO[]>([]);
    const [urgencies, setUrgencies] = useState<UrgencyTicketDTO[]>([]);
    const [impacts, setImpacts] = useState<ImpactTicketDTO[]>([]);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<TicketFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Carrega os dados dos selects ──────────────────────────
    useEffect(() => {
        TypeRequestService.getAllTypeRequest().then((response) => {
            setTypeRequests(response.data);
        });
        CategoryTicketService.getAllCategoryTicket().then((response) => {
            setCategories(response.data);
        });
        UrgencyService.getAllUrgencyTicket().then((response) => {
            setUrgencies(response.data);
        });
        ImpactService.getAllImpactTicket().then((response) => {
            setImpacts(response.data);
        });
    }, []);

    // ── Handle change dos inputs ──────────────────────────────
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleDescriptionChange(value: string) {
        setFormData(prev => ({ ...prev, description: value }));
    }

    // ── Submit ────────────────────────────────────────────────
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const requestBody = {
            subject: formData.subject,
            description: formData.description,
            typeRequestId: Number(formData.typeRequest),
            categoryTicketId: Number(formData.categoryTicket),
            solvingAreaId: Number(formData.solvingArea),   // ← adiciona
            urgency: Number(formData.urgency),
            impact: Number(formData.impact),
            parentTicketId: formData.parentTicketId ? Number(formData.parentTicketId) : null,
            channel: "PORTAL",
        };

        const toastId = toast.loading("Salvando dados...");

        TicketService.createTicket(requestBody)
            .then((response) => {
                if (response.status === 201) {
                    toast.update(toastId, {
                        render: `Ticket ${response.data.ticketNumber} criado com sucesso!`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });

                    if (attachedFiles.length > 0) {
                        attachedFiles.forEach((file) => {
                            const formDataFile = new FormData();
                            formDataFile.append("file", file);
                            formDataFile.append("ticketId", String(response.data.id));
                            formDataFile.append("originalName", file.name);
                            AttachmentService.addAttachments(formDataFile);
                        });
                    }
                    handleReset();
                }
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Erro ao criar ticket. Tente novamente.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
            .finally(() => setIsSubmitting(false));
    }

    function handleReset() {
        setFormData(initialFormData);
        setAttachedFiles([]);
    }

    return {
        typeRequests,
        categories,
        urgencies,
        impacts,
        formData,
        attachedFiles,
        isSubmitting,
        handleChange,
        handleDescriptionChange,
        handleSubmit,
        handleReset,
        setAttachedFiles,
    };
}