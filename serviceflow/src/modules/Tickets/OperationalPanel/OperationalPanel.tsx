import type {
  summaryDTO,
  unassignedDTO,
  slaAtRiskDTO,
  ticketsWithoutUpdateDTO,
  workloadDTO,
  distributionDTO
} from "../OperationalPanel/models/OperationalPanel";
import SearchOperationalPanel from "./components/SearchSummary/SearchOperationalPanel";
import "./OperationalPanel.css"

type OperationalPanelParams = {
  solvingAreaId: string;
}

type OperationalPanelProps = {
  summary: summaryDTO | null;
  unassigned: unassignedDTO[];
  slaAtRisk: slaAtRiskDTO[];
  ticketsWithoutUpdate: ticketsWithoutUpdateDTO[];
  workload: workloadDTO[];
  distribution: distributionDTO | null;
  onSearch: (solvingAreaId: string) => void; // ✅ adiciona

}

const OperationalPanel = ({
  summary, unassigned, slaAtRisk, ticketsWithoutUpdate,
  workload, distribution, onSearch }: OperationalPanelProps) => {

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const maxWorkload = workload.length > 0 ? Math.max(...workload.map(w => w.ticketCount)) : 1;

  function getWorkloadColor(count: number, max: number): string {
    const ratio = count / max;
    if (ratio >= 0.8) return "#E24B4A";
    if (ratio >= 0.5) return "#EF9F27";
    return "#639922";
  }

  function getWorkloadWidth(count: number, max: number): string {
    return `${Math.round((count / max) * 100)}%`;
  }

  function getSlaTagClass(hours: number): string {
    if (hours <= 1) return "tag tag-d";
    if (hours <= 2) return "tag tag-w";
    return "tag tag-s";
  }

  function formatHours(hours: number): string {
    if (hours < 1) return `${Math.round(hours * 60)}min`;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  }

  function getUrgencyClass(urgency: string): string {
    const u = urgency.toLowerCase();
    if (u === "crítico" || u === "critico") return "tag tag-d";
    if (u === "alto") return "tag tag-w";
    if (u === "médio" || u === "medio") return "tag tag-i";
    return "tag tag-s";
  }

  function getUrgencyValColor(urgency: string): string {
    const u = urgency.toLowerCase();
    if (u === "crítico" || u === "critico") return "#a32d2d";
    if (u === "alto") return "#854f0b";
    return "#1a1a1a";
  }

  const overloaded = workload.length > 0
    ? workload.reduce((a, b) => a.ticketCount > b.ticketCount ? a : b)
    : null;

  const UNASSIGNED_PREVIEW = 3;
  const WITHOUT_UPDATE_PREVIEW = 3;



  return (
    <div className="op-wrap">
      {/* Header */}
    <SearchOperationalPanel onSearch={onSearch} />
      <div className="op-top">
        <div>
          <div className="op-date">{today}</div>
          <div className="op-title">Painel operacional</div>
        </div>
      </div>

      {/* Summary */}
      <div className="op-sec">Resumo do dia</div>
      <div className="op-g4">
        <div className="op-mc">
          <div className="op-mc-lbl">Abertos hoje</div>
          <div className="op-mc-val i">{summary?.openedToday ?? "—"}</div>
          <div className="op-mc-sub">tickets novos</div>
        </div>
        <div className="op-mc">
          <div className="op-mc-lbl">Resolvidos hoje</div>
          <div className="op-mc-val s">{summary?.resolvedToday ?? "—"}</div>
          <div className="op-mc-sub">
            {summary && summary.openedToday > 0
              ? `${Math.round((summary.resolvedToday / summary.openedToday) * 100)}% dos abertos`
              : "sem tickets abertos"}
          </div>
        </div>
        <div className="op-mc">
          <div className="op-mc-lbl">Fora do SLA</div>
          <div className="op-mc-val d">{summary?.outOfSla ?? "—"}</div>
          <div className="op-mc-sub">requer ação imediata</div>
        </div>
        <div className="op-mc">
          <div className="op-mc-lbl">Reabertos hoje</div>
          <div className="op-mc-val w">{summary?.reopenedToday ?? "—"}</div>
          <div className="op-mc-sub">indica má resolução</div>
        </div>
      </div>

      {/* Ação imediata */}
      <div className="op-sec">Ação imediata</div>
      <div className="op-g2">

        {/* Sem responsável */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Sem responsável</span>
            <span className="op-bdg op-bdg-d">{unassigned.length} tickets</span>
          </div>
          {unassigned.slice(0, UNASSIGNED_PREVIEW).map(ticket => (
            <div className="op-row" key={ticket.id}>
              <div>
                <div className="op-row-left">#{ticket.ticketNumber} — {ticket.subject}</div>
                <div className="op-row-sub">
                  {ticket.solvingAreaName} · há {formatHours(ticket.hoursWithoutAssignee)} sem atribuição
                </div>
              </div>
              <span className={getUrgencyClass(ticket.urgencyName)}>{ticket.urgencyName}</span>
            </div>
          ))}
          {unassigned.length > UNASSIGNED_PREVIEW && (
            <div className="op-row">
              <div className="op-row-more">+ {unassigned.length - UNASSIGNED_PREVIEW} outros sem atribuição</div>
            </div>
          )}
        </div>

        {/* Prestes a vencer SLA */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Prestes a vencer SLA</span>
            <span className="op-bdg op-bdg-w">{slaAtRisk.length} tickets</span>
          </div>
          {slaAtRisk.map(ticket => (
            <div className="op-row" key={ticket.id}>
              <div>
                <div className="op-row-left">#{ticket.ticketNumber} — {ticket.subject}</div>
                <div className="op-row-sub">
                  {ticket.solvingAreaName} · {ticket.technicianName}
                </div>
              </div>
              <span className={getSlaTagClass(ticket.hoursUntilSlaBreach)}>
                {formatHours(ticket.hoursUntilSlaBreach)}
              </span>
            </div>
          ))}
        </div>

        {/* Parados sem atualização */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Parados sem atualização</span>
            <span className="op-bdg op-bdg-w">{ticketsWithoutUpdate.length} tickets</span>
          </div>
          {ticketsWithoutUpdate.slice(0, WITHOUT_UPDATE_PREVIEW).map(ticket => (
            <div className="op-row" key={ticket.id}>
              <div>
                <div className="op-row-left">#{ticket.ticketNumber} — {ticket.subject}</div>
                <div className="op-row-sub">
                  {ticket.solvingAreaName} · {ticket.technicianName}
                </div>
              </div>
              <span className={getSlaTagClass(ticket.hoursWithoutUpdate)}>
                {formatHours(ticket.hoursWithoutUpdate)}h parado
              </span>
            </div>
          ))}
          {ticketsWithoutUpdate.length > WITHOUT_UPDATE_PREVIEW && (
            <div className="op-row">
              <div className="op-row-more">
                + {ticketsWithoutUpdate.length - WITHOUT_UPDATE_PREVIEW} outros parados
              </div>
            </div>
          )}
        </div>

        {/* Carga por operador */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Carga por operador</span>
            <span className="op-bdg op-bdg-i">hoje</span>
          </div>
          {workload.map(w => (
            <div className="op-bar-row" key={w.technicianId}>
              <span className="op-bar-name">{w.technicianName}</span>
              <div className="op-bar-track">
                <div
                  className="op-bar-fill"
                  style={{
                    width: getWorkloadWidth(w.ticketCount, maxWorkload),
                    background: getWorkloadColor(w.ticketCount, maxWorkload),
                  }}
                />
              </div>
              <span className="op-bar-num">{w.ticketCount}</span>
            </div>
          ))}
          {overloaded && (w => w.ticketCount / maxWorkload >= 0.8)(overloaded) && (
            <>
              <div className="op-divider" />
              <div className="op-overload-warn">
                {overloaded.technicianName} está sobrecarregado
              </div>
            </>
          )}
        </div>
      </div>

      {/* Distribuição */}
      <div className="op-sec">Distribuição do dia</div>
      <div className="op-g3">

        {/* Por status */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Por status</span>
          </div>
          {distribution?.byStatus.map(s => (
            <div className="op-stat-row" key={s.statusTicket}>
              <span className="op-stat-name">
                <span className="op-dot" style={{ background: getStatusColor(s.statusTicket) }} />
                {s.statusTicket}
              </span>
              <span className="op-stat-val">{s.ticketCount}</span>
            </div>
          ))}
        </div>

        {/* Por urgência */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Por urgência</span>
          </div>
          {distribution?.byUrgency.map(u => (
            <div className="op-stat-row" key={u.urgency}>
              <span className="op-stat-name">
                <span className={`op-urg-tag ${getUrgencyClass(u.urgency)}`}>{u.urgency}</span>
              </span>
              <span className="op-stat-val" style={{ color: getUrgencyValColor(u.urgency) }}>
                {u.ticketCount}
              </span>
            </div>
          ))}
        </div>

        {/* Tempos médios */}
        <div className="op-card">
          <div className="op-card-hd">
            <span className="op-card-title">Tempos médios hoje</span>
          </div>
          <div className="op-stat-row">
            <span className="op-stat-name">Primeira resposta</span>
            <span className="op-stat-val">{distribution?.averageTimes.AvgFirstResponseMinutes ?? "—"}</span>
          </div>
          <div className="op-stat-row">
            <span className="op-stat-name">Resolução média</span>
            <span className="op-stat-val">{distribution?.averageTimes.AvgResolution ?? "—"}</span>
          </div>
          <div className="op-stat-row">
            <span className="op-stat-name">Dentro do SLA</span>
            <span className="op-stat-val" style={{ color: "#3b6d11" }}>
              {distribution?.averageTimes.PercentWithinSla ?? "—"}%
            </span>
          </div>
          <div className="op-stat-row">
            <span className="op-stat-name">Fora do SLA</span>
            <span className="op-stat-val" style={{ color: "#a32d2d" }}>
              {distribution?.averageTimes.PercentOutOfSla ?? "—"}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: string): string {
    const s = status.toLowerCase();
    if (s.includes("aberto")) return "#378ADD";
    if (s.includes("andamento")) return "#EF9F27";
    if (s.includes("resolvido")) return "#639922";
    if (s.includes("reaberto")) return "#E24B4A";
    if (s.includes("fechado")) return "#888780";
    return "#888780";
}

export default OperationalPanel
