import { Outlet } from "react-router-dom";
import NoData from "../../components/UI/NoData/NoData";
import Pagination from "../../components/UI/Pagination/Pagination";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import useSprintListing from "../../modules/Project/hooks/useSprintListing";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import SprintListing from "../../modules/Project/SprintListing/SprintListing";

function SprintPage() {

    const {
        sprints,
        totalItems,
        isLoading,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
        changeSort

    } = useSprintListing();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <SprintListing
                        onSearch={search}
                        changeSort={changeSort}
                        sprints={sprints}
                        onReload={reload}
                        sort={queryParams.sort}
                    />
                    {sprints.length === 0 ? (
                        <NoData icon={faDatabase} message="Não há sprints disponíveis" />
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

export default SprintPage
