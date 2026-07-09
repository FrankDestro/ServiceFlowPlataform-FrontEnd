// SearchFilterOperationalTask.tsx
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterOperationalTask.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import CustomDatePicker from "../../../../components/form/CustomDatePicker/CustomDatePicker.tsx";

type Props = {
    onSearch: (formData: {
        taskNumber: string;
        status: string;
        priority: string;
        categoryId: number | null;
        assignedTo: string;
        scheduledStartFrom: string;
        scheduledStartTo: string;
        dueDateFrom: string;
        dueDateTo: string;
    }) => void;
    categories: { id: number; name: string }[];
};

const INITIAL_FILTERS = {
    taskNumber: "",
    status: "",
    priority: "",
    categoryId: null as number | null,
    assignedTo: "",
    scheduledStartFrom: "",
    scheduledStartTo: "",
    dueDateFrom: "",
    dueDateTo: "",
};

function SearchFilterOperationalTask({ onSearch, categories }: Props) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === "categoryId" ? (value ? Number(value) : null) : value,
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
        <div className="ot-search-card">
            <form onSubmit={handleSubmit}>
                <div className="ot-search-container">

                    {/* linha 1 */}
                    <div className="ot-search-row">
                        <div className="ot-input-container">
                            <input type="text" placeholder=" " name="taskNumber"
                                value={filters.taskNumber} onChange={handleInputChange}
                                className="ot-floating-input" />
                            <label className="ot-floating-label">Nº da Tarefa</label>
                        </div>
                        <div className="ot-input-container">
                            <input type="text" placeholder=" " name="assignedTo"
                                value={filters.assignedTo} onChange={handleInputChange}
                                className="ot-floating-input" />
                            <label className="ot-floating-label">Responsável</label>
                        </div>
                        <div className="ot-select-container">
                            <select name="status" value={filters.status}
                                onChange={handleInputChange} className="ot-select">
                                <option value="">Todos os status</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="ON_HOLD">ON_HOLD</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="ot-select-container">
                            <select name="priority" value={filters.priority}
                                onChange={handleInputChange} className="ot-select">
                                <option value="">Todas as prioridades</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="ot-select-container">
                            <select name="categoryId" value={filters.categoryId ?? ""}
                                onChange={handleInputChange} className="ot-select">
                                <option value="">Todas as categorias</option>
                                {/* {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))} */}
                            </select>
                        </div>
                    </div>

                    {/* linha 2 */}
                    <div className="ot-search-row">
                        <div className="ot-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Início agendado (de)</span>
                            <CustomDatePicker
                                value={filters.scheduledStartFrom}
                                onChange={(value) => setFilters(prev => ({ ...prev, scheduledStartFrom: value }))}
                            />
                        </div>
                        <div className="ot-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Início agendado (até)</span>
                            <CustomDatePicker
                                value={filters.scheduledStartTo}
                                onChange={(value) => setFilters(prev => ({ ...prev, scheduledStartTo: value }))}
                            />
                        </div>
                        <div className="ot-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Prazo (de)</span>
                            <CustomDatePicker
                                value={filters.dueDateFrom}
                                onChange={(value) => setFilters(prev => ({ ...prev, dueDateFrom: value }))}
                            />
                        </div>
                        <div className="ot-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Prazo (até)</span>
                            <CustomDatePicker
                                value={filters.dueDateTo}
                                onChange={(value) => setFilters(prev => ({ ...prev, dueDateTo: value }))}
                            />
                        </div>
                        <div className="ot-search-buttons">
                            <Button text="Filtrar" icon={faFilter} background="#0f766e"
                                hoverColor="#0d9488" type="submit" borderRadius="5px" size="small" />
                            <div onClick={handleClearFilters}>
                                <Button text="Limpar" icon={faEraser} background="#0f766e"
                                    hoverColor="#0d9488" borderRadius="5px" size="small" />
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default SearchFilterOperationalTask;