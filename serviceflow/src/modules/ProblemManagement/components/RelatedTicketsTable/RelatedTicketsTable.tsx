import { getPriorityClass, getStatusTicketBadgeStyle } from "../../../../utils/helpers/functions";
import type { TicketSummaryDTO } from "../../models/ProblemDTO";
import "./RelatedTicketsTable.css";

type Props = {
    tickets: TicketSummaryDTO[];
};

export default function RelatedTicketsTable({ tickets }: Props) {
    if (tickets.length === 0)
        return <span style={{ fontSize: 11, color: "#94a3b8" }}>Nenhum ticket vinculado</span>;

    return (
        <table className="related-tickets-table">
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Assunto</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Solicitante</th>
                    <th>Data registro</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket: any) => (
                    <tr key={ticket.ticketNumber}>
                        <td className="prb-detail-ticket-number">{ticket.ticketNumber}</td>
                        <td>{ticket.subject}</td>
                        <td><span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span></td>
                        <td><span style={getStatusTicketBadgeStyle(ticket.status)}>{ticket.status}</span></td>
                        <td>{ticket.requesterName}</td>
                        <td>{ticket.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}