// import { faTicket } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";
// import NoData from "../../components/UI/NoData/NoData";
// import SearchTicket from "../../modules/Tickets/SearchTicket/SearchTicket";
// import { type TicketSimpleDTO } from "../../modules/Tickets/models/ticketDTO";
// import TicketTabsContainer from "../../modules/Tickets/TicketTabsContainer/TicketTabsContainer";
// import * as ticketService from "../../modules/Tickets/service/ticket-service";

// type QueryParams = {
//   page: number;
//   id: string;
//   registrationDate: string;
//   status: string;
//   area: string;
//   categoryTicket: string;
//   typeRequest: string;
//   sla: string;
//   size: number;
//   meusTicketsAbertos: boolean;
//   ticketsAbertosMinhaArea: boolean;
//   ticketsAtribuidos: boolean;
// };

// function Ticket() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPagination, setShowPagination] = useState(true);
//   const [tickets, setTickets] = useState<TicketSimpleDTO[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [queryParams, setQueryParams] = useState<QueryParams>({
//     page: 0,
//     id: "",
//     registrationDate: "",
//     status: "",
//     area: "",
//     categoryTicket: "",
//     typeRequest: "",
//     sla: "",
//     size: 10,
//     meusTicketsAbertos: false,
//     ticketsAbertosMinhaArea: false,
//     ticketsAtribuidos: false,
//   });

//   useEffect(() => {
//     ticketService
//       .allTicketsRequest(
//         queryParams.page,
//         queryParams.id,
//         queryParams.registrationDate,
//         queryParams.status,
//         queryParams.area,
//         queryParams.categoryTicket,
//         queryParams.typeRequest,
//         queryParams.sla,
//         queryParams.size,
//         "",
//         queryParams.meusTicketsAbertos,
//         queryParams.ticketsAbertosMinhaArea,
//         queryParams.ticketsAtribuidos
//       )
//       .then((response: { data: { totalPages: any; content: any; }; }) => {
//         const { totalPages, content } = response.data;
//         setTickets(content);
//         setTotalPages(totalPages);
//       });
//   }, [queryParams, showPagination]);

//   function handleSearch(
//     id: string,
//     registrationDate: string,
//     status: string,
//     area: string,
//     categoryTicket: string,
//     typeRequest: string,
//     sla: string,
//     meusTicketsAbertos: boolean,
//     ticketsAbertosMinhaArea: boolean,
//     ticketsAtribuidos: boolean,
//   ) {
//     setTickets([]);
//     setQueryParams({
//       ...queryParams,
//       page: 0,
//       id: id,
//       registrationDate: registrationDate,
//       status: status,
//       area: area,
//       categoryTicket: categoryTicket,
//       typeRequest: typeRequest,
//       sla: sla,
//       meusTicketsAbertos: meusTicketsAbertos,
//       ticketsAbertosMinhaArea: ticketsAbertosMinhaArea,
//       ticketsAtribuidos: ticketsAtribuidos,
//     });
//   }

//   const handlePageChange = (newPage: number) => {
//     setQueryParams({ ...queryParams, page: newPage });
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const handleActiveTabChange = (isTabOneActive: boolean) => {
//     setShowPagination(isTabOneActive);
//   };

//   const handleRowsPerPageChange = (newSize: number) => {
//     setQueryParams({
//       ...queryParams,
//       page: 0,
//       size: newSize,
//     });
//   };

//   return (
//     <div>
//       <div className="container-base">
//         <SearchTicket onSearch={handleSearch} />
//       </div>
//       {isLoading ? (
//         <div className="spinner-container">
//           <div className="spinner-border" role="status"></div>
//           <span>Carregando....</span>
//         </div>
//       ) : tickets.length === 0 ? (
//         <NoData icon={faTicket} message="Não foi encontrado ticket" />
//       ) : (
//         <>
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <div style={{ flexGrow: 1 }}>
//               <TicketTabsContainer
//                 tickets={tickets}
//                 onActiveTabChange={handleActiveTabChange}
//                 totalPages={totalPages}
//                 currentPage={queryParams.page}
//                 onPageChange={handlePageChange}
//                 size={queryParams.size}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Ticket;

import { faTicket } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import SearchTicket from "../../modules/Tickets/SearchTicket/SearchTicket";
import TicketTabsContainer from "../../modules/Tickets/TicketTabsContainer/TicketTabsContainer";
import { useTicket } from "../../modules/Tickets/hooks/useTicket";

function Ticket() {
    const {
        isLoading,
        tickets,
        totalPages,
        queryParams,
        handleSearch,
        handlePageChange,
        handleRowsPerPageChange,
        handleActiveTabChange,
    } = useTicket();

    return (
        <div>
            <div className="container-base">
                <SearchTicket onSearch={handleSearch} />
            </div>

            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border" role="status"></div>
                    <span>Carregando....</span>
                </div>
            ) : tickets.length === 0 ? (
                <NoData icon={faTicket} message="Não foi encontrado ticket" />
            ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: 1 }}>
                        <TicketTabsContainer
                            tickets={tickets}
                            onActiveTabChange={handleActiveTabChange}
                            totalPages={totalPages}
                            currentPage={queryParams.page}
                            onPageChange={handlePageChange}
                            size={queryParams.size}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ticket;
