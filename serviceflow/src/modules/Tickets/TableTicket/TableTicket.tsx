/* eslint-disable @typescript-eslint/no-unused-vars */
import { type TicketDTO, type TicketSimpleDTO } from "../models/ticketDTO";
import * as ticketService from "../service/ticket-service";
import * as functions from "../../../utils/helpers/functions";
import "./TableTicket.css";
import { Eye, PencilLine } from "lucide-react";
import { TicketStatus } from "../constant/TicketStatus";
import { useState } from "react";
import Modal from "../../../components/UI/ModalDefault/Modal";
import DetalhesChamado from "../DetalhesChamado/DetalhesChamado";
import Button from "../../../components/UI/Button/Button";
import { faCheck, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./TableTicket.css";
import { getSeverityBadgeStyle, getStatusTicketBadgeStyle } from "../../../utils/helpers/functions";
import useApprovalSubmit from "../hooks/userApprovalSubmmit";
import ModalAnnotation from "../../../components/UI/ModalAnnotation/ModalAnnotation";
import { FiDownload } from "react-icons/fi";
import type { AttachmentDTO } from "../../Attachment/models/AttachmentDTO";
import { useAttachmentDownload } from "../../Attachment/hooks/useAttachmentDownload";
import NoData from "../../../components/UI/NoData/NoData";
import * as attachmentService from "../../Attachment/service/attachment-service"

type TableTicketProps = {
    tickets: TicketSimpleDTO[];
    onFilter: (ticket: TicketSimpleDTO, ticketComplete: TicketDTO) => void;
    onReload?: () => void; // ← opcional
};

function TableTicket({ tickets, onFilter, onReload }: TableTicketProps) {
    const { isSubmitting, rejectReason, setRejectReason, approveTicket, rejectTicket } =
        useApprovalSubmit(() => {
            setIsModalOpen(false);
            onReload?.();
        });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketDTO | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // BUSCAR ANEXOS
    const [ticketAttachments, setTicketAttachments] = useState<AttachmentDTO[]>([]);

    // BAIXAR ANEXO
    const { download } = useAttachmentDownload();

    const handleChamadoClick = (ticket: TicketSimpleDTO) => {
        ticketService
            .ticketById(ticket.id)
            .then((response) => {
                const ticketData: TicketDTO = response.data;
                onFilter(ticket, ticketData);
            })
            .catch((error) => {
                console.error("Erro ao buscar ticket completo:", error);
            });
    };

    const handleViewClick = (ticket: TicketSimpleDTO) => {
        ticketService
            .ticketById(ticket.id)
            .then((response) => {
                setSelectedTicket(response.data);
                setIsModalOpen(true);
                attachmentService.getAllAttachmentById(ticket.id.toString()).then((res) => {
                    setTicketAttachments(res.data);
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar ticket:", error);
            });
    };

    function handleReasonConfirm(reason: string) {
        rejectTicket(selectedTicket!.id, reason); // ← passa direto
        setModalOpen(false);
    }

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Assunto</th>
                            <th>Status</th>
                            <th>SLA</th>
                            <th>Tempo Restante</th>
                            <th>SubCategoria</th>
                            <th>Solicitante</th>
                            <th>Área Solucionadora</th>
                            <th>Em Atendimento por</th>
                            <th>Data Registro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} onClick={() => handleChamadoClick(ticket)}>

                                <td>{ticket.ticketNumber}</td>
                                <td>{ticket.subject}</td>

                                <td>
                                    <span style={functions.getStatusTicketBadgeStyle(ticket.statusTicket)}>
                                        {ticket.statusTicket}
                                    </span>
                                </td>

                                <td>{ticket.slaSeverity ? ticket.slaSeverity : "—"}</td>

                                <td>
                                    <span style={{
                                        display: "inline-block",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        backgroundColor: functions.isSlaCritical(ticket.dueDate) ? "#FFE0E0" : "#E6F4EA",
                                        color: functions.isSlaCritical(ticket.dueDate) ? "#FF0000" : "#2E7D32",
                                        fontWeight: functions.isSlaCritical(ticket.dueDate) ? "bold" : "normal",
                                    }}>
                                        {functions.calculateRemainingTime(ticket.dueDate)}
                                    </span>
                                </td>
                                <td>{ticket.subCategoryName ?? "—"}</td>
                                <td>{ticket.requesterName ?? "—"}</td>
                                <td>{ticket.solvingAreaName ?? "—"}</td>

                                <td>
                                    {ticket.technicianName ? (
                                        `${ticket.technicianName}`
                                    ) : (
                                        <span style={{ color: "gray" }}>Não Atribuído</span>
                                    )}
                                </td>

                                <td>{functions.formatDate(ticket.registrationDate)}</td>

                                <td>
                                    <div className="btn-action" onClick={() =>
                                        ticket.statusTicket === TicketStatus.AWAITING_APPROVAL
                                            ? handleViewClick(ticket)
                                            : handleChamadoClick(ticket)
                                    }>
                                        {ticket.statusTicket === TicketStatus.AWAITING_APPROVAL
                                            ? <Eye size={14} />
                                            : <PencilLine size={14} />
                                        }
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedTicket && (
                <Modal
                    title={
                        <span>
                            <span>Aprovacao de ticket</span>

                        </span>
                    }
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    footer={
                        <div className="group-approvals-button">
                            <div onClick={() => setModalOpen(true)}>
                                <Button
                                    text="Não Aprovar"
                                    icon={faXmark}
                                    background="#dc2626"
                                    hoverColor="#b91c1c"
                                    type="button"
                                    borderRadius="5px"
                                    size="small"
                                />
                            </div>
                            <div
                                onClick={() => approveTicket(selectedTicket.id)}
                            >
                                <Button
                                    text="Aprovar"
                                    icon={faCheck}
                                    background="#0f766e"
                                    hoverColor="#0d9488"
                                    type="button"
                                    borderRadius="5px"
                                />
                            </div>

                        </div>
                    }
                    width="100%"
                >
                    <div className="modal-scroll-content">
                        <div className="dc-hd-container">
                            <div className="dc-hd-top">
                                <span className="dc-hd-num">{selectedTicket.ticketNumber}</span>
                                <span style={getStatusTicketBadgeStyle(selectedTicket.statusTicket)}>{selectedTicket.statusTicket}</span>
                                <span style={getSeverityBadgeStyle(selectedTicket.sla.severity)}>{selectedTicket.sla.severity}</span>
                                {selectedTicket.solvingArea?.name && (
                                    <span className="dc-pill-gray">{selectedTicket.solvingArea.name}</span>
                                )}
                            </div>
                            <div className="dc-hd-title">{selectedTicket.subject}</div>
                        </div>
                        <DetalhesChamado ticket={selectedTicket} />

                        {/* Anexos */}
                        {ticketAttachments?.length > 0 ? (

                            <div className="TESTE">
                            <div className="ke-detail-card">
                                <span className="ke-detail-section-title">ANEXOS</span>
                                <div className="ke-detail-attachments">
                                    {ticketAttachments.map((att: AttachmentDTO) => (
                                        <div key={att.id} className="ke-detail-attachment-chip">
                                            <span>📎 {att.originalName}</span>
                                            <span className="ke-detail-attachment-size">{att.sizeInMb} MB</span>
                                            <div className="anx-download"
                                                onClick={() => download({ bucket: att.bucket, objectName: att.objectName })}
                                            >
                                                <FiDownload size={15} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             </div>
                        ) : (
                            <div className="ke-detail-card">
                                <span className="ke-detail-section-title">ANEXOS</span>
                                <NoData icon={faPaperclip} message="Nenhum anexo disponível" />
                            </div>
                        )}
                    </div>
                </Modal>
            )}
            <ModalAnnotation
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleReasonConfirm} />
        </div>
    );
}

export default TableTicket;