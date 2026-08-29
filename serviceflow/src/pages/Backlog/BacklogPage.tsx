import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Outlet } from "react-router-dom";
import BacklogListing from "../../modules/Project/BacklogListing/BacklogListing";
import userBacklogLIsting from "../../modules/Project/hooks/userBacklogLIsting";

function BacklogPage() {

    const {
        backlog,
        totalItems,
        isLoading,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
        changeSort

    } = userBacklogLIsting();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <BacklogListing
                        onSearch={search}
                        changeSort={changeSort}
                        backlog={backlog}
                        onReload={reload}
                        sort={queryParams.sort}
                    />
                    {backlog.length === 0 ? (
                        <NoData icon={faDatabase} message="Não tarefas em backlog disponíveis" />
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
    )
}

export default BacklogPage
