import {faDatabase} from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData.tsx";
import TableKnowError from "../../modules/KnowsError/TableKnowError/TableKnowError.tsx";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import useKnowError from "../../modules/KnowsError/hooks/useKnowError.tsx";
import {Outlet} from "react-router-dom";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay.tsx";

function KnowErrorsPage() {
    const {knowErrors,
        isLoading,
        totalItems,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload
    } = useKnowError();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div className="">
            {isLoading && <LoadingOverlay/>}

            {!isLoading && (
                <>
                    <TableKnowError onSearch={search} knowerros={knowErrors} onReload={reload}/>

                    {knowErrors.length === 0 ? (
                        <NoData icon={faDatabase} message="Não há dados disponíveis"/>
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
                                    window.scrollTo({top: 0, behavior: "smooth"});
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            <Outlet/>
        </div>
    );
}

export default KnowErrorsPage;