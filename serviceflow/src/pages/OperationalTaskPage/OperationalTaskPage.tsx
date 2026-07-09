import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import UseOperationalTask from "../../modules/OperationalTask/hooks/UseOperationalTask"
import OperationalTaskListing from "../../modules/OperationalTask/OperationalTaskListing/OperationalTaskListing";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Outlet } from "react-router-dom";

function OperationalTaskPage() {

  const {
    tasks,
    isLoading,
    totalItems,
    queryParams,
    search,
    changePage,
    changePageSize,
    reload,
  } = UseOperationalTask();

  const pageSizeOptions = [2, 10, 20];

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {!isLoading && (
        <>
          <OperationalTaskListing
            onSearch={search}
            tasks={tasks}
            onReload={reload}
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

export default OperationalTaskPage
