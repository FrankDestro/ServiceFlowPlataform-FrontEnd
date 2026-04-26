import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as CategoryTicketService from "../service/category-service";
import * as TypeRequestService from "../service/type-request";
import * as UrgencyService from "../service/urgencyTicket-service";
import * as ImpactService from "../service/impactTicket-service";
import * as TicketService from "../service/ticket-service";
import { uploadAnexos } from "../../Attachment/service/attachment-service";
import { type CategoryTicketDTO } from "../models/CategoryTicketDTO";
import { type TypeRequestDTO } from "../models/typeRequestDTO";
import { type UrgencyTicketDTO } from "../models/UrgencyTicketDTO";
import { type ImpactTicketDTO } from "../models/ImpactTicketDTO";
import type { TicketFormDTO } from "../models/ticketDTO";
import type { SolvingAreaDTO } from "../models/solvingAreaDTO";
import { showToast } from "../../../layout/Toastify/Toastify";

const initialFormData: TicketFormDTO = {
    subject: "",
    description: "",
    urgency: "",
    impact: "",
    channel: "",
    parentTicketId: "",
    typeRequest: "",
    solvingArea: "",
    categoryTicket: "",
};

export function useTicketForm() {
    const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
    const [categories, setCategories] = useState<CategoryTicketDTO[]>([]);
    const [urgencies, setUrgencies] = useState<UrgencyTicketDTO[]>([]);
    const [impacts, setImpacts] = useState<ImpactTicketDTO[]>([]);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<TicketFormDTO>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [solvingArea, setSolvingArea] = useState<SolvingAreaDTO | null>(null);

    useEffect(() => {
        TypeRequestService.getAllTypeRequest().then((r) => setTypeRequests(r.data));
        CategoryTicketService.getAllCategoryTicket().then((r) => setCategories(r.data));
        UrgencyService.getAllUrgencyTicket().then((r) => setUrgencies(r.data));
        ImpactService.getAllImpactTicket().then((r) => setImpacts(r.data));
    }, []);

    useEffect(() => {
        if (!formData.categoryTicket) return;
        CategoryTicketService.getSolvingAreaByCategory(formData.categoryTicket).then((r) => {
            setSolvingArea(r.data);
            setFormData(prev => ({ ...prev, solvingArea: String(r.data.id) }));
        });
    }, [formData.categoryTicket]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleDescriptionChange(value: string) {
        setFormData(prev => ({ ...prev, description: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const requestBody = {
            subject: formData.subject,
            description: formData.description,
            typeRequest: formData.typeRequest,
            categoryTicket: formData.categoryTicket,
            solvingArea: formData.solvingArea,
            urgency: formData.urgency,
            impact: formData.impact,
            parentTicketId: formData.parentTicketId,
            channel: "PORTAL",
        };

        const toastId = toast.loading("Salvando dados...");

        try {
            const response = await TicketService.createTicket(requestBody);

            if (response.status === 201) {
                toast.update(toastId, {
                    render: `Ticket ${response.data.ticketNumber} criado com sucesso!`,
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });

                if (attachedFiles.length > 0) {
                    try {
                        const uploadPromises = attachedFiles.map((file) => {
                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("ticketId", String(response.data.id));
                            formData.append("originalName", file.name);
                            return uploadAnexos(formData);
                        });
                        await Promise.all(uploadPromises);
                        showToast.success("Anexos enviados com sucesso!");
                    } catch (error) {
                        showToast.error("Erro ao enviar um ou mais anexos.");
                        console.error("Erro no upload dos anexos:", error);
                    }
                }

                handleReset();
            }
        } catch {
            toast.update(toastId, {
                render: "Erro ao criar ticket. Tente novamente.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleReset() {
        setFormData(initialFormData);
        setAttachedFiles([]);
    }

    return {
        typeRequests,
        categories,
        solvingArea,
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