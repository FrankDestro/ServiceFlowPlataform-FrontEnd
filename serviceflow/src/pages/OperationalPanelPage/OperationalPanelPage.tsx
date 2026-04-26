import { Outlet } from "react-router-dom";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import { useOperationalPanel } from "../../modules/Tickets/OperationalPanel/hooks/useOperationalPanel";
import OperationalPanel from "../../modules/Tickets/OperationalPanel/OperationalPanel"

function OperationalPanelPage() {

    const {
        summary,
        unassigned,
        slaAtRisk,
        ticketsWithoutUpdate,
        workload,
        distribution,
        isLoading,
        search,
    } = useOperationalPanel();

    return (
        <div>
            {isLoading && <LoadingOverlay />}

            {!isLoading && (
                <OperationalPanel
                    summary={summary}
                    unassigned={unassigned}
                    slaAtRisk={slaAtRisk}
                    ticketsWithoutUpdate={ticketsWithoutUpdate}
                    workload={workload}
                    distribution={distribution}
                     onSearch={search} // ✅
                />
            )}
            <Outlet />
        </div>
    );
}

export default OperationalPanelPage;

