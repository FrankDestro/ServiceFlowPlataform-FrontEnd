// SearchFilterEpic.tsx
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterEpic.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import type { EpicFilterFormData } from "../../models/EpicDTO";

type Props = {
    onSearch: (formData: EpicFilterFormData) => void;
    projects: { id: number; projectNumber: string; description: string }[];
};

const INITIAL_FILTERS: EpicFilterFormData = {
    epicNumber: "",
    status: "",
    priority: "",
    projectId: null,
};

function SearchFilterEpic({ onSearch, projects }: Props) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === "projectId" ? (value ? Number(value) : null) : value,
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
        <div className="ep-search-card">
            <form onSubmit={handleSubmit}>
                <div className="ep-search-container">

                    {/* linha 1 */}
                    <div className="ep-search-row">
                        <div className="ep-input-container">
                            <input type="text" placeholder=" " name="epicNumber"
                                value={filters.epicNumber} onChange={handleInputChange}
                                className="ep-floating-input" />
                            <label className="ep-floating-label">Nº do Épico</label>
                        </div>
                        <div className="ep-select-container">
                            <select name="status" value={filters.status}
                                onChange={handleInputChange} className="ep-select">
                                <option value="">Todos os status</option>
                                <option value="BACKLOG">BACKLOG</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DONE">DONE</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="ep-select-container">
                            <select name="priority" value={filters.priority}
                                onChange={handleInputChange} className="ep-select">
                                <option value="">Todas as prioridades</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="ep-select-container">
                            <select name="projectId" value={filters.projectId ?? ""}
                                onChange={handleInputChange} className="ep-select">
                                <option value="">Todos os projetos</option>
                                {projects.map(proj => (
                                    <option key={proj.id} value={proj.id}>{proj.projectNumber}</option>
                                ))}
                            </select>
                        </div>
                        <div className="ep-search-buttons">
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

export default SearchFilterEpic;