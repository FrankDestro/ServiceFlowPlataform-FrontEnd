// import React from "react";
// import ApexCharts from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// type UserDTO = {
//   name: string;
// };

// type TicketHistoryItem = {
//   noteType: string;
//   registrationDate: string;
//   user: UserDTO;
// };

// type Props = {
//   data: TicketHistoryItem[];
// };

// const TicketTimelineChart: React.FC<Props> = ({ data }) => {
//   const series = [{
//     name: "Andamento",
//     data: data.map((_, index) => index + 1)
//   }];

//   const options: ApexOptions = {
//     chart: {
//       type: "line",
//       toolbar: { show: false },
//       animations: { enabled: false }, // opcional: para evitar "jump"
//     },
//     xaxis: {
//       type: "datetime",
//       categories: data.map(e => new Date(e.registrationDate).getTime())
//     },
//     annotations: {
//       points: data.map((e, i) => ({
//         x: new Date(e.registrationDate).getTime(),
//         y: i + 1,
//         marker: {
//           size: 6,
//           fillColor: "#fff",
//           strokeColor: "#007bff",
//           radius: 2,
//         },
//         label: {
//           text: `${e.noteType} - ${e.user.name}`,
//           style: {
//             background: "#007bff",
//             color: "#fff",
//             fontSize: "12px",
//           }
//         }
//       }))
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: "straight"
//     },
//     grid: {
//       padding: {
//         right: 30,
//         left: 20
//       }
//     },
//     title: {
//       text: "Linha do Tempo do Chamado",
//       align: "left"
//     }
//   };

//   // Altura mínima ajustada com base no número de eventos
//   const dynamicHeight = Math.max(350, data.length * 50);

//   return (
//     <div id="ticket-timeline-chart" style={{ width: "100%" }}>
//       <ApexCharts
//         options={options}
//         series={series}
//         type="line"
//         height={dynamicHeight} // altura ajustável
//         width="100%" // ocupa toda a largura
//       />
//     </div>
//   );
// };

// export default TicketTimelineChart;

import React from "react";
import ApexCharts from "react-apexcharts";
import { type ApexOptions } from "apexcharts";

// Novo tipo completo que você já tem
export type TicketHistoryDTO = {
  id: number;
  description: string;
  annotationPublic: boolean;
  visibleToRequester: boolean;
  noteType: string;
  ticketId: number;
  user: { name: string };
  registrationDate: string;
  systemGenerated: string;
};

type Props = {
  data: TicketHistoryDTO[];
};

const TicketTimelineChart: React.FC<Props> = ({ data }) => {
  const series = [
    {
      name: "Andamento",
      data: data.map((_, index) => index + 1)
    }
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      animations: { enabled: false }
    },
    xaxis: {
      type: "datetime",
      categories: data.map((e) => new Date(e.registrationDate).getTime())
    },
    annotations: {
      points: data.map((e, i) => ({
        x: new Date(e.registrationDate).getTime(),
        y: i + 1,
        marker: {
          size: 6,
          fillColor: "#fff",
          strokeColor: "#007bff",
          radius: 2
        },
        label: {
          text: `${e.noteType} - ${e.description}`,
          style: {
            background: "#007bff",
            color: "#fff",
            fontSize: "12px"
          }
        }
      }))
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    grid: {
      padding: {
        right: 30,
        left: 20
      }
    },
    title: {
      text: "Linha do Tempo do Chamado",
      align: "left"
    }
  };

  const dynamicHeight = Math.max(350, data.length * 50);

  return (
    <div id="ticket-timeline-chart" style={{ width: "100%" }}>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height={dynamicHeight}
        width="100%"
      />
    </div>
  );
};

export default TicketTimelineChart;
