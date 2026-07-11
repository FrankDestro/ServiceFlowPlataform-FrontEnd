import SearchTicket from "../../modules/Tickets/SearchTicket/SearchTicket";
import TicketTabsContainer from "../../modules/Tickets/TicketTabsContainer/TicketTabsContainer";
import { useTicket } from "../../modules/Tickets/hooks/useTicket";
import type { TicketStatus } from "../../modules/Tickets/constant/TicketStatus";
import { useState } from "react";

function TicketPage() {
    const {
        isLoading,
        tickets,
        totalPages,
        totalItems,
        queryParams,
        handleSearch,
        handlePageChange,
        handleRowsPerPageChange,
        handleActiveTabChange,
    } = useTicket();

    const [isOnListTab, setIsOnListTab] = useState(true);

    const handleSearchAdapted = (filters: {
        ticketNumber: string;
        status: string;
        channel: string;
        slaBreached: boolean;
        solvingAreaId: string;
        typeRequestId: string;
        categoryTicketId: string;
        slaId: string;
        initialDate: string;
        finalDate: string;
        myTickets: boolean;
        myAreaTickets: boolean;
        assignedToMe: boolean;
    }) => {
        handleSearch({
            page: 0,
            ticketNumber: filters.ticketNumber,
            statusTicket: filters.status as TicketStatus | null,
            channel: filters.channel,
            slaBreached: filters.slaBreached,
            solvingAreaId: filters.solvingAreaId ? Number(filters.solvingAreaId) : null,
            typeRequestId: filters.typeRequestId ? Number(filters.typeRequestId) : null,
            categoryTicketId: filters.categoryTicketId ? Number(filters.categoryTicketId) : null,
            slaId: filters.slaId ? Number(filters.slaId) : null,
            initialDate: filters.initialDate,
            finalDate: filters.finalDate,
            myTickets: filters.myTickets,
            myAreaTickets: filters.myAreaTickets,
            assignedToMe: filters.assignedToMe,
        });
    };

    const handleActiveTabChangeWithFilter = (isTabOneActive: boolean) => {
        setIsOnListTab(isTabOneActive);
        handleActiveTabChange(isTabOneActive);
    };

    return (
        <div>
            {isOnListTab && <SearchTicket onSearch={handleSearchAdapted} />}

            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border" role="status"></div>
                    <span>Carregando....</span>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ flexGrow: 1 }}>
                        <TicketTabsContainer
                            tickets={tickets}
                            totalItems={totalItems}
                            onActiveTabChange={handleActiveTabChangeWithFilter}
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

export default TicketPage;