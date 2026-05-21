import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProblemDetail.css";
import { getPriorityClass, getProblemStatusBadgeClass } from "../../../utils/helpers/functions";
import { useProblemHistory, useProblemRelatedTickets, useProblemRelatedChanges } from "../hooks/useProblemTabs";
import useProblemDetail from "../hooks/useProblemDetail";
import Button from "../../../components/UI/Button/Button";
import { faCheck, faX, faSearch, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import AnexoTabProblem from "../components/AnexoTabProblem/AnexoTabProblem";
import RelatedTicketsTable from "../components/RelatedTicketsTable/RelatedTicketsTable";
import RelatedChangesTable from "../components/RelatedChangesTable/RelatedChangesTable";

type Props = {
  id: number;
};

type Tab = "detalhes" | "tickets" | "mudancas" | "anexos" | "historico";


function ProblemDetail({ id }: Props) {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("detalhes");

  const { data: problem, isLoading, error } = useProblemDetail(id);
  const { data: relatedTickets = [] } = useProblemRelatedTickets(id, activeTab === "tickets");
  const { data: history = [] } = useProblemHistory(id, activeTab === "historico");
  const { data: relatedChanges = [] } = useProblemRelatedChanges(id, activeTab === "mudancas");

  if (isLoading) return <p>Carregando...</p>;
  if (error || !problem) return <p>Erro ao carregar</p>;

  const isOpen = problem.status === "OPEN";
  const isInInvestigation = problem.status === "IN_INVESTIGATION";
  const isResolved = problem.status === "RESOLVED";

  const canInvestigate = isOpen;
  const canResolve = isInInvestigation || problem.status === "KNOWN_ERROR";
  const canClose = isResolved;
  const canPromoteToKnownError = isInInvestigation;

  return (
    <div>
      {/* Topbar */}
      <div className="prb-detail-topbar">
        <div className="prb-detail-topbar-left">
          <div className="prb-detail-back-btn" onClick={() => navigate("/problems")}>←</div>
          <div>
            <div className="prb-detail-topbar-meta">
              <span className="prb-detail-problem-number">{problem.problemNumber}</span>
              <span className={getProblemStatusBadgeClass(problem.status)}>{problem.status}</span>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                Prioridade: <span className={getPriorityClass(problem.priority)}>{problem.priority}</span>
              </span>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                Urgência: <span className={getPriorityClass(problem.urgency)}>{problem.urgency}</span>
              </span>
            </div>
            <div className="prb-detail-problem-title">{problem.title}</div>
          </div>
        </div>
        <div className="prb-detail-topbar-actions">
          <Button text="Iniciar investigação" icon={faSearch} type="button" borderRadius="8px" hoverColor="" disabled={!canInvestigate} className="prb-btn-investigate" />
          <Button text="Promover a Know Error" icon={faTriangleExclamation} type="button" borderRadius="8px" hoverColor="" disabled={!canPromoteToKnownError} className="prb-btn-known-error" />
        </div>
      </div>

      {/* Content */}
      <div className="prb-detail-content">
        <div className="prb-detail-main">
          <div className="prb-detail-tabs-wrapper">
            <div className="prb-detail-tabs">
              {(["detalhes", "tickets", "mudancas", "anexos", "historico"] as Tab[]).map((tab) => (
                <div
                  key={tab}
                  className={`prb-detail-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "detalhes" && "Detalhes"}
                  {tab === "tickets" && <>Tickets vinculados {relatedTickets.length > 0 && <span className="prb-detail-tab-badge">{relatedTickets.length}</span>}</>}
                  {tab === "mudancas" && <>Mudanças associadas {relatedChanges.length > 0 && <span className="prb-detail-tab-badge">{relatedChanges.length}</span>}</>}
                  {tab === "historico" && "Histórico"}
                  {tab === "anexos" && "Anexos"}
                </div>
              ))}
            </div>

            {/* Aba Detalhes */}
            {activeTab === "detalhes" && (
              <div className="prb-detail-tab-content">
                <div className="prb-detail-section-title">Informações gerais</div>
                <div className="prb-detail-info-grid">
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Categoria</span><span className="prb-detail-info-value">{problem.categoryName ?? "—"}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Prioridade</span><span className={`prb-detail-info-value ${getPriorityClass(problem.priority)}`}>{problem.priority}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Urgência</span><span className={`prb-detail-info-value ${getPriorityClass(problem.urgency)}`}>{problem.urgency}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Serviços afetados</span><span className="prb-detail-info-value">{problem.affectedServices ?? "—"}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Responsável</span><span className="prb-detail-info-value">{problem.assignedToName ?? "—"}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Criado por</span><span className="prb-detail-info-value">{problem.createdByName ?? "—"}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Criado em</span><span className="prb-detail-info-value">{problem.createdAt ?? "—"}</span></div>
                  <div className="prb-detail-info-row"><span className="prb-detail-info-label">Prazo</span><span className="prb-detail-info-value">{problem.dueDate ?? "—"}</span></div>
                  {problem.resolvedAt && <div className="prb-detail-info-row"><span className="prb-detail-info-label">Resolvido em</span><span className="prb-detail-info-value">{problem.resolvedAt}</span></div>}
                  {problem.closedAt && <div className="prb-detail-info-row"><span className="prb-detail-info-label">Encerrado em</span><span className="prb-detail-info-value">{problem.closedAt}</span></div>}
                </div>

                <div className="prb-detail-text-section">
                  <div className="prb-detail-section-title">Descrição</div>
                  <div className="prb-detail-text-block">{problem.description}</div>
                </div>

                <div className="prb-detail-two-col">
                  <div>
                    <div className="prb-detail-section-title">Causa raiz</div>
                    <div className="prb-detail-text-block">{problem.rootCause ?? "—"}</div>
                  </div>
                  <div>
                    <div className="prb-detail-section-title">Workaround</div>
                    <div className="prb-detail-text-block">{problem.workaround ?? "—"}</div>
                  </div>
                </div>

                {problem.resolutionNotes && (
                  <div className="prb-detail-text-section">
                    <div className="prb-detail-section-title">Notas de resolução</div>
                    <div className="prb-detail-text-block">{problem.resolutionNotes}</div>
                  </div>
                )}
              </div>
            )}

            {/* Aba Tickets vinculados */}
            {activeTab === "tickets" && (
              <div className="prb-detail-tab-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div className="prb-detail-section-title" style={{ marginBottom: 0 }}>
                    Tickets vinculados <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{relatedTickets.length} ticket(s)</span>
                  </div>
                  <button className="prb-detail-btn prb-detail-btn-primary prb-detail-btn-sm">+ Vincular ticket</button>
                </div>
                <RelatedTicketsTable tickets={relatedTickets} />
              </div>
            )}


            {/* Aba Mudancas vinculados */}
            {activeTab === "mudancas" && (
              <div className="prb-detail-tab-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div className="prb-detail-section-title" style={{ marginBottom: 0 }}>
                    Mudanças associadas <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{relatedChanges.length} mudança(s)</span>
                  </div>
                  <button className="prb-detail-btn prb-detail-btn-primary prb-detail-btn-sm">+ Vincular mudança</button>
                </div>
                <RelatedChangesTable changes={relatedChanges} />
              </div>
            )}

            {/* Aba Histórico */}
            {activeTab === "historico" && (
              <div className="prb-detail-tab-content">
                <div className="prb-detail-section-title">Histórico de alterações</div>
                {history.map((item: any) => (
                  <div key={item.id} className="prb-detail-history-item">
                    <div className="prb-detail-history-dot"></div>
                    <div className="prb-detail-history-text">{item.description}</div>
                    <div className="prb-detail-history-date">{item.createdAt ?? "—"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aba Anexos */}
          {activeTab === "anexos" && (
            <div className="prb-detail-tab-content">
              <AnexoTabProblem
                problem={problem}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="prb-detail-sidebar">
          <div className="prb-detail-card">
            <div className="prb-detail-section-title">Propriedades</div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">ID</span><span style={{ fontWeight: 700, color: "#0f766e" }}>{problem.problemNumber}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Status</span><span className={getProblemStatusBadgeClass(problem.status)} style={{ fontSize: 10 }}>{problem.status}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Categoria</span><span style={{ fontWeight: 500 }}>{problem.categoryName ?? "—"}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Prioridade</span><span className={getPriorityClass(problem.priority)}>{problem.priority}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Urgência</span><span className={getPriorityClass(problem.urgency)}>{problem.urgency}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Responsável</span><span style={{ wordBreak: "break-word", maxWidth: "60%" }}>{problem.assignedToName ?? "—"}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Criado em</span><span>{problem.createdAt ?? "—"}</span></div>
            <div className="prb-detail-side-row"><span className="prb-detail-side-label">Prazo</span><span style={{ color: "#dc2626", fontWeight: 600 }}>{problem.dueDate ?? "—"}</span></div>
          </div>

          <div className="prb-detail-card">
            <div className="prb-detail-section-title">Associações</div>
            <div className="prb-detail-side-row">
              <span className="prb-detail-side-label">Tickets vinculados</span>
              <span style={{ fontWeight: 600, color: "#0f766e" }}>{relatedTickets.length}</span>
            </div>
            <div className="prb-detail-side-row">
              <span className="prb-detail-side-label">Mudanças associadas</span>
              <span style={{ fontWeight: 600, color: "#0f766e" }}>{relatedChanges.length}</span>
            </div>
            <div className="prb-detail-side-row">
              <span className="prb-detail-side-label">Know Error gerado</span>
              <span style={{ fontWeight: 600, color: "#0f766e" }}>{0}</span>
            </div>
          </div>

          <div className="prb-detail-card">
            <div className="prb-detail-section-title">Ações</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button text="Resolver" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canResolve} className="prb-btn-resolve" />
              <Button text="Encerrar" icon={faX} type="button" borderRadius="8px" hoverColor="" disabled={!canClose} className="prb-btn-close" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
