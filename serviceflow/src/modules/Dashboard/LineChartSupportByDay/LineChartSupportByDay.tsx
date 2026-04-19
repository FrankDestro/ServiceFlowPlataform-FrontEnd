import { Chart } from "react-google-charts";

const data = [
  ["Hora", "Atendimentos"],
  ["08:00", 30],
  ["09:00", 60],
  ["10:00", 70],
  ["11:00", 45],
  ["12:00", 80],
  ["13:00", 90],
  ["14:00", 55],
  ["15:00", 40],
  ["16:00", 65],
  ["17:00", 50],
  ["18:00", 30],
];

const options = {
  title: "Volume de Atendimento ao Longo do Dia",
  hAxis: { title: "Hora", format: "HH:mm" },
  vAxis: { title: "Atendimentos" },
  curveType: "function", // Para deixar a linha suavizada
  legend: { position: "none" },
};

function LineChartSupportByDay() {
  return (
    <div className="base-card-charts">
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default LineChartSupportByDay;
