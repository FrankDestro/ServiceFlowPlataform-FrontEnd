// SprintDetail.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faClose, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { getStatusBadgeClass } from "../../../utils/helpers/functions";
import useSprintDetail from "../hooks/useSprintDetail";
import { useSprintTasks, useSprintHistory } from "../hooks/useSprintTabs";
import "./SprintDetail.css";
import type { TaskSimpleDTO } from "../models/TaskDTO";
import { getPriorityClass } from "../../../utils/helpers/functions";
import { Eye } from "lucide-react";
import TaskDetails from "../TaskDetails/TaskDetails";
import Modal from "../../../components/UI/ModalDefault/Modal";

type Props = {
    id: number;
};

type Tab = "detalhes" | "tasks" | "historico";

function SprintDetail({ id }: Props) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("detalhes");
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const { data: sprint, isLoading, error } = useSprintDetail(id);
    const { data: tasks = [] } = useSprintTasks(id, activeTab === "tasks");
    const { data: history = [] } = useSprintHistory(id, activeTab === "historico");

    if (isLoading) return <p>Carregando...</p>;
    if (error || !sprint) return <p>Erro ao carregar</p>;

    const isReadOnly = sprint.status === "COMPLETED" || sprint.status === "CANCELLED";
    const canStart = sprint.status === "PLANNED";
    const canComplete = sprint.status === "ACTIVE";

    const completedTasks = tasks.filter((t: TaskSimpleDTO) => t.status === "DONE").length;
    const totalTasks = tasks.length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    function openExistingTaskModal(taskId: number) {
        setSelectedTaskId(taskId);
        setIsViewModalOpen(true);
    }

    return (
        <div>
            {/* Topbar */}
            <div className="sp-detail-topbar">
                <div className="sp-detail-topbar-left">
                    <div className="sp-detail-back-btn" onClick={() => navigate("/sprints")}>←</div>
                    <div>
                        <div className="sp-detail-topbar-meta">
                            <span className={getStatusBadgeClass(sprint.status)}>{sprint.status}</span>
                            <span style={{ fontSize: 12, color: "#64748b" }}>
                                Projeto: <span style={{ fontWeight: 600, color: "#0f172a" }}>{sprint.project.projectNumber}</span>
                            </span>
                        </div>
                        <div className="sp-detail-sprint-title">{sprint.name}</div>
                    </div>
                </div>
                <div className="sp-detail-topbar-actions">
                    <Button text="Iniciar" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canStart} className="sp-btn-start" />
                    <Button text="Concluir" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canComplete} className="sp-btn-complete" />
                    <Button text="Cancelar" icon={faX} type="button" borderRadius="8px" hoverColor="" disabled={isReadOnly} className="sp-btn-cancel" />
                </div>
            </div>

            {/* Content */}
            <div className="sp-detail-content">
                <div className="sp-detail-main">
                    <div className="sp-detail-tabs-wrapper">
                        <div className="sp-detail-tabs">
                            {(["detalhes", "tasks", "historico"] as Tab[]).map((tab) => (
                                <div
                                    key={tab}
                                    className={`sp-detail-tab ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "detalhes" && "Detalhes"}
                                    {tab === "tasks" && (
                                        <>Tasks {totalTasks > 0 && <span className="sp-detail-tab-badge">{totalTasks}</span>}</>
                                    )}
                                    {tab === "historico" && "Histórico"}
                                </div>
                            ))}
                        </div>

                        {/* Aba Detalhes */}
                        {activeTab === "detalhes" && (
                            <div className="sp-detail-tab-content">
                                <div className="sp-detail-section-title">Informações gerais</div>
                                <div className="sp-detail-info-grid">
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Projeto</span><span className="sp-detail-info-value">{sprint.project.projectNumber}</span></div>
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Nome projeto</span><span className="sp-detail-info-value">{sprint.project.name}</span></div>
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Criado por</span><span className="sp-detail-info-value">{sprint.createdBy ?? "—"}</span></div>
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Criado em</span><span className="sp-detail-info-value">{sprint.createdAt ?? "—"}</span></div>
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Início</span><span className="sp-detail-info-value">{sprint.startDate ?? "—"}</span></div>
                                    <div className="sp-detail-info-row"><span className="sp-detail-info-label">Fim</span><span className="sp-detail-info-value">{sprint.endDate ?? "—"}</span></div>
                                </div>

                                {sprint.goal && (
                                    <div className="sp-detail-text-section">
                                        <div className="sp-detail-section-title">Objetivo</div>
                                        <div className="sp-detail-text-block">{sprint.goal}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Aba Tasks */}
                        {activeTab === "tasks" && (
                            <div className="sp-detail-tab-content">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <div className="sp-detail-section-title" style={{ marginBottom: 0 }}>
                                        Tasks <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{tasks.length} task(s)</span>
                                    </div>
                                </div>

                                <div className="sp-container-task-table">
                                    <div className="sp-detail-task-header">
                                        <span>Nº</span>
                                        <span>Título</span>
                                        <span>Status</span>
                                        <span>Prioridade</span>
                                        <span>Responsável</span>
                                        <span>Detalhes</span>
                                    </div>

                                    {tasks.map((t: TaskSimpleDTO) => (
                                        <div key={t.id} className="sp-detail-task-row">
                                            <span className="sp-detail-task-number">{t.taskNumber}</span>
                                            <span className="sp-detail-task-title">{t.title}</span>
                                            <span className={getStatusBadgeClass(t.status)} style={{ fontSize: 10 }}>{t.status}</span>
                                            <span className={getPriorityClass(t.priority)}>{t.priority}</span>
                                            <span className="sp-detail-task-assignee">{t.assignedTo ?? "—"}</span>
                                            <div className="sp-detail-task-view-btn" onClick={() => openExistingTaskModal(t.id)}>
                                                <Eye size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Aba Histórico */}
                        {activeTab === "historico" && (
                            <div className="sp-detail-tab-content">
                                <div className="sp-detail-section-title">Histórico</div>
                                {history.map((item: any) => (
                                    <div key={item.id} className="sp-detail-history-item">
                                        <div className="sp-detail-history-dot"></div>
                                        <div className="sp-detail-history-text">{item.description}</div>
                                        <div className="sp-detail-history-date">{item.createdAt ?? "—"}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sp-detail-sidebar">
                    <div className="sp-detail-card">
                        <div className="sp-detail-section-title">Propriedades</div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Status</span><span className={getStatusBadgeClass(sprint.status)} style={{ fontSize: 10 }}>{sprint.status}</span></div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Projeto</span><span style={{ fontWeight: 500 }}>{sprint.project.projectNumber}</span></div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Criado por</span><span style={{ wordBreak: "break-word", maxWidth: "60%" }}>{sprint.createdBy ?? "—"}</span></div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Criado em</span><span>{sprint.createdAt ?? "—"}</span></div>
                    </div>

                    <div className="sp-detail-card">
                        <div className="sp-detail-section-title">Progresso das tasks</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                            <span style={{ color: "#64748b" }}>Concluídas</span>
                            <span style={{ fontWeight: 600, color: "#0C447C" }}>{completedTasks} / {totalTasks}</span>
                        </div>
                        <div className="sp-detail-progress-bar">
                            <div className="sp-detail-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
                            <span>{progressPercent}% concluído</span>
                        </div>
                    </div>

                    <div className="sp-detail-card">
                        <div className="sp-detail-section-title">Datas</div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Início</span><span>{sprint.startDate ?? "—"}</span></div>
                        <div className="sp-detail-side-row"><span className="sp-detail-side-label">Fim</span><span>{sprint.endDate ?? "—"}</span></div>
                    </div>

                    <div className="sp-detail-card">
                        <div className="sp-detail-section-title">Ações</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <Button text="Editar" icon={faPen} type="button" borderRadius="8px" background="#185FA5" hoverColor="#0C447C" onClick={() => navigate(`/sprints/${id}/edit`)} disabled={isReadOnly} />
                            <Button text="Cancelar sprint" icon={faX} type="button" borderRadius="8px" hoverColor="" className="sp-btn-cancel" disabled={isReadOnly} />
                        </div>
                    </div>
                </div>
            </div>

            {isViewModalOpen && (
                <Modal
                    title="Detalhes da task"
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedTaskId(null);
                    }}
                    width="1200px"
                    footer={
                        <>
                            <div className="tsk-modal-footer">
                                <div className="tsk-modal-footer-actions">
                                    <Button text="Iniciar" icon={faCheck} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-start" />
                                    <Button text="Concluir" icon={faCheck} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-complete" />
                                    <Button text="Cancelar task" icon={faX} type="button" borderRadius="8px" hoverColor="" className="tsk-btn-cancel" />
                                </div>
                                <Button
                                    text="Fechar"
                                    icon={faClose}
                                    background="#fee2e2"
                                    hoverColor="#fecaca"
                                    color="#dc2626"
                                    type="button"
                                    borderRadius="5px"
                                    onClick={() => setIsViewModalOpen(false)}
                                />
                            </div>
                        </>
                    }
                >
                    <div className="modal-scroll-content">
                        <TaskDetails id={selectedTaskId} />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default SprintDetail;