import { getPriorityClass, getStatusTaskBadgeClass } from "../../../utils/helpers/functions";
import userTaskDetails from "../hooks/userTaskDetails";
import "./TaskDetails.css";

type Props = {
    id: number;
};

function TaskDetails({ id }: Props) {
    const { data: task, isLoading, error } = userTaskDetails(id);

    if (isLoading) return <p>Carregando...</p>;
    if (error || !task) return <p>Erro ao carregar</p>;

    return (
        <>
            <div className="tsk-modal-topline">
                <span className="tsk-modal-number">{task.taskNumber}</span>
                <span className={getStatusTaskBadgeClass(task.status)}>{task.status}</span>
                <span className={getPriorityClass(task.priority)}>{task.priority}</span>
            </div>

            <div className="tsk-modal-title">{task.title}</div>

            <div className="tsk-modal-section">
                <div className="tsk-modal-section-label">Informações</div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Projeto</span><span className="tsk-modal-v">{task.project.projectNumber} — {task.project.name}</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Épico</span><span className="tsk-modal-v">{task.epic ? `${task.epic.epicNumber} — ${task.epic.title}` : "—"}</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Sprint</span><span className="tsk-modal-v">Backlog</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Responsável</span><span className="tsk-modal-v">{task.assignedTo ?? "Não atribuído"}</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Horas estimadas</span><span className="tsk-modal-v">{task.estimatedHours ? `${task.estimatedHours}h` : "—"}</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Criado por</span><span className="tsk-modal-v">{task.createdBy}</span></div>
                <div className="tsk-modal-row"><span className="tsk-modal-k">Criado em</span><span className="tsk-modal-v">{task.createdAt}</span></div>
                <div className="tsk-modal-row "><span className="tsk-modal-k">Prazo</span><span className="tsk-modal-v dueDate-est">{task.dueDate ?? "—"}</span></div>
            </div>

            <div className="tsk-modal-section">
                <div className="tsk-modal-section-label">Descrição</div>
                <div className="tsk-modal-content-block">{task.description}</div>
            </div>
        </>
    )
}

export default TaskDetails
