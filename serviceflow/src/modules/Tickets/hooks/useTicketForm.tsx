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
import type { SubCategoryTicketDTO } from "../models/SubCategoryTicketDTO";
import * as subCategoryService from "../service/subCategory-service"

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
    subCategoryTicket: ""
};

export function useTicketForm() {
    const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
    const [categories, setCategories] = useState<CategoryTicketDTO[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategoryTicketDTO[]>([]);
    const [urgencies, setUrgencies] = useState<UrgencyTicketDTO[]>([]);
    const [impacts, setImpacts] = useState<ImpactTicketDTO[]>([]);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<TicketFormDTO>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [solvingArea, setSolvingArea] = useState<SolvingAreaDTO | null>(null);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);


    useEffect(() => {
        TypeRequestService.getAllTypeRequest().then((r) => setTypeRequests(r.data));
        CategoryTicketService.getAllCategoryTicket().then((r) => setCategories(r.data));
        UrgencyService.getAllUrgencyTicket().then((r) => setUrgencies(r.data));
        ImpactService.getAllImpactTicket().then((r) => setImpacts(r.data));
    }, []);

    useEffect(() => {
        if (!formData.categoryTicket) return;

        setLoadingSubCategories(true);
        setSubCategories([]);

        Promise.all([
            CategoryTicketService.getSolvingAreaByCategory(formData.categoryTicket),
            subCategoryService.getSubCategoriesByCategory(formData.categoryTicket)
        ]).then(([solvingAreaRes, subCategoriesRes]) => {
            setSolvingArea(solvingAreaRes.data);
            setFormData(prev => ({
                ...prev,
                solvingArea: String(solvingAreaRes.data.id),
                subCategoryTicket: String(subCategoriesRes.data[0]?.id ?? '')
            }));
            setSubCategories(subCategoriesRes.data);
        }).finally(() => {
            setLoadingSubCategories(false);
        });

    }, [formData.categoryTicket]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        console.log("handleChange disparado:", name, value); // <- aqui

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleDescriptionChange(value: string) {
        setFormData(prev => ({ ...prev, description: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log("formData no submit:", formData);

        if (!validate()) return;

        setIsSubmitting(true);

        const requestBody = {
            subject: formData.subject,
            description: formData.description,
            typeRequest: formData.typeRequest,
            categoryTicket: formData.categoryTicket,
            subCategoryTicket: formData.subCategoryTicket,
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
        setSolvingArea(null);
        setSubCategories([]);
        setAttachedFiles([]);
    }

    function validate(): boolean {
        if (!formData.subject.trim()) {
            toast.warning("Informe o assunto do chamado.");
            return false;
        }
        if (!formData.categoryTicket) {
            toast.warning("Selecione a categoria.");
            return false;
        }
        if (!formData.subCategoryTicket) {
            toast.warning("Selecione um serviço.");
            return false;
        }
        if (!formData.typeRequest) {
            toast.warning("Selecione o tipo de solicitação.");
            return false;
        }
        if (!formData.urgency) {
            toast.warning("Selecione a urgência.");
            return false;
        }
        if (!formData.impact) {
            toast.warning("Selecione o impacto.");
            return false;
        }
        if (!formData.description.trim()) {
            toast.warning("Informe a descrição.");
            return false;
        }
        return true;
    }

    return {
        typeRequests,
        categories,
        subCategories,
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
        loadingSubCategories
    };
}