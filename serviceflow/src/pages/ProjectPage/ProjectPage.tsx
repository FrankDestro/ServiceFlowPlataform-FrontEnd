import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/UI/NoData/NoData";
import EpicListing from "../../modules/Project/EpicListing/EpicListing";
import useEpicListing from "../../modules/Project/hooks/useEpicListing";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Outlet } from "react-router-dom";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";

function ProjectPage() {

  const {
    epics,
    totalItems,
    isLoading,
    queryParams,
    search,
    changePage,
    changePageSize,
    reload,
    changeSort
  } = useEpicListing();

  const pageSizeOptions = [2, 10, 20];

  console.log(epics)

  return (
    <div>
      {isLoading && <LoadingOverlay />}

      {!isLoading && (
        <>
          <EpicListing
            onSearch={search}
            changeSort={changeSort}
            epics={epics}
            onReload={reload}
            sort={queryParams.sort}
          />
          {epics.length === 0 ? (
            <NoData icon={faDatabase} message="Não há épicos disponíveis" />
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

export default ProjectPage
