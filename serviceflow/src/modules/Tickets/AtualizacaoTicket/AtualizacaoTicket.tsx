import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect";
import { TicketStatus, TicketStatusLabels } from "../constant/TicketStatus";
import { type CategoryTicketDTO } from "../models/CategoryTicketDTO";
import { type SLADTO } from "../models/slaDTO";
import { type TypeRequestDTO } from "../models/typeRequestDTO";
import * as CategoryTicketService from "../service/category-service";
import * as SlaService from "../service/sla-service";
import * as TypeRequestService from "../service/type-request";
import "./AtualizacaoTicket.css";
import type { TicketDTO } from "../models/ticketDTO";
import { RotateCcw } from "lucide-react";
import { useTicketUpdate } from "../hooks/useTicketUpdate";
import ModalAnnotation from "../../../components/UI/ModalAnnotation/ModalAnnotation";
import { useTicketAssignment } from "../hooks/useTicketAssignment";


type Props = {
    ticket: TicketDTO;
}

function AtualizacaoTicket({ ticket }: Props) {

    // ── HOOKS PARA ENVIO DO STATUS -─────────────────────────────────────
    const {
        formDataStatus: statusFormData,
        formDataTypeRequest: formDataTypeRequest,
        modalOpen,
        setModalOpen,
        handleReasonConfirm,
        handleStatusChange: handleStatusChange,
        handleTypeRequestChange: handleTypeRequestChange,
        handleUpdateSubmmit
    } = useTicketUpdate(
        ticket.id,
        ticket.statusTicket,
        String(ticket.typeRequest?.id ?? ""),
        String(ticket.categoryTicket?.id ?? ""),
        String(ticket.solvingArea?.id ?? ""),
        String(ticket.technician?.id ?? "")
    );


    // ── HOOKS PARA ATUALIZADO DA CATEGORIA / AREA SOLUCIONADORA E ANALISTA -─────────────────────────────────────
    const {
        formData: assignmentFormData,
        solvingArea,
        analysts,
        handleChange: handleAssignmentChange,
    } = useTicketAssignment(
        ticket.id,
        String(ticket.categoryTicket?.id ?? ""),
        String(ticket.solvingArea?.id ?? ""),
        String(ticket.technician?.id ?? "")
    );

    // ── FormData local para os outros campos ─────────────────
    const [formData, setFormData] = useState({
        severity: String(ticket.sla?.id ?? ""),
        category: String(ticket.categoryTicket?.id ?? ""),
        typeReq: String(ticket.typeRequest?.id ?? ""),
        analista: String(ticket.technician?.id ?? ""),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ── CARREGA COM AS OPCOES ─────────────────────────────────────
    const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
    const [categoryTicket, setCategoryTicket] = useState<CategoryTicketDTO[]>([]);
    const [slaList, setSlaList] = useState<SLADTO[]>([]);

    // ── VALIDA SE TA FECHADO OU CANCELADO O TICKET ─────────────────────────────────────
    const isLocked = ticket.statusTicket === TicketStatus.FINISHED ||
        ticket.statusTicket === TicketStatus.CANCELED;


    // ── CARREGA A LISTA ─────────────────────────────────────
    useEffect(() => {
        TypeRequestService.getAllTypeRequest().then((r) => setTypeRequests(r.data));
        CategoryTicketService.getAllCategoryTicket().then((r) => setCategoryTicket(r.data));
        SlaService.getAllSla().then((r) => setSlaList(r.data));
    }, []);


    const ticketStatusOptions = Object.values(TicketStatus).map((status) => ({
        value: status,
        label: TicketStatusLabels[status],
    }));

    return (
        <>
            <div className="upd-form">
                <div className="upd-form-title">Atualizar chamado</div>

                {/* FORM */}
                <div className="upd-field">
                    <div className="upd-lbl">Status</div>
                    <CustomSelect
                        name="status"
                        value={statusFormData.status}
                        onChange={handleStatusChange}
                        options={[
                            { value: "", label: "Selecione um status" },
                            ...ticketStatusOptions,
                        ]}
                        width="100%"
                        height="34px"
                        disabled={isLocked} />
                </div>

                <div className="upd-field">
                    <div className="upd-lbl">Tipo de requisição</div>
                    <CustomSelect
                        name="typeRequestId"
                        value={formDataTypeRequest.typeRequestId}
                        onChange={handleTypeRequestChange}
                        options={[
                            { value: "", label: "Selecione" },
                            ...typeRequests.map((type) => ({
                                value: String(type.id),
                                label: type.name,
                            })),
                        ]}
                        width="100%"
                        height="34px"
                        disabled={isLocked} />
                </div>
                {/* FORM */}



                {/* CATEGORIA */}
                <div className="upd-field">
                    <div className="upd-lbl">Categoria do chamado</div>
                    <CustomSelect
                        name="categoryId"
                        value={assignmentFormData.categoryId}
                        onChange={handleAssignmentChange}
                        options={[
                            { value: "", label: "Selecione" },
                            ...categoryTicket.map((c) => ({
                                value: String(c.id),
                                label: c.name,
                            })),
                        ]}
                        width="100%"
                        height="34px"
                        disabled={isLocked}
                    />
                </div>

                {/* AREA SOLUCIONADORA - readonly, preenchida automaticamente */}
                <div className="upd-field">
                    <div className="upd-lbl">Área solucionadora</div>
                    <input
                        type="text"
                        value={solvingArea?.name ?? ""}
                        readOnly
                        className="floating-input"
                    />
                </div>

                {/* ANALISTA */}
                <div className="upd-field">
                    <div className="upd-lbl">Analista responsável</div>
                    <CustomSelect
                        name="technicianId"
                        value={assignmentFormData.technicianId}
                        onChange={handleAssignmentChange}
                        options={[
                            { value: "", label: "Selecione" },
                            ...analysts.map((a) => ({
                                value: String(a.id),
                                label: `${a.firstName} ${a.lastName}`,
                            })),
                        ]}
                        width="100%"
                        height="34px"
                        disabled={isLocked}
                    />
                </div>

                {/* SUBMMIT */}
                <form onSubmit={(e) => handleUpdateSubmmit(e, assignmentFormData)}>
                    <button className="upd-btn-save" disabled={isLocked}>
                        <FontAwesomeIcon icon={faSave} style={{ fontSize: 12 }} />
                        Salvar alterações
                    </button>
                </form>

                <button type="button" className="upd-btn-reopen" disabled={!isLocked}>
                    <RotateCcw size={12} />
                    Reabrir Ticket
                </button>
            </div>

            <ModalAnnotation
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleReasonConfirm} />
        </>
    );
}

export default AtualizacaoTicket;