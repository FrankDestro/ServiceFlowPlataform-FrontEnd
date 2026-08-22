import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import TaskListing from "../../modules/Project/TaskListing/TaskListing";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Outlet } from "react-router-dom";
import useTaskListing from "../../modules/Project/hooks/useTaskListing";

function TaskPage() {

    const {
        tasks,
        totalItems,
        isLoading,
        queryParams,
        search,
        changePage,
        changePageSize,
        reload,
        changeSort

    } = useTaskListing();

    const pageSizeOptions = [2, 10, 20];

    return (
        <div>
            {isLoading && <LoadingOverlay />}
            {!isLoading && (
                <>
                    <TaskListing
                        onSearch={search}
                        changeSort={changeSort}
                        tasks={tasks}
                        onReload={reload}
                        sort={queryParams.sort}
                    />
                    {tasks.length === 0 ? (
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
    )
}

export default TaskPage
