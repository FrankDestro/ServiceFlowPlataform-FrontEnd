/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { type TicketDTO, type TicketSimpleDTO } from "../models/ticketDTO";
import * as ticketService from "../service/ticket-service";
import * as functions from "../../../utils/helpers/functions";
import "./TableTicket.css";

type TableTicketProps = {
    tickets: TicketSimpleDTO[];
    onFilter: (ticket: TicketSimpleDTO, ticketComplete: TicketDTO) => void;
};

function TableTicket({ tickets, onFilter }: TableTicketProps) {
    const [, setCompleteTicket] = useState<TicketDTO>();
    const [selectedTicket, setSelectedTicket] = useState<TicketSimpleDTO | null>(null);

    const handleChamadoClick = (ticket: TicketSimpleDTO) => {
        setSelectedTicket(ticket);
    };

    useEffect(() => {
        if (selectedTicket) {
            ticketService
                .ticketById(selectedTicket.id)
                .then((response) => {
                    const ticketData: TicketDTO = response.data;
                    setCompleteTicket(ticketData);
                    onFilter(selectedTicket, ticketData);
                })
                .catch((error) => {
                    console.error("Erro ao buscar ticket completo:", error);
                });
        }
    }, [selectedTicket]);

    return (
        <div>
            <div className="ticket-table-container">
                <table className="container-base">
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Assunto</th>
                            <th>Status</th>
                            <th>SLA</th>
                            <th>Tempo Restante</th>
                            <th>Categoria</th>
                            <th>Solicitante</th>
                            <th>Área Solucionadora</th>
                            <th>Em Atendimento por</th>
                            <th>Data Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} onClick={() => handleChamadoClick(ticket)}>

                                {/* Nº do Ticket */}
                                <td>{ticket.ticketNumber}</td>

                                {/* Assunto */}
                                <td>{ticket.subject}</td>

                                {/* Status */}
                                <td>
                                    <span style={functions.getStatusTicketBadgeStyle(ticket.statusTicket)}>
                                        {ticket.statusTicket}
                                    </span>
                                </td>

                                {/* SLA severity */}
                                <td>{ticket.sla?.severity ?? "—"}</td>

                                {/* Tempo Restante */}
                                <td style={{ textAlign: "center" }}>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "2px 8px",
                                            borderRadius: "4px",
                                            backgroundColor: functions.isSlaCritical(ticket.dueDate)
                                                ? "#FFE0E0"
                                                : "#E6F4EA",
                                            color: functions.isSlaCritical(ticket.dueDate)
                                                ? "#FF0000"
                                                : "#2E7D32",
                                            fontWeight: functions.isSlaCritical(ticket.dueDate)
                                                ? "bold"
                                                : "normal",
                                        }}
                                    >
                                        {functions.calculateRemainingTime(ticket.dueDate)}
                                    </span>
                                </td>

                                {/* Categoria */}
                                <td>{ticket.categoryTicket?.name ?? "—"}</td>

                                {/* Solicitante */}
                                <td>{`${ticket.requester?.firstName} ${ticket.requester?.lastName}`}</td>

                                {/* Área Solucionadora */}
                                <td>{ticket.solvingArea?.name ?? "—"}</td>

                                {/* Técnico */}
                                <td>
                                    {ticket.technician ? (
                                        `${ticket.technician.firstName} ${ticket.technician.lastName}`
                                    ) : (
                                        <span style={{ color: "gray" }}>Não Atribuído</span>
                                    )}
                                </td>

                                {/* Data Registro */}
                                <td>{functions.formatDate(ticket.registrationDate)}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableTicket;