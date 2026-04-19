/* eslint-disable react-refresh/only-export-components */
import {Chart} from "react-google-charts";
import {activityPanelSummaryPercentTicketsDTO} from "../../../models/activityPanelSummaryPercentTickets";

export const options = {
    title: "Estatisticas de chamados por Status",
    pieHole: 0.4,
    is3D: true,
    slices: {
        0: {offset: 0.1},
        1: {offset: 0.1},
        2: {offset: 0.1},
    },
};

type ActivityPanelSummaryPercentTickets = {
    ticketStats: activityPanelSummaryPercentTicketsDTO | null;
};

function PieChartDonutByStatusTicket({ticketStats}: ActivityPanelSummaryPercentTickets) {

    const data = [
        ["Status", "Quantidade"],
        ["Abertos", ticketStats?.totalOpenedPercent ?? 0],
        ["Resolvidos", ticketStats?.totalFinishedPercent ?? 0],
        ["Vencidos", ticketStats?.totalDueTodayPercent ?? 0],
        ["Em Atendimento", ticketStats?.totalInProgressPercent ?? 0],
        ["Atrasados", ticketStats?.totalFrozenPercent ?? 0],
        ["Cancelados", ticketStats?.totalCanceledPercent ?? 0],
    ];

    return (
        <div className="base-card-charts">
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
}

export default PieChartDonutByStatusTicket;
