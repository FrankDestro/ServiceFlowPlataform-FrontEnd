import { useEffect, useState } from "react";
import { type SolvingAreaDTO } from "../../../models/solvingAreaDTO";
import * as solvingAreaService from "../../../service/solving-area";
import "./SearchOperationalPanel.css";

type Props = {
    onSearch: (solvingAreaId: string) => void;
};

function SearchOperationalPanel({ onSearch }: Props) {
    const [solvingAreas, setSolvingAreas] = useState<SolvingAreaDTO[]>([]);
    const [solvingAreaId, setSolvingAreaId] = useState("");

    useEffect(() => {
        solvingAreaService.getAllSolvingArea().then(r => setSolvingAreas(r.data));
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        setSolvingAreaId(value);
        onSearch(value);
    }

    return (
        <div className="op-search-card">
            <div className="op-select-container">
                <select name="solvingAreaId" value={solvingAreaId} onChange={handleChange}>
                    <option value="">Todas as áreas</option>
                    {solvingAreas.map(a => (
                        <option key={a.id} value={String(a.id)}>{a.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SearchOperationalPanel;