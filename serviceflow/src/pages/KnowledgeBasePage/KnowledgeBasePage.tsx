// KnowledgeBasePage.tsx
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData.tsx";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import useKnowledgeBase from "../../modules/KnowledgeBase/hooks/useKnowledgeBase.tsx";
import { Outlet } from "react-router-dom";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay.tsx";
import KnowledgeBaseListing from "../../modules/KnowledgeBase/KnowledgeBaseListing/KnowledgeBaseListing.tsx";

function KnowledgeBasePage() {
    const {
        articles,
        isLoading,
        totalItems,
        queryParams,
        search,
        changeSort,
        changePage,
        changePageSize,
        reload,
    } = useKnowledgeBase();

    const pageSizeOptions = [2, 10, 20];
    
    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <KnowledgeBaseListing
                        onSearch={search}
                        changeSort={changeSort}
                        articles={articles}
                        onReload={reload}
                        sort={queryParams.sort}
                    />
                    {articles.length === 0 ? (
                        <NoData icon={faDatabase} message="Não há artigos disponíveis" />
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

export default KnowledgeBasePage;