// SearchFilterChange.tsx
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./SearchFilterChange.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import type { ChangeSearchParams } from "../../models/ChangeDTO.ts";
import CustomDatePicker from "../../../../components/form/CustomDatePicker/CustomDatePicker.tsx";

type Props = {
    onSearch: (formData: ChangeSearchParams) => void;
};

function SearchFilterChange({ onSearch }: Props) {
    const [filters, setFilters] = useState({
        title: "",
        changeNumber: "",
        changeTypeId: null as number | null,
        priority: "",
        status: "",
        stage: "",
        scheduledStartFrom: "",
        scheduledStartTo: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: name === "changeTypeId" ? (value ? Number(value) : null) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch(filters);
    }

    function handleClearFilters() {
        const cleared = {
            title: "",
            changeNumber: "",
            changeTypeId: null,
            priority: "",
            status: "",
            stage: "",
            scheduledStartFrom: "",
            scheduledStartTo: "",
        };
        setFilters(cleared);
        onSearch(cleared);
    }

    return (
        <div className="ch-search-card">
            <form onSubmit={handleSubmit}>
                <div className="ch-search-container">
                    <div className="ch-search-row">
                        <div className="ch-input-container">
                            <input type="text" placeholder=" " name="title"
                                value={filters.title} onChange={handleInputChange}
                                className="ch-floating-input" />
                            <label className="ch-floating-label">Título</label>
                        </div>
                        <div className="ch-input-container">
                            <input type="text" placeholder=" " name="changeNumber"
                                value={filters.changeNumber} onChange={handleInputChange}
                                className="ch-floating-input" />
                            <label className="ch-floating-label">Nº da Mudança</label>
                        </div>
                        <div className="ch-select-container">
                            <select name="priority" value={filters.priority}
                                onChange={handleInputChange} className="ch-select">
                                <option value="">Todas as prioridades</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="ch-select-container">
                            <select name="status" value={filters.status}
                                onChange={handleInputChange} className="ch-select">
                                <option value="">Todos os status</option>
                                <option value="REQUESTED">REQUESTED</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="ch-select-container">
                            <select name="stage" value={filters.stage}
                                onChange={handleInputChange} className="ch-select">
                                <option value="">Todos os estágios</option>
                                <option value="SUBMISSION">SUBMISSION</option>
                                <option value="IMPLEMENTATION">IMPLEMENTATION</option>
                                <option value="REVIEW">REVIEW</option>
                                <option value="CLOSE">CLOSE</option>
                            </select>
                        </div>
                    </div>
                    <div className="ch-search-row">
                        <div className="ch-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Início agendado (de)</span>
                            <CustomDatePicker
                                value={filters.scheduledStartFrom}
                                onChange={(value) => setFilters(prev => ({ ...prev, scheduledStartFrom: value }))}
                            />
                        </div>
                        <div className="ch-input-container">
                            <span style={{ fontSize: 12, color: "#64748b" }}>Início agendado (até)</span>
                            <CustomDatePicker
                                value={filters.scheduledStartTo}
                                onChange={(value) => setFilters(prev => ({ ...prev, scheduledStartTo: value }))}
                            />
                        </div>
                        <div className="ch-search-buttons">
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

export default SearchFilterChange;