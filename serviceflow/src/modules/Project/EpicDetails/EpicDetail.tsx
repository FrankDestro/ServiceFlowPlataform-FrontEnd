import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faClose, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { getPriorityClass, getStatusBadgeClass } from "../../../utils/helpers/functions";
import useEpicDetail from "../hooks/useEpicDetails";
import { useTasks, useEpicHistory } from "../hooks/useEpicTabs";
import "./EpicDetail.css";
import type { TaskSimpleDTO } from "../models/TaskDTO";
import { Eye } from "lucide-react";
import TaskDetails from "../TaskDetails/TaskDetails";
import Modal from "../../../components/UI/ModalDefault/Modal";

type Props = {
    id: number;
};

type Tab = "detalhes" | "tasks" | "historico";

function EpicDetail({ id }: Props) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("detalhes");
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const { data: epic, isLoading, error } = useEpicDetail(id);
    const { data: tasks = [] } = useTasks(id, activeTab === "tasks");
    const { data: history = [] } = useEpicHistory(id, activeTab === "historico");

    if (isLoading) return <p>Carregando...</p>;
    if (error || !epic) return <p>Erro ao carregar</p>;

    const isReadOnly = epic.status === "DONE" || epic.status === "CANCELLED";
    const canStart = epic.status === "BACKLOG";
    const canComplete = epic.status === "IN_PROGRESS";

    const completedTasks = tasks.filter((t: TaskSimpleDTO) => t.status === "DONE").length;
    const totalTasks = tasks.length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    function openNewTaskModal() {
        setSelectedTaskId(null);
        // setIsViewModalOpen(true);
    }

    function openExistingTaskModal(taskId: number) {
        console.log("fui chamado")
        setSelectedTaskId(taskId);

        console.log(selectedTaskId)

        setIsViewModalOpen(true);
    }

    return (
        <div>
            {/* Topbar */}
            <div className="ep-detail-topbar">
                <div className="ep-detail-topbar-left">
                    <div className="ep-detail-back-btn" onClick={() => navigate("/epicos")}>←</div>
                    <div>
                        <div className="ep-detail-topbar-meta">
                            <span className="ep-detail-epic-number">{epic.epicNumber}</span>
                            <span className={getStatusBadgeClass(epic.status)}>{epic.status}</span>
                            <span style={{ fontSize: 12, color: "#64748b" }}>
                                Prioridade: <span className={getPriorityClass(epic.priority)}>{epic.priority}</span>
                            </span>
                            <span style={{ fontSize: 12, color: "#64748b" }}>
                                Projeto: <span style={{ fontWeight: 600, color: "#0f172a" }}>{epic.project.projectNumber}</span>
                            </span>
                        </div>
                        <div className="ep-detail-epic-title">{epic.title}</div>
                    </div>
                </div>
                <div className="ep-detail-topbar-actions">
                    <Button text="Iniciar" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canStart} className="ep-btn-start" />
                    <Button text="Concluir" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canComplete} className="ep-btn-complete" />
                    <Button text="Cancelar" icon={faX} type="button" borderRadius="8px" hoverColor="" disabled={isReadOnly} className="ep-btn-cancel" />
                </div>
            </div>

            {/* Content */}
            <div className="ep-detail-content">
                <div className="ep-detail-main">
                    <div className="ep-detail-tabs-wrapper">
                        <div className="ep-detail-tabs">
                            {(["detalhes", "tasks", "historico"] as Tab[]).map((tab) => (
                                <div
                                    key={tab}
                                    className={`ep-detail-tab ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "detalhes" && "Detalhes"}
                                    {tab === "tasks" && (
                                        <>Tasks {totalTasks > 0 && <span className="ep-detail-tab-badge">{totalTasks}</span>}</>
                                    )}
                                    {tab === "historico" && "Histórico"}
                                </div>
                            ))}
                        </div>

                        {/* Aba Detalhes */}
                        {activeTab === "detalhes" && (
                            <div className="ep-detail-tab-content">
                                <div className="ep-detail-section-title">Informações gerais</div>
                                <div className="ep-detail-info-grid">
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Projeto</span><span className="ep-detail-info-value">{epic.project.projectNumber}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Nome projeto</span><span className="ep-detail-info-value">{epic.project.name}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Criado por</span><span className="ep-detail-info-value">{epic.createdBy ?? "—"}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">e-mail</span><span className="ep-detail-info-value">{epic.createdByEmail ?? "—"}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Criado em</span><span className="ep-detail-info-value">{epic.createdAt ?? "—"}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Início planejado</span><span className="ep-detail-info-value">{epic.startDate ?? "—"}</span></div>
                                    <div className="ep-detail-info-row"><span className="ep-detail-info-label">Prazo</span><span className="ep-detail-info-value">{epic.dueDate ?? "—"}</span></div>
                                </div>

                                <div className="ep-detail-text-section">
                                    <div className="ep-detail-section-title">Descrição</div>
                                    <div className="ep-detail-text-block">{epic.description}</div>
                                </div>
                            </div>
                        )}

                        {/* Aba Tasks */}
                        {activeTab === "tasks" && (
                            <div className="ep-detail-tab-content">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <div className="ep-detail-section-title" style={{ marginBottom: 0 }}>
                                        Tasks <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{tasks.length} task(s)</span>
                                    </div>
                                    <button className="ep-detail-btn ep-detail-btn-primary ep-detail-btn-sm" onClick={openNewTaskModal}>
                                        + Nova task
                                    </button>
                                </div>

                                <div className="ep-container-task-table">
                                    <div className="ep-detail-task-header">
                                        <span>Nº</span>
                                        <span>Título</span>
                                        <span>Status</span>
                                        <span>Prioridade</span>
                                        <span>Responsável</span>
                                        <span>Detalhes</span>
                                    </div>

                                    {tasks.map((t: TaskSimpleDTO) => (
                                        <div key={t.id} className="ep-detail-task-row">
                                            <span className="ep-detail-task-number">{t.taskNumber}</span>
                                            <span className="ep-detail-task-title">{t.title}</span>
                                            <span className={getStatusBadgeClass(t.status)} style={{ fontSize: 10 }}>{t.status}</span>
                                            <span className={getPriorityClass(t.priority)}>{t.priority}</span>
                                            <span className="ep-detail-task-assignee">{t.assignedTo ?? "—"}</span>
                                            <div className="ep-detail-task-view-btn" onClick={() => openExistingTaskModal(t.id)}>
                                                <Eye size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Aba Histórico */}
                        {activeTab === "historico" && (
                            <div className="ep-detail-tab-content">
                                <div className="ep-detail-section-title">Histórico</div>
                                {history.map((item: any) => (
                                    <div key={item.id} className="ep-detail-history-item">
                                        <div className="ep-detail-history-dot"></div>
                                        <div className="ep-detail-history-text">{item.description}</div>
                                        <div className="ep-detail-history-date">{item.createdAt ?? "—"}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="ep-detail-sidebar">
                    <div className="ep-detail-card">
                        <div className="ep-detail-section-title">Propriedades</div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">ID</span><span style={{ fontWeight: 700, color: "#0C447C" }}>{epic.epicNumber}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Status</span><span className={getStatusBadgeClass(epic.status)} style={{ fontSize: 10 }}>{epic.status}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Prioridade</span><span className={getPriorityClass(epic.priority)}>{epic.priority}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Projeto</span><span style={{ fontWeight: 500 }}>{epic.projectNumber}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Criado por</span><span style={{ wordBreak: "break-word", maxWidth: "60%" }}>{epic.createdBy ?? "—"}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Criado em</span><span>{epic.createdAt ?? "—"}</span></div>
                    </div>

                    <div className="ep-detail-card">
                        <div className="ep-detail-section-title">Progresso das tasks</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                            <span style={{ color: "#64748b" }}>Concluídas</span>
                            <span style={{ fontWeight: 600, color: "#0C447C" }}>{completedTasks} / {totalTasks}</span>
                        </div>
                        <div className="ep-detail-progress-bar">
                            <div className="ep-detail-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
                            <span>{progressPercent}% concluído</span>
                        </div>
                    </div>

                    <div className="ep-detail-card">
                        <div className="ep-detail-section-title">Datas</div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Início planejado</span><span>{epic.startDate ?? "—"}</span></div>
                        <div className="ep-detail-side-row"><span className="ep-detail-side-label">Prazo</span><span>{epic.dueDate ?? "—"}</span></div>
                    </div>

                    <div className="ep-detail-card">
                        <div className="ep-detail-section-title">Ações</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <Button text="Editar" icon={faPen} type="button" borderRadius="8px" background="#185FA5" hoverColor="#0C447C" onClick={() => navigate(`/epicos/${id}/edit`)} disabled={isReadOnly} />
                            <Button text="Cancelar épico" icon={faX} type="button" borderRadius="8px" hoverColor="" className="ep-btn-cancel" disabled={isReadOnly} />
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
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                    }} />
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

export default EpicDetail;