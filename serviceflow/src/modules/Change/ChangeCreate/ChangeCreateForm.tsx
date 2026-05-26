import { useEffect, useState } from "react";
import "./ChangeCreateForm.css";
import Button from "../../../components/UI/Button/Button";
import { faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { LucideUserPlus2, TicketIcon, TriangleAlertIcon } from "lucide-react";
import CustomDatePicker from "../../../components/form/CustomDatePicker/CustomDatePicker";
import { useChangeActions } from "../hooks/useChangesActions";
import useTicketActions from "../../Tickets/hooks/useTicketActions";
import TaskCard, { type Task } from "../components/TaskCard/TaskCard";
import type { ChangeFormDTO, ChangeTypeDTO } from "../models/ChangeDTO";
import { toast } from "react-toastify";
import * as changeService from "../service/change-service";

type TabId = "info" | "tarefas" | "aprovadores";
type LevelType = "" | "LOW" | "MEDIUM" | "HIGH";

type Approver = {
    id: number;
    name: string;
    role: string;
    initials: string;
    color: string;
    textColor: string;
};

type AssocTag = {
    id: string;
    value: string;
    type: "ticket" | "problem";
};

const TYPE_BADGE_MAP: Record<string, { cls: string; label: string }> = {
    STANDARD: { cls: "cc-bp-standard", label: "STANDARD" },
    NORMAL: { cls: "cc-bp-normal", label: "NORMAL" },
    MAJOR: { cls: "cc-bp-major", label: "MAJOR" },
    MINOR: { cls: "cc-bp-minor", label: "MINOR" },
    EMERGENCY: { cls: "cc-bp-emergency", label: "EMERGENCY" },
};

function LevelIndicator({ value }: { value: LevelType }) {
    const cls = value ? `cc-level-indicator cc-level-${value.toLowerCase()}` : "cc-level-indicator";
    return (
        <div className={cls}>
            <div className="cc-level-dot" />
            <div className="cc-level-dot" />
            <div className="cc-level-dot" />
        </div>
    );
}

export default function ChangeCreateForm() {
    const [activeTab, setActiveTab] = useState<TabId>("info");

    const {
        approverSearch, setApproverSearch, approverResults,
        ownerSearch, setOwnerSearch, ownerResults, selectedOwner,
        setSelectedOwner,
        changeTypes,           // ← adiciona
        isLoadingChangeTypes,  // ← adiciona
    } = useChangeActions();

    const [ticketSearch, setTicketSearch] = useState<string | null>(null);
    const { data: ticketData, error } = useTicketActions(ticketSearch);
    const [ticketError, setTicketError] = useState("");
    const [changeType, setChangeType] = useState<{ id: number; name: string } | null>(null);
    const [approvers, setApprovers] = useState<Approver[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState("");
    const [affectedServices, setAffectedServices] = useState("");
    const [scheduledStart, setScheduledStart] = useState("");
    const [scheduledEnd, setScheduledEnd] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [implementationPlan, setImplementationPlan] = useState("");
    const [rollbackPlan, setRollbackPlan] = useState("");
    const [riskLevel, setRiskLevel] = useState<LevelType>("");
    const [impactLevel, setImpactLevel] = useState<LevelType>("");
    const [riskJustification, setRiskJustification] = useState("");
    const [impactDescription, setImpactDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [ticketInput, setTicketInput] = useState("");
    const [problemInput, setProblemInput] = useState("");
    const [assocTags, setAssocTags] = useState<AssocTag[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskCounter, setTaskCounter] = useState(0);

    const totalHours = tasks.reduce((sum, t) => sum + (parseFloat(t.estimatedHours) || 0), 0);

    function addTask() {
        const id = taskCounter + 1;
        setTaskCounter(id);
        setTasks((prev) => [...prev, {
            id, title: "", description: "",
            responsible: "", responsibleId: null,
            estimatedHours: "", status: "PENDING"
        }]);
    }

    function removeTask(id: number) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }

    function changeTask(id: number, field: keyof Task, value: string | number | null) {
        setTasks((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
    }

    async function handleAssoc(e: React.KeyboardEvent<HTMLInputElement>, type: "ticket" | "problem") {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const val = type === "ticket" ? ticketInput.trim() : problemInput.trim();
        if (!val) return;
        if (type === "ticket") {
            setTicketSearch(val);
            return;
        }
        setAssocTags((prev) => [...prev, { id: Date.now().toString(), value: val, type }]);
        setProblemInput("");
    }

    function removeAssocTag(id: string) {
        setAssocTags((prev) => prev.filter((t) => t.id !== id));
    }

    function removeApprover(name: string) {
        setApprovers((prev) => prev.filter((a) => a.name !== name));
    }

    useEffect(() => {
        if (!ticketData) return;
        setAssocTags((prev) => [...prev, { id: Date.now().toString(), value: ticketSearch!, type: "ticket" }]);
        setTicketInput("");
        setTicketError("");
        setTicketSearch(null);
    }, [ticketData]);

    useEffect(() => {
        if (!error) return;
        setTicketError("Ticket não encontrado.");
        setTicketSearch(null);
        const timer = setTimeout(() => setTicketError(""), 3000);
        return () => clearTimeout(timer);
    }, [error]);


    // Função de submit
    async function handleSubmit() {
        const payload: ChangeFormDTO = {
            title,
            description,
            reasonChange: reason,
            affectedServices: affectedServices
                ? affectedServices.split(",").map((s) => s.trim()).filter(Boolean)
                : [],
            scheduledStart,
            scheduledEnd,
            prerequisite: prerequisites,
            implementationPlan,
            rollbackPlan,
            riskLevel,
            riskDescription: riskJustification,
            impactLevel,
            impactDescription,
            changeType: changeType?.id ?? null,
            priority,
            changeOwner: String(selectedOwner?.id ?? ""),
            relatedTicketNumber: assocTags.find((t) => t.type === "ticket")?.value ?? null,
            relatedProblemNumber: assocTags.find((t) => t.type === "problem")?.value ?? null,
            tasks: tasks.map((task, index) => ({
                title: task.title,
                description: task.description,
                assignedToUserId: task.responsibleId!,
                estimatedHours: parseFloat(task.estimatedHours) || 0,
                taskOrder: index + 1,
            })),
            changeApprovals: approvers.map((a) => a.id),
        };

        try {
            await changeService.createChange(payload);
            toast.success("Mudança criada com sucesso!");
            // reset ou navigate
        } catch {
            toast.error("Erro ao criar mudança.");
        }
    }

    return (
        <div className="cc-wrapper">

            <div className="cc-topbar">
                <div className="cc-topbar-left">
                    <div className="cc-back-btn">←</div>
                    <div>
                        <div className="cc-page-title">Nova Mudança</div>
                        <div className="cc-page-sub">Preencha os dados para registrar uma nova mudança</div>
                    </div>
                </div>
                <div className="cc-topbar-actions">
                    <Button text="Cancelar" icon={faX} type="button" borderRadius="8px" hoverColor="" className="cc-btn-cancel" />
                    <Button text="Salvar" icon={faSave} background="#0f766e" hoverColor="#0d9488" type="button" borderRadius="8px"
                        onClick={handleSubmit} />
                </div>
            </div>

            <div className="cc-tabs-bar">
                <div className={`cc-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>Informações</div>
                <div className={`cc-tab ${activeTab === "tarefas" ? "active" : ""}`} onClick={() => setActiveTab("tarefas")}>
                    Tarefas <span className="cc-tab-badge">{tasks.length}</span>
                </div>
                <div className={`cc-tab ${activeTab === "aprovadores" ? "active" : ""}`} onClick={() => setActiveTab("aprovadores")}>
                    Aprovadores <span className="cc-tab-badge">{approvers.length}</span>
                </div>
            </div>

            {/* Tab: Informações */}
            <div className={`cc-tab-content ${activeTab === "info" ? "active" : ""}`}>
                <div className="cc-main">

                    <div className="cc-card">
                        <div className="cc-section-title">Identificação</div>
                        <div className="cc-field">
                            <label>Título *</label>
                            <input type="text" placeholder="Descreva brevemente a mudança" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Descrição *</label>
                            <textarea placeholder="Descreva detalhadamente o que será alterado..." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Motivo da mudança *</label>
                            <textarea placeholder="Por que esta mudança é necessária?" style={{ minHeight: 70 }} value={reason} onChange={(e) => setReason(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Serviços afetados</label>
                            <input type="text" placeholder="Ex: Firewall, Rede, VPN, DNS..." value={affectedServices} onChange={(e) => setAffectedServices(e.target.value)} />
                            <div className="cc-hint">Separe por vírgula</div>
                        </div>
                    </div>

                    <div className="cc-card">
                        <div className="cc-section-title">Planejamento</div>
                        <div className="cc-field-row">
                            <div className="cc-field">
                                <label>Início agendado *</label>
                                <CustomDatePicker placeholder="Selecione a data/horario de início" value={scheduledStart} onChange={setScheduledStart} showTime />
                            </div>
                            <div className="cc-field">
                                <label>Fim agendado *</label>
                                <CustomDatePicker placeholder="Selecione a data/horario de finalização" value={scheduledEnd} onChange={setScheduledEnd} showTime />
                            </div>
                        </div>
                        <div className="cc-field">
                            <label>Pré-requisitos</label>
                            <textarea placeholder="O que precisa estar pronto antes de executar?" style={{ minHeight: 75 }} value={prerequisites} onChange={(e) => setPrerequisites(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Plano de implementação *</label>
                            <textarea placeholder="Descreva passo a passo como a mudança será executada..." style={{ minHeight: 110 }} value={implementationPlan} onChange={(e) => setImplementationPlan(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Plano de rollback *</label>
                            <textarea placeholder="O que será feito caso precise reverter?" value={rollbackPlan} onChange={(e) => setRollbackPlan(e.target.value)} />
                        </div>
                    </div>

                    <div className="cc-card">
                        <div className="cc-section-title">Risco & Impacto</div>
                        <div className="cc-field-row">
                            <div className="cc-field">
                                <label>Nível de risco *</label>
                                <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as LevelType)}>
                                    <option value="">Selecione</option>
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                                <LevelIndicator value={riskLevel} />
                            </div>
                            <div className="cc-field">
                                <label>Nível de impacto *</label>
                                <select value={impactLevel} onChange={(e) => setImpactLevel(e.target.value as LevelType)}>
                                    <option value="">Selecione</option>
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                                <LevelIndicator value={impactLevel} />
                            </div>
                        </div>
                        <div className="cc-field" style={{ marginTop: 8 }}>
                            <label>Justificativa do risco</label>
                            <textarea placeholder="Por que este nível de risco?" style={{ minHeight: 80 }} value={riskJustification} onChange={(e) => setRiskJustification(e.target.value)} />
                        </div>
                        <div className="cc-field">
                            <label>Descrição do impacto</label>
                            <textarea placeholder="Quais sistemas, usuários e processos serão impactados?" style={{ minHeight: 80 }} value={impactDescription} onChange={(e) => setImpactDescription(e.target.value)} />
                        </div>
                    </div>

                </div>

                <div className="cc-sidebar">

                    <div className="cc-card">
                        <div className="cc-section-title">Classificação</div>
                        <div className="cc-side-field">
                            <span className="cc-side-label">Tipo *</span>
                            <select
                                className="cc-side-select"
                                value={changeType?.id ?? ""}
                                onChange={(e) => {
                                    const selected = changeTypes.find((t: ChangeTypeDTO) => t.id === Number(e.target.value));
                                    setChangeType(selected ? { id: selected.id, name: selected.name } : null);
                                }}
                                disabled={isLoadingChangeTypes}
                            >
                                <option value="">
                                    {isLoadingChangeTypes ? "Carregando..." : "Selecione"}
                                </option>
                                {changeTypes.map((type: ChangeTypeDTO) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {changeType && TYPE_BADGE_MAP[changeType.name] && (
                                <span className={`cc-badge-preview ${TYPE_BADGE_MAP[changeType.name].cls}`}>
                                    {TYPE_BADGE_MAP[changeType.name].label}
                                </span>
                            )}
                        </div>
                        <div className="cc-divider" />
                        <div className="cc-side-field">
                            <span className="cc-side-label">Prioridade *</span>
                            <select className="cc-side-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Selecione</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                    </div>

                    <div className="cc-card">
                        <div className="cc-section-title">Responsável</div>
                        <div className="cc-side-field" style={{ position: "relative" }}>
                            <span className="cc-side-label">Change Owner</span>
                            <input type="text" className="cc-side-input" placeholder="Buscar usuário..." value={ownerSearch} onChange={(e) => setOwnerSearch(e.target.value)} />
                            {ownerResults.length > 0 && (
                                <div className="cc-dropdown">
                                    {ownerResults.map((user: any) => (
                                        <div key={user.id} className="cc-dropdown-item"
                                            onClick={() => {
                                                setSelectedOwner({ id: user.id, email: user.email });
                                                setOwnerSearch(`${user.firstName} ${user.lastName}`);
                                            }}>
                                            <span>{user.firstName} {user.lastName}</span>
                                            <span className="cc-dropdown-email">{user.email}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="cc-card">
                        <div className="cc-section-title">Status inicial</div>
                        <div className="cc-side-field">
                            <span className="cc-side-label">Status</span>
                            <select className="cc-side-select" disabled><option>REQUESTED</option></select>
                        </div>
                        <div className="cc-side-field">
                            <span className="cc-side-label">Estágio</span>
                            <select className="cc-side-select" disabled><option>SUBMISSION</option></select>
                        </div>
                        <div className="cc-hint">Definidos automaticamente ao criar</div>
                    </div>

                    <div className="cc-card">
                        <div className="cc-section-title">Associações</div>
                        <div className="cc-side-field">
                            <span className="cc-side-label">Ticket relacionado</span>
                            <div className="cc-assoc-input-wrap">
                                <span className="cc-assoc-icon"><TicketIcon size={16} color="#0ea5e9" /></span>
                                <input
                                    type="text"
                                    placeholder="Ex: TKT-000033"
                                    value={ticketInput}
                                    onChange={(e) => { setTicketInput(e.target.value); setTicketError(""); }}
                                    onKeyDown={(e) => handleAssoc(e, "ticket")}
                                />
                            </div>
                            {ticketError && <span style={{ color: "#dc2626", fontSize: 11 }}>{ticketError}</span>}
                            <div className="cc-assoc-tags">
                                {assocTags.filter((t) => t.type === "ticket").map((tag) => (
                                    <span key={tag.id} className="cc-assoc-tag cc-assoc-ticket">
                                        {tag.value}
                                        <button onClick={() => removeAssocTag(tag.id)}>×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="cc-hint">Pressione Enter para adicionar</div>
                        </div>
                        <div className="cc-divider" />
                        <div className="cc-side-field">
                            <span className="cc-side-label">Problema relacionado</span>
                            <div className="cc-assoc-input-wrap">
                                <span className="cc-assoc-icon"><TriangleAlertIcon color="#d97706" size={16} /></span>
                                <input
                                    type="text"
                                    placeholder="Ex: PRB-000001"
                                    value={problemInput}
                                    onChange={(e) => setProblemInput(e.target.value)}
                                    onKeyDown={(e) => handleAssoc(e, "problem")}
                                />
                            </div>
                            <div className="cc-assoc-tags">
                                {assocTags.filter((t) => t.type === "problem").map((tag) => (
                                    <span key={tag.id} className="cc-assoc-tag cc-assoc-problem">
                                        {tag.value}
                                        <button onClick={() => removeAssocTag(tag.id)}>×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="cc-hint">Pressione Enter para adicionar</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Tab: Tarefas */}
            <div className={`cc-tab-content ${activeTab === "tarefas" ? "active" : ""}`}>
                <div className="cc-tasks-wrapper">
                    {tasks.map((task, index) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            index={index}
                            onRemove={removeTask}
                            onChange={changeTask}
                        />
                    ))}
                    <Button text="Adicionar Tarefa" icon={faSave} type="button" borderRadius="8px" className="cc-btn cc-btn-ghost" onClick={addTask} />
                </div>
                <div className="cc-sidebar">
                    <div className="cc-card">
                        <div className="cc-section-title">Sobre as tarefas</div>
                        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                            Adicione as tarefas necessárias para executar a mudança. Defina o responsável e as horas estimadas para cada uma.
                        </p>
                        <div className="cc-divider" />
                        <div className="cc-summary-row">
                            <span className="cc-summary-label">Total de tarefas</span>
                            <span className="cc-summary-value">{tasks.length}</span>
                        </div>
                        <div className="cc-summary-row">
                            <span className="cc-summary-label">Horas estimadas</span>
                            <span className="cc-summary-value">{totalHours}h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab: Aprovadores */}
            <div className={`cc-tab-content ${activeTab === "aprovadores" ? "active" : ""}`}>
                <div style={{ flex: 1 }}>
                    <div className="cc-card">
                        <div className="cc-section-title">Adicionar aprovadores</div>
                        <div className="cc-approver-search-wrap" style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Buscar por nome ou e-mail..."
                                value={approverSearch}
                                onChange={(e) => setApproverSearch(e.target.value)}
                            />
                            {approverResults.length > 0 && (
                                <div className="cc-dropdown">
                                    {approverResults.map((user: any) => (
                                        <div key={user.id} className="cc-dropdown-item"
                                            onClick={() => {
                                                if (approvers.find((a) => a.name === user.email)) return;
                                                setApprovers((prev) => [...prev, {
                                                    id: user.id,    // ← adiciona
                                                    name: user.email,
                                                    role: `${user.firstName} ${user.lastName}`,
                                                    initials: (user.firstName[0] + user.lastName[0]).toUpperCase(),
                                                    color: "#e0f2fe",
                                                    textColor: "#075985",
                                                }]);
                                                setApproverSearch("");
                                            }}>
                                            <span>{user.firstName} {user.lastName}</span>
                                            <span className="cc-dropdown-email">{user.email}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="cc-hint" style={{ marginBottom: 16 }}>
                            Digite o nome ou e-mail para buscar. Todos os aprovadores precisam aprovar para a mudança avançar.
                        </div>
                        {approvers.length === 0 ? (
                            <div className="cc-empty-state">
                                <div className="cc-empty-icon"><LucideUserPlus2 size={32} /></div>
                                <div>Nenhum aprovador adicionado</div>
                                <div style={{ marginTop: 4, fontSize: 11 }}>Busque e adicione os responsáveis pela aprovação</div>
                            </div>
                        ) : (
                            approvers.map((approver) => (
                                <div key={approver.name} className="cc-approver-item">
                                    <div className="cc-avatar" style={{ background: approver.color, color: approver.textColor }}>
                                        {approver.initials}
                                    </div>
                                    <div className="cc-approver-info">
                                        <div className="cc-approver-name">{approver.role}</div>
                                        <div className="cc-approver-role">{approver.name}</div>
                                    </div>
                                    <button className="cc-approver-remove" onClick={() => removeApprover(approver.name)}>×</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="cc-sidebar">
                    <div className="cc-card">
                        <div className="cc-section-title">Sobre aprovações</div>
                        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                            Todos os aprovadores adicionados receberão notificação para aprovar ou rejeitar a mudança.
                        </p>
                        <div className="cc-divider" />
                        <div className="cc-summary-row">
                            <span className="cc-summary-label">Aprovadores</span>
                            <span className="cc-summary-value">{approvers.length}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}