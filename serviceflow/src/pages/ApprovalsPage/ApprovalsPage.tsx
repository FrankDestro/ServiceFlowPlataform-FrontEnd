import { faTicket } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import TableTicket from "../../modules/Tickets/TableTicket/TableTicket";
import Pagination from "../../components/UI/Pagination/Pagination";
import useApprovals from "../../modules/Tickets/hooks/useApprovals";
import { Outlet } from "react-router-dom";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";

function ApprovalsPage() {
    const {
        tickets,
        isLoading,
        totalItems,
        queryParams,
        changePage,
        changePageSize,
        reload,
    } = useApprovals();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}

            {!isLoading && (
                <>
                    <TableTicket
                        tickets={tickets}
                        onFilter={(ticket, ticketComplete) => { }}
                        onReload={reload} // ← adiciona isso

                    />

                    {tickets.length === 0 ? (
                        <NoData icon={faTicket} message="Nenhum ticket aguardando aprovação" />
                    ) : (
                        <div className="container-pagination">
                            <Pagination
                                totalItems={totalItems}
                                itemsPerPageOptions={pageSizeOptions}
                                selectedSize={queryParams.size}
                                initialPage={queryParams.page + 1}
                                onPageSizeChange={changePageSize}
                                onPageChange={(page) => {
                                    changePage(page);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            <Outlet />
        </div>
    );
}

export default ApprovalsPage;