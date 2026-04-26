/* eslint-disable @typescript-eslint/no-unused-vars */
import { type TicketDTO, type TicketSimpleDTO } from "../models/ticketDTO";
import * as ticketService from "../service/ticket-service";
import * as functions from "../../../utils/helpers/functions";
import "./TableTicket.css";
import { PencilLine } from "lucide-react";

type TableTicketProps = {
    tickets: TicketSimpleDTO[];
    onFilter: (ticket: TicketSimpleDTO, ticketComplete: TicketDTO) => void;
};

function TableTicket({ tickets, onFilter }: TableTicketProps) {

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

                                <td>{ticket.sla?.severity ?? "—"}</td>

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

                                <td>{ticket.categoryTicket?.name ?? "—"}</td>
                                <td>{`${ticket.requester?.firstName} ${ticket.requester?.lastName}`}</td>
                                <td>{ticket.solvingArea?.name ?? "—"}</td>

                                <td>
                                    {ticket.technician ? (
                                        `${ticket.technician.firstName} ${ticket.technician.lastName}`
                                    ) : (
                                        <span style={{ color: "gray" }}>Não Atribuído</span>
                                    )}
                                </td>

                                <td>{functions.formatDate(ticket.registrationDate)}</td>

                                <td>
                                    <div className="btn-action" onClick={() => handleChamadoClick(ticket)}>
                                        <PencilLine size={16} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableTicket;