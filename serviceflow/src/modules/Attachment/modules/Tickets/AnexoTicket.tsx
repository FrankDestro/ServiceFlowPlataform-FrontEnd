import { TicketStatus } from "../../../Tickets/constant/TicketStatus";
import type { TicketDTO } from "../../../Tickets/models/ticketDTO";
import AnexosList from "../../components/AnexosList";
import AnexoUpload from "../../components/AnexoUpload";
import { useAttachment } from "../../hooks/useAttachament";

type Props = {
    ticket: TicketDTO;
};

function AnexoTicket({ ticket }: Props) {

    const { attachments } = useAttachment(ticket.id.toString());

    return (
        <div className="anx-wrap">
            <AnexosList anexos={attachments} isLoading={false} />
            {(ticket.statusTicket === TicketStatus.FINISHED || ticket.statusTicket === TicketStatus.CANCELED) ? (
                <div className="at-blocked-msg">
                    🚫 Não é possível adicionar anexos para tickets finalizados
                </div>
            ) : (
                <AnexoUpload id={ticket.id.toString()} />
            )}
        </div>
    );

}

export default AnexoTicket
