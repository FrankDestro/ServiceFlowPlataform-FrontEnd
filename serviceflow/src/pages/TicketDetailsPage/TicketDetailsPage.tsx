import TicketDetails from "../../modules/Tickets/TicketDetais/TicketDetails";
import { type TicketDTO } from "../../modules/Tickets/models/ticketDTO";

type Props = {
  ticket: TicketDTO;
};

function TicketDetailsPage({ ticket }: Props) {
  return (
    <div>
     <TicketDetails ticket={ticket} />
    </div>
  )
}

export default TicketDetailsPage
