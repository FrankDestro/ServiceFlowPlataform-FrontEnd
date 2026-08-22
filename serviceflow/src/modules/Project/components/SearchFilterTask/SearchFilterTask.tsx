// SearchFilterTask.tsx
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterTask.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import type { TaskFilterDTO } from "../../models/TaskDTO";

type Props = {
    onSearch: (formData: TaskFilterDTO) => void;
    projects: { id: number; projectNumber: string; name: string }[];
    epics: { id: number; epicNumber: string; title: string }[];
    sprints: { id: number; name: string }[];
    users: { id: number; firstName: string; lastName: string }[];
};

const INITIAL_FILTERS: TaskFilterDTO = {
    taskNumber: "",
    projectId: null,
    status: "",
    priority: "",
    epicId: null,
    sprintId: null,
    assignedTo: null,
};

function SearchFilterTask({ onSearch }: Props) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const numericFields = ["projectId", "epicId", "sprintId", "assignedTo"];
        setFilters(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? (value ? Number(value) : null) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch(filters);
    }

    function handleClearFilters() {
        setFilters(INITIAL_FILTERS);
        onSearch(INITIAL_FILTERS);
    }

    return (
        <div className="tsk-search-card">
            <form onSubmit={handleSubmit}>
                <div className="tsk-search-container">

                    {/* linha 1 */}
                    <div className="tsk-search-row">
                        <div className="tsk-input-container">
                            <input type="text" placeholder=" " name="taskNumber"
                                value={filters.taskNumber} onChange={handleInputChange}
                                className="tsk-floating-input" />
                            <label className="tsk-floating-label">Nº da Task</label>
                        </div>
                        <div className="tsk-select-container">
                            <select name="status" value={filters.status}
                                onChange={handleInputChange} className="tsk-select">
                                <option value="">Todos os status</option>
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DONE">DONE</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="tsk-select-container">
                            <select name="priority" value={filters.priority}
                                onChange={handleInputChange} className="tsk-select">
                                <option value="">Todas as prioridades</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="tsk-select-container">
                            <select name="projectId" value={filters.projectId ?? ""}
                                onChange={handleInputChange} className="tsk-select">
                                <option value="">Todos os projetos</option>
                                {projects.map(proj => (
                                    <option key={proj.id} value={proj.id}>{proj.projectNumber}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* linha 2 */}
                    <div className="tsk-search-row">
                        <div className="tsk-select-container">
                            <select name="epicId" value={filters.epicId ?? ""}
                                onChange={handleInputChange} className="tsk-select">
                                <option value="">Todos os épicos</option>
                                {epics.map(ep => (
                                    <option key={ep.id} value={ep.id}>{ep.epicNumber} — {ep.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="tsk-select-container">
                            <select name="sprintId" value={filters.sprintId ?? ""}
                                onChange={handleInputChange} className="tsk-select">
                                <option value="">Todos os sprints</option>
                                {sprints.map(sp => (
                                    <option key={sp.id} value={sp.id}>{sp.name}</option>
                                ))}
                            </select>
                        </div>
                        <select name="assignedTo" value={filters.assignedTo ?? ""}
                            onChange={handleInputChange} className="tsk-select">
                            <option value="">Todos os responsáveis</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.firstName}</option>
                            ))}
                        </select>
                        <div className="tsk-search-buttons">
                            <Button text="Filtrar" icon={faFilter}
                                background="#185FA5"
                                hoverColor="#0C447C"
                                type="submit"
                                borderRadius="5px" size="small"
                            />
                            <div onClick={handleClearFilters}>
                                <Button text="Limpar" icon={faEraser} background="#185FA5"
                                    hoverColor="#0C447C" borderRadius="5px" size="small" />
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default SearchFilterTask;