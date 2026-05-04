import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData.tsx";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay.tsx";
import { Outlet } from "react-router-dom";
import useChangeListing from "../../modules/Change/hooks/useChangeListing.tsx";
import ChangeListing from "../../modules/Change/ChangeListing/ChangeListing.tsx";

function ChangePage() {
    const {
        changes,
        totalItems,
        isLoading,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
    } = useChangeListing();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <ChangeListing
                        onSearch={search}
                        changes={changes}
                        onReload={reload}
                    />
                    {changes.length === 0 ? (
                        <NoData icon={faDatabase} message="Não há mudanças disponíveis" />
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

export default ChangePage;