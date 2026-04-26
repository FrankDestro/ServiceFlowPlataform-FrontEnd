import AnexoTicket from "../../Attachment/modules/Tickets/AnexoTicket"
import type { TicketDTO } from "../models/ticketDTO";

type Props = {
    ticket: TicketDTO;
};

const AnexoTab: React.FC<Props> = ({ ticket }) => {
    return (
        <div>
            <AnexoTicket ticket={ticket} />
        </div>
    )
}

export default AnexoTab




























































