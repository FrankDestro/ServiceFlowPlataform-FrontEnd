import React from "react";
import { type TicketDTO } from "../models/ticketDTO.ts";
import "./DetalhesChamado.css";
import { getPriorityBadgeStyle } from "../../../utils/helpers/functions.ts";

type Props = {
    ticket: TicketDTO;
};

function getInitials(firstName: string, lastName: string): string {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

const DetalhesChamado: React.FC<Props> = ({ ticket }) => {
    return (
        <div className="dc-body">

            {/* INFORMAÇÕES */}
            <div className="dc-card">
                <div className="dc-sec-lbl">Informações do chamado</div>
                <div className="tk-detail-info-grid">
                    <div className="dc-row"><span className="dc-lbl">Solicitante</span><span className="dc-val">{ticket.requester.firstName} {ticket.requester.lastName}</span></div>
                    <div className="dc-row"><span className="dc-lbl">Área solucionadora</span><span className="dc-val">{ticket.solvingArea?.name ?? "—"}</span></div>
                    <div className="dc-row"><span className="dc-lbl">Canal</span><span className="dc-val">{ticket.channel ?? "—"}</span></div>
                    <div className="dc-row"><span className="dc-lbl">Tipo</span><span className="dc-val">{ticket.typeRequest?.name ?? "—"}</span></div>
                    <div className="dc-row"><span className="dc-lbl">Categoria</span><span className="dc-val">{ticket.categoryTicket?.name ?? "—"}</span></div>
                    <div className="dc-row"><span className="dc-lbl">Serviço</span><span className="dc-val">{ticket.subCategoryTicket?.name ?? "—"}</span></div>
                    <div className="dc-row">
                        <span className="dc-lbl">Urgência</span>
                        <span style={getPriorityBadgeStyle(ticket.urgencyTicket?.name)}>{ticket.urgencyTicket?.name ?? "—"}</span>
                    </div>
                    <div className="dc-row">
                        <span className="dc-lbl">Impacto</span>
                        <span style={getPriorityBadgeStyle(ticket.impactTicket?.name)}>{ticket.impactTicket?.name ?? "—"}</span>
                    </div>
                    <div className="dc-row">
                        <span className="dc-lbl">Prioridade</span>
                        <span style={getPriorityBadgeStyle(ticket.priority)}>{ticket.priority ?? "—"}</span>
                    </div>
                    <div className="dc-row">
                        <span className="dc-lbl">Abertura</span>
                        <span className="dc-val">{new Date(ticket.registrationDate).toLocaleString("pt-BR")}</span>
                    </div>
                    {ticket.firstResponseAt && (
                        <div className="dc-row">
                            <span className="dc-lbl">Primeira resposta</span>
                            <span className="dc-val">{new Date(ticket.firstResponseAt).toLocaleString("pt-BR")}</span>
                        </div>
                    )}
                    <div className="dc-row">
                        <span className="dc-lbl">Prazo SLA</span>
                        <span className="dc-val" style={{ color: "#dc2626" }}>{new Date(ticket.dueDate).toLocaleString("pt-BR")}</span>
                    </div>
                    {ticket.completionDate && (
                        <div className="dc-row">
                            <span className="dc-lbl">Conclusão</span>
                            <span className="dc-val">{new Date(ticket.completionDate).toLocaleString("pt-BR")}</span>
                        </div>
                    )}
                    <div className="dc-row">
                        <span className="dc-lbl">Status do SLA</span>
                        <span style={ticket.slaBreached ?
                            { backgroundColor: "#fef2f2", color: "#dc2626", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500 } :
                            { backgroundColor: "#f0fdf4", color: "#16a34a", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500 }
                        }>
                            {ticket.slaBreached ? "Estourado" : "Dentro do prazo"}
                        </span>
                    </div>
                </div>
            </div>
            {/* INFORMAÇÕES */}

            {/* MOTIVO ENCERRAMENTO */}
            {ticket.closureReason && (
                <div className="dc-card">
                    <div className="dc-sec-lbl">Motivo de encerramento</div>
                    <div className="tk-detail-text-block">
                        <span className="dc-desc">{ticket.closureReason}</span>
                    </div>
                </div>
            )}

            {/* DESCRIÇÃO */}
            <div className="dc-card">
                <div className="dc-sec-lbl">Descrição</div>
                <div className="tk-detail-text-block">
                    <div className="dc-desc" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                </div>
            </div>

            <div className="dc-card">
                <div className="dc-sec-lbl">Participantes</div>

                <div className="tk-detail-text-block">
                    <div className="dc-part-role">Solicitante</div>
                    <div className="dc-part-item">
                        <div className="dc-av dc-av-blue">
                            {getInitials(ticket.requester.firstName, ticket.requester.lastName)}
                        </div>
                        <div>
                            <div className="dc-part-name">{ticket.requester.firstName} {ticket.requester.lastName}</div>
                            <div className="dc-part-email">{ticket.requester.email}</div>
                        </div>
                    </div>

              



                <div className="dc-part-role">Analista responsável</div>
                {ticket.technician ? (
                    <div className="dc-part-item">
                        <div className="dc-av dc-av-teal">
                            {getInitials(ticket.technician.firstName, ticket.technician.lastName)}
                        </div>
                        <div>
                            <div className="dc-part-name">{ticket.technician.firstName} {ticket.technician.lastName}</div>
                            <div className="dc-part-email">{ticket.technician.email}</div>
                        </div>
                    </div>
                ) : (
                    <div className="dc-part-item">
                        <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Não atribuído</span>
                    </div>
                )}

                {ticket.resolver && (
                    <>
                        <div className="dc-part-role">Resolvido por</div>
                        <div className="dc-part-item">
                            <div className="dc-av dc-av-amber">
                                {getInitials(ticket.resolver.firstName, ticket.resolver.lastName)}
                            </div>
                            <div>
                                <div className="dc-part-name">{ticket.resolver.firstName} {ticket.resolver.lastName}</div>
                                <div className="dc-part-email">{ticket.resolver.email}</div>
                            </div>
                        </div>
                    </>
                )}
            </div>

              </div>
        </div>
    );
};

export default DetalhesChamado;