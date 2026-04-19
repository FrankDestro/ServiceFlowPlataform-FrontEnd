import "./SlaIndicators.css";

const slaData = {
  averageResolutionTime: 45,
  percentageSLA: 85,
  averageFirstResponseTime: 30,
};

function SlaIndicators() {
  const { averageResolutionTime, percentageSLA, averageFirstResponseTime } =
    slaData;
  const slaColor = percentageSLA >= 90 ? "green" : "red";
  const resolutionColor = averageResolutionTime <= 60 ? "green" : "red";
  const responseColor = averageFirstResponseTime <= 30 ? "green" : "red";

  return (
    <div className="sla-container">
      <span className="title-panel-tickets">
        Indicadores de SLA - Dia Atual
      </span>

      <div className="sla-items-container">
        {/* Card Tempo Médio de Resolução */}
        <div className={`sla-item ${resolutionColor}`}>
          <span className="sla-item-title">Tempo Médio de Resolução</span>
          <span className="sla-item-value">
            {averageResolutionTime} minutos
          </span>
        </div>

        {/* Card Percentual Dentro do SLA */}
        <div className={`sla-item ${slaColor}`}>
          <span className="sla-item-title">Percentual Dentro do SLA</span>
          <span className="sla-item-value">{percentageSLA}%</span>
        </div>

        {/* Card Tempo Médio de Primeira Resposta */}
        <div className={`sla-item ${responseColor}`}>
          <span className="sla-item-title">
            Tempo Médio de Primeira Resposta
          </span>
          <span className="sla-item-value">
            {averageFirstResponseTime} minutos
          </span>
        </div>
      </div>
    </div>
  );
}

export default SlaIndicators;
