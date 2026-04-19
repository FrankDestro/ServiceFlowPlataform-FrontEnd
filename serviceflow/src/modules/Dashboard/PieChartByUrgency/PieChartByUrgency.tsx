import Chart from "react-google-charts";
import { ActivityPanelSummaryTicketsByUrgencyDTO } from "../../../models/activityPanelSummaryTicketsByUrgency";

type ActivityPanelSummaryTicketsByUrgency = {
  ticketsByUrgency: ActivityPanelSummaryTicketsByUrgencyDTO | null;
};

const options = {
  title: "Estatística de Chamados por Urgência",
  is3D: true,
  pieHole: 0.4,
  slices: {
    0: { offset: 0.1 },
    1: { offset: 0.1 },
    2: { offset: 0.1 },
    3: { offset: 0.1 },
    4: { offset: 0.1 },
  },
  pieSliceText: "percentual", // Exibe a quantidade
  tooltip: {
    isHtml: true,
    trigger: 'focus', // Exibe tooltip ao selecionar
    textStyle: { fontSize: 12 },
  },
};

function PieChartByUrgency({ ticketsByUrgency } : ActivityPanelSummaryTicketsByUrgency) {
  const totalCriticalPercent = ticketsByUrgency?.totalCriticalPercent ?? 0;
  const totalHighPercent = ticketsByUrgency?.totalHighPercent ?? 0;
  const totalMediumPercent = ticketsByUrgency?.totalMediumPercent ?? 0;
  const totalLowPercent = ticketsByUrgency?.totalLowPercent ?? 0;
  const totalCriticalQuantity = ticketsByUrgency?.totalCriticalQuantity ?? 0;
  const totalHighQuantity = ticketsByUrgency?.totalHighQuantity ?? 0;
  const totalMediumQuantity = ticketsByUrgency?.totalMediumQuantity ?? 0;
  const totalLowQuantity = ticketsByUrgency?.totalLowQuantity ?? 0;
  
  const data = [
    ["Urgência", "Quantidade", { role: "tooltip" }],
    [
      `Crítico (${totalCriticalQuantity})`, totalCriticalPercent,`${totalCriticalPercent}% - Total: ${totalCriticalQuantity}`,
    ],
    [
      `Alta (${totalHighQuantity})`,
      totalHighPercent,
      `${totalHighPercent}% - Total: ${totalHighQuantity}`,
    ],
    [
      `Média (${totalMediumQuantity})`,
      totalMediumPercent,
      `${totalMediumPercent}% - Total: ${totalMediumQuantity}`,
    ],
    [
      `Baixa (${totalLowQuantity})`,
      totalLowPercent,
      `${totalLowPercent}% - Total: ${totalLowQuantity}`,
    ],
  ];

  return (
    <div className="base-card-charts">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default PieChartByUrgency;