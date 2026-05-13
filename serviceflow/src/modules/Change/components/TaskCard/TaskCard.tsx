import { useState } from "react";
import { useChangeActions } from "../../hooks/useChangesActions";

export type Task = {
    id: number;
    title: string;
    description: string;
    responsible: string;
    responsibleId: number | null;
    estimatedHours: string;
    status: string;
};

interface TaskCardProps {
    task: Task;
    index: number;
    onRemove: (id: number) => void;
    onChange: (id: number, field: keyof Task, value: string | number | null) => void;
}

export default function TaskCard({ task, index, onRemove, onChange }: TaskCardProps) {

    const { taskSearch, setTaskSearch, taskResults } = useChangeActions();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="cc-task-card">
            <div className="cc-task-header">
                <span className="cc-task-number">Tarefa #{index + 1}</span>
                <button className="cc-task-remove" onClick={() => onRemove(task.id)}>×</button>
            </div>

            <div className="cc-task-field">
                <label className="cc-task-label">Título *</label>
                <input
                    type="text"
                    className="cc-task-input"
                    placeholder="Descreva a tarefa"
                    value={task.title}
                    onChange={(e) => onChange(task.id, "title", e.target.value)}
                />
            </div>

            <div className="cc-task-field">
                <label className="cc-task-label">Descrição</label>
                <textarea
                    className="cc-task-textarea"
                    placeholder="Detalhes da tarefa..."
                    value={task.description}
                    onChange={(e) => onChange(task.id, "description", e.target.value)}
                />
            </div>

            <div className="cc-task-row">

                {/* Responsável com dropdown */}
                <div className="cc-task-field" style={{ position: "relative" }}>
                    <label className="cc-task-label">Responsável</label>
                    <input
                        type="text"
                        className="cc-task-input"
                        placeholder="Buscar usuário..."
                        value={task.responsible}
                        onChange={(e) => {
                            onChange(task.id, "responsible", e.target.value);
                            setTaskSearch(e.target.value);
                            setShowDropdown(true);
                        }}
                    />
                    {showDropdown && taskResults.length > 0 && (
                        <div className="cc-dropdown">
                            {taskResults.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="cc-dropdown-item"
                                    onClick={() => {
                                        onChange(task.id, "responsible", `${user.firstName} ${user.lastName}`);
                                        onChange(task.id, "responsibleId", user.id);
                                        setTaskSearch("");
                                        setShowDropdown(false);
                                    }}
                                >
                                    <span>{user.firstName} {user.lastName}</span>
                                    <span className="cc-dropdown-email">{user.email}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cc-task-field" style={{ maxWidth: 120 }}>
                    <label className="cc-task-label">Horas estimadas</label>
                    <input
                        type="number"
                        className="cc-task-input"
                        placeholder="Ex: 2"
                        min={0}
                        step={0.5}
                        value={task.estimatedHours}
                        onChange={(e) => onChange(task.id, "estimatedHours", e.target.value)}
                    />
                </div>

                <div className="cc-task-field" style={{ maxWidth: 140 }}>
                    <label className="cc-task-label">Status inicial</label>
                    <select
                        className="cc-task-select"
                        value={task.status}
                        onChange={(e) => onChange(task.id, "status", e.target.value)}
                    >
                        <option value="PENDING">PENDING</option>
                    </select>
                </div>
            </div>
        </div>
    );
}