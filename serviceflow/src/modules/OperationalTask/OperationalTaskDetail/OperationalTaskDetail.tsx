// OperationalTaskDetail.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import { getPriorityClass, getStatusBadgeClass } from "../../../utils/helpers/functions";
import useOperationalTaskDetail from "../hooks/useOperationalTaskDetail";
import { useOperationalTaskChecklist, useOperationalTaskHistory, useOperationalTaskAttachments } from "../hooks/useOperationalTaskTabs";
import "./OperationalTaskDetail.css";

type Props = {
    id: number;
};

type Tab = "detalhes" | "checklist" | "relacionados" | "anexos" | "historico";

function OperationalTaskDetail({ id }: Props) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("detalhes");

    const { data: task, isLoading, error } = useOperationalTaskDetail(id);
    const { data: checklist = [] } = useOperationalTaskChecklist(id, activeTab === "checklist");
    const { data: history = [] } = useOperationalTaskHistory(id, activeTab === "historico");
    const { data: attachments = [] } = useOperationalTaskAttachments(id, activeTab === "anexos");

    if (isLoading) return <p>Carregando...</p>;
    if (error || !task) return <p>Erro ao carregar</p>;

    const isReadOnly = task.status === "COMPLETED" || task.status === "CANCELLED";
    const canStart = task.status === "OPEN";
    const canComplete = task.status === "IN_PROGRESS";

    const completedItems = checklist.filter((c: any) => c.completed).length;
    const totalItems = checklist.length;
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return (
        <div>
            {/* Topbar */}
            <div className="ot-detail-topbar">
                <div className="ot-detail-topbar-left">
                    <div className="ot-detail-back-btn" onClick={() => navigate("/operational-tasks")}>←</div>
                    <div>
                        <div className="ot-detail-topbar-meta">
                            <span className="ot-detail-task-number">{task.taskNumber}</span>
                            <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
                            <span style={{ fontSize: 12, color: "#64748b" }}>
                                Prioridade: <span className={getPriorityClass(task.priority)}>{task.priority}</span>
                            </span>
                            <span style={{ fontSize: 12, color: "#64748b" }}>
                                Tipo: <span style={{ fontWeight: 600, color: "#0f172a" }}>{task.type}</span>
                            </span>
                        </div>
                        <div className="ot-detail-task-title">{task.title}</div>
                    </div>
                </div>
                <div className="ot-detail-topbar-actions">
                    <Button text="Iniciar" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canStart} className="ot-btn-start" />
                    <Button text="Concluir" icon={faCheck} type="button" borderRadius="8px" hoverColor="" disabled={!canComplete} className="ot-btn-complete" />
                    <Button text="Cancelar" icon={faX} type="button" borderRadius="8px" hoverColor="" disabled={isReadOnly} className="ot-btn-cancel" />
                </div>
            </div>

            {/* Recorrência banner */}
            {task.recurrence && (
                <div className="ot-detail-recurrence-banner">
                    🔁 Tarefa recorrente — {task.recurrence}
                </div>
            )}

            {/* Content */}
            <div className="ot-detail-content">
                <div className="ot-detail-main">
                    <div className="ot-detail-tabs-wrapper">
                        <div className="ot-detail-tabs">
                            {(["detalhes", "checklist", "relacionados", "anexos", "historico"] as Tab[]).map((tab) => (
                                <div
                                    key={tab}
                                    className={`ot-detail-tab ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "detalhes" && "Detalhes"}
                                    {tab === "checklist" && (
                                        <>Checklist {totalItems > 0 && <span className="ot-detail-tab-badge">{totalItems}</span>}</>
                                    )}
                                    {tab === "relacionados" && (
                                        <>Itens relacionados {(task.relatedItems.tickets.length + task.relatedItems.changes.length + task.relatedItems.problems.length) > 0 && (
                                            <span className="ot-detail-tab-badge">
                                                {task.relatedItems.tickets.length + task.relatedItems.changes.length + task.relatedItems.problems.length}
                                            </span>
                                        )}</>
                                    )}
                                    {tab === "anexos" && (
                                        <>Anexos {attachments.length > 0 && <span className="ot-detail-tab-badge">{attachments.length}</span>}</>
                                    )}
                                    {tab === "historico" && "Histórico"}
                                </div>
                            ))}
                        </div>

                        {/* Aba Detalhes */}
                        {activeTab === "detalhes" && (
                            <div className="ot-detail-tab-content">
                                <div className="ot-detail-section-title">Informações gerais</div>
                                <div className="ot-detail-info-grid">
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Categoria</span><span className="ot-detail-info-value">{task.category ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Subcategoria</span><span className="ot-detail-info-value">{task.subcategory ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Responsável</span><span className="ot-detail-info-value">{task.assignedTo ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Criado por</span><span className="ot-detail-info-value">{task.createBy ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Criado em</span><span className="ot-detail-info-value">{task.createdAt ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Horas estimadas</span><span className="ot-detail-info-value">{task.estimatedHours ? `${task.estimatedHours}h` : "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Início agendado</span><span className="ot-detail-info-value">{task.scheduledStart ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Prazo</span><span className="ot-detail-info-value">{task.scheduledEnd ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Início real</span><span className="ot-detail-info-value">{task.actualStart ?? "—"}</span></div>
                                    <div className="ot-detail-info-row"><span className="ot-detail-info-label">Conclusão real</span><span className="ot-detail-info-value">{task.actualEnd ?? "—"}</span></div>
                                </div>

                                <div className="ot-detail-text-section">
                                    <div className="ot-detail-section-title">Descrição</div>
                                    <div className="ot-detail-text-block">{task.description}</div>
                                </div>

                                {task.completionNotes && (
                                    <div className="ot-detail-text-section">
                                        <div className="ot-detail-section-title">Notas de conclusão</div>
                                        <div className="ot-detail-text-block">{task.completionNotes}</div>
                                    </div>
                                )}

                                {task.cancellationReason && (
                                    <div className="ot-detail-text-section">
                                        <div className="ot-detail-section-title">Motivo do cancelamento</div>
                                        <div className="ot-detail-text-block" style={{ color: "#dc2626" }}>{task.cancellationReason}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Aba Checklist */}
                        {activeTab === "checklist" && (
                            <div className="ot-detail-tab-content">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <div className="ot-detail-section-title" style={{ marginBottom: 0 }}>
                                        Checklist <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 11 }}>{completedItems} / {totalItems} concluídos</span>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="ot-detail-progress-bar" style={{ marginBottom: 16 }}>
                                    <div className="ot-detail-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                                </div>

                                {checklist.map((item: any) => (
                                    <div key={item.id} className="ot-detail-checklist-item">
                                        <div className={`ot-detail-check-box ${item.completed ? "done" : ""}`}>
                                            {item.completed && "✓"}
                                        </div>
                                        <span className={`ot-detail-check-label ${item.completed ? "done" : ""}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Aba Relacionados */}
                        {activeTab === "relacionados" && (
                            <div className="ot-detail-tab-content">
                                {task.relatedItems.tickets.length > 0 && (
                                    <>
                                        <div className="ot-detail-section-title">Tickets vinculados</div>
                                        <div className="ot-detail-assoc-chips">
                                            {task.relatedItems.tickets.map((t: any) => (
                                                <span key={t.id} className="ot-detail-assoc-tag ot-detail-assoc-ticket">🎫 {t.number}</span>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {task.relatedItems.changes.length > 0 && (
                                    <>
                                        <div className="ot-detail-section-title" style={{ marginTop: 16 }}>Mudanças associadas</div>
                                        <div className="ot-detail-assoc-chips">
                                            {task.relatedItems.changes.map((c: any) => (
                                                <span key={c.id} className="ot-detail-assoc-tag ot-detail-assoc-change">🔄 {c.number}</span>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {task.relatedItems.problems.length > 0 && (
                                    <>
                                        <div className="ot-detail-section-title" style={{ marginTop: 16 }}>Problemas relacionados</div>
                                        <div className="ot-detail-assoc-chips">
                                            {task.relatedItems.problems.map((p: any) => (
                                                <span key={p.id} className="ot-detail-assoc-tag ot-detail-assoc-problem">⚠ {p.number}</span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Aba Anexos */}
                        {activeTab === "anexos" && (
                            <div className="ot-detail-tab-content">
                                <div className="ot-detail-section-title">Anexos</div>
                                {attachments.map((att: any) => (
                                    <div key={att.id} className="ot-detail-att-item">
                                        <div className="ot-detail-att-icon">📄</div>
                                        <div className="ot-detail-att-info">
                                            <div className="ot-detail-att-name">{att.fileName}</div>
                                            <div className="ot-detail-att-meta">{att.fileSize} · {att.createdAt}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Aba Histórico */}
                        {activeTab === "historico" && (
                            <div className="ot-detail-tab-content">
                                <div className="ot-detail-section-title">Histórico</div>
                                {history.map((item: any) => (
                                    <div key={item.id} className="ot-detail-history-item">
                                        <div className="ot-detail-history-dot"></div>
                                        <div className="ot-detail-history-text">{item.description}</div>
                                        <div className="ot-detail-history-date">{item.createdAt ?? "—"}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="ot-detail-sidebar">
                    <div className="ot-detail-card">
                        <div className="ot-detail-section-title">Propriedades</div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">ID</span><span style={{ fontWeight: 700, color: "#0f766e" }}>{task.taskNumber}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Status</span><span className={getStatusBadgeClass(task.status)} style={{ fontSize: 10 }}>{task.status}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Prioridade</span><span className={getPriorityClass(task.priority)}>{task.priority}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Tipo</span><span style={{ fontWeight: 500 }}>{task.type}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Categoria</span><span>{task.category ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Responsável</span><span style={{ wordBreak: "break-word", maxWidth: "60%" }}>{task.assignedTo ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Criado em</span><span>{task.createdAt ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Prazo</span><span>{task.scheduledEnd ?? "—"}</span></div>
                    </div>

                    <div className="ot-detail-card">
                        <div className="ot-detail-section-title">Progresso do checklist</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                            <span style={{ color: "#64748b" }}>Concluídos</span>
                            <span style={{ fontWeight: 600, color: "#0f766e" }}>{completedItems} / {totalItems}</span>
                        </div>
                        <div className="ot-detail-progress-bar">
                            <div className="ot-detail-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
                            <span>{progressPercent}% concluído</span>
                            {task.estimatedHours && <span style={{ color: "#0f766e", fontWeight: 600 }}>{task.estimatedHours}h estimadas</span>}
                        </div>
                    </div>

                    <div className="ot-detail-card">
                        <div className="ot-detail-section-title">Datas</div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Início agendado</span><span>{task.scheduledStart ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Prazo</span><span>{task.scheduledEnd ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Início real</span><span>{task.actualStart ?? "—"}</span></div>
                        <div className="ot-detail-side-row"><span className="ot-detail-side-label">Conclusão real</span><span>{task.actualEnd ?? "—"}</span></div>
                    </div>

                    <div className="ot-detail-card">
                        <div className="ot-detail-section-title">Ações</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <Button text="Editar" icon={faPen} type="button" borderRadius="8px" background="#0f766e" hoverColor="#0d9488" onClick={() => navigate(`/operational-tasks/${id}/edit`)} disabled={isReadOnly} />
                            <Button text="Cancelar tarefa" icon={faX} type="button" borderRadius="8px" hoverColor="" className="ot-btn-cancel" disabled={isReadOnly} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperationalTaskDetail;