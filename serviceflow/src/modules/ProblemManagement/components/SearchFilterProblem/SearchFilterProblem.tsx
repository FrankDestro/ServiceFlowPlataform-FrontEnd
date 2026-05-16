// SearchFilterProblem.tsx
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterProblem.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import type { ProblemSearchParams } from "../../models/ProblemDTO.ts";
import CustomDatePicker from "../../../../components/form/CustomDatePicker/CustomDatePicker.tsx";

type Props = {
    onSearch: (formData: ProblemSearchParams) => void;
};

function SearchFilterProblem({ onSearch }: Props) {
    const [filters, setFilters] = useState({
        problemNumber: "",
        categoryId: null as number | null,
        priority: "",
        urgency: "",
        status: "",
        assignedToId: null as number | null,
        createdById: null as number | null,
        initialDate: "",
        finalDate: "",
        myProblems: false,
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === "categoryId" || name === "assignedToId" || name === "createdById"
                ? (value ? Number(value) : null)
                : value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch(filters);
    }

    function handleClearFilters() {
        const cleared = {
            problemNumber: "",
            categoryId: null,
            priority: "",
            urgency: "",
            status: "",
            assignedToId: null,
            createdById: null,
            initialDate: "",
            finalDate: "",
            myProblems: false,
        };
        setFilters(cleared);
        onSearch(cleared);
    }

    return (
        <div className="prb-search-card">
            <form onSubmit={handleSubmit}>
                <div className="prb-search-container">
                    <div className="prb-search-row">
                        <div className="prb-input-container">
                            <input type="text" placeholder=" " name="problemNumber"
                                value={filters.problemNumber} onChange={handleInputChange}
                                className="prb-floating-input" />
                            <label className="prb-floating-label">Nº do Problema</label>
                        </div>
                        <div className="prb-select-container">
                            <select name="priority" value={filters.priority}
                                onChange={handleInputChange} className="prb-select">
                                <option value="">Todas as prioridades</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="prb-select-container">
                            <select name="urgency" value={filters.urgency}
                                onChange={handleInputChange} className="prb-select">
                                <option value="">Todas as urgências</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="prb-select-container">
                            <select name="status" value={filters.status}
                                onChange={handleInputChange} className="prb-select">
                                <option value="">Todos os status</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_INVESTIGATION">IN_INVESTIGATION</option>
                                <option value="KNOWN_ERROR">KNOWN_ERROR</option>
                                <option value="RESOLVED">RESOLVED</option>
                                <option value="CLOSED">CLOSED</option>
                                <option value="OVERDUE">OVERDUE</option>
                            </select>
                        </div>
                    </div>
                    <div className="prb-search-row">
                        <div className="prb-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Criado em (de)</span>
                            <CustomDatePicker
                                value={filters.initialDate}
                                onChange={(value) => setFilters(prev => ({ ...prev, initialDate: value }))}
                            />
                        </div>
                        <div className="prb-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Criado em (até)</span>
                            <CustomDatePicker
                                value={filters.finalDate}
                                onChange={(value) => setFilters(prev => ({ ...prev, finalDate: value }))}
                            />
                        </div>
                        <div className="prb-search-buttons">
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

export default SearchFilterProblem;