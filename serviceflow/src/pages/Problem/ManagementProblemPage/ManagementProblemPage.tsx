import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../../components/UI/NoData/NoData.tsx";
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import { Outlet } from "react-router-dom";
import LoadingOverlay from "../../../layout/LoadingOverlay/LoadingOverlay.tsx";
import useManagementProblemListing from "../../../modules/ProblemManagement/hooks/useManagementProblemListing.tsx";
import ProblemManagementListing from "../../../modules/ProblemManagement/ProblemManagementListing/ProblemManagementListing.tsx";

function ManagementProblemPage() {
    const {
        problems,
        totalItems,
        isLoading,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    } = useManagementProblemListing();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <ProblemManagementListing
                        onSearch={search}
                        problems={problems}
                        onReload={reload}
                    />
                    {problems.length === 0 ? (
                        <NoData icon={faDatabase} message="Não há registro de problemas disponíveis" />
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

export default ManagementProblemPage;