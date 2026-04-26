import React, { useEffect, useState } from "react";
import "./TicketDetails.css";
import DetalhesChamado from "../DetalhesChamado/DetalhesChamado.tsx";
import AndamentoTab from "../AndamentoTicket/AndamentoTab.tsx";
import AnexoTab from "../AnexoTab/AnexoTab.tsx";
import AtualizacaoTicket from "../AtualizacaoTicket/AtualizacaoTicket.tsx";
import { type TicketDTO } from "../models/ticketDTO.ts";
import { getAllHistoryById } from "../service/ticket-history-service.ts";
import { getAllAttachmentById } from "../../Attachment/service/attachment-service.ts";
import Modal from "../../../components/UI/ModalDefault/Modal.tsx";
import TicketTimelineChart from "../TicketTimelineChart/TicketTimelineChart.tsx";
import { getSeverityBadgeStyle, getStatusTicketBadgeStyle } from "../../../utils/helpers/functions.ts";

type Aba = "detalhes" | "andamento" | "anexo";

interface Props {
    ticket: TicketDTO;
}

const TicketDetails: React.FC<Props> = ({ ticket }) => {
    const [abaAtiva, setAbaAtiva] = useState<Aba>("detalhes");
    const [andamentos, setAndamentos] = useState<any[]>([]);
    const [anexos, setAnexos] = useState<any[]>([]);
    const [carregandoAndamentos, setCarregandoAndamentos] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (abaAtiva === "andamento") {
            setCarregandoAndamentos(true);
            getAllHistoryById(ticket.id)
                .then((response) => setAndamentos(response.data))
                .catch((error) => console.error("Erro ao buscar histórico:", error))
                .finally(() => setCarregandoAndamentos(false));
        }
    }, [abaAtiva, ticket.id]);

    useEffect(() => {
        if (abaAtiva === "anexo" && anexos.length === 0) {
            setCarregandoAndamentos(true);
            getAllAttachmentById(ticket.id.toString())
                .then((response) => setAnexos(response.data))
                .catch((error) => console.error("Erro ao buscar anexos:", error))
                .finally(() => setCarregandoAndamentos(false));
        }
    }, [abaAtiva, ticket.id]);

    return (
        <div className="td-wrap">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="td-main">

                <div className="dc-hd-container">
                    <div className="dc-hd-top">
                        <span className="dc-hd-num">{ticket.ticketNumber}</span>
                        <span style={getStatusTicketBadgeStyle(ticket.statusTicket)}>{ticket.statusTicket}</span>
                        <span style={getSeverityBadgeStyle(ticket.sla.severity)}>{ticket.sla.severity}</span>
                        {ticket.solvingArea?.name && (
                            <span className="dc-pill-gray">{ticket.solvingArea.name}</span>
                        )}
                    </div>
                    <div className="dc-hd-title">{ticket.subject}</div>
                </div>

                {/* ABAS */}
                <div className="td-tabs">
                    <button
                        className={`td-tab ${abaAtiva === "detalhes" ? "active" : ""}`}
                        onClick={() => setAbaAtiva("detalhes")}
                    >
                        Detalhes do chamado
                    </button>
                    <button
                        className={`td-tab ${abaAtiva === "andamento" ? "active" : ""}`}
                        onClick={() => setAbaAtiva("andamento")}
                    >
                        Andamento
                    </button>
                    <button
                        className={`td-tab ${abaAtiva === "anexo" ? "active" : ""}`}
                        onClick={() => setAbaAtiva("anexo")}
                    >
                        Anexos
                    </button>
                </div>

                {/* CONTEÚDO */}
                <div className="td-content">
                    {abaAtiva === "detalhes" && (
                        <DetalhesChamado ticket={ticket} />
                    )}

                    {abaAtiva === "andamento" && (
                        <div>
                            {carregandoAndamentos ? (
                                <p className="td-loading">Carregando andamento...</p>
                            ) : (
                                <AndamentoTab ticket={ticket} />
                            )}
                        </div>
                    )}
                    {abaAtiva === "anexo" && (
                        <div>
                            {carregandoAndamentos ? (
                                <p className="td-loading">Carregando anexos...</p>
                            ) : (
                                <AnexoTab ticket={ticket} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* SIDEBAR FIXA */}
            <div className="td-sidebar">
                <AtualizacaoTicket ticket={ticket} />
            </div>

            <Modal
                title="TimeLine Ticket"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                footer=""
                width="100%"
                maxBodyHeight="60vh"
            >
                <TicketTimelineChart
                    data={andamentos.filter((e) => e.noteType === "SYSTEM_GENERATED")}
                />
            </Modal>
        </div>
    );
};

export default TicketDetails;