import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChangeDetail from "../hooks/useChangeDetail";
import "./ChangeDetails.css";
import { getApproverBadgeClass, getInitials, getLevelClass, getPriorityClass, getStatusBadgeClass, getTaskCheckClass, getTaskStatusClass, getTaskStatusLabel, getTypeBadgeClass } from "../../../utils/helpers/functions";
import { useChangeTasks, useChangeApprovers, useChangeHistory } from "../hooks/useChangeTabs";

type Props = {
  id: number;
};

type Tab = "detalhes" | "tarefas" | "aprovadores" | "historico";

function ChangeDetail({ id }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("detalhes");

  const { data: article, isLoading, error } = useChangeDetail(id);
  const { data: tasks = [] } = useChangeTasks(id, activeTab === "tarefas");
  const { data: approvers = [] } = useChangeApprovers(id, activeTab === "aprovadores");
  const { data: history = [] } = useChangeHistory(id, activeTab === "historico");

  if (isLoading) return <p>Carregando...</p>;
  if (error || !article) return <p>Erro ao carregar</p>;

  const stages = ["SUBMISSION", "IMPLEMENTATION", "REVIEW", "CLOSE"];
  const stageLabels: Record<string, string> = {
    SUBMISSION: "Submission",
    IMPLEMENTATION: "Implementation",
    REVIEW: "Review",
    CLOSE: "Close",
  };

  const currentStageIndex = stages.indexOf(article.stage);

  const getStepClass = (index: number) => {
    if (index < currentStageIndex) return "step step-done";
    if (index === currentStageIndex) return "step step-active";
    return "step step-pending";
  };

  const completedTasks = tasks.filter((t: any) => t.status === "COMPLETED").length;
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce((sum: number, t: any) => sum + (t.estimatedHours ?? 0), 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const approvedCount = approvers.filter((a: any) => a.status === "APPROVED").length;
  const totalApprovers = approvers.length;
  const lastApproval = approvers
    .filter((a: any) => a.approvedAt)
    .sort((a: any, b: any) => new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime())[0];

  return (
    <div>
      {/* Topbar */}
      <div className="ch-detail-topbar">
        <div className="ch-detail-topbar-left">
          <div className="ch-detail-back-btn" onClick={() => navigate("/changes")}>←</div>
          <div>
            <div className="ch-detail-topbar-meta">
              <span className="ch-detail-change-number">{article.changeNumber}</span>
              <span className={getTypeBadgeClass(article.changeType)}>{article.changeType}</span>
              <span className={getStatusBadgeClass(article.status)}>{article.status}</span>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                Prioridade: <span className={getPriorityClass(article.priority)}>{article.priority}</span>
              </span>
            </div>
            <div className="ch-detail-change-title">{article.title}</div>
          </div>
        </div>
        <div className="ch-detail-topbar-actions">
          <button className="ch-detail-btn">✓ Aprovar</button>
          <button className="ch-detail-btn ch-detail-btn-primary" onClick={() => navigate(`/changes/${id}/edit`)}>✏ Editar</button>
          <button className="ch-detail-btn ch-detail-btn-danger">✕ Cancelar</button>
        </div>
      </div>

      {/* Stepper */}
      <div className="ch-detail-stepper-bar">
        <div className="ch-detail-stepper">
          {stages.map((stage, index) => (
            <div key={stage} style={{ display: "flex", alignItems: "center", flex: index < stages.length - 1 ? 1 : "unset" }}>
              <div className={getStepClass(index)}>
                <div className="step-circle">{index + 1}</div>
                <span className="step-label">{stageLabels[stage]}</span>
              </div>
              {index < stages.length - 1 && (
                <div className={`step-line ${index < currentStageIndex ? "step-line-done" : ""}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="ch-detail-content">
        <div className="ch-detail-main">
          <div className="ch-detail-tabs-wrapper">
            <div className="ch-detail-tabs">
              {(["detalhes", "tarefas", "aprovadores", "historico"] as Tab[]).map((tab) => (
                <div
                  key={tab}
                  className={`ch-detail-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "detalhes" && "Detalhes"}
                  {tab === "tarefas" && <>Tarefas {totalTasks > 0 && <span className="ch-detail-tab-badge">{totalTasks}</span>}</>}
                  {tab === "aprovadores" && <>Aprovadores {totalApprovers > 0 && <span className="ch-detail-tab-badge">{totalApprovers}</span>}</>}
                  {tab === "historico" && "Histórico"}
                </div>
              ))}
            </div>

            {/* Aba Detalhes */}
            {activeTab === "detalhes" && (
              <div className="ch-detail-tab-content">
                <div className="ch-detail-section-title">Informações gerais</div>
                <div className="ch-detail-info-grid">
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Tipo</span><span className="ch-detail-info-value"><span className={getTypeBadgeClass(article.changeType)}>{article.changeType}</span></span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Prioridade</span><span className={`ch-detail-info-value ${getPriorityClass(article.priority)}`}>{article.priority}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Início agendado</span><span className="ch-detail-info-value">{article.scheduledStart ?? "—"}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Fim agendado</span><span className="ch-detail-info-value">{article.scheduledEnd ?? "—"}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Serviços afetados</span><span className="ch-detail-info-value">{article.affectedServices?.join(", ") ?? "—"}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Responsável</span><span className="ch-detail-info-value">{article.changeOwnerEmail ?? "—"}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Criado por</span><span className="ch-detail-info-value">{article.createdByEmail ?? "—"}</span></div>
                  <div className="ch-detail-info-row"><span className="ch-detail-info-label">Criado em</span><span className="ch-detail-info-value">{article.createdAt ?? "—"}</span></div>
                </div>

                <div className="ch-detail-text-section">
                  <div className="ch-detail-section-title">Descrição</div>
                  <div className="ch-detail-text-block">{article.description}</div>
                </div>

                <div className="ch-detail-text-section">
                  <div className="ch-detail-section-title">Motivo da mudança</div>
                  <div className="ch-detail-text-block">{article.reasonChange}</div>
                </div>

                <div className="ch-detail-text-section">
                  <div className="ch-detail-section-title">Pré-requisitos</div>
                  <div className="ch-detail-text-block">{article.prerequisite ?? "—"}</div>
                </div>

                <div className="ch-detail-two-col">
                  <div>
                    <div className="ch-detail-section-title">Plano de implementação</div>
                    <div className="ch-detail-text-block">{article.implementationPlan}</div>
                  </div>
                  <div>
                    <div className="ch-detail-section-title">Plano de rollback</div>
                    <div className="ch-detail-text-block">{article.rollbackPlan}</div>
                  </div>
                </div>

                <div className="ch-detail-text-section">
                  <div className="ch-detail-section-title">Risco & Impacto</div>
                  <div className="ch-detail-two-col" style={{ marginTop: 0 }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Nível de risco</span>
                        <span className={getPriorityClass(article.riskLevel)} style={{ fontSize: 12 }}>{article.riskLevel}</span>
                      </div>
                      <div className={getLevelClass(article.riskLevel)}>
                        <div className="level-dot"></div>
                        <div className="level-dot"></div>
                        <div className="level-dot"></div>
                      </div>
                      <div className="ch-detail-text-block" style={{ marginTop: 10 }}>{article.riskDescription ?? "—"}</div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Nível de impacto</span>
                        <span className={getPriorityClass(article.impactLevel)} style={{ fontSize: 12 }}>{article.impactLevel}</span>
                      </div>
                      <div className={getLevelClass(article.impactLevel)}>
                        <div className="level-dot"></div>
                        <div className="level-dot"></div>
                        <div className="level-dot"></div>
                      </div>
                      <div className="ch-detail-text-block" style={{ marginTop: 10 }}>{article.impactDescription ?? "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Aba Tarefas */}
            {activeTab === "tarefas" && (
              <div className="ch-detail-tab-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div className="ch-detail-section-title" style={{ marginBottom: 0 }}>
                    Tarefas <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{completedTasks} / {totalTasks} concluídas · {totalHours}h estimadas</span>
                  </div>
                  <button className="ch-detail-btn ch-detail-btn-primary ch-detail-btn-sm">+ Nova tarefa</button>
                </div>
                {tasks.map((task: any) => (
                  <div key={task.id} className="ch-detail-task-item">
                    <div className={getTaskCheckClass(task.status)}>
                      {task.status === "COMPLETED" && "✓"}
                    </div>
                    <div className="ch-detail-task-info">
                      <div className={`ch-detail-task-label ${task.status === "COMPLETED" ? "done" : ""}`}>{task.title}</div>
                      <div className="ch-detail-task-meta">
                        <span className="ch-detail-task-assignee">{task.assignedToEmail ?? "—"}</span>
                        {task.estimatedHours && <span className="ch-detail-task-hours">{task.estimatedHours}h estimadas</span>}
                      </div>
                    </div>
                    <span className={getTaskStatusClass(task.status)}>{getTaskStatusLabel(task.status)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Aba Aprovadores */}
            {activeTab === "aprovadores" && (
              <div className="ch-detail-tab-content">
                <div className="ch-detail-section-title">Aprovadores</div>
                {approvers.map((approver: any) => (
                  <div key={approver.id} className="ch-detail-approver-item">
                    <div className="ch-detail-avatar">{getInitials(approver.userEmail)}</div>
                    <div className="ch-detail-approver-info">
                      <div className="ch-detail-approver-name">{approver.userEmail}</div>
                      <div className="ch-detail-approver-comment">
                        {approver.comment ?? (approver.status === "PENDING" ? "Aguardando aprovação..." : "")}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className={getApproverBadgeClass(approver.status)}>{approver.status}</span>
                      {approver.approvedAt && (
                        <div className="ch-detail-approver-date" style={{ marginTop: 4 }}>{approver.approvedAt}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aba Histórico */}
            {activeTab === "historico" && (
              <div className="ch-detail-tab-content">
                <div className="ch-detail-section-title">Histórico de alterações</div>
                {history.map((item: any) => (
                  <div key={item.id} className="ch-detail-history-item">
                    <div className="ch-detail-history-dot"></div>
                    <div className="ch-detail-history-text">{item.description}</div>
                    <div className="ch-detail-history-date">{item.createdAt ?? "—"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="ch-detail-sidebar">
          <div className="ch-detail-card">
            <div className="ch-detail-section-title">Propriedades</div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">ID</span><span style={{ fontWeight: 700, color: "#0f766e" }}>{article.changeNumber}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Status</span><span className={getStatusBadgeClass(article.status)} style={{ fontSize: 10 }}>{article.status}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Estágio</span><span style={{ fontWeight: 500 }}>{article.stage}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Tipo</span><span className={getTypeBadgeClass(article.changeType)} style={{ fontSize: 10 }}>{article.changeType}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Prioridade</span><span className={getPriorityClass(article.priority)}>{article.priority}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Risco</span><span className={getPriorityClass(article.riskLevel)}>{article.riskLevel}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Impacto</span><span className={getPriorityClass(article.impactLevel)}>{article.impactLevel}</span></div>
            <div className="ch-detail-side-row">
              <span className="ch-detail-side-label">Responsável</span>
              <span style={{ wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "60%" }}>
                {article.changeOwnerEmail ?? "—"}
              </span>
            </div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Criado em</span><span>{article.createdAt ?? "—"}</span></div>
          </div>

          <div className="ch-detail-card">
            <div className="ch-detail-section-title">Progresso das tarefas</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: "#64748b" }}>Concluídas</span>
              <span style={{ fontWeight: 600, color: "#0f766e" }}>{completedTasks} / {totalTasks}</span>
            </div>
            <div className="ch-detail-progress-bar">
              <div className="ch-detail-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
              <span>{progressPercent}% concluído</span>
              <span style={{ color: "#0f766e", fontWeight: 600 }}>{totalHours}h estimadas</span>
            </div>
          </div>

          <div className="ch-detail-card">
            <div className="ch-detail-section-title">Aprovações</div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Status</span><span style={{ color: "#d97706", fontWeight: 600 }}>{article.approvalStatus}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Aprovadas</span><span>{approvedCount} / {totalApprovers}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Última</span><span>{lastApproval?.approvedAt ?? "—"}</span></div>
          </div>

          <div className="ch-detail-card">
            <div className="ch-detail-section-title">Datas</div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Início</span><span>{article.scheduledStart ?? "—"}</span></div>
            <div className="ch-detail-side-row"><span className="ch-detail-side-label">Fim</span><span>{article.scheduledEnd ?? "—"}</span></div>
          </div>

          {(article.relatedTicketNumber || article.relatedProblemNumber) && (
            <div className="ch-detail-card">
              <div className="ch-detail-section-title">Associações</div>
              {article.relatedTicketNumber && (
                <div style={{ marginBottom: 8 }}>
                  <span className="ch-detail-side-label" style={{ fontSize: 11, display: "block", marginBottom: 5 }}>Ticket relacionado</span>
                  <span className="ch-detail-assoc-tag ch-detail-assoc-ticket">🎫 {article.relatedTicketNumber}</span>
                </div>
              )}
              {article.relatedProblemNumber && (
                <div>
                  <span className="ch-detail-side-label" style={{ fontSize: 11, display: "block", marginBottom: 5 }}>Problema relacionado</span>
                  <span className="ch-detail-assoc-tag ch-detail-assoc-problem">⚠ {article.relatedProblemNumber}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeDetail;