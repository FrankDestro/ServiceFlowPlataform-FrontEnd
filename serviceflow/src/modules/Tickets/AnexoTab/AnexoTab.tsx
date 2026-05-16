import AnexoTabGeral from "../../Attachment/modules/AnexoTabGeral/AnexoTabGeral";
import { TicketStatus } from "../constant/TicketStatus";
import type { TicketDTO } from "../models/ticketDTO";

type Props = {
    ticket: TicketDTO;
};

const AnexoTab: React.FC<Props> = ({ ticket }) => {
    return (
        <AnexoTabGeral
            entityType="TICKET"
            entityId={ticket.id.toString()}
            isReadOnly={ticket.statusTicket === TicketStatus.FINISHED || ticket.statusTicket === TicketStatus.CANCELED}
            readOnlyMessage="Não é possível adicionar anexos para tickets finalizados"
        />
    );
};

export default AnexoTab;





























































